import Link from 'next/link';
import { Layers, PenTool, Sparkles, GitBranch, Shield, Palette, ArrowRight, Check } from 'lucide-react';

const features = [
  { icon: Sparkles, title: 'Token Drift İnceleme Inbox', desc: 'Off-token renk, spacing ve tipografi ihlallerini otomatik kümeleme ile önceliklendirin — Figma\'da built-in yok.' },
  { icon: Palette, title: 'Drift Heatmap + Tahmin', desc: 'Dosya × token kategorisi heatmap, severity renkleri ve çözüm süresi forecast — design debt\'i release öncesi yakalayın.' },
  { icon: GitBranch, title: 'Component Blast Radius', desc: 'Master component değişikliğinde cross-file etki alanı önizlemesi ve cascade chain analizi.' },
  { icon: Shield, title: 'WCAG Contrast Matrix', desc: 'Variant state kombinasyonlarında built-in AA/AAA pass-fail matrisi — plugin bağımlılığı yok.' },
  { icon: PenTool, title: 'Collaborative Design Files', desc: 'Tasarım dosyaları, çerçeveler, versiyonlar ve token kütüphanesi tek workspace\'te.' },
  { icon: Layers, title: 'KVKK Uyumlu Denetim İzi', desc: 'Her token değişikliği ve review kararı kayıt altında — kurumsal compliance hazır.' },
];

const plans = [
  { name: 'Başlangıç', price: 'Ücretsiz', period: '', highlight: false, items: ['3 tasarım dosyası', '5 editör', 'Temel drift inbox', 'Token kütüphanesi', 'E-posta desteği'] },
  { name: 'Pro', price: '₺349', period: '/ay', highlight: true, items: ['Sınırsız dosya', '25 editör', 'Drift radar + heatmap', 'İnceleme kuralları', 'AI drift tarama kredileri', 'Öncelikli destek'] },
  { name: 'Kurumsal', price: 'Özel', period: '', highlight: false, items: ['Sınırsız editör', 'Component blast radius', 'SSO/SAML', 'Org analytics lisansı', 'API & webhook', 'Özel hesap yöneticisi'] },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-mint text-primary-foreground">
              <Layers className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-extrabold">CanvasForge</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/pricing" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline">Fiyatlandırma</Link>
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">Giriş</Link>
            <Link href="/register" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-mint-dark">
              Ücretsiz Başla <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="forge-hero">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-medium text-mint-light">
            Figma kalitesinde, token drift intelligence ile
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-surface-foreground sm:text-6xl">
            Türk design system ekipleri için <span className="text-mint-light">drift-aware</span> tasarım ops
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            CanvasForge; token drift radar, inceleme inbox, component blast radius ve WCAG contrast matrix&apos;i
            tek bir premium platformda birleştirir. Figma ve Stripe kalibresinde veri yoğunluğu, tam Türkçe arayüz.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/register" className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-mint-glow hover:bg-mint-dark">
              Ücretsiz Başla <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-base font-semibold text-foreground hover:border-mint/40">
              Fiyatlandırma
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-basalt/50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-3xl font-bold">Figma&apos;yı aşan üç mutasyon</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Built-in drift intelligence, component impact analysis ve accessibility matrix — plugin veya manuel audit gerektirmez.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="surface-card p-6 transition-all hover:border-mint/30 hover:shadow-mint-glow">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-mint/12 text-mint-light">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-3xl font-bold">Basit, şeffaf fiyatlandırma</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((p) => (
              <div key={p.name} className={`surface-card p-8 ${p.highlight ? 'border-mint/40 ring-1 ring-mint/20' : ''}`}>
                {p.highlight && <span className="mb-4 inline-block rounded-full bg-mint/12 px-3 py-1 text-xs font-medium text-mint-light">En Popüler</span>}
                <h3 className="font-display text-xl font-bold">{p.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-extrabold">{p.price}</span>
                  <span className="text-muted-foreground">{p.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-light" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`mt-8 block rounded-lg py-2.5 text-center text-sm font-semibold ${p.highlight ? 'bg-primary text-primary-foreground hover:bg-mint-dark' : 'border border-border hover:border-mint/40'}`}>
                  Başla
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>© 2026 CanvasForge — Tasarım Sistemleri A.Ş. · demo@canvasforge.com.tr</p>
      </footer>
    </div>
  );
}
