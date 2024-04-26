import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-violet-300  text-violet-800 py-2">
        <div className="logo">
            <span className="font-bold text-xl px-5">iTask</span>
        </div>
        <ul className="flex gap-9 mx-12">
            <li className='cursor-pointer hover:text-violet-950'>Home</li>
            <li className='cursor-pointer hover:text-violet-950'>Your TasKs</li>
        </ul>
    </nav>
  )
}

export default Navbar
