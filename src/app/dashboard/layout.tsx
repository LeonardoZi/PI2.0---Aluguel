import React from 'react';
import {Header} from '@/components/Header';


export default function DashboardLayout({children}: {children: React.ReactNode;}) {
    return (
        <div className='min-h-screen bg-gray-50'>
            <Header />
            <main className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
                {children}
            </main>
        </div>
    );
}
