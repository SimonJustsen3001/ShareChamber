import "@fortawesome/fontawesome-free/css/all.css";
import "./CheckBox.Module.css";
import { Field, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

interface Props {
  index: number;
  name: string;
  addList: string;
  removeList: string;
  value: string;
  label: string;
  formikValues: { [key: string]: any };
}

const CheckBox = observer((props: Props) => {
  const { movieListStore } = useStore();
  const { name, addList, removeList, value } = props;
  const checkBoxRef = useRef<HTMLInputElement>(null);
  const { setFieldValue } = useFormikContext();
  const listHasMovie = movieListStore.doesListHaveMovie(
    value,
    props.formikValues.movieId
  );

  const toggleCheckBox = () => {
    const { formikValues } = props;
    const currentValue = formikValues[name] || [];
    const isChecked = currentValue.includes(value);

    const currentAddedValue = formikValues[addList] || [];
    const currentRemovedValue = formikValues[removeList] || [];

    let addedValues: string[] = formikValues[props.addList];
    let removedValues: string[] = formikValues[props.removeList];

    if (isChecked && listHasMovie) {
      removedValues.push(value);
    } else if (isChecked && !listHasMovie) {
      addedValues = currentAddedValue.filter((val: string) => val !== value);
    } else if (!isChecked && listHasMovie) {
      removedValues = currentRemovedValue.filter(
        (val: string) => val !== value
      );
    } else if (!isChecked && !listHasMovie) {
      addedValues.push(value);
    }

    setFieldValue(addList, addedValues);
    setFieldValue(removeList, removedValues);
  };

  // Toggles all lists with movie present
  useEffect(() => {
    const { formikValues } = props;
    const currentValue = formikValues[name] || [];
    if (movieListStore.doesListHaveMovie(value, props.formikValues.movieId)) {
      currentValue.push(value);
    }
    setFieldValue(name, currentValue);
  }, [movieListStore]);

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
