import { observer } from "mobx-react-lite";
import "./TestPage.Module.css";
import { useEffect, useState } from "react";

const TestPage = observer(() => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [stars, setStars] = useState<number[]>([]);

  useEffect(() => {
    const tempStars = Array.from({ length: 10 }, (_, index) => index + 1);
    setStars(tempStars);
  }, []);

  const test = (index: number) => {
    setHoveredIndex(index);
  };

  return (
    <div className="test-page">
      <div className="test-square">
        {stars.map((index) => (
          <i
            key={index}
            className={`${
              index <= hoveredIndex ? "fas" : "far"
            } fa-star star-item`}
            onMouseOver={() => test(index)}
          />
        ))}
      </div>
    </div>
  );
});

export default TestPage;
