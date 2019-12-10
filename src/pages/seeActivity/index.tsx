import React from 'react';
import { Header, ActivityHeader, Button } from '../../components';
import { Typography, Grid } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import './seeActivity.scss';

function Participants({ participants }: any): JSX.Element {
    return participants ? (
        <React.Fragment>
            <Typography className="activity--typography" variant="body1">
                Participantes: {participants.join(", ")}
            </Typography>
        </React.Fragment>
    ) : <></>;
}

function ButtonSection(props: any): JSX.Element {
    const { onClick } = props;
    const page: 'see' | 'signUp' = props.page;
    const possiblyButtonTextByPage = {
        see: 'Terminar Actividad',
        signUp: 'Confirmar'
    };

    return (
        <Grid className="button--section" xs={12} container item justify="center">
            <Grid xs={4} container item justify="center">
                <Button
                    variant='company'
                    onClick={onClick}
                >
                    {possiblyButtonTextByPage[page]}
                </Button>
            </Grid>
        </Grid>
    );
}

function Assessment(): JSX.Element {
    return (
        <Grid className="vote--section" xs={8} container item justify="center">
            <Grid xs={12} container item justify="flex-start">
                Valoración
            </Grid>
            <Grid xs={12} className="user-information" container item justify="center">
                <Grid xs={4} container item>
                    Juan Fernández López
                </Grid>
                <Grid className="activity--rate" xs={4} container item>
                    <Rating value={4} readOnly={true} />
                </Grid>
                <Grid xs={4} container item>
                    Socio
                </Grid>
            </Grid>
            <Grid className="comment--activity" xs={12} container item justify="center">
                Me ha gustado mucho la actividad, el voluntario era incluso demasiado simpático jeje, repetiré
            </Grid>
        </Grid>
    );
}

function AdminSection(): JSX.Element {
    return (
        <Grid className="admin--section" xs={12} container item justify="center">
            <Assessment />
            <Assessment />
        </Grid>
    );
}
export default function SeeActivity(props: any): JSX.Element {
    const { onClickBack, onClick, participants, date, localization, mustShowButton = true } = props;
    const page: 'see' | 'signUp' | 'adminSee' = props.page || 'see';
    const possiblyTitle = {
        see: 'Ver',
        adminSee: 'Ver',
        signUp: 'Apuntarme'
    };

    return (
        <React.Fragment>
            <Header
                title={possiblyTitle[page]}
                icon='arrow_back'
                onIconClick={onClickBack}
            />
            <ActivityHeader
                title="Título de la actividad"
                description="Dummy Description"
                image="dummyImage"
                alt="La actividad no tiene foto asociada"
            />
            <Participants
                participants={participants}
            />
            <Typography className="activity--typography" variant="body1">
                Fecha y hora: {date.toLocaleString()}
            </Typography>
            <Typography className="activity--typography" variant="body1">
                Lugar de realización: {localization}
            </Typography>
            {mustShowButton && page !== "adminSee" ?
                <ButtonSection onClick={onClick} page={page} /> : ''}
            {page === 'adminSee' ? <AdminSection /> : ''}
        </React.Fragment>
    );
}