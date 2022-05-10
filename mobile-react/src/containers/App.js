import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdsPage from '../components/AdsPage';
import AdPage from '../components/AdPage';
import NewAdPage from '../components/NewAdPage';
import Header from '../components/Header';
import { getAds, postAd, getAd} from '../actions';
import { connect } from 'react-redux';

function App({ads, postAd, getAds, getAd, adsFresh, loadingAds, loadingAd}) {
    return (
        <>   
            <Header />
            <Routes>
                <Route exact path="/" element={<Navigate to="ads" replace />} />
                <Route path="*" element={<Navigate to="ads" replace />} />
                <Route path="ads" element={<AdsPage ads={ads} getAds={getAds} adsFresh={adsFresh} loadingAds={loadingAds} />} />
                <Route exact path="ads/:adId" element={<AdPage getAd={getAd} loadingAd={loadingAd} adsFresh={adsFresh} />} />
                <Route exact path="ads/new" element={<NewAdPage postAd={postAd} />} /> 
            </Routes>
        </>
    );
}

const mapStateToProps = (state) => ({
    ads: state.ads,
    adsFresh: state.adsFresh,
    loadingAds: state.loadingAds,
    loadingAd: state.loadingAd,
});

export default connect(mapStateToProps, {postAd, getAds, getAd})(App);
