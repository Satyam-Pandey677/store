import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa"
const Rating = ({value, text, color}) => {
    console.log(value)
    const numericValue = Number(value) || 0;
    const fullStar = Math.floor(numericValue);
    const halfStar = value - fullStar > 0.5 ? 1 : 0;
    const empyStar = 5- fullStar - halfStar
  return (
    <div className="flex item-center">
        {[...Array(fullStar)].map((_,index) => (
            <FaStar key={index} className={`text-${color} ml-1`}/>
        ))}

        {halfStar === 1 && <FaStarHalfAlt className={`text-${color} ml-1`}/>}
        {[...Array(empyStar)].map((_,index) => (
            <FaRegStar key={index} className={`text-${color} ml-1`}/>
        ))}

        <span className={`rating-text ml-[2rem] text-${color}`}>{text}</span>
    </div>
  )
}

export default Rating