import { ToastContainer, toast } from "react-toastify";

export const notifyResult = (title, typeNoti) => {
    toast(title, {
      position: "top-right",
      autoClose: 2000,
      pauseOnHover: false,
      type: typeNoti,
    });
  }