import React from 'react';
import Header from '../../components/header';
import { List, ListItem, Divider,
    makeStyles, Grid, Chip, Typography } from '@material-ui/core';

import './userManagement.scss';

export default function({ usuarios, onClickBack, onModifyUser, onRemoveUser }: any): JSX.Element {
    const dividerClass = makeStyles({
        light: {
            backgroundColor: 'white'
        }
    })();
    const chipClasses = makeStyles({
        primary: {
            backgroundColor: 'green',
            width: '75%'
        },
        secondary: {
            backgroundColor: 'red',
            width: '75%'
        }
    })();
    const typographyClass = makeStyles({
        initial: {
            color: 'white'
        }
    })();

    return (
        <React.Fragment>
            <Header
                icon='arrow_back'
                onIconClick={onClickBack}
                title='Gestión de Usuarios'
            />
            {usuarios ?
                <List>
                    {usuarios.map((user: string, index: string) => {
                        return (
                            <React.Fragment key={index}>
                                <ListItem>
                                    <Grid justify='center' container>
                                        <Grid xs={4} container justify='center' item>
                                            <Typography
                                                classes={{
                                                    root: typographyClass.initial
                                                }}
                                            >
                                                {user}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={4} container justify='center' item>
                                            <Chip
                                                classes={{
                                                    root: chipClasses.primary
                                                }}
                                                label='Modificar Datos'
                                                color='primary'
                                                onClick={() => onModifyUser(user)}
                                            />
                                        </Grid>
                                        <Grid xs={4} container justify='center' item>
                                            <Chip
                                                classes={{
                                                    root: chipClasses.secondary
                                                }}
                                                label='Eliminar'
                                                color='secondary'
                                                onClick={() => onRemoveUser(user)}
                                            />
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider light classes={{ light: dividerClass.light }} />
                            </React.Fragment>
                        );
                    })}
                </List> : ''
            }
        </React.Fragment>
    );
}