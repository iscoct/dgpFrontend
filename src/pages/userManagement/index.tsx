import React, { useState } from 'react';
import { Header, Button } from '../../components';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';

import './userManagement.scss';

function SelectSection({ selectedUser, setter, users }: any): JSX.Element {
    return (
        <Grid xs={12} item container justify="center">
            <Grid className="user-select--section" xs={6} container item justify="center">
                <FormControl variant="filled">
                    <InputLabel id="user--select">Buscar usuario</InputLabel>
                    <Select
                        labelId="user--select"
                        value={selectedUser}
                        onChange={(event: React.ChangeEvent<{ value: unknown }>): void => setter(event.target.value as string)}
                    >
                        {users.map((user: any, index: number) =>
                            <MenuItem key={index} value={user}>{user}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}

function SelectedUserSection({ user, onModifyUser, onRemoveUser, onSeeActivities }: any): JSX.Element {
    return user ? (
        <Grid className="user-selected--section" xs={12} container item justify="center">
            <Grid xs={10} container item justify="center">
                <Grid xs={2} container item alignItems="center" justify="center">
                    {user}
                </Grid>
                <Grid xs={3} container item justify="center">
                    <Button
                        variant='secondary'
                        onClick={() => onModifyUser(user)}
                    >
                        Modificar datos
                    </Button>
                </Grid>
                <Grid xs={3} container item justify="center">
                    <Button
                        variant='secondary'
                        onClick={() => onSeeActivities(user)}
                    >
                        Actividades Usuario
                    </Button>
                </Grid>
                <Grid xs={3} container item justify="center">
                    <Button
                        variant='secondary'
                        onClick={() => onRemoveUser(user)}
                    >
                        Eliminar
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    ) : <></>;
}

export default function UserManagement({ users, onClickBack, onModifyUser, onRemoveUser, onSeeActivities }: any): JSX.Element {
    const [user, setUser] = useState<string>('');

    return (
        <React.Fragment>
            <Header
                title="Gestionar Usuarios"
                onIconClick={onClickBack}
                icon="arrow_back"
            />
            <SelectSection
                users={users}
                selectedUser={user}
                setter={setUser}
            />
            <SelectedUserSection
                onModifyUser={onModifyUser}
                onRemoveUser={onRemoveUser}
                onSeeActivities={onSeeActivities}
                user={user}
            />
        </React.Fragment>
    );
}

/* 
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
} */
