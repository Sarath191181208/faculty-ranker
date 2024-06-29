  export const getRakingColor = (score: number) => {
    if (score < 2.5) return "text-rose-500";
    if (score < 3.5) return "text-yellow-500";
    return "text-teal-500";
  };
