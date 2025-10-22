import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Order } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'orders',
        href: '/orders',
    },
];


export default function Order({ orders }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Orders' />
            {orders.length == 0
                ? <div className='flex flex-col items-center gap-3'>
                    <h1 className='text-4xl mt-4'>You have not order anything yet!</h1>
                    <Link href={route('home')}  className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
                                Return to shop
                </Link>
                </div> 
                
                :
                <div className='p-3'>
                <Accordion type="single" collapsible>
                    {orders.map((order: any) => (
                         <AccordionItem value={order.id}>
                        <AccordionTrigger>Order date: {new Date(order.created_at).toLocaleDateString()}</AccordionTrigger>
                        <AccordionContent className='flex flex-col items-center gap-2'>
                            {order.details.map((detail: any) => (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{detail.product.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className='flex justify-center'>
                                        <img className="rounded" src={detail.product.image} alt={detail.product.name} />
                                    </CardContent>
                                    <CardFooter>
                                        Quantity: {detail.quantity}
                                    </CardFooter>
                                </Card>
                            ))}
                        </AccordionContent>
                        </AccordionItem>
                    ))}
                    <div className="flex justify-center mt-6">
                        <Link href={route('clear_orders')} method='delete'>
                            <Button>
                                Clear Orders History
                            </Button>
                        </Link>
                    </div>
                </Accordion>
                 </div>
            }
        </AppLayout>
    );
}
