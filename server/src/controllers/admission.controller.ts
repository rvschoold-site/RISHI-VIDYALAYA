import { Request, Response } from 'express';
import { sendEmail } from '../services/email.service';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import AdmissionLead from '../../../src/models/AdmissionLead';

export const createAdmissionLead = asyncHandler(async (req: Request, res: Response) => {
  const { parentName, studentName, email, phone, grade } = req.body;

  const lead = await AdmissionLead.create({
    parentName,
    studentName,
    email,
    phone,
    grade,
    status: 'NEW',
  });


  // Send confirmation email
  try {
    await sendEmail({
      to: email,
      subject: 'Admission Inquiry Received - Rishi Vidyalaya',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #4A90E2;">Thank you for your interest, ${parentName}!</h1>
          <p>We have received your admission inquiry for <strong>${studentName}</strong> for Grade <strong>${grade}</strong>.</p>
          <p>Our team will contact you shortly at <strong>${phone}</strong>.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p>Regards,<br/><strong>Admissions Team</strong><br/>Rishi Vidyalaya</p>
        </div>
      `,
    });
  } catch (emailError) {
    console.error('Email notification failed:', emailError);
  }

  return res.status(201).json(
    new ApiResponse(201, lead, "Admission lead created successfully")
  );
});

export const getAdmissionLeads = asyncHandler(async (req: Request, res: Response) => {
  const leads = await AdmissionLead.find().sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, leads, "Leads fetched successfully")
  );
});

export const updateLeadStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedLead = await AdmissionLead.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );


  return res.status(200).json(
    new ApiResponse(200, updatedLead, "Lead status updated successfully")
  );
});
