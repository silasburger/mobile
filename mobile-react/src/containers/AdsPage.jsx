import react, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AdsPage = ({ ads, getAds, adsFresh }) => {
    useEffect(() => {
        getAds();
    }, []);


    return (
        <div>
            {ads.map(({price, make, model, year, description, email, id}) => <p key={id}>{price}{make}{model}{year}{description}{email}
                <Link to={`/ads/${id}`}>link</Link>
            </p>)}
        </div>
    )
}

AdsPage.propTypes = {
    ads: PropTypes.array,

}

export default AdsPage
