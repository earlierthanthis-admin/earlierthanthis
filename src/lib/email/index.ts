export type { EmailOptions } from './client';
export { sendEmail } from './client';
export {
  buildAdminApprovalLink,
  buildPasswordResetLink,
  buildVerificationLink,
  getAdminApprovalTemplate,
  getEmailVerificationTemplate,
  getPasswordResetTemplate,
} from './templates';
