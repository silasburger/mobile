import AdService from '../services';

// Async actions
export const getAds = () => {
    return async function(dispatch, getState) {
        dispatch(setLoading('ads'))
        const res = await AdService.getAds()
        const {data: ads} = res;
        dispatch(gotAds(ads))
    }
}

export const getAd = (adId) => {
    return async (dispatch, getState) => {
        let {ads, adsFresh} = getState()
        if (adsFresh) {
            return adSelector(adId, ads);
        } else {
            dispatch(setLoading('ad'));
            const res = await AdService.getAd(adId);
            const {data: ad} = res;
            dispatch(gotAd());
            return ad;
        }
    }
}

export const postAd = (newAd) => {
    return async function(dispatch) {
        await AdService.postAd(newAd);
        dispatch({type: POSTED_AD, success: true});
    }
}

//adSelector
const adSelector = (adId, ads) => {
    return ads.find(ad => ad.id === adId); 
};

// Action creators
export const gotAds = (ads) => ({type: GOT_ADS, ads});
export const gotAd = () => ({type: GOT_AD});
export const postedAd = () => ({type: POSTED_AD, success: true});
export const setLoading = (resource) => ({ type: SET_LOADING, resource });


// Action types
export const GOT_ADS = 'GOT_ADS';
export const GOT_AD = 'GOT_AD';
export const POSTED_AD = 'POSTED_AD';
export const SET_LOADING = 'SET_LOADING';


