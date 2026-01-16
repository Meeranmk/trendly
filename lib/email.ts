import nodemailer from 'nodemailer'

// Package to Google Drive link mapping
const PACKAGE_LINKS: Record<string, string> = {
  'Basic': 'https://drive.google.com/drive/folders/1wh9e3fMQ20utXrPcVP8en7av93WPhRGq?usp=drive_link',
  'Advanced': 'https://drive.google.com/drive/folders/19NjqV2S7D6Q_OdsMuCtyUxjYNddNKS-0?usp=drive_link',
  'Premium': 'https://drive.google.com/drive/folders/1hHTpIYABvCyd3jI_4TcE7VYOHMQqmjea?usp=drive_link',
}

// Package prices
const PACKAGE_PRICES: Record<string, number> = {
  'Basic': 1,
  'Advanced': 1,
  'Premium': 1,
}

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

interface SendPackageEmailParams {
  customerEmail: string
  customerName?: string
  packageName: string
  orderId: string
  paymentId: string
}

export async function sendPackageEmail({
  customerEmail,
  customerName = 'Customer',
  packageName,
  orderId,
  paymentId,
}: SendPackageEmailParams) {
  try {
    const transporter = createTransporter()
    const driveLink = PACKAGE_LINKS[packageName]
    const packagePrice = PACKAGE_PRICES[packageName]

    if (!driveLink) {
      throw new Error(`Invalid package name: ${packageName}`)
    }

    // Email HTML template
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Trendlygroww Package</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);">
        <h1 style="color: #ffffff; margin: 0; font-size: 32px;">🎉 Thank You for Your Purchase!</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #1f2937; margin-top: 0;">Hi ${customerName},</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                Thank you for purchasing the <strong>${packageName} Package (₹${packagePrice})</strong> from Trendlygroww! 
                Your payment has been successfully processed.
              </p>
              
              <div style="background-color: #f9fafb; border-left: 4px solid #2563eb; padding: 20px; margin: 30px 0;">
                <h3 style="color: #1f2937; margin-top: 0;">📦 Your Package Details</h3>
                <p style="color: #4b5563; margin: 5px 0;"><strong>Package:</strong> ${packageName} Bundle</p>
                <p style="color: #4b5563; margin: 5px 0;"><strong>Amount Paid:</strong> ₹${packagePrice}</p>
                <p style="color: #4b5563; margin: 5px 0;"><strong>Order ID:</strong> ${orderId}</p>
                <p style="color: #4b5563; margin: 5px 0;"><strong>Payment ID:</strong> ${paymentId}</p>
              </div>

              <div style="text-align: center; margin: 40px 0;">
                <a href="${driveLink}" 
                   style="display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); 
                          color: #000000; text-decoration: none; padding: 16px 40px; border-radius: 8px; 
                          font-weight: bold; font-size: 18px; box-shadow: 0 4px 6px rgba(251, 191, 36, 0.3);">
                  📥 Download Your Package
                </a>
              </div>

              <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h3 style="color: #92400e; margin-top: 0;">⚡ Quick Start Guide</h3>
                <ol style="color: #78350f; margin: 0; padding-left: 20px;">
                  <li style="margin: 10px 0;">Click the download button above to access your Google Drive folder</li>
                  <li style="margin: 10px 0;">Download all the files from the folder</li>
                  <li style="margin: 10px 0;">Follow the installation instructions included in the package</li>
                  <li style="margin: 10px 0;">Start creating amazing videos!</li>
                </ol>
              </div>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                You now have <strong>lifetime access</strong> to your package. You can download and reinstall 
                it anytime you need.
              </p>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                If you have any questions or need assistance, please don't hesitate to contact us.
              </p>

              <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">
                  Best regards,<br>
                  <strong style="color: #2563eb;">Trendlygroww Team</strong>
                </p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #1f2937;">
        <p style="color: #9ca3af; font-size: 14px; margin: 0;">
          © 2026 Trendlygroww. All rights reserved.
        </p>
        <p style="color: #9ca3af; font-size: 12px; margin: 10px 0 0 0;">
          This email was sent because you made a purchase on our website.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `

    // Plain text version
    const textContent = `
Hi ${customerName},

Thank you for purchasing the ${packageName} Package (₹${packagePrice}) from Trendlygroww!

Your Package Details:
- Package: ${packageName} Bundle
- Amount Paid: ₹${packagePrice}
- Order ID: ${orderId}
- Payment ID: ${paymentId}

Download Your Package:
${driveLink}

Quick Start Guide:
1. Click the link above to access your Google Drive folder
2. Download all the files from the folder
3. Follow the installation instructions included in the package
4. Start creating amazing videos!

You now have lifetime access to your package. You can download and reinstall it anytime you need.

If you have any questions or need assistance, please don't hesitate to contact us.

Best regards,
Trendlygroww Team

© 2026 Trendlygroww. All rights reserved.
    `

    // Send email
    const info = await transporter.sendMail({
      from: `"Trendlygroww" <${process.env.SMTP_FROM_EMAIL}>`,
      to: customerEmail,
      subject: `🎉 Your ${packageName} Package is Ready - Trendlygroww`,
      text: textContent,
      html: htmlContent,
    })

    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
