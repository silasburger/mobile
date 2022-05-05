import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useState } from 'react';

const FORM_INITIAL_STATE = {make: '', model: '', year: '', email: '', price: ''}


const NewAdsPage = ({postAd}) => {
    const [formState, setInputs] = useState(FORM_INITIAL_STATE);

    const handleChange = ({target}) => {
        setInputs((previousState) => ({...previousState, [target.name]: target.value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postAd(formState);      
        setInputs(() => (FORM_INITIAL_STATE));
        // alert that post was successful
    };

    return (
        <div className="form-wrapper"> 
            <form onSubmit={handleSubmit}>
                <select onChange={handleChange} value={formState['make']} name="make">
                    <option value="BMW">BMW</option>
                    <option value="Peugeot">Peugeot</option>
                    <option value="Fiat">Fiat</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Kia">Kia</option>
                    <option value="Chevrolet">Chevrolet</option>
                </select>
                <input onChange={handleChange} type="text" name="model" value={formState['model']} />
                <input onChange={handleChange} min="1920" max="2025" type="number" name="year" value={formState['year']} />
                <input onChange={handleChange} type="email" name="email" value={formState['email']} />
                <input onChange={handleChange} type="number" name="price" value={formState['price']} />
                <button>Submit</button>
            </form>
        </div>

    )
}

export default NewAdsPage;

NewAdsPage.propTypes = {
    postAd: PropTypes.func,
}
