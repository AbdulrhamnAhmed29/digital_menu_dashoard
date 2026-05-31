import { useState, useEffect, useRef } from 'react'
import { Menu, LogOut, LayoutDashboard, Layers, ShoppingCart, Zap, DollarSign, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useLogout } from '../features/auth'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false) 
    const sidebarRef = useRef(null)
    const logout = useLogout()
    const location = useLocation()

    const menuItems = [
        { path: '/dashboard', label: 'الإحصائيات', icon: LayoutDashboard },
        { path: '/categories', label: 'إدارة الفئات', icon: Layers },
        { path: '/products', label: 'إدارة المنتجات', icon: ShoppingCart },
        { path: '/offers', label: 'إدارة العروض', icon: Zap },
        { path: '/finance', label: 'إدارة الأسعار', icon: DollarSign },
    ]

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    useEffect(() => {
        setIsOpen(false)
    }, [location.pathname])

    const isActive = (path) => location.pathname === path

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-opacity duration-300 animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-10 right-4 z-30 p-3 bg-zinc-950/80 border border-white/10 text-white rounded-xl shadow-2xl backdrop-blur-md hover:bg-zinc-900 transition-all lg:hidden"
            >
                <Menu size={22} />
            </button>

            <div
                ref={sidebarRef}
                dir="rtl"
                className={`
                fixed bottom-0 left-0 right-0 rounded-t-[2.5rem] border-t border-white/[0.08]
                lg:top-0 lg:right-0 lg:left-auto lg:h-screen lg:rounded-none lg:border-t-0 lg:border-l lg:max-h-screen
                
                ${isOpen ? 'translate-y-0 lg:w-68 lg:translate-x-0' : 'translate-y-full lg:translate-y-0 lg:w-24 lg:translate-x-0'} 
                
                /* استخدمنا cubic-bezier مخصص هنا عشان يعطي مرونة ونعومة فائقة في الفتح والقفل */
                bg-gradient-to-b from-zinc-950 via-neutral-950 to-zinc-950 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col z-50 
                shadow-[0_-10px_40px_rgba(0,0,0,0.9)] lg:shadow-[0_0_50px_rgba(0,0,0,0.8)]`}
            >
                <div className="w-12 h-1 bg-zinc-800 rounded-full mx-auto mt-3 block lg:hidden" />

                <div className="p-4 h-20 border-b border-white/[0.06] flex items-center justify-between bg-black/20 mt-2 lg:mt-0">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-11 h-11 flex-shrink-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-1.5 border border-white/10 shadow-inner">
                            <img
                                src="/images/logo.png"
                                alt="بيتزا كينج لوجو"
                                className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(251,146,60,0.2)]"
                            />
                        </div>
                        {/* أنيميشن ناعم لاسم اللوجو يختفي ويظهر بالـ Opacity والـ Width بالتوازي */}
                        <div className={`text-right whitespace-nowrap transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 max-w-[200px]' : 'lg:opacity-0 lg:max-w-0 lg:pointer-events-none'}`}>
                            <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-white via-zinc-200 to-zinc-400 text-base tracking-wide leading-tight">بيتزا كينج</p>
                            <p className="text-[10px] font-medium text-amber-500/80 uppercase tracking-widest mt-0.5">The King Dashboard</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className={`p-2 hover:bg-white/5 text-zinc-500 hover:text-white rounded-xl transition-all duration-300 border border-transparent hover:border-white/10 ${!isOpen && 'lg:hidden'}`}
                    >
                        <X size={18} />
                    </button>
                </div>

                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="hidden lg:flex p-3 mx-auto mt-6 bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-all duration-300 shadow-lg"
                        title="توسيع القائمة"
                    >
                        <Menu size={20} />
                    </button>
                )}

                {/* المحتوى من غير أي سكرول */}
                <nav className="flex-1 p-5 space-y-2.5">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.path)
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-300 relative group overflow-hidden
                                ${active
                                        ? 'bg-gradient-to-l from-white/[0.08] via-white/[0.03] to-transparent text-white border border-white/[0.12]'
                                        : 'text-zinc-400 hover:bg-white/[0.03] hover:text-white border border-transparent hover:border-white/[0.05]'
                                    }`}
                                title={!isOpen ? item.label : ''}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/[0.02] to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {active && (
                                    <span className="absolute right-0 top-1/4 bottom-1/4 w-[3px] bg-gradient-to-b from-amber-400 to-orange-500 rounded-l-full shadow-[0_0_15px_#f59e0b]" />
                                )}

                                <div className={`flex items-center justify-center transition-transform duration-300 ${active ? 'scale-105' : 'group-hover:scale-110'}`}>
                                    <Icon size={20} className={`${active ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-zinc-400'}`} />
                                </div>

                                {/* الـ Label بيختفي ويظهر بـ Fade و Slide حركي مريح جداً */}
                                <span className={`text-sm font-medium tracking-wide transition-all duration-500 ease-in-out lg:block ${isOpen ? 'opacity-100 max-w-[150px] translate-x-0' : 'lg:opacity-0 lg:max-w-0 lg:overflow-hidden lg:translate-x-2'} ${active ? 'font-semibold text-white' : 'text-zinc-400'}`}>
                                    {item.label}
                                </span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-5 border-t border-white/[0.06] bg-black/10 mb-4 lg:mb-0">
                    <button
                        onClick={logout}
                        className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl border border-red-500/10 bg-red-950/[0.08] text-red-400/90 
                        hover:bg-gradient-to-l hover:from-red-600 hover:to-red-700 hover:text-white hover:border-transparent
                        transition-all duration-500 text-sm font-semibold
                        ${!isOpen ? 'lg:justify-center' : 'justify-start'}`}
                    >
                        <LogOut size={19} className="flex-shrink-0" />
                        {/* أنيميشن كلمة تسجيل الخروج */}
                        <span className={`transition-all duration-500 ease-in-out lg:block ${isOpen ? 'opacity-100 max-w-[150px] translate-x-0' : 'lg:opacity-0 lg:max-w-0 lg:overflow-hidden lg:translate-x-2'}`}>
                            تسجيل الخروج
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar