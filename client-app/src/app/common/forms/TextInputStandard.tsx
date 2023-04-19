import { ErrorMessage, useField } from "formik";
import "./TextInputStandard.Module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

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
      <div className="form-input-container">
        <label className="field-label">{props.label}</label>
        <input
          className={`${
            meta.touched && meta.error ? "missing-field" : "normal-field"
          }`}
          {...field}
          {...props}
        />
        <FontAwesomeIcon className="icon" icon={props.icon} />
        {meta.touched && meta.error ? (
          <label className="error-label">{meta.error}</label>
        ) : null}
      </div>
    </>
  );
}
