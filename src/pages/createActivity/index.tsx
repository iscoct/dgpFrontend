import React, { useState, useRef } from 'react';
import { Button } from '@material-ui/core';
import { Form } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/header';

import './createActivity.scss';

export default function({ onClickBack }: any): JSX.Element {
	const [eventName, setEventName] = useState<string>('');
	const [eventDescription, setEventDescription] = useState<string>('');
	const fileInput: any = useRef(null);
	
	function createActivity() {
		if (fileInput && fileInput.current && fileInput.current.files) {
			const url = 'http://localhost:8000/api/actividades';
			const file = fileInput.current.files[0];
			const formData = new FormData();
			
			formData.append('nombre', eventName);
			formData.append('descripcion', eventDescription);
			formData.append('imagen', file, file.name);

			fetch(url, {
				method: 'POST',
				body: formData,
				credentials: 'include'
			}).then(() => onClickBack()).catch(() =>
				console.log('Ha habido algún error creando la actividad')
			);
		}
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
                		<input
                			type='file'
                			className='create__activity--file__input'
                			ref={fileInput}
                			accept="image/png"
                		/>
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
