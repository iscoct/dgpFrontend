import React from 'react';
import { Toolbar, IconButton, Typography, Grid } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

import './header.scss';

const IconSection = ({ icon, onIconClick }: any) => {
    return icon ? (
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onIconClick}>
            <Icon>{icon}</Icon>
        </IconButton>
    ) : null;
}

export default function({ icon, title, onIconClick }: any) {
    return (
        <Toolbar className="header--toolbar">
            <IconSection icon={icon} onIconClick={onIconClick} />
            <Grid container justify='center'>
                <Typography variant="h3">
                    {title}
                </Typography>
            </Grid>
        </Toolbar>
    );
}