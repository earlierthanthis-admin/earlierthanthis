interface GoogleTokenResponse {
  email: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email_verified?: boolean;
}

export async function exchangeCodeForTokens(
  code: string,
): Promise<GoogleTokenResponse> {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: 'postmessage',
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    throw new Error('Invalid Google authorization code');
  }

  const data = await response.json();
  const { id_token: idToken } = data;

  return decodeGoogleToken(idToken);
}

export async function decodeGoogleToken(
  idToken: string,
): Promise<GoogleTokenResponse> {
  const response = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`,
  );

  if (!response.ok) {
    throw new Error('Failed to decode Google ID token');
  }

  return response.json();
}

export async function validateGoogleIdToken(
  idToken: string,
): Promise<GoogleTokenResponse> {
  const response = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`,
  );

  if (!response.ok) {
    throw new Error('Invalid Google ID token');
  }

  const data = await response.json();
  const { aud, exp } = data;

  const validClientIds = [
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    process.env.ANDROID_GOOGLE_CLIENT_ID,
  ].filter(Boolean);

  if (!validClientIds.includes(aud)) {
    throw new Error('Invalid audience in ID token');
  }

  if (exp < Math.floor(Date.now() / 1000)) {
    throw new Error('ID token has expired');
  }

  return data;
}
