import { ErrorMessage, Formik, Form, Field } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import TextInputStandard from "../../app/common/forms/TextInputStandard";
import "./Form.Module.css";
import Button from "../../app/common/forms/Button";

export default observer(function LoginForm() {
  const { userStore, movieListStore, modalStore } = useStore();

  const validationSchema = Yup.object({
    email: Yup.string().required("Email cannot be empty").email(),
    password: Yup.string().required("Password cannot be empty"),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={{
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={async (value, { setErrors }) => {
        try {
          await userStore.login(value);
          await movieListStore.loadMovieLists();
          modalStore.closeModal();
        } catch (error) {
          setErrors({ error: "Invalid email or password" });
        }
      }}
    >
      {({ handleSubmit, isSubmitting, errors, isValid }) => (
        <Form className="form" onSubmit={handleSubmit} autoComplete="off">
          <p className="form-header">Welcome to Movie List</p>
          <TextInputStandard
            name="email"
            placeholder="Email"
            label="Email"
            icon={faEnvelope}
          />
          <TextInputStandard
            name="password"
            placeholder="Password"
            label="password"
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
              content="LOGIN"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
});
