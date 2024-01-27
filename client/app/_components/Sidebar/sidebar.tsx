"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ReceiptText,
  ShoppingBasket,
  Settings,
  Shapes,
} from "lucide-react";
import HeaderContent from "@/components/reusable/headercontent";
const Sidebar = () => {
  return (
    <div className="w-full flex flex-col gap-6 pl-2 py-5">
      <div>
        <h1 className="text-2xl tracking-wide font-semibold">Eccomerce</h1>
      </div>
      <div className="flex flex-col gap-4">
        <HeaderContent icon={<LayoutDashboard />} title="Dashboard" />
        <HeaderContent icon={<ShoppingBasket />} title="Products" />
        <HeaderContent icon={<ReceiptText />} title="Billboard" />
        <HeaderContent icon={<Shapes />} title="Category" />
        <HeaderContent icon={<Settings />} title="Settings" />
      </div>
    </div>
  );
};

export default Sidebar;
