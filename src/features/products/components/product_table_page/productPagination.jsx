import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProductPagination({
    page,
    setPage,
    paginationData
}) {
    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    const totalPages = paginationData?.pagination?.pageCount || []
    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    }, [page])

    return (
        <div className="flex items-center justify-center gap-2 py-6">
            <button
                onClick={handlePrevious}
                disabled={page === 1}
                className="flex items-center justify-center w-8 h-8 rounded-xl border border-zinc-800 bg-black text-white hover:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
                <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;

                return (
                    <button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        className={`w-8 h-8 rounded-xl font-semibold transition-all duration-200 border
                            ${page === pageNumber
                                ? "bg-white text-black border-white shadow-lg scale-105"
                                : "bg-black text-white border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700"
                            }`}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="flex items-center justify-center w-8 h-8 rounded-xl border border-zinc-800 bg-black text-white hover:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}

export default ProductPagination;