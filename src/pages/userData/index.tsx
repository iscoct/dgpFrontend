import React, { useState, useRef } from 'react';
import { Header, TextField, Button, FileInput } from '../../components';
import { Form } from 'react-bootstrap';
import { Grid, FormControlLabel, Checkbox, Select, InputLabel, FormControl } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import './userData.scss';

function LikeElement({ value, setter, label }: any) {
    return (
        <Grid xs={6} container item justify="center">
            <FormControlLabel
                labelPlacement="start"
                control={
                    <Checkbox
                        value={value}
                        onChange={(event: any) => setter(event.target.value)}
                    />
                }
                label={label}
            />
        </Grid>
    );
}

export default function({ create = true, onClickBack, onClick, user = {} }: any): JSX.Element {
    const { nombre, apellido1, apellido2, rol: defaultRol, DNI, fecha_nacimiento,
        localidad, email: defaultEmail, password: defaultPassword, telefono,
        aspiraciones, observaciones } = user;
	const [name, setName] = useState<string>(nombre || '');
	const [firstSurname, setFirstSurname] = useState<string>(apellido1 || '');
	const [secondSurname, setSecondSurname] = useState<string>(apellido2 || '');
	const [dni, setDni] = useState<string>(DNI || '');
	const [location, setLocation] = useState<string>(localidad || '');
	const [telephone, setTelephone] = useState<string>(telefono || '');
	const [email, setEmail] = useState<string>(defaultEmail || '');
	const [password, setPassword] = useState<string>(defaultPassword || '');
	const [aspirations, setAspirations] = useState<string>(aspiraciones || '');
	const [observations, setObservations] = useState<string>(observaciones || '');
	const [rol, setRol] = useState<string>(defaultRol || '');
    const [dateOfBirth, setDateOfBirth] = useState<Date>(fecha_nacimiento || new Date());
    const [firstLike, setFirstLike] = useState<boolean>(false);
    const [secondLike, setSecondLike] = useState<boolean>(false);
    const [thirdLike, setThirdLike] = useState<boolean>(false);
    const [forthLike, setForthLike] = useState<boolean>(false);
    const [fifthLike, setFifthLike] = useState<boolean>(false);
    const [sixthLike, setSixthLike] = useState<boolean>(false);
	const fileInput: any = useRef(null);

    return (
        <React.Fragment>
            <Header
                icon='arrow_back'
                onIconClick={onClickBack}
                title={create ? 'Nuevo usuario' : 'Datos usuario'}
            />
            <Form>
                <Grid justify='center' container>
                    <Grid className="user--form" xs={5} container item justify='center'>
                        <TextField
                            value={name}
                            setter={setName}
                            label="Nombre"
                        />
                        <TextField
                            value={firstSurname}
                            label="Primer apellido"
                            setter={setFirstSurname}
                        />
                        <TextField
                            value={secondSurname}
                            label="Segundo apellido"
                            setter={setSecondSurname}
                        />
                        <TextField
                            value={dni}
                            setter={setDni}
                            label="DNI"
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className="date-of-birth--section"
                                format="dd/MM/yyyy"
                                value={dateOfBirth}
                                onChange={(newDate: any) => setDateOfBirth(newDate)}
                                InputAdornmentProps={{ position: "end" }}
                            />
                        </MuiPickersUtilsProvider>
                        <TextField
                            value={location}
                            label="Localidad"
                            setter={setLocation}
                        />
                    </Grid>
                    <Grid className="user--form" xs={5} container item justify='center'>
                        <TextField
                            label="Teléfono"
                            value={telephone}
                            setter={setTelephone}
                        />
                        <TextField
                            type="email"
                            label="Email"
                            value={email}
                            setter={setEmail}
                        />
                        <TextField
                            type="password"
                            label="Password"
                            setter={setPassword}
                            value={password}
                        />
                        <TextField
                            label="Aspiraciones"
                            value={aspirations}
                            setter={setAspirations}
                        />
                        <TextField
                            label="Observaciones"
                            value={observations}
                            setter={setObservations}
                        />
                        <Grid xs={12} className="select--section" container item justify="center">
                            <FormControl variant="outlined">
                                <InputLabel htmlFor='rol-user--select'>Rol</InputLabel>
                                <Select
                                    value={rol}
                                    onChange={(event: any) => setRol(event.target.value)}
                                    inputProps={{
                                        id: 'rol-user--select'
                                    }}
                                >
                                    <option value="socio">Socio</option>
                                    <option value="voluntario">Voluntario</option>
                                    <option value="administrador">Administrador</option>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid xs={12} container item justify='center'>
                        <FileInput
                            id="new-image-for-user"
                            fileInput={fileInput}
                        />
                    </Grid>
                    <Grid xs={12} container item justify="center">
                        <Grid className="likes--section" xs={6} container item justify="center">
                            <Grid className="like-title--section" xs={12} container item>
                                Gustos
                            </Grid>
                            <LikeElement
                                value={firstLike}
                                setter={setFirstLike}
                                label="Deportes"
                            />
                            <LikeElement
                                value={secondLike}
                                setter={setSecondLike}
                                label="Deportes"
                            />
                            <LikeElement
                                value={thirdLike}
                                setter={setThirdLike}
                                label="Deportes"
                            />
                            <LikeElement
                                value={forthLike}
                                setter={setForthLike}
                                label="Deportes"
                            />
                            <LikeElement
                                value={fifthLike}
                                setter={setFifthLike}
                                label="Deportes"
                            />
                            <LikeElement
                                value={sixthLike}
                                setter={setSixthLike}
                                label="Deportes"
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} className="button-user-data--section" container item justify="center">
                        <Grid xs={4} container item justify='center'>
                            <Button
                                variant='company'
                                onClick={() => onClick({
                                    nombre: name,
                                    apellido1: firstSurname,
                                    apellido2: secondSurname,
                                    DNI: dni,
                                    fecha_nacimiento: dateOfBirth,
                                    localidad: location,
                                    email,
                                    telefono: telephone,
                                    aspiraciones: aspirations,
                                    observaciones: observations,
                                    password,
                                    imagen: fileInput.current.file[0]
                                })}
                            >
                                {create ? 'Finalizar' : 'Modificar'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>                
            </Form>
        </React.Fragment>
    );
}
