import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Row, Col, Container, Card} from 'react-bootstrap';

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
                <div className="card mb-3 h-100">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={ad.url} className="img-fluid rounded-start img-thumbnail" alt="car" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
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
    postAd: PropTypes.func,
}
