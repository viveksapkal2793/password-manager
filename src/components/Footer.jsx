import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 flex flex-col justify-center items-center w-full'>
      <div className="logo font-bold text-2xl">
        <span className='text-green-600'> &lt; </span>
        <span className='text-white'>Pass</span>
        <span className='text-green-600'>Man / &gt; </span>
      </div>
      <div className='text-white flex justify-center items-center'>
        Created with <img className='w-5 h-5 mx-2 my-1' src="icons/heart.png" alt="love" /> by Vivek
      </div>
    </div>
  )
}

export default Footer
