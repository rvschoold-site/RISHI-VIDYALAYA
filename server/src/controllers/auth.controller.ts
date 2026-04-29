import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../../../src/models/Admin';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import crypto from 'crypto';
import { sendEmail } from '../services/email.service';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export const setupSuperAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, setupKey } = req.body;

  // Simple protection for setup page - could be an env var
  if (setupKey !== process.env.SETUP_KEY && process.env.NODE_ENV === 'production') {
    throw new ApiError(403, 'Unauthorized setup attempt');
  }

  const existingAdmin = await Admin.findOne({ role: 'SUPER_ADMIN' });

  if (existingAdmin) {
    throw new ApiError(400, 'Super admin already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
    role: 'SUPER_ADMIN'
  });

  return res.status(201).json(
    new ApiResponse(201, { id: admin._id, email: admin.email }, 'Super admin created successfully')
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const isPasswordCorrect = await bcrypt.compare(password, admin.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN as any }
  );

  return res.status(200).json(
    new ApiResponse(200, {
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
    }, 'Login successful')
  );
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    // We don't want to reveal if an email exists or not for security
    return res.status(200).json(new ApiResponse(200, {}, 'If your email exists, you will receive a reset link.'));
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  await Admin.findByIdAndUpdate(admin._id, {
    resetToken: hashedToken,
    resetTokenExp: new Date(Date.now() + 3600000) // 1 hour
  });

  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/reset-password/${resetToken}`;

  const message = `
    <h1>Password Reset Request</h1>
    <p>You requested a password reset. Please click the link below to reset your password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>This link will expire in 1 hour.</p>
    <p>If you did not request this, please ignore this email.</p>
  `;

  await sendEmail({
    to: admin.email,
    subject: 'Password Reset Request - Rishi Vidyalaya',
    html: message
  });

  return res.status(200).json(new ApiResponse(200, {}, 'Password reset link sent to email.'));
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto.createHash('sha256').update(token as string).digest('hex');

  const admin = await Admin.findOne({
    resetToken: hashedToken,
    resetTokenExp: { $gt: new Date() }
  });

  if (!admin) {
    throw new ApiError(400, 'Invalid or expired reset token');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.findByIdAndUpdate(admin._id, {
    password: hashedPassword,
    resetToken: null,
    resetTokenExp: null
  });

  return res.status(200).json(new ApiResponse(200, {}, 'Password reset successful. You can now login.'));
});

export const getMe = asyncHandler(async (req: any, res: Response) => {
  const admin = await Admin.findById(req.user.id).select('-password');

  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }

  return res.status(200).json(new ApiResponse(200, admin, 'User data fetched'));
});

