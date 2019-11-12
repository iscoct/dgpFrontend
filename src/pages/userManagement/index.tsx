import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import { List, ListItem, Divider,
    makeStyles, Grid, Chip, Typography } from '@material-ui/core';

import './userManagement.scss';

export default function({ onClickBack, onModifyUser }: any): JSX.Element {
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
    const [users, setUsers] = useState<any[]>([]);
	const url = 'http://localhost:8000/';

	function onRemoveUser(user: any) {
		fetch(`${url}api/usuario/${user.id}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => res.json()).then((jsonResponse) => {
			console.log(`Response: ${JSON.stringify(jsonResponse)}`);
		});
	}

	useEffect(() => {
		fetch(`${url}api/usuarios`, {
			method: 'GET',
			credentials: 'include'
		}).then((response) => response.json()).then(({ usuarios }) => {
			if (JSON.stringify(usuarios) !== JSON.stringify(users)) {
				setUsers(usuarios);
			}
		});
	}, [users]);

    return (
        <React.Fragment>
            <Header
                icon='arrow_back'
                onIconClick={onClickBack}
                title='Gestión de Usuarios'
            />
            {users ?
                <List>
                    {users.map((user: any, index: number) => {
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
                                                {user.nombre}
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
