import React from 'react'

function Error() {
    return (
        <div className="p-6 bg-stone-950 min-h-screen flex justify-center items-center">
            <div className="bg-red-950/20 border border-red-500/30 p-6 rounded-2xl text-center max-w-md shadow-2xl backdrop-blur-md">
                <p className="text-red-400 font-bold mb-2">فشل في تحميل البيانات</p>
                <p className="text-stone-400 text-sm">
                    تأكد من اتصالك بالانترنت وحاول مجدداً.
                </p>
            </div>
        </div>
    )
}

export default Error
