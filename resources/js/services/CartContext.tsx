import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { router } from '@inertiajs/react';
import { CartItem, ShopInterface } from '@/types';

export const CartContext = createContext({} as ShopInterface);

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart_fetched, setCart] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    const fetchCart = async () => {
        try {
            const res = await axios.get('/fetchCart')
            setCart(res.data.cart.details)
            setTotal(res.data.total)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const addToCart = async (product_id: number, context: string) => {
        try {
            const result = await axios.post('/cart/add', { product_id: product_id })
            setCart(result.data.cart.details)
            setTotal(result.data.total)
            if (context !== 'cart') {
                Swal.fire({
                    title: "Good job!",
                    text: result.data.message,
                    icon: "success"
                });
            }
        } catch (error: any) {
            if (error.status == 401) {
                router.visit(route('login'));
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.alert,
                    icon: 'error',
                    confirmButtonText: 'Cool',
                    theme: 'auto'
                })
            }
        }
    }

    const revomeFromCart = async (product_id: number) => {
        try {
            const result = await axios.post('/cart/remove', { product_id: product_id })
            console.log(result)
            setCart(result.data.cart.details)
            setTotal(result.data.total)
        } catch (error) {
            console.log(error)
        }
    }

    const clearCart = () => {
        router.delete(route('clear_cart'))
        setCart([])
    }

    useEffect(() => {
        fetchCart()
    }, []);

    return (
        <CartContext.Provider value={{
            cart_fetched,
            addToCart,
            revomeFromCart,
            fetchCart,
            clearCart,
            total
        }}>
            {children}
        </CartContext.Provider>
    );
}