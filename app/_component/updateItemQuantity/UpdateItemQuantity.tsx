"use client"
import { Button } from '@/components/ui/button'
import React, { useContext, useState } from 'react'
import { CartContext } from '../context/cartContext';

export default function UpdateItemQuantity({ countItem, itemId, userToken }: { countItem: number, itemId: string, userToken: string }) {
    const [loading, setLoading] = useState(false);
   
    const { setCartData } = useContext(CartContext);

    async function update(newCount: number) {
        if (newCount < 1) return;

        try {
            setLoading(true);
            const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: userToken
                },
                body: JSON.stringify({
                    count: newCount
                })
            });

            const data = await response.json();

            if (response.ok) {
                
                setCartData(data);
            }
        } catch (error) {
            console.error("Update Error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center mt-3">
            
            <Button 
                disabled={loading || countItem <= 1} 
                onClick={() => update(countItem - 1)}
                className='bg-white text-black border border-gray-300 w-8 h-8 hover:text-white flex items-center justify-center'
            >
                -
            </Button>
            
            
            <span className="mx-3 min-w-5 text-center">
                {loading ? (
                    <span className="animate-pulse text-gray-400">...</span>
                ) : (
                    countItem
                )}
            </span>
            
            
            <Button 
                disabled={loading} 
                onClick={() => update(countItem + 1)}
                className='bg-white text-black border border-gray-300 w-8 h-8 hover:text-white flex items-center justify-center'
            >
                +
            </Button>
        </div>
    );
}