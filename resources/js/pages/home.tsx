import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Product } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Divide } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/home',
    },
];


export default function Home({ products }: { products: Product[] }) {
    console.log(products);


    const addToCart = async (id: number) => {
        try {
            const result = await axios.post('/cart/add', {
                product_id: id
            })
            alert('Product added to cart!')

            
        } catch (error: any) {
            if (error.isAxiosError){
                const errorMessage = error.response.data.message;
                alert(errorMessage)
            }
        }

    }
  
    

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home" />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2'>
                {products.map((product) => (
                    <div className='p-4 rounded-lg shadow-md'>
                        <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
                            <a href={route('product.show', product.id)}>{product.name}</a>
                            </h5>
                            <a href={route('product.show', product.id)}><img src={product.image} alt="" /></a>
                        
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                            
                                
                                <button onClick={()=> addToCart(product.id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                            
                            
                        </div>

                    </div>
                ))}
            </div>

        </AppLayout>
    );
}
