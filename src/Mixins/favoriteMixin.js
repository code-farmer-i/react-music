import {addFavoriteSong, removeFavoriteSong} from "../store/FavoriteList/Actions";

export default {
    methods:{
        isFavorite(songId){
            const idx = this.props.favoriteList.findIndex((song)=>{
                return song.id === songId
            })

            return idx !== -1
        },
        toggleFavorite(song){
            const {dispatch, favoriteList} = this.props;

            const idx = favoriteList.findIndex((songItem)=>{
                return songItem.id === song.id
            })

            idx === -1 ? dispatch(addFavoriteSong(song)) : dispatch(removeFavoriteSong(idx))
        }
    },
    addState(state){
        return {
            favoriteList: state.favoriteList
        }
    }
}