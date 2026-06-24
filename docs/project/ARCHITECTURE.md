# CanvasForge — Mimari

## Genel Bakış

CanvasForge, Figma'nın evrimsel varyantı olarak NestJS + Prisma + PostgreSQL backend ve Next.js App Router frontend ile inşa edilmiştir.

```
┌─────────────┐     NEXT_PUBLIC_API_URL     ┌──────────────────┐
│  Next.js    │ ──────────────────────────► │  NestJS API      │
│  Frontend   │         /api prefix          │  (port 5035)     │
│  (4035)     │ ◄────────────────────────── │                  │
└─────────────┘         JWT Bearer           └────────┬─────────┘
                                                      │
                                                      ▼
                                             ┌──────────────────┐
                                             │  PostgreSQL      │
                                             │  (Prisma ORM)    │
                                             └──────────────────┘
```

## Veritabanı İlişkileri

```
Organization ──┬── Board (Design File) ── Column ── Issue (Frame) ──┬── Comment
               │                                                    ├── IssueLabel ── Label (Token Category)
               ├── TeamMember                                         ├── Dependency (component instance link)
               ├── Sprint (Version) ── SprintIssue                    └── Ceremony (Design Review)
               ├── TriageRule (Review Rules)
               └── AuditLog
```

## Backend Modülleri

| Modül | Sorumluluk |
|-------|------------|
| `auth` | JWT login/register, @HttpCode(200) login |
| `triage` | **Mutasyon 1:** İnceleme inbox, drift kümeleme, review kuralları |
| `cycle-analytics` | **Mutasyon 2:** Token drift heatmap, çözüm süresi forecast |
| `dependencies` | **Mutasyon 3:** Component etki radar, blast-radius |
| `boards` | Tasarım dosyası yönetimi |
| `issues` | Çerçeve/bileşen kartları |
| `sprints` | Design versiyon planlama |
| `organizations` | Workspace CRUD, plan tier limits |
| `settings` | Org ayarları, AI drift tarama kredileri |
| `dashboard` | Design ops KPI istatistikleri |

## API Endpoints (Mutasyonlar)

| Endpoint | Açıklama |
|----------|----------|
| `GET /api/triage/inbox` | Token drift inceleme kuyruğu |
| `GET /api/cycle-analytics/heatmap` | Drift severity heatmap |
| `GET /api/dependencies/radar` | Component etki grafiği |
| `GET /api/dependencies/blast-radius/:id` | Master değişiklik cascade etkisi |
| `GET /api/health` | Sağlık kontrolü |

## Tasarım Sistemi

Stitch API project `2041838731605271124` — **Mint & Blueprint**:
- Primary: `#0ACF83`
- Secondary: `#1ABCFE`
- Dark: `#1E1E1E`
- Inter + JetBrains Mono

## Port Yapılandırması

| Servis | Port |
|--------|------|
| Backend | 5035 |
| Frontend | 4035 |
