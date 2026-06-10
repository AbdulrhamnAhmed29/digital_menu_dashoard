import Swal from "sweetalert2";

export const showSuccessAlert = (title, text) => {
    Swal.fire({
        title: title,
        text: text,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "#0c0a09",
        color: "#f5f5f4",
        iconColor: "#f59e0b",
        customClass: {
            popup: "border border-white/5 rounded-2xl shadow-2xl backdrop-blur-md",
            title: "font-black text-white text-lg",
            htmlContainer: "text-stone-400 text-sm font-medium",
        },
    });
};


// =====delete alert====== 
export const showDeleteConfirmAlert = (title, onConfirm) => {
    Swal.fire({
        title: "هل أنت متأكد من الحذف؟",
        text: `لن تتمكن من استعادة منتج (${title}) أو بياناته مجدداً!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ea580c",
        cancelButtonColor: "#1c1917",
        confirmButtonText: "نعم، احذفه فوراً! 🗑️",
        cancelButtonText: "إلغاء",
        reverseButtons: true,
        background: "#0c0a09",
        color: "#f5f5f4",
        customClass: {
            popup: "border border-white/5 rounded-[2rem] backdrop-blur-md shadow-2xl",
            title: "font-black text-white text-xl",
            htmlContainer: "text-stone-400 text-sm mt-2",
        },
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm(); 
            Swal.fire({
                title: "تم الحذف!",
                text: "تم إزالة المنتج بنجاح من القائمة.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                background: "#0c0a09",
                color: "#f5f5f4",
                customClass: {
                    popup: "border border-white/5 rounded-2xl shadow-2xl",
                    title: "font-bold text-white",
                    htmlContainer: "text-stone-400",
                },
            });
        }
    });
};