import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Store, ShoppingCart, Package, Wallet, User, UserPlus } from 'lucide-react';
import AppLogo from './app-logo';
import { usePage} from '@inertiajs/react';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';

const mainNavItems: NavItem[] = [
    {
        title: 'Home',
        url: '/',
        icon: Store, 
    },
    {
        title: 'Cart',
        url: '/cart',
        icon: ShoppingCart, 
    },

    {
        title: 'Orders',
        url: '/orders',
        icon: Package, 
    },
];

const footerNavItems_main: NavItem[] = [


    {
            title: 'Login',
            url: '/login',
            icon: User,
        },
        {
            title: 'Sign Up',
            url: 'register',
            icon: UserPlus,
        },

];

const footerNavItems: NavItem[] = [

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
                            <Link href="/home" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            
        <SidebarFooter>
        <AppearanceToggleDropdown className='pl-2' />
        {auth.user ?  <>
        
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
                </>
             : 
                <NavFooter items={footerNavItems_main} className="mt-auto" />
           
            }
            </SidebarFooter> 
        </Sidebar>
    );
}
