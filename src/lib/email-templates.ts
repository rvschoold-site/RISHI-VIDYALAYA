export const getBaseTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #334155; margin: 0; padding: 0; background-color: #f8fafc; }
    .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .header { background: #0f172a; padding: 40px 20px; text-align: center; }
    .logo { color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -1px; text-decoration: none; }
    .content { padding: 40px; }
    .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
    .button { display: inline-block; padding: 12px 24px; background: #dc2626; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 20px; }
    .data-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    .data-table td { padding: 10px; border-bottom: 1px solid #f1f5f9; }
    .data-table td:first-child { font-weight: 600; width: 30%; color: #0f172a; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">RISHI VIDYALAYA</div>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Rishi Vidyalaya. All rights reserved.</p>
      <p>N.S Gate road, Opp: Tidco Houses, Dharmavaram.</p>
    </div>
  </div>
</body>
</html>
`;

export const getAdminInviteTemplate = (token: string) => getBaseTemplate(`
  <h2 style="color: #0f172a; margin-top: 0;">Admin Invitation</h2>
  <p>Hello,</p>
  <p>You have been invited to join the administrative team at Rishi Vidyalaya. This token grants you access to set up your account.</p>
  <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px dashed #cbd5e1; text-align: center; margin: 20px 0;">
    <span style="font-family: monospace; font-size: 24px; font-weight: 800; color: #dc2626; letter-spacing: 4px;">${token}</span>
  </div>
  <p>Please use this token on the registration page. This link will expire in 7 days.</p>
  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/register?token=${token}" class="button">Complete Registration</a>
  <p style="margin-top: 20px; font-size: 14px; color: #64748b;">If you did not expect this invitation, please ignore this email.</p>
`);

export const getAdmissionConfirmationTemplate = (data: any) => getBaseTemplate(`
  <h2 style="color: #0f172a; margin-top: 0;">Admission Inquiry Received</h2>
  <p>Dear ${data.parentName},</p>
  <p>Thank you for your interest in Rishi Vidyalaya. We have received your admission inquiry for <strong>${data.studentName}</strong>.</p>
  <p>Our admissions team will review the details and contact you shortly to discuss the next steps.</p>
  
  <h3 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Inquiry Details</h3>
  <table class="data-table">
    <tr><td>Student</td><td>${data.studentName}</td></tr>
    <tr><td>Grade</td><td>${data.grade}</td></tr>
    <tr><td>Parent</td><td>${data.parentName}</td></tr>
    <tr><td>Phone</td><td>${data.phone}</td></tr>
  </table>
  
  <p style="margin-top: 30px;">In the meantime, feel free to explore our campus gallery or follow us on social media.</p>
  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/gallery" class="button">Explore Campus</a>
`);

export const getCareerConfirmationTemplate = (data: any) => getBaseTemplate(`
  <h2 style="color: #0f172a; margin-top: 0;">Application Received</h2>
  <p>Dear ${data.fullName},</p>
  <p>Thank you for applying for the position of <strong>${data.positionName}</strong> at Rishi Vidyalaya.</p>
  <p>We have successfully received your application and resume. Our recruitment team is currently reviewing all candidates and will reach out to you if your profile matches our requirements.</p>
  
  <h3 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Application Summary</h3>
  <table class="data-table">
    <tr><td>Name</td><td>${data.fullName}</td></tr>
    <tr><td>Position</td><td>${data.positionName}</td></tr>
    <tr><td>Type</td><td>${data.positionType}</td></tr>
    <tr><td>Experience</td><td>${data.experience} Years</td></tr>
  </table>
  
  <p style="margin-top: 30px;">Thank you for your interest in joining our mission to nurture future generations.</p>
`);

export const getAdminNotificationTemplate = (type: 'Admission' | 'Career' | 'Contact', data: any) => getBaseTemplate(`
  <h2 style="color: #0f172a; margin-top: 0;">New ${type} Submission</h2>
  <p>A new ${type.toLowerCase()} request has been submitted through the website.</p>
  
  <h3 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Submission Details</h3>
  <table class="data-table">
    ${Object.entries(data).filter(([key]) => key !== 'resume' && key !== 'subjects').map(([key, value]) => `
      <tr>
        <td style="text-transform: capitalize;">${key.replace(/([A-Z])/g, ' $1')}</td>
        <td>${value}</td>
      </tr>
    `).join('')}
    ${data.subjects ? `<tr><td>Subjects</td><td>${data.subjects.join(', ')}</td></tr>` : ''}
  </table>
  
  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin" class="button" style="background: #0f172a;">View in Dashboard</a>
`);
