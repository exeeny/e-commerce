import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    balance: number;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}


export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    created_at: string;
    updated_at: string;
}

interface OrderDetail {
    id: number;
    product_id: number;
    quantity: number;
    order_id: number;
    created_at: string;
    updated_at: string;
    product: Product;
}

interface Order {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    details: OrderDetail[];
}

interface CartItem {
    id: number;
    quantity: number;
    product: Product;
    product_id: number;
} 

export interface ShopInterface {
    cart_fetched: CartItem[]; 
    addToCart: (product_id: number, context:string) => void;
    revomeFromCart: (product_id: number) => void;
    fetchCart: () => void;
    total: number; 
    clearCart: () => void;
}