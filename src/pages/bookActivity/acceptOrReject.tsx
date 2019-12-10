import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Button } from '../../components';

export default function AcceptOrReject({ onClickBook, date, time, location }: any): JSX.Element {
    return (
        <Grid className='book__activity--section' container justify='center'>
            <Grid xs={12} justify='center' container item>
                <Typography style={{ color: 'white' }}>
                    Fecha Propuesta: {date}
                </Typography>
            </Grid>
            <Grid xs={12} justify='center' container item>
                <Typography style={{ color: 'white' }}>
                    Hora Propuesta: {time}
                </Typography>
            </Grid>
            <Grid xs={12} justify='center' container item>
                <Typography style={{ color: 'white' }}>
                    Localización Propuesta: {location}
                </Typography>
            </Grid>
            <Grid xs={12} spacing={4} container item>
                <Grid xs={6} justify='flex-end' container item>
                    <Button onClick={() => onClickBook({ accepted: true })} size='lg' variant='success'>
                        Aceptar
                    </Button>
                </Grid>
                <Grid xs={6} justify='flex-start' container item>
                    <Button onClick={() => onClickBook({ accepted: false })} size='lg' variant='danger'>
                        Rechazar
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}