import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Divide } from 'lucide-react';
import { Product } from '@/types';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';


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

    const addToCart = async (id: number) => {
        try {
            const result = await axios.post('/cart/add', {
                product_id: id
            })
            Swal.fire({
                title: "Success!",
                text: "Product added to cart!",
                icon: "success"
              });
            

            
        } catch (error: any) {
            if (error.isAxiosError){
                const errorMessage = error.response.data.message;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorMessage + '!',
                  });
            }
        }

    }
  

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={product.name} /> 
            <div className="m-4 p-4 rounded-lg shadow-md mx-auto flex flex-col bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 max-w-2xl">
    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
        {product.name}
    </h1>

    

    <img onClick={() => setOpen(true)} src={product.image} alt={product.name} className="rounded-md mb-4 border border-gray-200 dark:border-neutral-700" />
    
    <Lightbox
    open={open}
    close={() => setOpen(false)}
    slides={[{ src: product.image }]}
  />

    <p className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
        {product.description}
    </p>

    <p className="text-lg font-light tracking-tight text-gray-900 dark:text-white mb-4">
        {product.stock} in stock
    </p>

    <div className="flex justify-between items-center mt-auto">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${product.price}
        </span>

        <button onClick={() => addToCart(product.id)} 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add to cart
        </button>
    </div>
</div>


        </AppLayout>
    );
}
