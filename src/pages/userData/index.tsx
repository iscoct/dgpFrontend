import React, { useState, useRef } from 'react';
import { Header, TextField, Button, FileInput } from '../../components';
import { Form } from 'react-bootstrap';
import { Grid, Select, InputLabel, FormControl } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Cine, Compras, Deporte, Excursion, Juegos, Mas } from './img';

import './userData.scss';

function LikeElement({ src, alt, onClick }: any) {
    return (
        <Grid xs={6} className="likes-images--container" container item justify="center">
            <img
                src={`data:image/png;base64,${src}`}
                alt={alt}
                className="likes--images"
                onClick={onClick}
            />
        </Grid>
    );
}

export default function({ create = true, onClickBack, onClick, user = {} }: any): JSX.Element {
    const { nombre, apellido1, apellido2, rol: defaultRol, DNI, fecha_nacimiento,
        localidad, email: defaultEmail, password: defaultPassword, telefono,
        aspiraciones, observaciones, id } = user;
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
    const [likeCinema, setLikeCinema] = useState<boolean>(false);
    const [likeShooping, setLikeShooping] = useState<boolean>(false);
    const [likeSports, setLikeSports] = useState<boolean>(false);
    const [likeExcursion, setLikeExcursion] = useState<boolean>(false);
    const [likePlay, setLikePlay] = useState<boolean>(false);
    const [likeOther, setLikeOther] = useState<boolean>(false);
	const fileInput: any = useRef(null);

    function formatLikes() {
        const likes = [];

        if (likeCinema) {
            likes.push("Cine");
        }

        if (likeShooping) {
            likes.push("Compras");
        }

        if (likeSports) {
            likes.push("Deportes");
        }

        if (likeExcursion) {
            likes.push("Ocio");
        }

        if (likePlay) {
            likes.push("Juegos de Mesa");
        }

        if(likeOther) {
            likes.push("Otro");
        }

        return likes;
    }

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
                                <InputLabel className="select--label" htmlFor='rol-user--select'>Rol</InputLabel>
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
                                src={Cine[likeCinema ? "primary" : "secondary"]}
                                alt={`Cinema Symbol ${likeCinema ? "Selected" : "Deselected"}`}
                                onClick={() => setLikeCinema(! likeCinema)}
                            />
                            <LikeElement
                                src={Compras[likeShooping ? "primary" : "secondary"]}
                                alt={`Compras Symbol ${likeShooping ? "Selected" : "Deselected"}`}
                                onClick={() => setLikeShooping(! likeShooping)}
                            />
                            <LikeElement
                                src={Deporte[likeSports ? "primary" : "secondary"]}
                                alt={`Sports Symbol ${likeSports ? "Selected" : "Deselected"}`}
                                onClick={() => setLikeSports(! likeSports)}
                            />
                            <LikeElement
                                src={Excursion[likeExcursion ? "primary" : "secondary"]}
                                alt={`Excursion Symbol ${likeExcursion ? "Selected" : "Deselected"}`}
                                onClick={() => setLikeExcursion(! likeExcursion)}
                            />
                            <LikeElement
                                src={Juegos[likePlay ? "primary" : "secondary"]}
                                alt={`Games Symbol ${likePlay ? "Selected" : "Deselected"}`}
                                onClick={() => setLikePlay(! likePlay)}
                            />
                            <LikeElement
                                src={Mas[likeOther ? "primary" : "secondary"]}
                                alt={`Others Symbol ${likeOther ? "Selected" : "Deselected"}`}
                                onClick={() => setLikeOther(! likeOther)}
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
                                    rol,
                                    id,
                                    imagen: fileInput,
                                    gustos: formatLikes()
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
