import React from 'react'

const Navbar = () => {
  return (
   <nav className='flex justify-around bg-blue-950 text-white py-3'>
    <div className="logo">
        <span className='font-bold text-xl mx-8'>WeTask</span>
    </div>
    <ul className="flex gap-10 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
    </ul>
   </nav>
  )
}

export default Navbar
