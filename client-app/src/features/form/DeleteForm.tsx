import { ErrorMessage, Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import TextInputStandard from "../../app/common/forms/TextInputStandard";
import "./SharedFormStyles.Module.css";
import Button from "../../app/common/forms/Button";
import { ErrorResponse } from "../../app/interfaces/errorInterface";

const validationSchema = Yup.object({
  verify: Yup.string()
    .matches(/^Delete$/, "You must type 'Delete' to confirm")
    .required("You must type 'Delete' to confirm deletion"),
});

const DeleteForm = observer(() => {
  const { movieListStore, modalStore } = useStore();

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
          const errorResponse = error as ErrorResponse;
          setErrors({
            error:
              errorResponse.response.data.errorMessage || "An error occurred",
          });
        }
      }}
    >
      {({ handleSubmit, isSubmitting, errors, isValid }) => (
        <Form className="form" onSubmit={handleSubmit} autoComplete="off">
          <p className="form-header">Delete list?</p>
          <TextInputStandard
            name="verify"
            placeholder="Delete"
            label='Type "Delete" to confirm deletion'
            icon={faTrash}
          />
          <ErrorMessage
            name="error"
            render={() => (
              <label className="form-error-label">{errors.error}</label>
            )}
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

export default DeleteForm;
