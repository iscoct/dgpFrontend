import React from 'react';
import { Header, ActivityHeader, Button } from '../../components';
import { Typography, Grid } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import './seeActivity.scss';

function Participants({ participants }: any): JSX.Element {
    let participantNames = '';

    participants ? participants.forEach(({ nombre }: any) => {
        participantNames += ` ${nombre} `;
    }) : <></>;

    return (
        <React.Fragment>
            <Typography className="activity--typography" variant="body1">
                Participantes: {participantNames}
            </Typography>
        </React.Fragment>
    );
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

function Assessment({ data }: any): JSX.Element {
    const { userName, rate, description, rol } = data;

    return (
        <Grid className="vote--section" xs={8} container item justify="center">
            <Grid xs={12} container item justify="flex-start">
                Valoración
            </Grid>
            <Grid xs={12} className="user-information" container item justify="center">
                <Grid xs={4} container item>
                    {userName}
                </Grid>
                <Grid className="activity--rate" xs={4} container item>
                    <Rating value={rate} readOnly={true} />
                </Grid>
                <Grid xs={4} container item>
                    {rol}
                </Grid>
            </Grid>
            <Grid className="comment--activity" xs={12} container item justify="center">
                {description}
            </Grid>
        </Grid>
    );
}

function AdminSection({ assessments }: any): JSX.Element {
    return (
        <Grid className="admin--section" xs={12} container item justify="center">
            {
                Array.isArray(assessments) && assessments.map((assessment: any, index: number) => (
                    <Assessment key={index} data={assessment} />
                ))
            }
        </Grid>
    );
}

export default function SeeActivity(props: any): JSX.Element {
    const { onClickBack, onClick, activity, mustShowButton = true } = props;
    const { nombre, descripcion, imagen, id_actividad,
        participantes, fecha, localizacion, valoraciones } = activity || {};
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
                title={nombre}
                description={descripcion}
                image={imagen}
                alt="La actividad no tiene foto asociada"
            />
            <Participants
                participants={participantes}
            />
            { fecha ?
                <Typography className="activity--typography" variant="body1">
                    Fecha y hora: {fecha instanceof Date ? fecha.toLocaleString() : fecha}
                </Typography> : <></>
            }
            { localizacion ?
                <Typography className="activity--typography" variant="body1">
                    Lugar de realización: {localizacion}
                </Typography> : <></>
            }
            {mustShowButton && page !== "adminSee" ?
                <ButtonSection onClick={() => onClick({ id_actividad, localizacion, fecha })} page={page} /> : ''}
            {page === 'adminSee' ? <AdminSection assessments={valoraciones} /> : ''}
        </React.Fragment>
    );
}