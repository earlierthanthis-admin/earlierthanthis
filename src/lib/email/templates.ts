const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export function getEmailVerificationTemplate(
  firstName: string,
  verificationLink: string,
): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <title>Email Verification</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #fbbf24;
            color: #000;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Hello ${firstName}!</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <p><a href="${verificationLink}" class="button">Verify Email</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
    </div>
</body>
</html>
  `.trim();
}

export function getPasswordResetTemplate(resetLink: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <title>Password Reset</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #fbbf24;
            color: #000;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Password Reset Request</h1>
        <p>Hello,</p>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <p><a href="${resetLink}" class="button">Reset Password</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
    </div>
</body>
</html>
  `.trim();
}

export function getAdminApprovalTemplate(
  email: string,
  password: string,
  approvalLink: string,
  superAdminLink: string,
): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <title>Approve New Admin Request</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #fbbf24;
            color: #000;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-right: 10px;
        }
        .super-button {
            background-color: #10b981;
        }
        .credentials {
            background-color: #f3f4f6;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>New Admin Request</h1>
        <p>A new admin has requested access:</p>
        <div class="credentials">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
        </div>
        <p>Click one of the buttons below to approve:</p>
        <p>
            <a href="${approvalLink}" class="button">Approve as Admin</a>
            <a href="${superAdminLink}" class="button super-button">Approve as Super Admin</a>
        </p>
        <p>This link will expire in 1 hour.</p>
    </div>
</body>
</html>
  `.trim();
}

export function buildVerificationLink(token: string): string {
  return `${baseUrl}/api/auth/verify-email?token=${token}`;
}

export function buildPasswordResetLink(token: string): string {
  return `${baseUrl}/reset-password?token=${token}`;
}

export function buildAdminApprovalLink(token: string): string {
  return `${baseUrl}/api/auth/admin/approve?token=${token}`;
}
