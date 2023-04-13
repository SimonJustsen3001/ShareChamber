import "@fortawesome/fontawesome-free/css/all.css";
import "./Button.Module.css";

interface Props {
  clickButton: () => void;
  isSubmitting?: boolean;
  style: string;
  type?: "button" | "submit" | "reset" | undefined;
  content: string;
  disabled?: boolean;
}

export default function Button(props: Props) {
  const buttonClass = `button-${props.style}`;
  console.log(buttonClass);

  return (
    <button type={props.type} className={buttonClass}>
      {!props.isSubmitting ? (
        props.content
      ) : (
        <i className="fa fa-spinner fa-spin"></i>
      )}
    </button>
  );
}
