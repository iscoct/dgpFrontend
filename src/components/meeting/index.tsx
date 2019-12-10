import React from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Schedule, LocationOn } from '@material-ui/icons';
import { Container, Row, Col } from 'react-bootstrap';
import TextField from '../textField';

import './meeting.scss';

export default function Meeting({ date, location }: any) {
    return (
        <Container className="location-date--section">
            <Row className="justify-content-md-center">
                <Col xs={4}>
                    Fecha
                </Col>
                <Col xs={8}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            format="dd/MM/yyyy"
                            value={date.value}
                            onChange={(newDate: any) => date.setter(newDate)}
                            InputAdornmentProps={{ position: "end" }}
                        />
                    </MuiPickersUtilsProvider>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs={4}>
                    Hora
                </Col>
                <Col xs={8}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            value={date.value}
                            keyboardIcon={<Schedule />}
                            onChange={(time: any) => date.setter(time)}
                        />
                    </MuiPickersUtilsProvider>
                </Col>
            </Row>
            <Row className="justify-content-md-center location--section">
                <Col xs={4}>
                    Localización
                </Col>
                <Col className="location--input" xs={7}>
                    <TextField
                        label="Calle Madrid, Granada"
                        value={location.value} setter={location.setter}
                    />
                </Col>
                <Col className="location--icon" xs={1}>
                    <LocationOn />
                </Col>
            </Row>
        </Container>
    );
}