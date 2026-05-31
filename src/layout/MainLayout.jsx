import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="relative flex bg-[#050505] min-h-screen text-zinc-100 overflow-hidden">
      <div
        className="absolute pointer-events-none inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.12)_0%,rgba(0,0,0,3)_70%)]"
      />
      <div
        className="absolute pointer-events-none top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] z-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.015)_0%,rgba(0,0,0,0)_80%)]"
      />

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div 
        className={`flex-1 min-w-0 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) z-10
        ${isSidebarOpen ? 'lg:mr-68' : 'lg:mr-24'}`}
      >
        <TopBar />
        <main className=" ps-2 pe-2 pt-0 max-w-[1600px] mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout