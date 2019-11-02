import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, makeStyles, Grid } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

export default function({ icon, title, onIconClick }: any) {
    const appBar = makeStyles({
        colorDefault: {
            background: 'linear-gradient(#BE6F03, #FF9301)'
        }
    })();

    return (
        <React.Fragment>
            <AppBar classes={{ root: appBar.colorDefault }} position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={onIconClick}>
                        <Icon>{icon}</Icon>
                    </IconButton>
                    <Grid container justify='center'>
                        <Typography variant="h4">
                            {title}
                        </Typography>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}