import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const MainLayout = () => {
  return (
    <div className="relative flex bg-[#050505] min-h-screen text-zinc-100 overflow-hidden">

      {/* تأثير الـ Radial Gradient البريميوم الخلفي */}
      <div
        className="absolute pointer-events-none inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.12)_0%,rgba(0,0,0,3)_70%)]"
      />

      {/* إضافة إضاءة دائرية ثانية علوية خفيفة لتعزيز العمق */}
      <div
        className="absolute pointer-events-none top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] z-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.015)_0%,rgba(0,0,0,0)_80%)]"
      />

      {/* محتوى اللوحة الرئيسي */}
      <Sidebar />

      {/* قمنا بتغيير الـ mr-20 الثابت ليتوافق مع حركة السايدبار إذا كان مفتوحاً أو مغلقاً */}
      <div className="flex-1 lg:mr-68 transition-all duration-500 ease-out z-10">
        <TopBar />
        <main className="pt-24 p-6 max-w-[1600px] mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
