import React, { useState, useEffect } from 'react';
import { Header, Button, TextField } from '../../components';
import { Group, Mic } from '@material-ui/icons';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { Message } from '../../types';
import { newChatMessage, getChat } from '../../interactionsWithServer';

import './chat.scss';

function Message({ message, ownUser }: any): JSX.Element {
    const { id_participante, contenido }: any = message;

    return (
        <Grid xs={12} container item justify={id_participante === ownUser.id ? "flex-end" : "flex-start"}>
            <Typography className="hisMessage" variant="h6" paragraph={true} align="left">
                {contenido}
            </Typography>
        </Grid>
    );
}

export default function Chat({ ownUser, onClickBack, activity }: any): JSX.Element {
    const [newMessage, setNewMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const { nombre = '', id_actividad } = activity || {};

    useEffect(() => {
        const chat = setInterval(gettingMessages, 3000, id_actividad);

        return () => {
            clearInterval(chat);
        };

    }, []);

    function gettingMessages(id_actividad: number) {
        getChat(id_actividad).then(({ chat }: any) => {
            setMessages(chat);
        });
    }

    function createNewMessage({ id_actividad, contenido }: any) {
        newChatMessage({ id_actividad, contenido }).then(({ descripcion }: any) => {
            console.log(`Descripción al crear un nuevo mensaje al servidor: ${descripcion}`);
        }).catch(() => {
            console.log("Somethings goes wrong");
        });
    }

    return (
        <React.Fragment>
            <Header
                title={nombre}
                icon="arrow_back"
                onIconClick={onClickBack}
            />
            <Grid xs={12} container item justify="center">
                <Group className="chat--icon" />
            </Grid>
            <Grid xs={12} container item justify="center">
                <Grid className="chat--section" xs={8} container item justify="center">
                    {messages.map((mess: any, index: number) => (
                        <Message key={index} ownUser={ownUser} message={mess} />
                    ))}
                    <Grid className="write-message--section" xs={12} container item justify="center">
                        <Grid xs={7} container item justify="center">
                            <TextField
                                value={newMessage}
                                setter={setNewMessage}
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
                                onClick={() => createNewMessage({ id_actividad, contenido: newMessage })}
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