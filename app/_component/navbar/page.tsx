"use client"
import React, { useContext } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { Loader, Loader2, LoaderIcon, Menu, ShoppingCartIcon, UserIcon } from 'lucide-react'
import { CartContext } from '../context/cartContext'
import { useSession, signOut  } from 'next-auth/react'

export default function Navbar() {
   const {cartData,isLoading}=useContext(CartContext);
   const session = useSession()
   
  return <>
  <nav className=' bg-gray-100 shadow p-4 sticky top-0 z-50'>
    <div className="container mx-auto flex justify-between items-center">
      {/* Logo */}
      <h1 className='text-2xl font-semibold'>
        <Link href={"/"}>ShopMart</Link>
      </h1>

      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/products">Products</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/brands">Brands</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/categories">Categories</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Actions (User & Cart) & Mobile Toggle */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="outline-none">
                <UserIcon className="cursor-pointer" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {
                  session.status=="authenticated"?
                  <>
                  <DropdownMenuItem onClick={()=>signOut({
                    callbackUrl : "/login"
                  })}>LogOut</DropdownMenuItem>
                  </>: 
                  <>
                  <Link href={"/login"}><DropdownMenuItem>Login</DropdownMenuItem></Link>
                  <Link href={"/register"}><DropdownMenuItem>Register</DropdownMenuItem></Link>
                  </>
                }
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {
            session.status=="authenticated"&&<>
            <Link href={"/cart"} className='ml-1 relative inline-flex items-center'>
              <ShoppingCartIcon></ShoppingCartIcon>
              <Badge className='w-5 h-5 absolute -top-2 -right-3 flex justify-center items-center p-0'>
                {isLoading ? <Loader2 className='w-3 h-3 animate-spin text-current' />: cartData?.numOfCartItems}
              </Badge>
            </Link>
            </>
          }
        </div>

        {/* Mobile Menu Dropdown (Simple implementation using current DropdownMenu for consistency) */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1">
                <Menu className="w-6 h-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <Link href="/products"><DropdownMenuItem>Products</DropdownMenuItem></Link>
              <Link href="/brands"><DropdownMenuItem>Brands</DropdownMenuItem></Link>
              <Link href="/categories"><DropdownMenuItem>Categories</DropdownMenuItem></Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  </nav>
  </>
}