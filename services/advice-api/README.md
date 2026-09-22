# ADvice API (Vercel)

One serverless function, `POST /api/simulate`, that calls Gemini for the ADvice
simulator on ap-digital.ca/advice. Stateless — no database.

## Deploy
1. In Vercel: **Add New → Project**, import this GitHub repo.
2. Set **Root Directory** to `services/advice-api`. Framework preset: **Other**.
3. Environment variables:
   - `GEMINI_API_KEY` — from Google AI Studio (required)
   - `GEMINI_MODEL` — optional, defaults to `gemini-2.0-flash`
   - `ALLOWED_ORIGINS` — optional, defaults to `https://ap-digital.ca,https://www.ap-digital.ca`
4. Deploy, then put the project URL (e.g. `https://advice-api.vercel.app`) in
   `src/advice/config.ts` → `ADVICE_API_URL`.
