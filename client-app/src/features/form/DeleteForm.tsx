import { ErrorMessage, Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import TextInputStandard from "../../app/common/forms/TextInputStandard";
import "./SharedFormStyles.Module.css";
import Button from "../../app/common/forms/Button";

export default observer(function CreateListForm() {
  const { movieListStore, modalStore } = useStore();

  const validationSchema = Yup.object({
    verify: Yup.string()
      .matches(/^Delete$/, "You must type 'Delete' to confirm")
      .required("Name cannot be empty"),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={{
        verify: "",
        error: null,
      }}
      onSubmit={async (value, { setErrors }) => {
        try {
          await movieListStore.deleteList(
            movieListStore.selectedMovieList?.id!
          );
          movieListStore.loadMovieLists();
          modalStore.closeModal();
        } catch (error) {
          setErrors({ error: "You don't own the list" });
        }
      }}
    >
      {({ handleSubmit, isSubmitting, errors, isValid }) => (
        <Form className="form" onSubmit={handleSubmit} autoComplete="off">
          <p className="form-header">Welcome to Movie List</p>
          <TextInputStandard
            name="verify"
            placeholder="Delete"
            label='Type "Delete" to confirm deletion'
            icon={faTrash}
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
              style={isValid ? "negative" : "negative-invalid"}
              content="Delete List"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
});
