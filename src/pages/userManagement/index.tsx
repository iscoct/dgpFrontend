import React, { useState } from 'react';
import { Header, Button } from '../../components';
import { User } from '../../types';
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
                        onChange={(event: React.ChangeEvent<{ value: unknown }>): void => setter(users[event.target.value as number])}
                    >
                        {users && users.map((user: User, index: number) =>
                            <MenuItem key={index} value={index}>{user.nombre}</MenuItem>
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
                    {user.nombre}
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
    const [user, setUser] = useState<User>();

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