# Email Setup Guide for Portfolio Contact Form

## Overview
Your portfolio contact form now sends emails to hiruyworku00@gmail.com when someone submits a message.

## Setup Instructions

### 1. Enable 2-Factor Authentication on Gmail
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification

### 2. Generate App Password
1. Go to Google Account settings
2. Navigate to Security
3. Under "2-Step Verification", click on "App passwords"
4. Select "Mail" and "Other (Custom name)"
5. Name it "Portfolio Contact Form"
6. Copy the generated 16-character password

### 3. Set Environment Variable
You need to set the EMAIL_PASSWORD environment variable with your app password.

#### For Local Development:
```bash
# On macOS/Linux
export EMAIL_PASSWORD="your-16-character-app-password"

# On Windows
set EMAIL_PASSWORD=your-16-character-app-password
```

#### For Production (Heroku, etc.):
```bash
heroku config:set EMAIL_PASSWORD="your-16-character-app-password"
```

### 4. Test the Setup
1. Start your Flask server: `python server.py`
2. Go to your contact page
3. Fill out and submit the form
4. Check your email (hiruyworku00@gmail.com) for the message

## Security Notes
- Never commit your app password to version control
- Use environment variables to store sensitive information
- The app password is different from your regular Gmail password

## Troubleshooting
- If emails aren't sending, check that the EMAIL_PASSWORD environment variable is set correctly
- Make sure 2-Factor Authentication is enabled on your Gmail account
- Check the server console for error messages

## Email Format
The emails will include:
- Sender's email address
- Subject line
- Message content
- Timestamp and source information 