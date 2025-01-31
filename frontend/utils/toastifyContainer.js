import { ToastContainer } from "react-toastify";
import './toastifyContainer.css';
export const ToastUtils = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={1500}
            newestOnTop
            closeOnClick
            draggable 
            toastClassName={'lvl2'}
        />
    )
}