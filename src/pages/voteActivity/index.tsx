import React, { useState } from 'react';
import { Header, Button, ActivityHeader } from '../../components';
import { Grid, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import './voteActivity.scss';

const Information = ({ section, text }: any) => {
    return (
        <Grid xs={8} justify="center" container item>
            <Typography className="activity--typography" variant={section}>
                {text}
            </Typography>
        </Grid>
    );
};

function getParticipantNames(participants: any): string {
    let participantNames = '';

    participants && participants.forEach((participant: any) => {
        participantNames += ` ${participant.nombre} `;
    });

    return participantNames;
}

export default function({ onClickBack, onClickVote, activity }: any): JSX.Element {
    const { nombre, descripcion, participantes } = activity || {};
    const [rating, setRating] = useState<number>(5);

    return (
        <React.Fragment>
            <Header
                title='Valorar'
                icon='arrow_back'
                onIconClick={onClickBack}
            />
            <Grid item container justify='center'>
                <ActivityHeader
                    title={nombre}
                    description={descripcion}
                    alt="La actividad no tiene imagen asociada"
                />
                <Information section="h5" text={`Participantes: ${getParticipantNames(participantes)}`} />
                <Grid className="rating--section" justify='center' container item>
                    <Grid xs={12} justify='center' container item>
                        <Rating
                            onChange={(event, newValue) => setRating(newValue)}
                            name='votingActivity'
                            value={rating}
                        />
                    </Grid>
                    <Grid xs={4} justify='center' container item>
                        <Button variant="company" onClick={() => onClickVote({ rating, activity })}>
                            Valorar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}