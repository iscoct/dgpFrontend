import React from 'react';
import Header from '../../components/header';
import { Grid, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Button } from 'react-bootstrap';

export default function({ description, onClickBack, onClickVote,
        onRatingChange, ratingValue }: any): JSX.Element {
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
                <Grid justify='center' container item>
                    <Grid xs={12} justify='center' container item>
                        <Rating
                            onChange={onRatingChange}
                            name='votingActivity'
                            value={ratingValue}
                        />
                    </Grid>
                    <Grid xs={12} justify='center' container item>
                        <Button onClick={onClickVote} size='lg'>
                            Valorar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}