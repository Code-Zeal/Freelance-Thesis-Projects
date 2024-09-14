// pages/Contact.jsx
import React from 'react';
import Iframe from 'react-iframe'
import { Link } from 'react-router-dom';
const Puzzle = () => {

  return (
    <div className='relative'>
      <Link to={"/menu"} className='absolute z-[9999] top-[50vh] px-6 py-2 text-4xl font-bold rounded-xl left-[1vw] bg-[#ff3535] text-white border-[0.3vw] border-[#830404]'>Salir</Link>
    <iframe   
    className='absolute z-50 top-[0vh] h-[100vh] w-[100vw] left-[0vw]'
    src="https://main--puzzlespectrowebpage.netlify.app/" ></iframe>
    </div>
  )
};

export default Puzzle;