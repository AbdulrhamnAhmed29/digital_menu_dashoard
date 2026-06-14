import React from 'react'

function SearchInput({ search, setSearchItem }) {
    const premiumInputClass = "w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all duration-200 placeholder-zinc-600 text-sm text-right";

    return (
        <div>
            <div>
                <label className="text-zinc-400 text-xs font-medium"> ابحث عن المنتج بالاسم</label>
                <input
                    type="text"
                    className={premiumInputClass}
                    placeholder="ابحث عن البيتزا بالاسم..."
                    value={search}
                    onChange={(e) => setSearchItem(e.target.value)}
                />
            </div>
        </div>
    )
}

export default SearchInput
