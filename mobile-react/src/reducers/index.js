import { GOT_ADS, GOT_AD, SET_LOADING, POSTED_AD } from '../actions';

const initialState = {ads: [], loadingAds: false, adsFresh: false, loadingAd: false};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ADS:
      return {
        ...state,
        ads: action.ads,
        loadingAds: false,
        adsFresh: true,
      };
    case SET_LOADING:
        let { loadingAds, loadingAd } = state; 
        if (action.resource === 'ads') {
            loadingAds = true
        } else if (action.resource === 'ad') {
            loadingAd = true
        }
      return {
        ...state,
        loadingAds,
        loadingAd,
      };
    case POSTED_AD:
      return {
        ...state,
        postedAd: state.success,
        adsFresh: false,
      };
    case GOT_AD:
      return {
        ...state,
        loadingAd: false,
      };
    default:
      return state;
  }
}

export default rootReducer;
