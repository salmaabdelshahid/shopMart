"use client";
import { cartI } from "@/interface";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
  cartData: cartI | null;
  setCartData: (value: cartI | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getCart: () => void;
  userToken: string | null;
}>({
  cartData: null,
  setCartData: () => {},
  isLoading: true,
  setIsLoading: () => {},
  getCart: () => {},
  userToken: null,
});

export default function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartData, setCartData] = useState<cartI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  
  const { data: session } = useSession(); 

  
  // @ts-ignore
  const userToken = session?.token || session?.user?.token || null;

  async function getCart() {
    if (!userToken) {
      console.log("Waiting for token...");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: userToken,
          },
        }
      );
      
      const data: cartI = await response.json();
      setCartData(data);
    } catch (err) {
      console.error("Cart Fetch Error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (userToken) {
      getCart();
    }
  }, [userToken]); 

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        isLoading,
        setIsLoading,
        getCart,
        userToken,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}