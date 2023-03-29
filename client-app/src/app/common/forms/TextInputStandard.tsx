import { ErrorMessage, useField } from "formik";
import styles from "./TextInputStandard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  type?: string;
  icon: IconDefinition;
}

export default function TextInputStandard(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <>
      <div className={styles.formInputContainer}>
        <label className={styles.fieldLabel}>{props.label}</label>
        <input
          className={`${
            meta.touched && meta.error
              ? styles.missingField
              : styles.normalField
          }`}
          {...field}
          {...props}
        />
        <FontAwesomeIcon className={styles.icon} icon={props.icon} />
        {meta.touched && meta.error ? (
          <label className={styles.errorLabel}>{meta.error}</label>
        ) : null}
      </div>
    </>
  );
}
