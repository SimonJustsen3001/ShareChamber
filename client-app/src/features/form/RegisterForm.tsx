import { ErrorMessage, Formik, Form, Field } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import { faLock, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import TextInputStandard from "../../app/common/forms/TextInputStandard";
import "./RegisterForm.Module.css";
import Button from "../../app/common/forms/Button";

export default observer(function RegisterForm() {
  const { userStore, modalStore } = useStore();

  const validationSchema = Yup.object({
    displayName: Yup.string().required("Please enter a name for the site"),
    username: Yup.string().required("Please enter a username"),
    email: Yup.string().required("Email cannot be empty").email(),
    password: Yup.string().required("Password cannot be empty"),
  });

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
      onSubmit={async (value, { setErrors }) => {
        try {
          await userStore.register(value);
          modalStore.closeModal();
        } catch (error) {
          setErrors({ error: "Invalid email or password" });
        }
      }}
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="form" onSubmit={handleSubmit} autoComplete="off">
          <p className="form-header">Welcome to Movie List</p>
          <TextInputStandard
            name="username"
            placeholder="Account Name"
            label="Username"
            icon={faUser}
          />
          <TextInputStandard
            name="displayName"
            placeholder="Name shown to other users"
            label="Display Name"
            icon={faUser}
          />
          <TextInputStandard
            name="email"
            placeholder="Email"
            label="Email"
            icon={faEnvelope}
          />
          <TextInputStandard
            name="password"
            placeholder="Password"
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
              style="login"
              content="Create Account"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
});
