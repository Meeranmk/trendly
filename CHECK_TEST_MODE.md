# 🚨 QUICK CHECK: Are You Using Test or Live Mode?

## 1️⃣ Open Your `.env.local` File

Look for this line:
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_????_XXXXXXXXXX
```

## 2️⃣ Check the Prefix

### ✅ TEST MODE (Safe for Development)
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXX
                              ^^^^
                              This means TEST MODE
```
**What this means:**
- ✅ No real money involved
- ✅ Use test cards (4111 1111 1111 1111)
- ✅ Safe to experiment
- ✅ Free to test unlimited times

### ⚠️ LIVE MODE (Real Money!)
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXX
                              ^^^^
                              This means LIVE MODE - REAL MONEY!
```
**What this means:**
- ⚠️ REAL money will be charged
- ⚠️ Real credit/debit cards required
- ⚠️ Actual payments processed
- ⚠️ Money goes to your bank account

## 🔄 How to Switch to TEST MODE

1. Go to https://dashboard.razorpay.com/
2. Click the toggle in top-left corner to switch to "Test Mode"
3. Go to Settings → API Keys
4. Copy your TEST keys (they start with `rzp_test_`)
5. Update your `.env.local`:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
RAZORPAY_KEY_SECRET=YOUR_TEST_SECRET_HERE
```

6. Restart your development server:
```bash
npm run dev
```

## 🧪 Test Cards for TEST MODE

When using test mode, use these cards:

**Success:**
- Card: `4111 1111 1111 1111`
- Expiry: `12/25` (any future date)
- CVV: `123` (any 3 digits)

**Failure:**
- Card: `4000 0000 0000 0002`

## ❓ Still Not Sure?

Run this check:
1. Start your app: `npm run dev`
2. Go to pricing page
3. Click "Buy Now"
4. Look at the Razorpay checkout window
5. If it says "Test Mode" at the top → You're safe! ✅
6. If it doesn't say "Test Mode" → You're in LIVE mode! ⚠️

## 📞 Need Help?

See the detailed guide: `RAZORPAY_TEST_VS_LIVE.md`

---

**Remember:** Always use TEST MODE during development! 🛡️
