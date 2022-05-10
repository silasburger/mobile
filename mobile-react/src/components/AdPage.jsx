import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AdPage = ({getAd, loadingAd}) => {
    const adId = useParams().adId;
    const [ad, setAd] = useState({});

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
    }, [adId, getAd]);
    
    return (
        <div className="ad-page page-wrapper h-100"> 
            {loadingAd ? "Loading..." :
                <div className="card mb-3 h-100 border-0">
                    <div className="row g-0">
                        <div className="col-md-3">
                            <img src={ad.url} className="img-fluid rounded" alt="car" />
                        </div>
                        <div className="col-md-9">
                            <div className="card-body ps-5">
                                <h5 className="card-title">{`${ad.year} ${ad.make} ${ad.model}`}</h5>
                                <p className="card-text"><small className="text-muted">€ {ad.price}</small></p>
                                <p className="card-text">{ad.description}</p>
                                <p><a href={"mailto:" + ad.email}>Contact Seller</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}

export default AdPage;

AdPage.propTypes = {
    loadingAd: PropTypes.bool,
    getAd: PropTypes.func,
}
