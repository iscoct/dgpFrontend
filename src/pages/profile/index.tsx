import React from 'react';
import Header from '../../components/header';
import { Avatar, Typography, makeStyles } from '@material-ui/core';
import { Container, Row } from 'react-bootstrap';
import Sidedrawer from '../../components/sidedrawer';

import './profile.scss';

export default function(props: any): JSX.Element {
    const { nombre, localidad, dateBirth, email, telefono, observations, acciones } = props;
    const typographyClasses = makeStyles({
        h4: {
            color: 'white'
        },
        h5: {
            color: 'white'
        },
        h6: {
            color: 'white'
        }
    })();
    const [state, setState] = React.useState({
        opened: false
    });
    const toggle = () => {
        setState({
            opened: !state.opened
        });
    };

    return (
        <React.Fragment>
            <Header onIconClick={toggle} icon='dehaze' title='Perfil' />
            <Sidedrawer opened={state.opened} toggle={toggle} acciones={acciones} />
            <Container className='profileContainer'>
                <Row className='avatar profileRow'>
                    <Avatar>Cotan</Avatar>
                </Row>
                <Row className='personalData profileRow'>
                    <Typography classes={{ h4: typographyClasses.h4 }} variant='h4'>{nombre}</Typography>
                </Row>
                <Row className='profileRow'>
                    <Typography classes={{ h5: typographyClasses.h5 }} variant='h5'>{localidad}</Typography>
                </Row>
                <Row className='profileRow'>
                    <Typography classes={{ h5: typographyClasses.h5 }} variant='h5'>{dateBirth}</Typography>
                </Row>
                <Row className='profileRow'>
                    <Typography classes={{ h5: typographyClasses.h5 }} variant='h5'>{email}</Typography>
                </Row>
                <Row className='profileRow'>
                    <Typography classes={{ h5: typographyClasses.h5 }} variant='h5'>{telefono}</Typography>
                </Row>
                <Row className='description profileRow'>
                    <Typography classes={{ h6: typographyClasses.h6 }} variant='h6'>{observations}</Typography>
                </Row>
            </Container>
        </React.Fragment>
    );
}
