import React, { useState } from 'react';
import { Header, Button, TextField } from '../../components';
import { Group, Mic } from '@material-ui/icons';
import { Grid, IconButton, Typography } from '@material-ui/core';

import './chat.scss';

function OwnMessage(): JSX.Element {
    return (
        <Grid xs={12} container item justify="flex-end">
            <Typography className="ownMessage" variant="h6" paragraph={true} align="right">
                My own message
            </Typography>
        </Grid>
    );
}

function HisMessage(): JSX.Element {
    return (
        <Grid xs={12} container item justify="flex-start">
            <Typography className="hisMessage" variant="h6" paragraph={true} align="left">
                His message
            </Typography>
        </Grid>
    );
}

export default function Chat({ title, onClickBack, otherUserName }: any): JSX.Element {
    const [message, setMessage] = useState<string>('');

    return (
        <React.Fragment>
            <Header
                title={title}
                icon="arrow_back"
                onIconClick={onClickBack}
            />
            <Grid xs={12} container item justify="center">
                <Group className="chat--icon" />
            </Grid>
            <Grid className="other-user-name--section" xs={12} container item justify="center">
                Compañero: {otherUserName}
            </Grid>
            <Grid xs={12} container item justify="center">
                <Grid className="chat--section" xs={8} container item justify="center">
                    <Grid xs={12} container item justify="center">
                        <OwnMessage />
                        <HisMessage />
                        <OwnMessage />
                    </Grid>
                    <Grid className="write-message--section" xs={12} container item justify="center">
                        <Grid xs={7} container item justify="center">
                            <TextField
                                value={message}
                                setter={setMessage}
                                label="Escribe un mensaje aquí"
                            />
                        </Grid>
                        <Grid xs={1} container item justify="center">
                            <IconButton>
                                <Mic className="mic--icon" />
                            </IconButton>
                        </Grid>
                        <Grid xs={4} container item justify="center">
                            <Button 
                                onClick={() => console.log("Se ha cliqueado para enviar un mensaje")}
                                variant="secondary"
                            >
                                Enviar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}