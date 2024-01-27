"use client";
import { useParams, usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";


export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  

  const pathname = usePathname();
  

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6 ", className)}
      {...props}
    >
      <Link
        href="/"
        className={`text-sm   transition-colors hover:text-primary
        ${pathname ==="/"?"font-medium" :"text-muted-foreground"}
        `}
      >
        Overview
      </Link>
      <Link
        href="/customers"
        className={`text-sm 
        ${pathname=== "/customers" ? "font-medium ": "text-muted-foreground"}
        transition-colors hover:text-primary`}
      >
        Customers
      </Link>
      <Link
        href="/products"
        className={`text-sm 
        ${pathname=== "/products" ? "font-medium ": "text-muted-foreground"}
        transition-colors hover:text-primary`}
      >
        Products
      </Link>
      <Link
        href="/settings"
        className={`text-sm 
        ${pathname=== "/settings" ? "font-medium ": "text-muted-foreground"}
        transition-colors hover:text-primary`}
      >
        Settings
      </Link>
  
    </nav>
  )
}