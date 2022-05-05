import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AdsPage = ({getAd, loadingAd}) => {
    const adId = +useParams().adId;
    const [ad, setAd] = useState({});
    const [loadingAdd, setLoadingAd] = useState(false);

    useEffect(() => {
        let didCancel = false;

        const fetchAd = async () => {
            const currentAd = await getAd(adId);
            if (!didCancel) {
                setAd(currentAd);
            }
        }

        fetchAd();
        return () => { didCancel = true };
    }, [adId]);
    
    return (
        <div className="ad-page"> 
            {loadingAd ? "Loading..." : JSON.stringify(ad)}
        </div>

    )
}

export default AdsPage;

AdsPage.propTypes = {
    postAd: PropTypes.func,
}
