'use client'

import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import { FC, ReactNode } from "react"
import { ToastContainer } from 'react-toastify';

interface LayoutProps {
    children: ReactNode;
}

const RootStructure: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col justify-between h-screen">
            <NavBar />
                <div>{ children }</div>
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default RootStructure