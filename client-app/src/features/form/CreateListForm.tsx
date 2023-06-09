import { ErrorMessage, Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import { faList } from "@fortawesome/free-solid-svg-icons";
import TextInputStandard from "../../app/common/forms/TextInputStandard";
import "./SharedFormStyles.Module.css";
import Button from "../../app/common/forms/Button";
import { ErrorResponse } from "../../app/interfaces/errorInterface";
import { AxiosError } from "axios";

const validationSchema = Yup.object({
  name: Yup.string().required("Name cannot be empty").max(20),
});

export default observer(function CreateListForm() {
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
          await movieListStore.createMovieList(value);
          movieListStore.loadMovieLists();
          modalStore.closeModal();
        } catch (error) {}
      }}
    >
      {({ handleSubmit, isSubmitting, errors, isValid }) => (
        <Form className="form" onSubmit={handleSubmit} autoComplete="off">
          <p className="form-header">Welcome to Movie List</p>
          <TextInputStandard
            name="name"
            placeholder="Name"
            label="Name"
            icon={faList}
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
              content="Create List"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
});
