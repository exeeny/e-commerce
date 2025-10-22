import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData, type CartItem } from '@/types';
import { Head, usePage, router, Link } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import { useContext, useEffect } from 'react';
import { CartContext } from '@/services/CartContext';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'cart',
        href: '/cart',
    },
];

export default function Cart() {
    
    const {cart_fetched, addToCart, revomeFromCart,total, clearCart} = useContext(CartContext);
    const { auth } = usePage<SharedData>().props;
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='cart' />
           
            {cart_fetched.length === 0 ? <div className='flex flex-col gap-3'> <h1 className='text-5xl mx-auto mt-4'>Cart is empty!</h1>
            <Link href={route('home')}>
                                Return to shop
                        </Link>
            </div> : <>
                <div className='flex flex-col items-center p-3 gap-2'>
                    
                    {cart_fetched.map((item: any) => (
                            <Card className=''>
                                <CardHeader>
                                    <CardTitle>{item.product.name}</CardTitle>
                                    <CardDescription>{item.product.stock} in stock</CardDescription>    
                                </CardHeader>
                                <CardContent>
                                    <img className="rounded-md border" src={item.product.image} alt="" />
                                </CardContent>
                                <CardFooter className="flex justify-between items-center mt-4">
                                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">${item.product.price}</h1>
                                    <div className="flex items-center gap-2">
                                        
                                            <Button onClick={()=>revomeFromCart(item.product.id)}>
                                                -
                                            </Button>
                                        
                                        <h1>{item.quantity}</h1>
                                            <Button onClick={() => addToCart(item.product.id, 'cart')}>
                                                +
                                            </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                          
                    ))}

                    <div className="flex flex-col m-2 items-center gap-1">
                        
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">total: ${total}</p>
                        <p className="text-lg font-semibold text-red-500">
                            {total > auth.user.balance && 'not enough balance!!!'}
                        </p>
                    </div>

                    <div className="flex justify-center gap-4 flex-wrap mt-4">
                        <Button onClick={clearCart}>
                                Clear Cart
                        </Button>

                        <Link href={route('make_order', {total: total})} method="post">
                                Make Order
                        </Link>
                        

                    </div>
                </div>
            </>
            }

        </AppLayout>
    );
}
