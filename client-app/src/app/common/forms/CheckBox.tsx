import "@fortawesome/fontawesome-free/css/all.css";
import "./CheckBox.Module.css";
import { Field, useFormikContext } from "formik";
import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";

interface Props {
  index: number;
  name: string;
  value: string;
  label: string;
  formikValues: { [key: string]: any };
}

const CheckBox = observer((props: Props) => {
  const { name, value } = props;
  const checkBoxRef = useRef<HTMLInputElement>(null);
  const { setFieldValue } = useFormikContext();

  const toggleCheckBox = () => {
    const currentValue = props.formikValues[name] || [];
    const isChecked = currentValue.includes(value);

    let updatedValues: string[] = [];
    if (isChecked) {
      updatedValues = currentValue.filter((val: string) => val !== value);
    } else {
      updatedValues = [...currentValue, value];
    }
    setFieldValue(name, updatedValues);
  };

  return (
    <div className="checkbox-wrapper" onClick={toggleCheckBox}>
      <Field
        key={props.index}
        className="checkbox-box"
        type="checkbox"
        name={name}
        value={value}
        innerRef={checkBoxRef}
      />
      <label className="checkbox-label" htmlFor={name}>
        {props.label}
      </label>
    </div>
  );
});

export default CheckBox;
