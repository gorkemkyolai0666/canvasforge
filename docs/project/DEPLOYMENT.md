# CanvasForge — Dağıtım Kılavuzu

## Canlı URL'ler

| Servis | URL |
|--------|-----|
| Frontend (Vercel) | https://canvasforge.vercel.app |
| Backend API (Railway) | https://canvasforge-backend-production.up.railway.app/api |

## Gerekli GitHub Actions Secrets (Organizasyon Seviyesi)

| Secret | Açıklama |
|--------|----------|
| `GH_PAT` | GitHub repo erişimi |
| `RAILWAY_API_TOKEN` | Railway altyapı provision |
| `VERCEL_TOKEN` | Vercel frontend deploy |
| `JWT_SECRET` | JWT imzalama anahtarı |

> Repository-level deployment secrets yasaktır. Secret isimleri `GITHUB_` ile başlamamalıdır.

## Yerel Geliştirme

```bash
# Backend
cd backend && npm install --legacy-peer-deps
cp .env.example .env  # DATABASE_URL ve JWT_SECRET doldur
npx prisma migrate dev && npx prisma db seed
npm run start:dev  # port 5035

# Frontend
cd frontend && npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:5035/api" > .env.local
npm run dev  # port 4035
```

## Production Credential Bildirimi

Tam production aktivasyonu için `.env.example` dosyalarında tanımlı placeholder'lar:

- `DATABASE_URL` — PostgreSQL (Railway otomatik)
- `JWT_SECRET` — GitHub Actions secret
- `STRIPE_SECRET_KEY` — Ödeme gateway (kısa vade)
- `OPENAI_API_KEY` — AI drift tarama kredileri (orta vade)
- `SMTP_*` — E-posta bildirimleri

## CI/CD

`main` branch push → CI build → `npm run provision` (Railway + Vercel)
