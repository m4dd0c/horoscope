# Zodica

AI-powered horoscope app that generates personalized astrological insights using Gemini and real planetary data.

## Quick Start

```bash
git clone https://github.com/m4dd0c/zodica.git
cd zodica
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

```env
# Mongodb URI, using local
MONGO_URI="mongodb://0.0.0.0:27017/

# use `openssl rand --base64 32` for secure token
JWT_SECRET=my-sec-token


SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_MAIL="your-email@server.com"
# https://support.google.com/mail/answer/185833?hl=en
SMTP_PASS="your-email-app-password"

NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
```

## Tech Stack

- **Next.js 15** - App router, API routes
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **MongoDB** - Database
- **Gemini** - AI interpretations
- **Zod** - Validation

## API Routes

```
POST /api/signup               - User Registration
POST /api/signin               - User Signin
GET  /api/signout              - User Logout
GET  /api/user                 - Get user profile
GET  /api/horoscope/today      - Generate horoscope
GET  /api/horoscope/history    - Generate horoscope
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
