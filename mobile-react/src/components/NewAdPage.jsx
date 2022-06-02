import PropTypes from 'prop-types';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {URL, VALIDATION_CONSTRAINTS, FORM_INITIAL_STATE, MAKES, PLACE_HOLDER_URL} from '../constants';
import * as uuid from 'uuid';
import { useNavigate } from "react-router-dom";



const debounce = (callback, doEverytime, time=500) => {
    let lastId;    
    return (...args) => {
        doEverytime(...args);
        clearTimeout(lastId);
        lastId = setTimeout(() => callback(...args), time);
    }
}

const NewAdPage = ({postAd}) => {

    const [formState, setInputs] = useState(FORM_INITIAL_STATE);
    const handleChange = ({target}) => {
        setInputs((previousState) => ({...previousState, [target.name]: target.value}));
    };

    const urlInput = useRef(null)
    
    /**
     * debounced function to validation the url
     */
    const urlHandleChange = async () => {
        if(urlInput.current.value === '') {
            urlInput.current.setCustomValidity('');
            urlInput.current.reportValidity();
            return;
        }
        const beginningRegex = VALIDATION_CONSTRAINTS.beginning[0];
        if(beginningRegex.test(urlInput.current.value) === false) {
            urlInput.current.setCustomValidity(VALIDATION_CONSTRAINTS.beginning[1])    
            urlInput.current.reportValidity();
            return;
        }
        try {    
            const res = await axios.get(URL + '/image?url=' + urlInput.current.value)
            const contentType = res.headers['content-type']; 
            const contentTypeRegex = VALIDATION_CONSTRAINTS.contentType[0];
            if(contentTypeRegex.test(contentType)) {
                urlInput.current.setCustomValidity('');
            }
        } catch (err) {
            urlInput.current.setCustomValidity(VALIDATION_CONSTRAINTS.contentType[1])
        }
        finally {
            urlInput.current.reportValidity();
        }
        
    }
    const debouncedChangeHandler = useMemo(() => debounce(urlHandleChange, handleChange, 1000), []); 

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        let url = formState.url; 
        if(!formState.url) {
            url = PLACE_HOLDER_URL;
        }
        const formData = {
            ...formState, 
            url,
        };
        const { data: { id } } = await postAd(formData); 
        if(id) {
            navigate('/ads/' + id)
        }
    };
        
    return (
        <div className="page-wrapper">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="make">
                    <Form.Label>Model</Form.Label>
                    <Form.Select onChange={handleChange} placeholder="Enter make" name="make" value={formState["make"]} required>
                        <option disabled selected value="">Select a model</option>
                        {MAKES.map((make) => <option key={uuid.v4()} value={make}>{make}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="model">
                    <Form.Label>Model</Form.Label>
                    <Form.Control onChange={handleChange} value={formState['model']} name="model" type="input" placeholder="Enter model" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control name="year" onChange={handleChange} value={formState['year']} type="number" min="1920" max="2025" placeholder="Enter a year" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="url">
                    <Form.Label>Photo URL</Form.Label>
                    <Form.Control ref={urlInput} name="url" onChange={debouncedChangeHandler} value={formState['url']} type="input" placeholder="Enter url"/>
                    <Form.Text className="text-muted">The URL field can be left empty</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price (Euro)</Form.Label>
                    <Form.Control name="price" onChange={handleChange} type="number" value={formState['price']} min="1000" placeholder="Enter a price in Euro" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" onChange={handleChange} value={formState['email']} type="email" placeholder="Enter email" required/>
                    <Form.Text className="text-muted">Only potential buyers will see your email</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" value={formState['description']} onChange={handleChange} as="textarea" rows={3} required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>);
}

export default NewAdPage;

NewAdPage.propTypes = {
    postAd: PropTypes.func,
}
