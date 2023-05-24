import { ErrorMessage, Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import Button from "../../app/common/forms/Button";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import CheckBox from "../../app/common/forms/CheckBox";
import { ErrorResponse } from "../../app/interfaces/errorInterface";

type movieData = {
  movieId: string;
  movieTitle: string;
};

const validationSchema = Yup.object({
  // movieId: Yup.string().required(
  //   "Unexpected problem, please contact developer"
  // ),
  // movieLists: Yup.array().min(1).required("Add to at least one list"),
});

const AddMovieForm = observer(({ movieId, movieTitle }: movieData) => {
  const { modalStore, movieListStore } = useStore();

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={{
        movieId: movieId,
        movieLists: [],
        error: null,
      }}
      onSubmit={async (values, { setErrors }) => {
        try {
          console.log("test ", values);
        } catch (error) {
          const errorResponse = error as ErrorResponse;
          setErrors({
            error:
              errorResponse.response.data.errorMessage || "An error occurred",
          });
        }
      }}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, values }) => (
        <Form className="form" onSubmit={handleSubmit} autoComplete="off">
          <p className="form-header">Add {movieTitle}</p>
          <div className="checkbox-container">
            {movieListStore.movieLists.map((movieList, index) => (
              <CheckBox
                index={index}
                name="movieLists"
                value={movieList.id}
                label={movieList.name}
                formikValues={values}
              />
            ))}
          </div>
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
              content="Add to list(s)"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
});

export default AddMovieForm;
