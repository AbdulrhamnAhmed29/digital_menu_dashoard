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