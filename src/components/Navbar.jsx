import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="sm:mycontainer flex justify-between items-center px-4 py-5 h-14 w-full">
                <div className="logo font-bold text-2xl">
                    <span className='text-green-600'> &lt; </span>
                        Pass
                    <span className='text-green-600'>Man / &gt; </span>
                </div>
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold' href="/">Home</a>
                        <a className='hover:font-bold' href="#">About</a>
                        <a className='hover:font-bold' href="#">Contact</a>
                    </li>
                </ul> */}

                <button className='text-white cursor-pointer bg-stone-950 rounded-full flex justify-center px-2'>
                    <img className='invert p-3 w-14' src="/icons/github.svg" alt="github" />
                    <span className='py-4 font-semibold'>GitHub</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
