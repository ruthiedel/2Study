import React from "react";
import styles from "./regulations.module.css";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface RegulationsProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

function Regulations({ register, errors }: RegulationsProps) {
    return (
    <div className={styles.termsContainer}>
      <input type="checkbox" id="acceptTerms" {...register("acceptTerms")} />
      <label htmlFor="acceptTerms">
        אני מסכים/ה ל
        <a href="/termsOfService" target="_blank" rel="noopener noreferrer">
          תקנון
        </a>
      </label>
      {errors.acceptTerms?.message &&
        typeof errors.acceptTerms.message === "string" && (
          <p className={styles.error}>{errors.acceptTerms.message}</p>
        )}
    </div>
  );
}

export default Regulations;
