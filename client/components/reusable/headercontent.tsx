import Link from 'next/link';
import React, { ReactElement } from 'react'

interface HeaderContentProps{
    icon: React.ReactNode;
    title:string;
}

const HeaderContent = ({icon,title}:HeaderContentProps) => {
  return (
    <Link
    href={"/"}
    className="flex flex-row gap-2 items-center font-medium p-2
     hover:bg-gray-400 hover:text-gray-800 transition-all rounded-md ">
        {icon} <span>{title}</span>
    </Link>
  )
}

export default HeaderContent