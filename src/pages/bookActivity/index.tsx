import React from 'react';
import Header from '../../components/header';
import { Grid, Typography } from '@material-ui/core';
import { Button, Form } from 'react-bootstrap';
import Pages from '../index';

import './bookActivity.scss';

function createDataProposal(onClickBook: any): JSX.Element {
    return (
        <Grid container justify='center'>
            <Form.Group controlId='dateProposal'>
                <Form.Label>
                    <Typography style={{ color: 'white' }}>
                        Proponga la fecha de la actividad
                    </Typography>
                </Form.Label>
                <Form.Control type='date' placeholder='dd/mm/aaaa' />
                <Grid xs={12} justify='center' container item>
                    <Button onClick={onClickBook} className='book-activity'>
                        Proponer
                    </Button>
                </Grid>
            </Form.Group>
        </Grid>
    );
}

function acceptOrRejectActivity(onClickBook: any): JSX.Element {
    return (
        <Grid container justify='center'>
            <Grid xs={12} justify='center' container item>
                <Typography style={{ color: 'white' }}>
                    Fecha Propuesta: 27/10/2019
                </Typography>
            </Grid>
            <Grid xs={12} justify='center' container item>
                <Typography style={{ color: 'white' }}>
                    Hora Propuesta: 18:30
                </Typography>
            </Grid>
            <Grid xs={12} justify='center' container item>
                <Typography style={{ color: 'white' }}>
                    Localización Propuesta: Avenidad del carmen 54
                </Typography>
            </Grid>
            <Grid xs={12} spacing={4} container item>
                <Grid xs={6} justify='flex-end' container item>
                    <Button onClick={onClickBook} size='lg' variant='success'>
                        Aceptar
                    </Button>
                </Grid>
                <Grid xs={6} justify='flex-start' container item>
                    <Button onClick={onClickBook} size='lg' variant='danger'>
                        Rechazar
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

function signingIntoActivity(onClickBook: any): JSX.Element {
    return (
        <Grid item>
            <Button
                onClick={onClickBook}
                className='book-activity'
            >
                Apuntarse
            </Button>
        </Grid>
    );
}

function createSubpage(phase: Symbol, onClickBook: any): JSX.Element {
    let subpage: JSX.Element = <></>;

    switch(phase) {
        case Pages.apuntarseActividad: {
            subpage = signingIntoActivity(onClickBook);
            break;
        } case Pages.aceptarORechazarActividad: {
            subpage = acceptOrRejectActivity(onClickBook);
            break;
        } case Pages.proponerFechaHoraActividad: {
            subpage = createDataProposal(onClickBook);
            break;
        }
    }

    return subpage;
}

export default function({ description, onClickBack, onClickBook, phase = 'signing' }: any): JSX.Element {
    const subpage = createSubpage(phase, onClickBook);

    return (
        <React.Fragment>
            <Header
                title='Título del evento'
                icon='arrow_back'
                onIconClick={onClickBack}
            />
            <Grid container justify='center'>
                <Grid container justify='center' item>
                    <Typography style={{ color: 'white' }}>
                        {description}
                    </Typography>
                </Grid>
                {subpage}
            </Grid>
        </React.Fragment>
    );
}