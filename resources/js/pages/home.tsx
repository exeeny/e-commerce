import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Product } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import ProductCard from '@/components/product-card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/home',
    },
];

export default function Home({ products }: { products: Product[] }) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home" />
            <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {products.map((product) => (
                    <ProductCard product={product} />
                ))}
            </div>

        </AppLayout>
    );
}
