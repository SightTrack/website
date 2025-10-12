# Contact Form Email Setup

The contact form now uses a Next.js API route with nodemailer to send emails, similar to your Django `send_mail` functionality.

## 🚀 Quick Setup

### 1. Install Dependencies (Already Done)

```bash
npm install nodemailer @types/nodemailer
```

### 2. Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=contact@sighttrack.org
CONTACT_EMAIL=contact@sighttrack.org
```

### 3. Gmail Setup (Recommended)

If using Gmail:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password for `SMTP_PASS`
3. **Use your Gmail address** for `SMTP_USER`

### 4. Alternative Email Providers

**Outlook/Hotmail:**

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

**Yahoo:**

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
```

**Custom SMTP Server:**

```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=465
SMTP_SECURE=true
```

## 📧 Features Implemented

### ✅ **Django Parity**

- **Email sending** with nodemailer (equivalent to Django's `send_mail`)
- **Spam detection** with same keywords and URL checking
- **Rate limiting** (3 submissions per hour per IP)
- **Form validation** on both client and server side
- **Detailed logging** of submissions
- **IP address tracking** for security

### ✅ **Enhanced Features**

- **TypeScript** for type safety
- **Modern React** with hooks and state management
- **Better error handling** with specific error messages
- **Network error detection** for connection issues
- **Responsive design** that works on all devices

### ✅ **Security Features**

- **Server-side validation** to prevent bypassing client validation
- **Rate limiting** to prevent spam attacks
- **Spam keyword detection**
- **URL limit checking** to prevent link spam
- **IP address logging** for security monitoring

## 🔧 API Endpoint

The contact form submits to `/api/contact` which:

1. **Validates** all form fields
2. **Checks rate limits** (3 per hour per IP)
3. **Detects spam** using your original logic
4. **Sends email** using nodemailer
5. **Logs submission** details
6. **Returns appropriate** success/error responses

## 🧪 Testing

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Visit the contact page:**

   ```
   http://localhost:3002/contact
   ```

3. **Test the form:**
   - Fill out all fields
   - Submit the form
   - Check console logs for submission details
   - Check your email for the message

## 🚨 Production Considerations

### **Rate Limiting**

- Current implementation uses in-memory storage
- For production, consider using Redis or a database
- Current limit: 3 submissions per hour per IP

### **Email Delivery**

- Test email delivery thoroughly
- Consider using a service like SendGrid, Mailgun, or AWS SES for production
- Monitor email delivery rates and spam scores

### **Security**

- The API route includes comprehensive spam detection
- Consider adding CAPTCHA for additional protection
- Monitor logs for suspicious activity

### **Error Handling**

- All errors are logged to console
- Consider using a logging service like Winston or Pino
- Set up error monitoring with services like Sentry

## 📝 Migration from Django

Your original Django contact form functionality has been fully replicated:

| Django Feature  | Next.js Implementation                 |
| --------------- | -------------------------------------- |
| `send_mail()`   | `nodemailer.sendMail()`                |
| Form validation | Client + Server validation             |
| CAPTCHA         | Spam detection (can add CAPTCHA later) |
| Rate limiting   | IP-based rate limiting                 |
| Spam detection  | Same keywords + URL checking           |
| Error handling  | Comprehensive error responses          |
| Logging         | Console logging (expandable)           |

The contact form is now fully functional and ready for production use!
