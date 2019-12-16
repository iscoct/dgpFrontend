import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../../components/';
import { Container, Row, Col } from 'react-bootstrap';
import { Header, TextField, Meeting, FileInput } from '../../components';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import _ from 'lodash';

import './createActivity.scss';

function FormattedRow({ children, colClassName = '', colWidth = 6 }: any) {
    return (
        <Row className="justify-content-md-center">
            <Col className={colClassName} xs={colWidth}>
                {children}
            </Col>
        </Row>
    );
}

function Label({ index, label, setLabel }: any) {
    return (
        <Col className="label-input--section" xs={4}>
            <TextField
                label={`Etiqueta ${index}`}
                value={label}
                setter={setLabel}
            />
        </Col>
    );
}

function LabelSection({ labels, setLabels }: any) {
    const numberOfLabels = 6;

    useEffect(() => {
        setLabels(Array(numberOfLabels).fill(''));
    }, []);

    function onSetLabels(index: number, newValue: any) {
        const newLabels = Array.from(labels);

        newLabels[index] = newValue;

        setLabels(newLabels);
    }

    return (
        <Container className="label--section">
            <FormattedRow colClassName="label-title--section">
                Etiquetas
            </FormattedRow>
            <Row className="justify-content-md-center">
                {
                    labels ? _.range(numberOfLabels).map((index: any) => {
                        return (
                            <Label
                                index={index + 1}
                                key={index}
                                labels={labels[index]}
                                setLabel={(newValue: any) => onSetLabels(index, newValue)}
                            />
                        );
                    }) : ''
                }
            </Row>
        </Container>
    );
}

export default function({ onClickBack, onClick }: any): JSX.Element {
	const [eventName, setEventName] = useState<string>('');
    const [eventDescription, setEventDescription] = useState<string>('');
    const [eventLocation, setEventLocation] = useState<string>('');
    const [isGrupalActivity, setGrupalActivity] = useState<boolean>(false);
    const [eventDate, setEventDate] = useState<Date>(new Date());
    const [labels, setLabels] = useState<Array<string>>();
    const fileInput: any = useRef(null);

    return (
        <React.Fragment>
            <Header
                title='Crear actividad'
                icon='arrow_back'
                onIconClick={onClickBack}
            />
            <Container>
                <FileInput
                    id="actividad-input-image"
                    fileInput={fileInput}
                />
                <FormattedRow>
                    <TextField
                        label="Título de la actividad"
                        value={eventName}
                        setter={setEventName}
                    />
                </FormattedRow>
                <FormattedRow>
                    <TextField
                        label="Descripción"
                        value={eventDescription}
                        setter={setEventDescription}
                    />
                </FormattedRow>
                <FormattedRow colClassName="grupal--checkbox">
                    <FormControlLabel
                        labelPlacement="start"
                        control={
                            <Checkbox
                                value={isGrupalActivity}
                                onChange={(event: any) => setGrupalActivity(event.target.value)}
                            />
                        }
                        label="¿Es una actividad Grupal?"
                    />
                </FormattedRow>
                <FormattedRow>
                    <LabelSection labels={labels} setLabels={setLabels} />
                </FormattedRow>
                <FormattedRow>
                    <Meeting
                        date={{ value: eventDate, setter: setEventDate }}
                        location={{ value: eventLocation, setter: setEventLocation }}
                    />
                </FormattedRow>
                <FormattedRow>
                    <Button
                        variant="company"
                        onClick={() => {
                            onClick({
                                nombre: eventName,
                                descripcion: eventDescription,
                                tipo: isGrupalActivity ? 'grupal' : 'pareja',
                                localizacion: eventLocation,
                                fecha: eventDate,
                                imagen: fileInput,
                                etiquetas: labels
                            });
                        }}
                    >
                        Crear
                    </Button>
                </FormattedRow>
            </Container>
        </React.Fragment>
    );
}
