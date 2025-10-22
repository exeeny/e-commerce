import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { CartContext } from '@/services/CartContext';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useContext } from 'react';
import { Badge } from './ui/badge';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const {cart_fetched} = useContext(CartContext);
    const cart_length = cart_fetched.reduce((total, item) => total + item.quantity, 0)
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.url === page.url}>
                            <Link href={item.url} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                                {item.title == 'Cart' && <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">{cart_length}</Badge>}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
