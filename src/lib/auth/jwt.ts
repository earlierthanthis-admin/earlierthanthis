import { jwtVerify, SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export interface JWTPayload {
  id: string;
  type?: 'email_verification' | 'password_reset' | 'admin_approval';
  role?: 'user' | 'admin' | 'super_admin';
  email?: string;
  password?: string;
  superKey?: boolean;
}

export async function signToken(
  payload: JWTPayload,
  expiresIn: string = '7d',
): Promise<string> {
  const token = await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);

  return token;
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as JWTPayload;
  } catch {
    throw new Error('Invalid or expired token');
  }
}

export async function signEmailVerificationToken(
  userId: string,
): Promise<string> {
  return signToken({ id: userId, type: 'email_verification' }, '1h');
}

export async function signPasswordResetToken(
  userId: string,
  role: 'user' | 'admin' = 'user',
): Promise<string> {
  return signToken({ id: userId, type: 'password_reset', role }, '1h');
}

export async function signAdminApprovalToken(
  email: string,
  password: string,
  superKey: boolean,
): Promise<string> {
  return signToken(
    { id: email, type: 'admin_approval', email, password, superKey },
    '1h',
  );
}
