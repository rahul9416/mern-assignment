import { toast } from "react-toastify"

export const showMessage = (message, type) => {
    if (type === 'error') {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 8000,
            draggable: true,
            theme: 'dark',
            pauseOnHover: true,
        });
        return;
    }
    console.log('hey')
    toast.success(message, {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        theme: 'dark',
        pauseOnHover: true,
    });
}