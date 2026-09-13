import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating?: number;
}

export default function StarRating({ rating = 4 }: StarRatingProps) {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <FaStar
          key={index}
          className={`h-4.5 w-4.5 ${
            rating > index ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
