import { toast } from "react-hot-toast";

export const toastError = (text: string) => {
  toast.error(text, {
    duration: 2000,
    position: "bottom-right",
    style: {
      background: "#202020",
      color: "#fff",
    },
  });
};

export const toastSucces = (text: string) => {
  toast.success(text, {
    duration: 2000,
    position: "bottom-right",
    style: {
      background: "#202020",
      color: "#fff",
    },
  });
};
