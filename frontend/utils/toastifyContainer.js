import { ToastContainer } from "react-toastify";
import './toastifyContainer.css';
export const ToastUtils = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={2000}
            closeOnClick
            draggable 
            toastClassName={'lvl2 '}
        />
    )
}