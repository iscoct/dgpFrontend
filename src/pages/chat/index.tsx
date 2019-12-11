import React, { useState } from 'react';
import { Header, Button, TextField } from '../../components';
import { Group, Mic } from '@material-ui/icons';
import { Grid, IconButton, Typography } from '@material-ui/core';

import './chat.scss';

function Message({ message }: any): JSX.Element {
    const { owner, text }: any = message;

    return (
        <Grid xs={12} container item justify={owner === 'Mine' ? "flex-end" : "flex-start"}>
            <Typography className="hisMessage" variant="h6" paragraph={true} align="left">
                {text}
            </Typography>
        </Grid>
    );
}

export default function Chat({ title, onClickBack, otherUserName, messages }: any): JSX.Element {
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
                    {messages.map((mess: any, index: number) => (
                        <Message key={index} message={mess} />
                    ))}
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