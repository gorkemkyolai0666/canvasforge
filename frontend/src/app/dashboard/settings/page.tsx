'use client';
import { useEffect, useState } from 'react';
import { Building2, CreditCard, Save, Lock } from 'lucide-react';
import { LoadingSpinner, ErrorState } from '@/components/states';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { label } from '@/lib/utils';
import { useToast } from '@/lib/toast-context';

interface OrgSettings {
  organizationName: string;
  slug: string;
  planTier: string;
  maxBoards: number;
  maxUsers: number;
  currentBoards: number;
  currentUsers: number;
  analyticsEnabled: boolean;
  aiCredits: number;
}

const demoSettings: OrgSettings = {
  organizationName: 'Acme Yazılım',
  slug: 'acme-yazilim',
  planTier: 'pro',
  maxBoards: 999,
  maxUsers: 25,
  currentBoards: 4,
  currentUsers: 8,
  analyticsEnabled: true,
  aiCredits: 42,
};

const planFeatures: Record<string, string[]> = {
  starter: ['3 tahta', '5 kullanıcı', 'Temel kanban', '1 aktif sprint'],
  pro: ['Sınırsız tahta', '25 kullanıcı', 'Velocity planner', 'Bağımlılık grafiği', 'Burndown analitiği'],
  enterprise: ['Sınırsız kullanıcı', 'SSO/SAML', 'KVKK denetim raporları', 'API & webhook', 'White-label'],
};

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<OrgSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [usingDemo, setUsingDemo] = useState(false);
  const [orgName, setOrgName] = useState('');

  const load = () => {
    setLoading(true);
    api.settings.get()
      .then((d) => {
        const s = d as OrgSettings;
        setSettings(s);
        setOrgName(s.organizationName);
        setUsingDemo(false);
      })
      .catch(() => {
        setSettings(demoSettings);
        setOrgName(demoSettings.organizationName);
        setUsingDemo(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (!usingDemo) {
        await api.settings.update({ organizationName: orgName });
      }
      toast('Ayarlar kaydedildi', 'success');
    } catch {
      toast('Kaydetme başarısız', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Ayarlar</h1>
          <p className="text-muted-foreground">Organizasyon ve plan yönetimi</p>
        </div>
        {usingDemo && <Badge variant="warning">Demo veri</Badge>}
      </div>

      {loading && <LoadingSpinner />}
      {!loading && !settings && <ErrorState onRetry={load} />}

      {settings && !loading && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building2 className="h-4 w-4 text-mint-light" /> Organizasyon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="orgName">Organizasyon Adı</Label>
                <Input id="orgName" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input id="slug" value={settings.slug} disabled className="font-mono opacity-70" />
              </div>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="mr-2 h-4 w-4" />{saving ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-mint/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-mint-light" /> Plan: {label('planTier', settings.planTier)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-sm">{label('planTier', settings.planTier)}</Badge>
                {settings.planTier === 'pro' && <span className="font-mono text-sm text-muted-foreground">₺299/kullanıcı/ay</span>}
              </div>
              <ul className="space-y-2 text-sm">
                {(planFeatures[settings.planTier] ?? []).map((f) => (
                  <li key={f} className="text-muted-foreground">✓ {f}</li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-muted/30 p-4">
                <div>
                  <p className="text-xs text-muted-foreground">Tahta Kullanımı</p>
                  <p className="font-mono text-lg font-bold">{settings.currentBoards}/{settings.maxBoards >= 999 ? '∞' : settings.maxBoards}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Kullanıcı</p>
                  <p className="font-mono text-lg font-bold">{settings.currentUsers}/{settings.maxUsers >= 999 ? '∞' : settings.maxUsers}</p>
                </div>
              </div>
              {settings.planTier !== 'enterprise' && (
                <Button variant="secondary" className="w-full">Planı Yükselt</Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Özellik Kapıları</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm">Gelişmiş Analitik</span>
                {settings.analyticsEnabled ? <Badge variant="success">Aktif</Badge> : <Badge variant="outline"><Lock className="mr-1 h-3 w-3" />Pro+</Badge>}
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm">AI Sprint Kredileri</span>
                <span className="font-mono text-sm font-semibold">{settings.aiCredits} kalan</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
