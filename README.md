# School AI Tutor (Next.js 14 App Router) - MVP

Project ready for deployment on Vercel (App Router, Next.js 14).

## Notes
- Add your OPENAI_API_KEY as an environment variable in Vercel.
- The system prompt is defined in `app/api/chat/route.js` (backend) — keep it there to avoid exposure.
- Upload endpoint stores files temporarily at OpenAI Files API (purpose: assistants).
- This is a minimal MVP without authentication or database.

## Run locally
```bash
npm install
npm run dev
```

## Deploy
Push to GitHub and import project to Vercel. Add environment variable:
- OPENAI_API_KEY

