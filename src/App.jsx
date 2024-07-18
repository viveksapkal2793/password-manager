import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

import './App.css'

function App() {

  return <>
    <Navbar />
    <div className="inset-0 -z-10 h-full w-full items-center m-0 md:px-5 md:py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <Manager />
    </div>
    <Footer />
  </>
}

export default App
