import { ErrorMessage, Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import { faLock, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import TextInputStandard from "../../app/common/forms/TextInputStandard";
import "./SharedFormStyles.Module.css";
import Button from "../../app/common/forms/Button";
import { ErrorResponse } from "../../app/interfaces/errorInterface";

const validationSchema = Yup.object({
  displayName: Yup.string().required("Please enter a name to be displayed"),
  username: Yup.string().required("Please enter a username"),
  email: Yup.string().required("Email cannot be empty").email(),
  password: Yup.string().required("Password cannot be empty"),
});

const RegisterForm = observer(() => {
  const { userStore, modalStore } = useStore();

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={async (value) => {
        await userStore.register(value);
      }}
    >
      {({ handleSubmit, isSubmitting, errors, isValid }) => (
        <Form className="form" onSubmit={handleSubmit} autoComplete="off">
          <p className="form-header">Welcome to Movie List</p>
          <TextInputStandard
            name="username"
            placeholder="JohnDoe1992"
            label="Username"
            icon={faUser}
          />
          <TextInputStandard
            name="displayName"
            placeholder="Johnny21Doey"
            label="Display Name"
            icon={faUser}
          />
          <TextInputStandard
            name="email"
            placeholder="JohnDoe@hotmail.com"
            label="Email"
            icon={faEnvelope}
          />
          <TextInputStandard
            name="password"
            placeholder="**********"
            label="Password"
            type="password"
            icon={faLock}
          />
          <ErrorMessage
            name="error"
            render={() => <label className="error-label">{errors.error}</label>}
          />
          <div className="button-container">
            <Button
              clickButton={modalStore.closeModal}
              isSubmitting={isSubmitting}
              type="submit"
              style={isValid ? "positive" : "positive-invalid"}
              content="Create Account"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
});

export default RegisterForm;
