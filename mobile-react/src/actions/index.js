import AdService from '../services';
import { GOT_ADS, GOT_AD, SET_LOADING } from './actionTypes';

/**
 * Action that sets loading in state, fetches the books, and sets the books in state
 * @param {Number} page 
 * @param {Number} itemsPerPage 
 * @returns Promise
 */
export const getAds = () => {
    return async function(dispatch) {
        dispatch(setLoading())
        const res = await AdService.getAds()
        const {data: {ads}} = res;
        dispatch(gotAds(ads))
    }
}

export const gotAds = (ads) => ({type: GOT_ADS, ads})
export const gotAd = (ad) => ({type: GOT_AD, ad})
export const setLoading = () => ({ type: SET_LOADING })

