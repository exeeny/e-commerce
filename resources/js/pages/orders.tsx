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

    const clearHistory = async() => {
        try {
            const result = await axios.post('/orders/clear')
            console.log(result.data)
            setOrders([]);
            

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Orders' /> 
            {orders.length == 0 ? <h1 className='text-5xl mx-auto mt-4'>You have not order anything yet!</h1> 
            :
            <div>
    {orders.map((order: any) => (
        <div key={order.id} className="flex flex-col p-4 bg-white dark:bg-neutral-900 shadow rounded-lg m-4 border border-gray-200 dark:border-neutral-800">
            <h1 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order date: {new Date(order.created_at).toLocaleDateString()}
            </h1>

            {order.details.map((detail: any) => (
                <div
                    key={detail.id}
                    className="bg-gray-100 dark:bg-neutral-800 p-4 m-2 flex flex-col items-center rounded-md border border-gray-200 dark:border-neutral-700"
                >
                    <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
                        {detail.product.name}
                    </h1>
                    <img className="h-auto max-w-xs rounded" src={detail.product.image} alt={detail.product.name} />
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-2">
                        Quantity: {detail.quantity}
                    </p>
                </div>
            ))}
        </div>
    ))}

    <div className="flex justify-center mt-6">
        <button
            onClick={clearHistory}
            className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
            Clear Orders History
        </button>
    </div>
</div>

            
            }


            {/* {orders.map((order: any) => 
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
            
            )} */}

        </AppLayout>
    );
}
