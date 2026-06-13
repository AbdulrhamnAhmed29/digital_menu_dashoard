import React from 'react'
import { useNavigate } from 'react-router-dom';

function BackButton() {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }

    return (

        <div>
            <button type='button' onClick={handleBack} className="mb-6 text-sm text-amber-400 hover:text-amber-500 transition-colors duration-200 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                العودة للقائمة
            </button>
        </div>
    )
}

export default BackButton
