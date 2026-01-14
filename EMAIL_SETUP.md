# Email Setup Guide for Trendlygroww

This guide will help you configure email functionality to automatically send package download links to customers after successful payment.

## Overview

After a customer completes payment, the system will:
1. Verify the payment with Razorpay
2. Fetch the order and payment details
3. Determine which package was purchased (₹99, ₹149, or ₹199)
4. Send an email with the appropriate Google Drive link

## Package Links Configuration

The following Google Drive links are configured in `lib/email.ts`:

- **Basic Package (₹99)**: https://drive.google.com/drive/folders/1wh9e3fMQ20utXrPcVP8en7av93WPhRGq?usp=drive_link
- **Advanced Package (₹149)**: https://drive.google.com/drive/folders/19NjqV2S7D6Q_OdsMuCtyUxjYNddNKS-0?usp=drive_link
- **Premium Package (₹199)**: https://drive.google.com/drive/folders/1hHTpIYABvCyd3jI_4TcE7VYOHMQqmjea?usp=drive_link

## SMTP Configuration

### Option 1: Gmail (Recommended for Testing)

1. **Enable 2-Factor Authentication** on your Gmail account
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Create an App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password

3. **Update `.env.local`** with these settings:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASSWORD=your_16_character_app_password
   SMTP_FROM_EMAIL=your_email@gmail.com
   ```

### Option 2: Other Email Providers

#### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@outlook.com
SMTP_PASSWORD=your_password
SMTP_FROM_EMAIL=your_email@outlook.com
```

#### Yahoo Mail
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@yahoo.com
SMTP_PASSWORD=your_app_password
SMTP_FROM_EMAIL=your_email@yahoo.com
```

#### Custom SMTP Server
```env
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_username
SMTP_PASSWORD=your_smtp_password
SMTP_FROM_EMAIL=noreply@yourdomain.com
```

### Option 3: Professional Email Services (Recommended for Production)

For production, consider using dedicated email services:

#### SendGrid
1. Sign up at https://sendgrid.com
2. Create an API key
3. Update `.env.local`:
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=apikey
   SMTP_PASSWORD=your_sendgrid_api_key
   SMTP_FROM_EMAIL=noreply@yourdomain.com
   ```

#### Mailgun
1. Sign up at https://www.mailgun.com
2. Get your SMTP credentials
3. Update `.env.local` with Mailgun settings

#### Amazon SES
1. Set up Amazon SES
2. Get SMTP credentials
3. Update `.env.local` with SES settings

## Testing the Email Functionality

1. **Set up your environment variables** in `.env.local`

2. **Make a test payment** using Razorpay test mode:
   - Use test card: 4111 1111 1111 1111
   - Any future expiry date
   - Any CVV

3. **Check the console logs** for email sending status:
   ```
   Package email sent to customer@email.com for Basic package
   ```

4. **Verify the email** was received with:
   - Correct package name
   - Correct Google Drive link
   - Order and payment IDs

## Email Template

The email includes:
- Professional HTML design with Trendlygroww branding
- Package details (name, price, order ID, payment ID)
- Download button with Google Drive link
- Quick start guide
- Plain text fallback for email clients that don't support HTML

## Troubleshooting

### Email not sending

1. **Check environment variables** are set correctly in `.env.local`
2. **Verify SMTP credentials** are valid
3. **Check console logs** for error messages
4. **Test SMTP connection** independently

### Gmail "Less secure app" error

- Gmail no longer supports "less secure apps"
- You MUST use an App Password (see Gmail setup above)
- Regular password will not work

### Email goes to spam

- Use a professional email service (SendGrid, Mailgun, etc.)
- Set up SPF, DKIM, and DMARC records for your domain
- Use a verified sender email address

### Customer email not found

- Razorpay collects email during payment
- Ensure you're using the latest Razorpay checkout
- Email is optional in some Razorpay configurations
- Check Razorpay dashboard for payment details

## Security Notes

⚠️ **IMPORTANT**:
- Never commit `.env.local` to version control
- Keep SMTP credentials secure
- Use App Passwords, not regular passwords
- Rotate credentials regularly
- Use environment-specific credentials (dev/staging/production)

## File Structure

```
lib/
  └── email.ts              # Email utility with package links and templates

app/
  └── api/
      └── razorpay/
          ├── create-order/
          │   └── route.ts  # Creates Razorpay order
          └── verify-payment/
              └── route.ts  # Verifies payment and sends email

env.template              # Environment variables template
```

## Support

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify all environment variables are set
3. Test your SMTP credentials independently
4. Ensure Google Drive links are accessible

## Future Enhancements

Consider adding:
- Database to log all sent emails
- Retry mechanism for failed emails
- Email queue for better reliability
- Customer name collection during checkout
- Multiple language support
- Email analytics and tracking
