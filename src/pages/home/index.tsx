import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Input, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';

import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

export default function({ onClickIniciar }: any): JSX.Element {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const labelClasses = makeStyles({
        root: {
            color: 'white'
        }
    })();
    const classes = makeStyles({
        fontSizeLarge: {
            justifyContent: 'center',
            alignContent: 'center'
        }
    })();

    return(
        <React.Fragment>
            <Container>
                <Row>
                    <PersonIcon
                        classes={{
                            fontSizeLarge: classes.fontSizeLarge
                        }}
                        fontSize='large'
                    />
                </Row>
                <Row>
                    <InputLabel
                        htmlFor="correo"
                        classes={{
                            root: labelClasses.root
                        }}
                    >
                        Correo
                    </InputLabel>
                    <Input
                        id="correo"
                        fullWidth={true}
                        placeholder="Correo"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Row>
                <Row>
                    <InputLabel
                        htmlFor="password"
                        classes={{
                            root: labelClasses.root
                        }}
                    >
                        Password
                    </InputLabel>
                    <Input
                        id="password"
                        fullWidth={true}
                        placeholder="Contraseña"
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={10}>
                        <Button
                            fullWidth={true}
                            size="large"
                            variant="contained"
                            color="primary"
                            style={{
                                background: 'linear-gradient(to bottom, #BE6F03, #eb8905)',
                                borderRadius: '10px'
                            }}
                            onClick={() => onClickIniciar({ email, password })}
                        >
                            Iniciar
                        </Button>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}
