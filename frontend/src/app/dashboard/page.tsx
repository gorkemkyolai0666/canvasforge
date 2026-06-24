'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Kanban, Zap, ListTodo, GitBranch, TrendingUp, Users } from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { LoadingSpinner, ErrorState } from '@/components/states';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { formatDate, label, statusBadgeVariant } from '@/lib/utils';

interface DashboardStats {
  activeBoards: number;
  activeSprint: string | null;
  openIssues: number;
  completedThisWeek: number;
  teamVelocity: number;
  teamMembers: number;
  blockedIssues: number;
  recentActivity?: { id: string; action: string; entity: string; user: string; createdAt: string }[];
  upcomingCeremonies?: { id: string; type: string; scheduledAt: string }[];
}

const demoStats: DashboardStats = {
  activeBoards: 4,
  activeSprint: 'Sprint 12 — Ödeme Modülü',
  openIssues: 47,
  completedThisWeek: 12,
  teamVelocity: 34,
  teamMembers: 8,
  blockedIssues: 3,
  recentActivity: [
    { id: '1', action: 'update', entity: 'SF-142 Ödeme API entegrasyonu', user: 'Ayşe K.', createdAt: new Date().toISOString() },
    { id: '2', action: 'create', entity: 'SF-143 Webhook retry mekanizması', user: 'Mehmet D.', createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: '3', action: 'update', entity: 'Sprint 12 kapsamı', user: 'Zeynep A.', createdAt: new Date(Date.now() - 7200000).toISOString() },
  ],
  upcomingCeremonies: [
    { id: '1', type: 'standup', scheduledAt: new Date(Date.now() + 86400000).toISOString() },
    { id: '2', type: 'retro', scheduledAt: new Date(Date.now() + 432000000).toISOString() },
  ],
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [usingDemo, setUsingDemo] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    api.dashboard.stats()
      .then((d) => { setStats(d as DashboardStats); setUsingDemo(false); })
      .catch(() => { setStats(demoStats); setUsingDemo(true); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Gösterge Paneli</h1>
          <p className="text-muted-foreground">Sprint, tahta ve ekip operasyon özeti</p>
        </div>
        {usingDemo && (
          <Badge variant="warning">Demo veri — API bağlantısı bekleniyor</Badge>
        )}
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorState onRetry={load} />}

      {stats && !loading && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Aktif Tahta" value={stats.activeBoards} description="Workspace genelinde" icon={<Kanban className="h-5 w-5" />} />
            <StatCard title="Açık Görev" value={stats.openIssues} description={`${stats.blockedIssues} engellenmiş`} icon={<ListTodo className="h-5 w-5" />} mono />
            <StatCard title="Ekip Velocity" value={stats.teamVelocity} description="Son 3 sprint ort." icon={<TrendingUp className="h-5 w-5" />} mono />
            <StatCard title="Ekip Üyesi" value={stats.teamMembers} description={`${stats.completedThisWeek} bu hafta tamamlandı`} icon={<Users className="h-5 w-5" />} mono />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg"><Zap className="h-4 w-4 text-mint-light" /> Aktif Sprint</CardTitle>
                <Button variant="outline" size="sm" asChild><Link href="/dashboard/sprints">Tüm Döngüler</Link></Button>
              </CardHeader>
              <CardContent>
                {stats.activeSprint ? (
                  <div className="rounded-lg border border-mint/30 bg-mint/5 p-4">
                    <p className="font-display text-lg font-semibold">{stats.activeSprint}</p>
                    <p className="mt-1 text-sm text-muted-foreground">Velocity: <span className="font-mono text-mint-light">{stats.teamVelocity} SP</span></p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Aktif sprint yok. Yeni sprint oluşturun.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><GitBranch className="h-4 w-4 text-mint-light" /> Engellenen Görevler</CardTitle></CardHeader>
              <CardContent>
                <p className="font-mono text-3xl font-bold text-warning">{stats.blockedIssues}</p>
                <p className="mt-1 text-sm text-muted-foreground">Bağımlılık çözümü gerekiyor</p>
                <Button variant="link" className="mt-3 px-0" asChild><Link href="/dashboard/dependencies">Bağımlılıkları Gör</Link></Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-lg">Son Aktiviteler</CardTitle></CardHeader>
              <CardContent>
                {!stats.recentActivity?.length ? (
                  <p className="text-sm text-muted-foreground">Henüz aktivite yok.</p>
                ) : (
                  <ul className="space-y-3">
                    {stats.recentActivity.map((a) => (
                      <li key={a.id} className="flex items-start justify-between gap-3 text-sm">
                        <div>
                          <span className="font-medium">{a.entity}</span>
                          <span className="text-muted-foreground"> · {a.user}</span>
                        </div>
                        <span className="shrink-0 font-mono text-xs text-muted-foreground">{formatDate(a.createdAt)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg">Yaklaşan Seremoniler</CardTitle></CardHeader>
              <CardContent>
                {!stats.upcomingCeremonies?.length ? (
                  <p className="text-sm text-muted-foreground">Planlanmış seremoni yok.</p>
                ) : (
                  <ul className="space-y-2">
                    {stats.upcomingCeremonies.map((c) => (
                      <li key={c.id} className="flex items-center justify-between gap-2 text-sm">
                        <Badge variant="secondary">{label('ceremonyType', c.type)}</Badge>
                        <span className="font-mono text-xs text-muted-foreground">{formatDate(c.scheduledAt)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <Button variant="outline" size="sm" className="mt-4" asChild><Link href="/dashboard/ceremonies">Seremonileri Yönet</Link></Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
