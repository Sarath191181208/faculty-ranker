import React, { FC } from "react";
import { FaStar } from "react-icons/fa";

interface FiveStarRatingProps {
  rating: number;
  handleStarClick?: (clickedStar: number) => void;
  starColor?: string;
  className?: string;
}

"cursor-pointer";
"cursor-default";

const FiveStarRating: FC<FiveStarRatingProps> = (
  { rating, handleStarClick, starColor: propsStarColor, className },
) => {
  const starColor = propsStarColor ?? "text-yellow-500";
  return (
    <div className={`${className ?? ""}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-xl inline transition-colors duration-300
                ${handleStarClick ? "cursor-pointer" : "cursor-default"} 
                ${star <= rating ? starColor : "text-gray-400"}
              `}
          onClick={() => handleStarClick && handleStarClick(star)}
        >
          <FaStar className="inline" />
        </span>
      ))}
    </div>
  );
};

export { FiveStarRating };
