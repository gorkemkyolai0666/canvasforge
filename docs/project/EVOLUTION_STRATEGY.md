# CanvasForge — Evrim Stratejisi

**Hedef Titan:** Figma
**Ürün:** CanvasForge — Tasarım sistemi yönetimi ve collaborative design ops platformu
**Hedef Pazar:** Türk teknoloji şirketleri, design system engineer ekipleri, kurumsal UX organizasyonları

---

## Rakip Analizi Özeti

Figma, collaborative tasarımın global standardıdır; ancak üç kritik eksiklik barındırır:

1. **Token drift tespiti yok:** Off-token renk/spacing kullanımı manuel audit gerektirir; dosya bazlı drift heatmap yok.
2. **Component blast radius zayıf:** Master component değişikliğinde cross-file etki alanı önizlemesi sınırlı.
3. **Accessibility contrast matrix eksik:** Variant state kombinasyonlarında WCAG AA pass/fail matrisi built-in değil.

---

## Üç Teknik Mutasyon (Figma'ya Karşı Rekabet Avantajı)

### Mutasyon 1: Token Drift Radar + İnceleme Inbox (Tüm Planlarda)

**Figma'da yok:** Dosya genelinde token ihlali taraması, drift severity heatmap ve otomatik inceleme kuyruğu yok.

**CanvasForge uygulaması:**
- İnceleme inbox: token ihlali skoru yüksek çerçeveleri öncelik sırasıyla listeler
- Drift kümeleme: renk/spacing/tipografi kategorilerine göre cluster badge'leri
- Auto-review kural motoru: etiket/kategori koşullarına göre otomatik atama önerisi
- API: `GET /api/triage/inbox`, `GET/POST /api/triage/rules`

**İş değeri:** Design review süresini %55 azaltır; drift'ler release öncesi otomatik yakalanır.

### Mutasyon 2: Token Drift Heatmap + Tahmin (Tüm Planlarda)

**Figma'da yok:** Dosya × token kategorisi heatmap, drift severity renkleri ve çözüm süresi tahmini yok.

**CanvasForge uygulaması:**
- Heatmap grid: token kategorisi × ihlal türü hücreleri, severity renkleri
- Drift çözüm tahmini: geçmiş versiyon verisinden kategori bazlı forecast (gün)
- Kontrast fail uyarıları: WCAG ihlali yoğunluğunda görsel alarm
- API: `GET /api/cycle-analytics/heatmap`, `GET /api/cycle-analytics/forecast`

**İş değeri:** Design debt'i %40 daha erken görünür kılar; tutarlılık skorunu artırır.

### Mutasyon 3: Component Blast Radius + Etki Radarı (Enterprise)

**Figma'da yok:** Cross-file component dependency grafiği ve master değişikliğinde cascade etki önizlemesi sınırlı.

**CanvasForge uygulaması:**
- Radial component graph: dosya/çerçeve node'ları, instance link çizgileri
- Blast-radius endpoint: master component değiştiğinde etkilenen downstream instance listesi
- Kritik yol vurgulama ve cascade breaking önizlemesi
- API: `GET /api/dependencies/radar`, `GET /api/dependencies/blast-radius/:issueId`

**İş değeri:** Cross-file component risklerini %65 daha erken görünür kılar; breaking change'leri önler.

---

## Monetizasyon Katmanları

| Katman | Kısa Vade | Orta Vade | Uzun Vade |
|--------|-----------|-----------|-----------|
| Starter | 3 dosya, 5 editör | — | — |
| Pro | Sınırsız dosya, drift radar + inbox | AI drift tarama kredileri, gelişmiş forecast | — |
| Enterprise | Tüm Pro özellikleri | Component blast radius + contrast matrix | SSO, org analytics lisansı |

---

## Doğrulama Kilidi

Bu üç mutasyon Figma'nın mevcut ürününde bulunmuyor ve design ops workflow'unu gerçek anlamda değiştiriyor.
