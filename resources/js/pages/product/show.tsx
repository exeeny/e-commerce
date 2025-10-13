import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Product } from '@/types';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Button } from '@/components/ui/button';
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
        title: 'Product Page',
        href: '/home',
    },
];

interface HomeProps {
    product: Product;
}

export default function Show({ product }: HomeProps) {
    const [open, setOpen] = useState(false);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={product.name} />
            <div className='flex items-center justify-center flex-1'>
                <Card>
                    <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                        <CardDescription>{product.stock} in stock</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <img onClick={() => setOpen(true)} src={product.image} alt={product.name} className="rounded-md mb-4 border border-gray-200 dark:border-neutral-700" />
                        <Lightbox
                            open={open}
                            close={() => setOpen(false)}
                            slides={[{ src: product.image }]}
                        />
                    </CardContent>
                    <CardFooter className='flex justify-between items-center '>
                        <p> ${product.price}</p>
                        <Link href={route('add_to_cart')} method='post' data={{ product_id: product.id }}>
                            <Button>
                                Add to cart
                            </Button>

                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
