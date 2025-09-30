import React from "react";

export function Header(){
    return (
        <header className='bg-white p-4 border-b border-gray-200'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-blue-500 p-2 rounded-md'>
                            <svg className='w-6 h-6 text-white' 
                            fill='none' 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"><path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} d="M4 7v10c0 1.1.9 2 2 2h12a2 2 0 002-2V7M16 3h-8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
                            </svg>
                        </div>
                        <h1 className='text-xl font-semibold text-gray-800'>
                            Aluguel Máquinas
                        </h1>
                    </div>
                </div>
            </header>
    );
}