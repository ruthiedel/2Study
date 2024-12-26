"use client"
import Swal from 'sweetalert2'


export const successAlert = async (title: string, text: string) => {
    Swal.fire({
      icon: "success",
      title: title,
      text: text,
      timer: 1500, 
      showConfirmButton: false
    });
  }
  
export const errorRegisterAlert = async (message: string) => {
    Swal.fire({
        icon: "error",
        title: "שגיאה",
        timer: 1500, 
        showConfirmButton: false,
        text: message || "ההרשמה נכשלה.",
    });
  }
  