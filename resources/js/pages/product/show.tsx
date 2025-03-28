import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Divide } from 'lucide-react';
import { Product } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product Page',
        href: '/home',
    },
];

interface HomeProps {
    product: Product;
}

export default function Show({ product }: HomeProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={product.name} /> 
            <div className='m-4 p-4 rounded-lg shadow-md mx-auto flex flex-col  bg-gray-100'>
                <h1 className='text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>{product.name}</h1>
                <img src={product.image} alt="" />
                <p className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>{product.description}</p>
                <p className='text-lg font-light tracking-tight text-gray-900 dark:text-white'>{product.stock} in stock</p>
                
                <div className="flex justify-between mt-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                                
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                            
                            
                        </div>
                
            </div>
        </AppLayout>
    );
}
