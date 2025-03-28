import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Store, ShoppingCart, Package, Wallet } from 'lucide-react';
import AppLogo from './app-logo';
import { usePage} from '@inertiajs/react';

const mainNavItems: NavItem[] = [
    // {
    //     title: 'Dashboard',
    //     url: '/dashboard',
    //     icon: LayoutGrid,
    // },
    {
        title: 'Home',
        url: '/home',
        icon: Store, 
    },
    {
        title: 'cart',
        url: '/cart',
        icon: ShoppingCart, // Change this to any suitable icon
    },

    {
        title: 'orders',
        url: '/orders',
        icon: Package, // Change this to any suitable icon
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     url: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     url: 'https://laravel.com/docs/starter-kits',
    //     icon: BookOpen,
    // },

    {
        title: 'Wallet',
        url: '/profile/wallet',
        icon: Wallet,
    },

];

export function AppSidebar() {
     const { auth } = usePage<SharedData>().props;
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/profile/wallet" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

        {auth.user && <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>}
            
        </Sidebar>
    );
}
