import { useState } from "react";
import styles from "./Button.module.css";
import "@fortawesome/fontawesome-free/css/all.css";

interface Props {
  clickButton: () => void;
  isSubmitting?: boolean;
  style: string;
  type?: "button" | "submit" | "reset" | undefined;
  content: string;
}

export default function Button(props: Props) {
  const buttonClass = `${styles[props.style + "Button"]}`;
  return (
    <button
      onClick={props.clickButton}
      type={props.type}
      className={buttonClass}
    >
      {!props.isSubmitting ? (
        props.content
      ) : (
        <i className="fa fa-spinner fa-spin"></i>
      )}
    </button>
  );
}
