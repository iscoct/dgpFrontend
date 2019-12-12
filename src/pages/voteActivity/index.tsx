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

export default function({ title, description, onClickBack, onClickVote, volunteerName }: any): JSX.Element {
    const [rating, setRating] = useState<number>(5);

    return (
        <React.Fragment>
            <Header
                title='Valorar'
                icon='arrow_back'
                onIconClick={onClickBack}
            />
            <Grid container justify='center'>
                <ActivityHeader
                    title={title}
                    description={description}
                    alt="La actividad no tiene imagen asociada"
                />
                <Information section="h5" text={`Voluntario: ${volunteerName}`} />
                <Grid className="rating--section" justify='center' container item>
                    <Grid xs={12} justify='center' container item>
                        <Rating
                            onChange={(event, newValue) => setRating(newValue)}
                            name='votingActivity'
                            value={rating}
                        />
                    </Grid>
                    <Grid xs={4} justify='center' container item>
                        <Button variant="company" onClick={() => onClickVote(rating)}>
                            Valorar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}