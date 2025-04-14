import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData, type CartItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'cart',
        href: '/cart',
    },
];


export default function Cart() {

    const { auth } = usePage<SharedData>().props;

    const [cart, setCart] = useState<CartItem[]>([])
    const [total, setTotal] = useState<number>(0);

    const fetchCart = async () => {
        try {
            const result = await axios.get('/getCart')
            setCart(result.data.cart)
            setTotal(result.data.total)
            console.log(result.data);


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const addToCart = async (id: number) => {
        try {
            const result = await axios.post('/cart/add', {
                product_id: id
            })


            setCart((prevCart) =>
                prevCart.map((cartItem) =>
                    cartItem.product_id === id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            );

            const product = cart.find((item) => item.product_id === id);
            if (product) {
                setTotal(total + product.product.price);
            }

            


        } catch (error: any) {
            if (error.isAxiosError) {
                const errorMessage = error.response.data.message;

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorMessage + '!',
                });
            }
        }

    }


    const removeFromCart = async (id: number) => {
        try {
            const result = await axios.post('/cart/remove', {
                product_id: id
            })


            setCart((prevCart) =>
                prevCart
                    .map((cartItem) =>
                        cartItem.product_id === id
                            ? { ...cartItem, quantity: cartItem.quantity - 1 }
                            : cartItem
                    )
                    .filter((cartItem) => cartItem.quantity > 0) // Remove items where quantity is 0

            );
            const product = cart.find((item) => item.product_id === id);
            if (product) {
                setTotal(total - product.product.price);
            }

        } catch (error) {
            console.log(error)

        }
    }

    const confirm = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make order!"
          }).then((result) => {
            if (result.isConfirmed) {
                makeOrder();
            }
          });
    }


    const makeOrder = async () => {

        try {
            const result = await axios.post('/order/make')
            console.log(result)
            Swal.fire({
                title: "Good job!",
                text: result.data.message,
                icon: "success"
              });
            router.visit('/orders');


        } catch (error: any) {
            if (error.isAxiosError) {
                const errorMessage = error.response.data.message;
                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: errorMessage + '!',
                                  });
            }
        }
    }


    const clearCart = async () => {
        try {
            const result = await axios.post('/cart/clear')
            console.log(result.data)
            setCart([])

        } catch (error) {
            console.log(error)
        }
    }




    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='cart' />

            {(cart.length == 0) ? <h1 className='text-5xl mx-auto mt-4'>Cart is empty!</h1> : <>
    <div>
        {cart.map((item: any) => (
            <div
                key={item.product_id}
                className="bg-blue-50 dark:bg-neutral-900 max-w-2xl p-4 mx-auto m-4 rounded-lg shadow border border-blue-100 dark:border-neutral-800"
            >
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
                        {item.product.name}
                    </h1>
                    <img className="h-auto max-w-xs rounded-md border border-gray-200 dark:border-neutral-700" src={item.product.image} alt="" />
                </div>

                <div className="flex justify-between items-center mt-4">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">${item.product.price}</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => removeFromCart(item.product_id)}
                            className="bg-white dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-800 dark:text-white font-semibold py-2 px-4 border border-gray-400 dark:border-neutral-600 rounded shadow"
                        >
                            -
                        </button>
                        <h1 className="text-lg mt-2 text-gray-800 dark:text-white">{item.quantity}</h1>
                        <button
                            onClick={() => addToCart(item.product_id)}
                            className="bg-white dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-800 dark:text-white font-semibold py-2 px-4 border border-gray-400 dark:border-neutral-600 rounded shadow"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        ))}

        <div className="flex flex-col m-2 items-center gap-1">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">total: ${total.toFixed(2)}</p>
            <p className="text-lg font-semibold text-red-500">
                {total > auth.user.balance && 'not enough balance!!!'}
            </p>
        </div>

        <div className="flex justify-center gap-4 flex-wrap mt-4">
            <button
                onClick={clearCart}
                className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
                Clear Cart
            </button>
            <button
                onClick={confirm}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Make Order
            </button>
        </div>
    </div>
</>
}


        </AppLayout>
    );
}
