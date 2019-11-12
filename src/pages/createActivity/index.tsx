import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Form } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/header';

import './createActivity.scss';

export default function({ onClickBack }: any): JSX.Element {
	const [eventName, setEventName] = useState<string>('');
	const [eventDescription, setEventDescription] = useState<string>('');
	const url = 'http://localhost:8000/api/actividades';

	function createActivity() {
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nombre: eventName,
				description: eventDescription
			}),
			credentials: 'include'
		}).then(() => onClickBack()).catch(() =>
			console.log('Ha habido algún error creando la actividad')
		);
	}

    return (
        <React.Fragment>
            <Header
                title='Crear actividad'
                icon='arrow_back'
                onIconClick={onClickBack}
            />
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={6}>
                        <Form>
                            <Form.Group controlId="crearActividad">
                                <Form.Label>Nombre del evento</Form.Label>
                                <Form.Control onChange={(event: any) => setEventName(event.target.value)}
                                	value={eventName} as="textarea" rows="3" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={6}>
                        <Form>
                            <Form.Group controlId="crearActividad">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control onChange={(event: any) => setEventDescription(event.target.value)}
                                	value={eventDescription} as="textarea" rows="3" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={6}>
                        <Button
                            fullWidth={true}
                            size="large"
                            variant="contained"
                            color="primary"
                            style={{
                                background: 'linear-gradient(to bottom, #BE6F03, #eb8905)',
                                borderRadius: '10px'
                            }}
                            onClick={createActivity}
                        >
                            Crear
                        </Button>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}
