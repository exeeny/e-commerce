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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'cart',
        href: '/cart',
    },
];

export default function Cart({ cart, total }: any) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='cart' />
            {(cart.length == 0) ? <h1 className='text-5xl mx-auto mt-4'>Cart is empty!</h1> : <>
                <div className='flex flex-col items-center p-3 gap-2'>
                    {cart.map((item: any) => (
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
                                        <Link href={route('remove_from_cart')} method='post' data={{ product_id: item.product.id }}>
                                            <Button>
                                                -
                                            </Button>
                                        </Link>

                                        <h1>{item.quantity}</h1>
                                        <Link href={route('add_to_cart')} method='post' data={{ product_id: item.product.id }}>
                                            <Button>
                                                +
                                            </Button>
                                        </Link>

                                    </div>
                                </CardFooter>
                            </Card>
                          
                    ))}

                    <div className="flex flex-col m-2 items-center gap-1">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">total: ${total.toFixed(2)}</p>
                        <p className="text-lg font-semibold text-red-500">
                            {total > auth.user.balance && 'not enough balance!!!'}
                        </p>
                    </div>

                    <div className="flex justify-center gap-4 flex-wrap mt-4">
                        <Link href={route('clear_cart')} method="delete">
                            <Button variant='outline'>
                                Clear Cart
                            </Button>
                        </Link>

                        <Link href={route('make_order')} method="post">
                            <Button>
                                Make Order
                            </Button>
                        </Link>

                    </div>
                </div>
            </>
            }

        </AppLayout>
    );
}
