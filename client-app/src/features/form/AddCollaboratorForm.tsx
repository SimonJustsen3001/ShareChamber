import { ErrorMessage, Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import TextInputStandard from "../../app/common/forms/TextInputStandard";
import "./SharedFormStyles.Module.css";
import Button from "../../app/common/forms/Button";

const validationSchema = Yup.object({
  name: Yup.string().required("Name cannot be empty"),
});

const AddCollaboratorForm = observer(() => {
  const { movieListStore, modalStore } = useStore();

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={{
        name: "",
        error: null,
      }}
      onSubmit={async (value) => {
        try {
          await movieListStore.addCollaborator(
            movieListStore.selectedMovieList?.id!,
            value.name
          );
          movieListStore.loadMovieLists();
          modalStore.closeModal();
        } catch (error) {}
      }}
    >
      {({ handleSubmit, isSubmitting, errors, isValid }) => (
        <Form className="form" onSubmit={handleSubmit} autoComplete="off">
          <p className="form-header">Add Collaborator</p>
          <TextInputStandard
            name="name"
            placeholder="Name"
            label="Type name of person you wish to share the list with"
            icon={faUser}
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
              content="Add person"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
});

export default AddCollaboratorForm;
