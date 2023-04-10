import { ErrorMessage, Formik, Form, Field } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import TextInputStandard from "../../app/common/forms/TextInputStandard";
import "./CreateListForm.Module.css";
import Button from "../../app/common/forms/Button";

export default observer(function CreateListForm() {
  const { movieListStore, modalStore } = useStore();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name cannot be empty"),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={{
        name: "",
        error: null,
      }}
      onSubmit={async (value, { setErrors }) => {
        try {
          await movieListStore.createMovieList(value);
          movieListStore.loadMovieLists();
          modalStore.closeModal();
        } catch (error) {
          setErrors({ error: "List name identical to other list you own" });
        }
      }}
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="form" onSubmit={handleSubmit} autoComplete="off">
          <p className="form-header">Welcome to Movie List</p>
          <TextInputStandard
            name="name"
            placeholder="Name"
            label="Name"
            icon={faEnvelope}
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
              content="Create List"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
});
