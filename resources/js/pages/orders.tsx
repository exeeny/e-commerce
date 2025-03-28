import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Order } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'orders',
        href: '/orders',
    },
];


export default function Order() {

    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async() => {
        try {
            const result = await axios.get('/getOrders')
            console.log(result.data)
            setOrders(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        fetchOrders()
    }, [])



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Orders' /> 
            {orders.map((order: any) => 
            (
              <div className='flex flex-col p-4'>
                 <h1>order by: {new Date(order.created_at).toLocaleDateString()}</h1>
                
                {order.details.map((detail: any) => 
                <div className='bg-gray-100 p-4 m-2 flex flex-col items-center'>
                    <h1 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2'>{detail.product.name}</h1>
                    <img className='h-auto max-w-xs' src={detail.product.image} alt="" />
                    <p className='text-lg font-medium tracking-tight text-gray-900 dark:text-white mb-2'>quantity: {detail.quantity}</p>

                </div>
                
                
                )}

              </div>  
            )
            
            )}
        </AppLayout>
    );
}
