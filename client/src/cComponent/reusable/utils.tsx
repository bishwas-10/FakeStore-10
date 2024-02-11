export const ratingStars = (rate:number) => {
    const stars = [];
    const rating: number = Math.round(rate);
    for (let i = 0; i < 5; i++) {
      const starColor = i < rating ? "text-yellow-500" : "text-gray-300";
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 fill-current ${starColor}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 15.585L3.535 19.9l1.065-6.203L.293 7.115l6.257-.91L10 0l3.45 6.205 6.257.91-4.307 4.582 1.064 6.203z"
          />
        </svg>
      );
    }
    return stars;
  };