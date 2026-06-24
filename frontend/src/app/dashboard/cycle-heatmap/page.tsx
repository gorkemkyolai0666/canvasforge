'use client';
import { useEffect, useState } from 'react';
import { Activity, AlertTriangle } from 'lucide-react';
import { LoadingSpinner, EmptyState } from '@/components/states';
import { StatCard } from '@/components/stat-card';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { label } from '@/lib/utils';

interface HeatCell {
  label: string;
  status: string;
  count: number;
  severity: string;
  wipOverload: boolean;
}

export default function CycleHeatmapPage() {
  const [heatmap, setHeatmap] = useState<{
    cells: HeatCell[];
    wipWarnings: Array<{ column: string; current: number; limit: number }>;
  } | null>(null);
  const [forecast, setForecast] = useState<Array<{
    label: string;
    avgCycleDays: number;
    predictedDays: number;
  }> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.cycleAnalytics.heatmap(), api.cycleAnalytics.forecast()])
      .then(([h, f]) => {
        setHeatmap(h);
        setForecast(f.forecasts || f);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const severityColor = (s: string) => {
    if (s === 'critical') return 'bg-destructive/80';
    if (s === 'high') return 'bg-warning/70';
    if (s === 'medium') return 'bg-mint/50';
    return 'bg-muted';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Token Drift Radarı</h1>
        <p className="text-muted-foreground">Token kategorisi × ihlal türü heatmap ve çözüm tahmini</p>
      </div>

      {loading && <LoadingSpinner />}

      {!loading && heatmap && (
        <>
          {heatmap.wipWarnings.length > 0 && (
            <div className="surface-card border-warning/40 p-4">
              <div className="flex items-center gap-2 text-warning">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-semibold">Kontrast İhlali Yoğunluğu</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {heatmap.wipWarnings.map((w) => (
                  <Badge key={w.column} variant="warning">
                    {w.column}: {w.current}/{w.limit}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard title="Heatmap Hücreleri" value={heatmap.cells.length} icon={<Activity className="h-5 w-5" />} mono />
            <StatCard title="WIP Uyarıları" value={heatmap.wipWarnings.length} mono />
          </div>

          <div className="surface-card overflow-x-auto p-4">
            <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Bottleneck Grid</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {heatmap.cells.filter((c) => c.count > 0).map((cell) => (
                <div
                  key={`${cell.label}-${cell.status}`}
                  className={`rounded-lg p-3 text-center ${severityColor(cell.severity)}`}
                >
                  <div className="text-xs font-medium">{cell.label}</div>
                  <div className="text-[10px] opacity-80">{label('issueStatus', cell.status)}</div>
                  <div className="font-mono text-lg font-bold">{cell.count}</div>
                  {cell.wipOverload && <Badge variant="warning" className="mt-1">WIP</Badge>}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!loading && forecast && forecast.length > 0 && (
        <div className="surface-card p-4">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Döngü Süresi Tahmini</h2>
          <div className="space-y-2">
            {forecast.slice(0, 8).map((f) => (
              <div key={f.label} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <span className="font-medium">{f.label}</span>
                <span className="font-mono text-sm text-muted-foreground">
                  {f.avgCycleDays}g → tahmin {f.predictedDays}g
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !heatmap && (
        <EmptyState title="Heatmap verisi yok" description="Issue ve etiket verisi oluşturulduğunda görünecek." />
      )}
    </div>
  );
}
