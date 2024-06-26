
export interface RatingSquaresProps { 
  rating: number,
  label: string,
  style: string,
}

export function RatingSquare({ rating, label, style = "" }: RatingSquaresProps) {
  return (
    <div className={`flex flex-col items-center p-4 rounded-md bg-opacity-20 bg-slate-500 border-slate-500 ${style} `}>
      <div className="text-3xl">{rating} </div>
      <div className="text-xs">{label}</div>
    </div>
  )
}
