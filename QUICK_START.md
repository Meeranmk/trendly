# 🚀 Quick Start Guide - Email Automation

## Step 1: Install Dependencies ✅
Already done! The following packages have been installed:
- `nodemailer` - Email sending library
- `@types/nodemailer` - TypeScript types

## Step 2: Configure Email Settings

### Option A: Gmail (Easiest for Testing)

1. **Enable 2-Factor Authentication**
   - Go to: https://myaccount.google.com/security
   - Turn on 2-Step Verification

2. **Create App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password (remove spaces)

3. **Update `.env.local`**
   ```env
   # Add these lines to your .env.local file:
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your.email@gmail.com
   SMTP_PASSWORD=abcd efgh ijkl mnop  # Your 16-char app password
   SMTP_FROM_EMAIL=your.email@gmail.com
   ```

### Option B: Other Email Provider
See `EMAIL_SETUP.md` for Outlook, Yahoo, SendGrid, etc.

## Step 3: Test Your Configuration

### Method 1: Browser Test (Easiest)
1. Start your dev server: `npm run dev`
2. Open browser and go to:
   ```
   http://localhost:3000/api/test-email?email=YOUR_EMAIL@gmail.com&package=Basic
   ```
3. Check your email inbox (and spam folder)

### Method 2: Using Postman/Thunder Client
```
POST http://localhost:3000/api/test-email
Content-Type: application/json

{
  "email": "your.email@gmail.com",
  "packageName": "Basic"
}
```

## Step 4: Verify It Works

After testing, you should receive an email with:
- ✅ Trendlygroww branding
- ✅ Package details (Basic, ₹99)
- ✅ Download button with Google Drive link
- ✅ Order and Payment IDs
- ✅ Quick start guide

## Step 5: Test with Real Payment

1. Use Razorpay **Test Mode**
2. Make a test purchase with test card:
   - Card: `4111 1111 1111 1111`
   - Expiry: Any future date
   - CVV: Any 3 digits
3. Complete payment
4. Check email for package link

## 📦 Package Links

The system automatically sends the correct link based on package:

| Package | Price | Google Drive Link |
|---------|-------|-------------------|
| Basic | ₹99 | [Link 1](https://drive.google.com/drive/folders/1wh9e3fMQ20utXrPcVP8en7av93WPhRGq?usp=drive_link) |
| Advanced | ₹149 | [Link 2](https://drive.google.com/drive/folders/19NjqV2S7D6Q_OdsMuCtyUxjYNddNKS-0?usp=drive_link) |
| Premium | ₹199 | [Link 3](https://drive.google.com/drive/folders/1hHTpIYABvCyd3jI_4TcE7VYOHMQqmjea?usp=drive_link) |

## 🔍 Troubleshooting

### "Failed to send email"
- ✅ Check `.env.local` has all SMTP settings
- ✅ Verify credentials are correct
- ✅ For Gmail, use App Password (not regular password)
- ✅ Check console logs for detailed error

### Email not received
- ✅ Check spam/junk folder
- ✅ Verify email address is correct
- ✅ Check email provider's sent folder
- ✅ Try with a different email address

### "Invalid credentials"
- ✅ Gmail: Must use App Password
- ✅ Remove spaces from App Password
- ✅ Verify email and password are correct

## 📝 How It Works

```
Customer Payment Flow:
1. Customer clicks "Buy Now" → Razorpay checkout opens
2. Customer enters email and payment details
3. Payment processed → Razorpay verifies
4. Your server verifies payment signature
5. Server fetches order details (package name)
6. Server fetches payment details (customer email)
7. Email sent automatically with correct Drive link
8. Customer receives email with download instructions
```

## 🎯 What Happens After Payment

1. **Payment Verified** ✅
2. **Package Identified** (Basic/Advanced/Premium)
3. **Email Sent** with appropriate Google Drive link
4. **Customer Notified** via professional email
5. **Success Page** shown to customer

## 📧 Email Template Preview

The customer receives:
```
Subject: 🎉 Your [Package] Package is Ready - Trendlygroww

Hi [Customer Name],

Thank you for purchasing the [Package] Package (₹[Price]) from Trendlygroww!

[Download Button with Google Drive Link]

Package Details:
- Package: [Package] Bundle
- Amount Paid: ₹[Price]
- Order ID: [Order ID]
- Payment ID: [Payment ID]

Quick Start Guide:
1. Click download button
2. Download files from Google Drive
3. Follow installation instructions
4. Start creating!

Best regards,
Trendlygroww Team
```

## 🔒 Security

- ✅ SMTP credentials in `.env.local` (gitignored)
- ✅ Payment verification before email
- ✅ Error handling (payment succeeds even if email fails)
- ✅ Secure credential storage

## 📚 Additional Resources

- **Detailed Setup**: See `EMAIL_SETUP.md`
- **Implementation Details**: See `IMPLEMENTATION_SUMMARY.md`
- **Test Endpoint**: `/api/test-email`

## ✅ Checklist

Before going live, ensure:
- [ ] SMTP credentials configured in `.env.local`
- [ ] Test email sent successfully
- [ ] Test payment completed successfully
- [ ] Email received with correct package link
- [ ] All three packages tested (₹99, ₹149, ₹199)
- [ ] Spam folder checked
- [ ] Google Drive links are accessible
- [ ] Production SMTP configured (for live site)

## 🎉 You're All Set!

Once you've completed the steps above, your email automation is ready!

Every customer who makes a payment will automatically receive:
- Professional branded email
- Correct package download link
- Order confirmation details
- Installation instructions

**Need Help?** Check the detailed guides:
- `EMAIL_SETUP.md` - Complete setup instructions
- `IMPLEMENTATION_SUMMARY.md` - Technical details
- Console logs - Error messages and debugging info
