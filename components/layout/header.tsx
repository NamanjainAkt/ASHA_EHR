"use client";

import {
  CircleUser,
  Menu,
  Mic,
  Search,
  Users,
  BarChart3,
  Baby,
  Wifi,
  WifiOff,
  Languages,
  HeartHandshake,
  LayoutDashboard,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/store/use-app-store';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const mobileNavItems = [
  { href: '/', icon: LayoutDashboard, labelKey: 'dashboard', fallback: 'Dashboard' },
  { href: '/analytics', icon: BarChart3, labelKey: 'analytics', fallback: 'Analytics' },
  { href: '/patients', icon: Users, labelKey: 'patients', fallback: 'Patients' },
  { href: '/anc', icon: Baby, labelKey: 'ancMonitoring', fallback: 'ANC Monitoring' },
  { href: '/voice-entry', icon: Mic, labelKey: 'voiceEntry', fallback: 'Voice Entry' },
];

export function Header() {
  const { isOffline, toggleOffline } = useAppStore();
  const pathname = usePathname();
  const router = useRouter();
  
  // Get locale from pathname or fallback to 'en'
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('Header');
  const tSidebar = useTranslations('Sidebar');

  const handleLanguageChange = (newLocale: string) => {
    // Navigate to the same path with new locale
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'en' || segments[0] === 'hi') {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    router.replace('/' + segments.join('/'));
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t('toggleNav')}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <HeartHandshake className="h-6 w-6 text-primary" />
              <span className="">{tSidebar('appName')}</span>
            </Link>
            {mobileNavItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {tSidebar(item.labelKey as any)}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('searchPlaceholder')}
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <Button variant="outline" size="icon" onClick={toggleOffline} className="hidden sm:inline-flex">
        {isOffline ? <WifiOff className="h-5 w-5 text-destructive" /> : <Wifi className="h-5 w-5 text-green-500" />}
        <span className="sr-only">{t('toggleOffline')}</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="hidden sm:inline-flex">
            <Languages className="h-5 w-5" />
            <span className="sr-only">{t('changeLanguage')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('language')}</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={locale} onValueChange={handleLanguageChange}>
            <DropdownMenuRadioItem value="en">{t('english')}</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="hi">{t('hindi')}</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">{t('userMenu')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{t('settings')}</DropdownMenuItem>
          <DropdownMenuItem>{t('support')}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{t('logout')}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
