"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  HeartHandshake,
  LayoutDashboard,
  BarChart3,
  Users,
  Baby,
  Mic,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: LayoutDashboard, labelKey: 'dashboard', fallback: 'Dashboard' },
  { href: '/analytics', icon: BarChart3, labelKey: 'analytics', fallback: 'Analytics' },
  { href: '/patients', icon: Users, labelKey: 'patients', fallback: 'Patients' },
  { href: '/anc', icon: Baby, labelKey: 'ancMonitoring', fallback: 'ANC Monitoring' },
  { href: '/voice-entry', icon: Mic, labelKey: 'voiceEntry', fallback: 'Voice Entry' },
];

export function Sidebar() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  
  // Try to use translations, fallback to English if not available
  let t: any;
  try {
    t = useTranslations('Sidebar');
  } catch (error) {
    t = (key: string) => {
      const item = navItems.find(item => item.labelKey === key);
      return item?.fallback || key;
    };
  }
  
  const getAppName = () => {
    try {
      return t('appName');
    } catch {
      return 'ASHAConnect';
    }
  };

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href={`/${locale}`} className="flex items-center gap-2 font-semibold">
            <HeartHandshake className="h-6 w-6 text-primary" />
            <span className="">{getAppName()}</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => {
              const itemPath = `/${locale}${item.href === '/' ? '' : item.href}`;
              const isActive = item.href === '/' ? pathname === `/${locale}` : pathname.startsWith(itemPath);
              
              const getLabel = () => {
                try {
                  return t(item.labelKey as any);
                } catch {
                  return item.fallback;
                }
              };
              
              return (
                <Link
                  key={item.labelKey}
                  href={`/${locale}${item.href}`}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    isActive && 'bg-muted text-primary'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {getLabel()}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
