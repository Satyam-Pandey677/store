export const addFavorateToLocalStorage = (product) => {
    const favorites = getFavorateFromLocalStorage()
    if(!favorites.some((p) => p._id == product._id)){
        favorites.push(product)
        localStorage.setItem("favorites",JSON.stringify(favorites))
    }
}


export const removeFromLocalStorage = (productId) => {
    const favorites = getFavorateFromLocalStorage();
    const updateFavorite = favorites.filter((product) => product._id != productId)
    localStorage.setItem("favorites", JSON.stringify(updateFavorite))
}


export const getFavorateFromLocalStorage = () => {
    const favoriteJSON = localStorage.getItem("favorites");
    return favoriteJSON ? JSON.parse(favoriteJSON) : [];
}