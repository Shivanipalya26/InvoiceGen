'use client'

import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import { FC, ReactNode } from "react"

interface LayoutProps {
    children: ReactNode;
}

const RootStructure: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col justify-between h-screen">
            <NavBar />
                <div>{ children }</div>
            <Footer />
        </div>
    )
}

export default RootStructure