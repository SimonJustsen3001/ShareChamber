import { ErrorMessage, Formik, Form, useFormikContext } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import "./SharedFormStyles.Module.css";
import "./RateForm.Module.css";
import Button from "../../app/common/forms/Button";
import { useEffect, useState } from "react";

const validationSchema = Yup.object({
  name: Yup.number().min(1).max(10),
});
const tempStars = Array.from({ length: 10 }, (_, index) => index + 1);

interface Props {
  listId: string;
  movieId: string;
  movieTitle: string;
}

const RateForm = observer(({ listId, movieId, movieTitle }: Props) => {
  const { movieStore, movieListStore, modalStore } = useStore();
  const [rating, setRating] = useState(0);
  const [hoveredStarIndex, setHoveredStarIndex] = useState(0);
  const [stars, setStars] = useState<number[]>([]);

  useEffect(() => {
    setStars(tempStars);
  }, []);

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize={true}
      initialValues={{
        rating: 0,
        error: null,
      }}
      onSubmit={async (value) => {
        try {
          await movieStore.setMovieRating({ movieId, rating });
          await movieListStore.loadMovieLists();
          movieListStore.setSelectedMovieList(
            movieListStore.getCurrentMovieList(listId)
          );
          modalStore.closeModal();
        } catch (error) {}
      }}
    >
      {({ handleSubmit, isSubmitting, errors, isValid }) => (
        <Form className="form" onSubmit={handleSubmit} autoComplete="off">
          <p className="form-header">
            Rate
            <br /> {movieTitle}
          </p>
          <div className="stars">
            {stars.map((index) => (
              <i
                key={index}
                className={`${
                  index <= hoveredStarIndex || index <= rating ? "fas" : "far"
                } fa-star ${
                  index <= rating ? "star-item-gold" : "star-item-blue"
                }`}
                onMouseOver={() => {
                  setHoveredStarIndex(index);
                }}
                onClick={() => {
                  setRating(index);
                }}
                onMouseLeave={() => setHoveredStarIndex(0)}
              />
            ))}
          </div>

          <div className="rating">{rating}</div>
          <input type="hidden" name="rating" value={rating} />
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
              content="Rate"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
});

export default RateForm;
