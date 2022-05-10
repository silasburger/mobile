import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate} from 'react-router-dom';
import { Card, Row, Col, Container, Button} from 'react-bootstrap';
import * as uuid from 'uuid';

const AdsPage = ({ ads, getAds, loadingAds }) => {
    useEffect(() => {
        getAds();
    }, []);

    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate('/ads/' + id)
    }

    const createRows = () => {
        let rows = [];
        let reversedAds = [...ads].reverse()
        for(let i = 0; i < ads.length; i++) {
            if (i % 2 === 0) {
                rows.push([]);
            }
            rows[rows.length - 1].push(reversedAds[i]);
        }
        return rows
    }

    const rows = useMemo(createRows, [ads]);

    return (
        <div className="page-wrapper">
            {loadingAds ? "Loading..." : 
                <Container>
                    {rows.map((row) => 
                        <Row key={uuid.v4()} className="my-2">
                            {row.map(({price, make, model, year, description, email, id, url}) => 
                                <Col key={uuid.v4()} className="m-10" sm={6} >
                                    <Card bg="light"> 
                                        <Card.Body className="p-3">
                                            <Card.Title className="text-truncate">{`${year} ${make} ${model}`}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">€{price}</Card.Subtitle>
                                            <Card.Title></Card.Title>
                                            <Card.Text className="text-truncate">{description}</Card.Text>
                                            <Button onClick={() => handleClick(id)}>View Details</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    )}
                </Container>
            }
        </div>
    )
}

AdsPage.propTypes = {
    ads: PropTypes.array,

}

export default AdsPage
