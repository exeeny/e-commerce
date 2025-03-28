import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Divide } from 'lucide-react';
import { Product } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/home',
    },
];

interface HomeProps {
    products: Product[];
}

export default function Home({ products }: HomeProps) {
    console.log(products);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home" />
            <div className='grid grid-cols-3 gap-4'>
                {products.map((product) => (
                    <div className='p-4 rounded-lg bg-amber-50'>
                        <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>{product.name}</h5>
                        
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                        </div>

                    </div>
                ))}
            </div>

        </AppLayout>
    );
}
