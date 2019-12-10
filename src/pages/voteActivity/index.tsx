import React from 'react';
import { Header, Button, ActivityHeader } from '../../components';
import { Grid, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import './voteActivity.scss';

const Information = ({ section, text }: any) => {
    return (
        <Grid xs={8} justify="center" container>
            <Typography className="activity--typography" variant={section}>
                {text}
            </Typography>
        </Grid>
    );
};

export default function({ title, description, onClickBack, onClickVote,
        onRatingChange, ratingValue, volunteerName }: any): JSX.Element {
            
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
                            onChange={onRatingChange}
                            name='votingActivity'
                            value={ratingValue}
                        />
                    </Grid>
                    <Grid xs={4} justify='center' container item>
                        <Button variant="company" onClick={onClickVote}>
                            Valorar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}