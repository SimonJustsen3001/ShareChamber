import { ErrorMessage, Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import Button from "../../app/common/forms/Button";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import CheckBox from "../../app/common/forms/CheckBox";
import { ErrorResponse } from "../../app/interfaces/errorInterface";
import { MovieListIds } from "../../app/interfaces/movieListInterface";

type movieData = {
  movieId: string;
  movieTitle: string;
};

const validationSchema = Yup.object({
  movieId: Yup.string().required(
    "Unexpected problem, please contact developer"
  ),
  //movieLists: Yup.array().min(1).required("Add to at least one list"),
});

const RemoveDuplicates = (array: string[]) => {
  return array.filter((element, index) => array.indexOf(element) === index);
};

const AddMovieForm = observer(({ movieId, movieTitle }: movieData) => {
  const { modalStore, movieListStore } = useStore();

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={{
        movieId: movieId,
        movieLists: [],
        addedMovies: [],
        removedMovies: [],
        error: null,
      }}
      onSubmit={async (values, { setErrors }) => {
        try {
          const addedMovies = RemoveDuplicates(values.addedMovies);
          const removedMovies = RemoveDuplicates(values.removedMovies);
          const addMovieListIds: MovieListIds = {
            movieLists: addedMovies,
          };
          const removeMovieListIds: MovieListIds = {
            movieLists: removedMovies,
          };
          await movieListStore.updateMovieList(
            addMovieListIds,
            removeMovieListIds,
            values.movieId
          );
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
                addList="addedMovies"
                removeList="removedMovies"
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
              content="Update list(s)"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
});

export default AddMovieForm;
