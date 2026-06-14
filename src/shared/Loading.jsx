import React from 'react'

function Loading() {
    return (
        <div className="p-6 flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#f59e0b]"></div>
            <p className="text-amber-400 text-sm animate-pulse font-medium tracking-wide">
                جاري التحميل...
            </p>
        </div>
    )
}

export default Loading
