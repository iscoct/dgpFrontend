import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Group } from '@material-ui/icons';
import { Image } from 'react-bootstrap';

import './activityHeader.scss';

export default function({ title, image, alt, description }: any) {
    return (
        <Grid className="activity--header" xs={12} justify="center" container>
            <Grid xs={8} justify="center" item container>
                <Typography className="activity--typography" variant="h3">
                    {title}
                </Typography>
            </Grid>
            <Grid className="comment--section" container justify="center">
                {image ? (
                    <Image alt={alt} src={`${process.env.SERVER_URL}images/${image}`} />
                ) : ''}
                <Group className="group--icon" />
            </Grid>
            <Grid xs={8} justify="center" container>
                <Typography className="activity--typography" variant="h5">
                    {description}
                </Typography>
            </Grid>
        </Grid>
    );
}