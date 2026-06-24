'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { cn, label } from '@/lib/utils';
import {
  LayoutDashboard, PenTool, Zap, ListTodo, GitBranch, Users, CalendarDays, Inbox, Activity,
  Shield, Settings, Moon, Sun, LogOut, Menu, X, Layers,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Gösterge Paneli', icon: LayoutDashboard },
  { href: '/dashboard/boards', label: 'Tasarım Dosyaları', icon: PenTool },
  { href: '/dashboard/sprints', label: 'Versiyonlar', icon: Zap },
  { href: '/dashboard/triage', label: 'İnceleme Inbox', icon: Inbox },
  { href: '/dashboard/issues', label: 'Çerçeveler', icon: ListTodo },
  { href: '/dashboard/cycle-heatmap', label: 'Token Drift Radarı', icon: Activity },
  { href: '/dashboard/dependencies', label: 'Bileşen Etki Radarı', icon: GitBranch },
  { href: '/dashboard/team', label: 'Ekip', icon: Users },
  { href: '/dashboard/ceremonies', label: 'Tasarım Review', icon: CalendarDays },
  { href: '/dashboard/audit', label: 'Denetim İzi', icon: Shield },
  { href: '/dashboard/settings', label: 'Ayarlar', icon: Settings },
];

export function SidebarNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => mobile && setMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
              active
                ? 'bg-mint/12 text-mint-light shadow-sm ring-1 ring-mint/30'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Icon className={cn('h-4 w-4', active && 'text-mint-light')} />
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-basalt lg:flex">
        <div className="border-b border-border p-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint text-primary-foreground shadow-mint-glow">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-lg font-extrabold tracking-tight text-foreground">CanvasForge</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Design Ops</div>
            </div>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4"><NavLinks /></nav>
        <div className="border-t border-border p-4">
          <div className="mb-3 truncate text-xs text-muted-foreground">{user?.name} · {user?.role ? label('userRole', user.role) : ''}</div>
          <div className="flex gap-2">
            <button onClick={toggleTheme} className="flex-1 rounded-lg border border-border py-2 text-xs text-muted-foreground transition-colors hover:border-mint/40 hover:text-foreground" aria-label="Tema değiştir">
              {theme === 'dark' ? <Sun className="mx-auto h-4 w-4" /> : <Moon className="mx-auto h-4 w-4" />}
            </button>
            <button onClick={() => { logout(); router.push('/login'); }} className="flex-1 rounded-lg border border-border py-2 text-xs text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive" aria-label="Çıkış yap">
              <LogOut className="mx-auto h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border bg-basalt/80 px-4 backdrop-blur lg:hidden">
          <Link href="/dashboard" className="font-display font-extrabold text-foreground">CanvasForge</Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menü">{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </header>
        {mobileOpen && (
          <nav className="border-b border-border bg-basalt p-3 lg:hidden"><NavLinks mobile /></nav>
        )}
        <main className="grid-texture flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
