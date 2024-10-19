import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      {/* here px-4 in the video */}
      <div className="mycontainer flex justify-between items-center  h-14 py-5 px-4 md:px-40">

        <div className="logo font font-bold text-white text-2xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
          </div>


        <button className='text-white bg-green-700 my-5 mx-2 rounded-full flex justify-between items-center ring-white ring-1'>
          <img className='invert w-10 p-1' src="/icons/github.svg" alt="github logo" />
          <span className='font-bold px-2'>GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar