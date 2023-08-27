import React, { FC } from "react";

interface FiveStarRatingProps {
  rating: number;
  handleStarClick?: (clickedStar: number) => void;
  className?: string;
}

"cursor-pointer";
"cursor-default";

export const FiveStarRating: FC<FiveStarRatingProps> = ({ rating, handleStarClick, className }) => {
      return (
        <div className={className ?? ""}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-xl 
                ${handleStarClick ? "cursor-pointer" : "cursor-default"} 
                ${star <= rating ? "text-yellow-500" : "text-gray-400"}
              `}
              onClick={() => handleStarClick && handleStarClick(star)}
            >
              ★
            </span>
          ))}
        </div>
      );

};

