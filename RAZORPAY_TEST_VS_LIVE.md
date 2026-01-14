# 🔐 Razorpay Test vs Live Mode Guide

## ⚠️ IMPORTANT: Understanding Test vs Live Mode

Razorpay has **TWO separate modes**:
- **Test Mode** - For testing (fake money, test cards)
- **Live Mode** - For real payments (real money, real cards)

Each mode has **different API keys**!

## 🔍 How to Check Which Mode You're Using

### Check Your API Keys

Your API keys determine the mode:

**Test Mode Keys:**
- Key ID starts with: `rzp_test_`
- Example: `rzp_test_1234567890abcd`

**Live Mode Keys:**
- Key ID starts with: `rzp_live_`
- Example: `rzp_live_1234567890abcd`

### Check Your .env.local File

Open your `.env.local` file and look at:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXX  # ← Check this!
```

If it starts with `rzp_test_` → You're in **TEST MODE** ✅  
If it starts with `rzp_live_` → You're in **LIVE MODE** ⚠️

## 🧪 Setting Up TEST MODE (Recommended for Development)

### Step 1: Get Test API Keys

1. Go to: https://dashboard.razorpay.com/
2. **Switch to Test Mode** (toggle in top-left corner)
3. Go to Settings → API Keys
4. Generate Test Keys or use existing ones

### Step 2: Update .env.local

```env
# TEST MODE - Use these for development/testing
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_TEST_KEY_SECRET
```

### Step 3: Test with Test Cards

When in test mode, use these test cards:

**Successful Payment:**
- Card: `4111 1111 1111 1111`
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)
- Name: Any name

**Failed Payment (to test failure):**
- Card: `4000 0000 0000 0002`
- Expiry: Any future date
- CVV: Any 3 digits

**More test cards:** https://razorpay.com/docs/payments/payments/test-card-details/

## 💰 Setting Up LIVE MODE (For Production Only)

### ⚠️ WARNING: Only use Live Mode when you're ready to accept REAL payments!

### Step 1: Activate Your Razorpay Account

1. Complete KYC verification
2. Add bank account details
3. Get your account activated by Razorpay

### Step 2: Get Live API Keys

1. Go to: https://dashboard.razorpay.com/
2. **Switch to Live Mode** (toggle in top-left corner)
3. Go to Settings → API Keys
4. Generate Live Keys

### Step 3: Update .env.local for Production

```env
# LIVE MODE - Use these ONLY in production
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_LIVE_KEY_SECRET
```

## 🔄 How to Switch Between Modes

### For Development/Testing:
```env
# .env.local (Development)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_TEST_KEY_SECRET
```

### For Production:
```env
# .env.local (Production)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_LIVE_KEY_SECRET
```

## 🎯 Current Recommendation

**For now, you should use TEST MODE:**

1. ✅ Safe to test without real money
2. ✅ Can test payment flows
3. ✅ Can test email sending
4. ✅ No risk of accidental charges
5. ✅ Unlimited testing

**Switch to LIVE MODE only when:**
- ✅ All testing is complete
- ✅ Email automation is working
- ✅ Payment flows are verified
- ✅ You're ready to accept real payments
- ✅ Your Razorpay account is activated

## 🔍 Verifying Your Current Mode

### Method 1: Check the Key
Look at your `NEXT_PUBLIC_RAZORPAY_KEY_ID` in `.env.local`:
- Starts with `rzp_test_` = Test Mode ✅
- Starts with `rzp_live_` = Live Mode ⚠️

### Method 2: Check Razorpay Dashboard
1. Go to https://dashboard.razorpay.com/
2. Look at the top-left corner
3. You'll see either "Test Mode" or "Live Mode"

### Method 3: Try a Test Card
If test cards work (like 4111 1111 1111 1111), you're in test mode!

## 📋 Quick Checklist

Before going LIVE, ensure:
- [ ] All features tested in test mode
- [ ] Email automation working correctly
- [ ] Payment success/failure flows tested
- [ ] Google Drive links are correct
- [ ] Razorpay account is activated
- [ ] KYC completed
- [ ] Bank account added
- [ ] Live API keys obtained
- [ ] .env.local updated with live keys
- [ ] Application deployed to production
- [ ] Final testing with small real payment

## 🆘 Troubleshooting

### "It's asking for real money!"

**Check these:**
1. Open `.env.local`
2. Look at `NEXT_PUBLIC_RAZORPAY_KEY_ID`
3. If it starts with `rzp_live_`, you're in LIVE mode!
4. Replace with `rzp_test_` keys for testing

### "Test cards not working"

**Possible reasons:**
1. You might be using live mode keys
2. Card number might be incorrect
3. Check you're using the exact test card numbers from Razorpay docs

### "Where do I get test keys?"

1. Go to https://dashboard.razorpay.com/
2. Toggle to "Test Mode" (top-left)
3. Settings → API Keys
4. Generate or copy existing test keys

## 📝 Example Configuration

### Development (.env.local):
```env
# TEST MODE - Safe for development
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_AbCdEfGhIjKlMnOp
RAZORPAY_KEY_SECRET=test_secret_key_here

# Email settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your.email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM_EMAIL=your.email@gmail.com

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production (.env.local):
```env
# LIVE MODE - Real payments!
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_AbCdEfGhIjKlMnOp
RAZORPAY_KEY_SECRET=live_secret_key_here

# Email settings (production SMTP)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=your_sendgrid_api_key
SMTP_FROM_EMAIL=noreply@yourdomain.com

# App URL
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 🔒 Security Notes

⚠️ **NEVER:**
- Commit `.env.local` to git
- Share your secret keys
- Use live keys in development
- Mix test and live keys

✅ **ALWAYS:**
- Use test mode for development
- Keep keys secure
- Use environment-specific keys
- Test thoroughly before going live

## 📞 Need Help?

1. Check Razorpay Dashboard mode (top-left toggle)
2. Verify your API keys start with `rzp_test_`
3. Use test cards from Razorpay documentation
4. Check console logs for errors

---

**Remember:** Test mode is FREE and SAFE! Use it until you're 100% ready for production! 🎉
