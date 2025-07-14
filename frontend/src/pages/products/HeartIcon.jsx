import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { addToFavorites, removeFromFavrites, setFavorites } from "../../redux/features/favrates/favoriteSlice"
import { addFavorateToLocalStorage,getFavorateFromLocalStorage,removeFromLocalStorage } from "../../utils/localStorage"
import { useEffect } from "react"

const HeartIcon = ({product}) => {

    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites) || []
    const isFavorites = favorites.some((p) => p._id === product._id) 

    useEffect(() => {
        const favoritesFromLocalStorage = getFavorateFromLocalStorage();
        dispatch(setFavorites(favoritesFromLocalStorage));
    },[])

    const toggleFavorites = () => {
        if(isFavorites){
            dispatch(removeFromFavrites(product))
            removeFromLocalStorage(product._id)
        }else{
            dispatch(addToFavorites(product))
            addFavorateToLocalStorage(product)
        }
    }


  return (
    <div onClick={toggleFavorites} className="absolute top-2 right-5 cursor-pointer">
        {isFavorites ? (
            <FaHeart  className="text-pink-500"/>
        ) : (
            <FaRegHeart />
        )}
    </div>
  )
}

export default HeartIcon