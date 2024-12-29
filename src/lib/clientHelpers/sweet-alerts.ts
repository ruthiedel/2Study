"use client"
import Swal from 'sweetalert2'
import "sweetalert2/src/sweetalert2.scss";

export const successAlert = async (title: string, text: string) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: text,
    timer: 2000,
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

export const errorAlert = async (message: string) => {
  Swal.fire({
    icon: "error",
    title: "שגיאה",
    timer: 1500,
    showConfirmButton: false,
    text: message || " ",
  });
}

export const infoAlert = async () => {
  Swal.fire({
    title: "שים לב",
    text: "הפרק הבא עדיין לא נטען",
    icon: 'info',
    confirmButtonText: "OK",
    timer: 3000,
  });
}

export const finishAlert = async () => {
  Swal.fire({
    title: "מעולה!",
    text: "סיימת ללמוד! כל הכבוד 🎉",
    icon: "success",
    timer: 3000,
  })
}

export const sendMailSuccess = async () => {
  Swal.fire({
    title: "תודה על פנייתך! 🙏",
    text: " נשמח לעזור ונחזור אליך בהקדם. 😊",
    icon: "success",
    timer: 3000,
    confirmButtonText: "נהדר",
  })
}

export const sendMailError = async () => {
  Swal.fire({
    title: "הייתה שגיאה בשליחת המייל 😥",
    text: "אנא נסה שוב מאוחר יותר. ⚠️",
    icon: "error",
    timer: 3000,
    confirmButtonText: "סגור",
})
}

export const bookMarkSuccess = async () => {
        Swal.fire({
          title: "מעולה!",
          text: "הסימניה שלך עודכנה למיקום החדש בהצלחה.",
          icon: "success",
          confirmButtonText: "נהדר",
          timer: 3000,
        });
}

export const bookMarkError = async () => {
      Swal.fire({
        title: "שגיאה!",
        text: "משהו השתבש, הסימניה לא עודכנה. נסה שוב מאוחר יותר.",
        icon: "error",
        confirmButtonText: "סגור",
      });
}