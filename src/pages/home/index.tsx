import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Input, InputAdornment, FormControl, Typography } from '@material-ui/core';
import { Button } from '../../components/index';
import Mail from '@material-ui/icons/MailOutline';
import Lock from '@material-ui/icons/Lock';

import './home.scss';

import CompanyImage from './companyImage.json';

function GenericInput({ placeholder, type = "text", icon, onChange }: any): JSX.Element {
    return (
        <FormControl>
            <Input
                type={type}
                fullWidth={true}
                placeholder={placeholder}
                startAdornment={
                    <InputAdornment position="start">
                        {icon}
                    </InputAdornment>
                }
                onChange={onChange}
            />
        </FormControl>
    );
}

function EmailInput({ onChange }: any): JSX.Element {
    return (
        <GenericInput
            placeholder="Correo"
            icon={<Mail fontSize="large" />}
            onChange={onChange}
        />
    );
}

function PasswordInput({ onChange }: any): JSX.Element {
    return (
        <GenericInput
            placeholder="Contraseña"
            type="password"
            icon={<Lock fontSize="large" />}
            onChange={onChange}
        />
    );
}

function Error(): JSX.Element {
    return (
        <Row className="error--section">
            <Typography variant="h4">
                Datos incorrectos, vuelva a intentarlo
            </Typography>
        </Row>
    );
}

export default function({ onClickIniciar, error }: any): JSX.Element {
	const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    return(
        <React.Fragment>
            <Container>
                <Row className="row--home row--company__icon">
                    <img
                        src={`data:image/png;base64,${CompanyImage["companyImage"]}`}
                        alt="Company Image"
                        className="row--company__image"
                    />
                </Row>
                <Row className="row--home row--login__form">
                    <EmailInput
                        onChange={(event: any) => setEmail(event.target.value)}
                    />
                </Row>
                <Row className="row--home">
                    <PasswordInput
                        onChange={(event: any) => setPassword(event.target.value)}
                    />
                </Row>
                <Row className="row--home row--iniciar__button">
                    <Col lg={10} xs={10}>
                        <Button
                            variant='company'
                            onClick={() => onClickIniciar({ email, password })}
                        >
                            Iniciar
                        </Button>
                        {error && <Error />}
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}
