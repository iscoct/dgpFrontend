import React, { useState, useEffect, useRef } from 'react';
import { Header, TextField, Button } from '../../components';
import { Form } from 'react-bootstrap';
import { Grid, FormControlLabel, Checkbox } from '@material-ui/core';
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

export default function({ create = true, onClickBack, id }: any): JSX.Element {
	const [name, setName] = useState<string>('');
	const [firstSurname, setFirstSurname] = useState<string>('');
	const [secondSurname, setSecondSurname] = useState<string>('');
	const [dni, setDni] = useState<string>('');
	const [location, setLocation] = useState<string>('');
	const [telephone, setTelephone] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [aspirations, setAspirations] = useState<string>('');
	const [observations, setObservations] = useState<string>('');
	const [rol, setRol] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
    const [firstLike, setFirstLike] = useState<boolean>(false);
    const [secondLike, setSecondLike] = useState<boolean>(false);
    const [thirdLike, setThirdLike] = useState<boolean>(false);
    const [forthLike, setForthLike] = useState<boolean>(false);
    const [fifthLike, setFifthLike] = useState<boolean>(false);
    const [sixthLike, setSixthLike] = useState<boolean>(false);
	const fileInput: any = useRef(null);
	const baseUrl = 'http://localhost:8000/';

	useEffect(() => {
		if (id) {
			const url = `${baseUrl}api/usuario/${id}`;
			
			fetch(url, {
				method: 'GET',
				credentials: 'include'
			}).then((res) => res.json()).then(({ usuario }: any) => {
				setName(usuario.nombre);
				setFirstSurname(usuario.apellido1);
				setSecondSurname(usuario.apellido2);
				setDni(usuario.DNI);
				setLocation(usuario.localidad);
				setTelephone(usuario.telefono);
				setEmail(usuario.email);
				setPassword(usuario.password);
				setAspirations(usuario.aspiraciones);
				setObservations(usuario.observaciones);
				setRol(usuario.rol);
				setDateOfBirth(usuario.fecha_nacimiento);
			});
		}
	}, []);

	function onClick() {
		if (fileInput && fileInput.current && fileInput.current.files) {
			const url = `${baseUrl}api/usuario${create ? '/nuevo' : '/modificar'}`;
			const method ='POST';
			const formData = new FormData();
			const file = fileInput.current.files[0];
			
			formData.append('nombre', name);
			formData.append('rol', rol);
			formData.append('apellido1', firstSurname);
			formData.append('apellido2', secondSurname);
			formData.append('DNI', dni);
			formData.append('fecha_nacimiento', dateOfBirth.toString());
			formData.append('localidad', location);
			formData.append('email', email);
			formData.append('telefono', telephone);
			formData.append('aspiraciones', aspirations);
			formData.append('observaciones', observations);
			formData.append('password', password);
			formData.append('imagen', file, file.name);
			formData.append('id', id);

			fetch(url, {
				method,
				body: formData,
				credentials: 'include'
			}).then((res) => res.json()).then(() => {
				console.log(`Se ha creado el usuario correctamente`);
				
				onClickBack();
			});
		}
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
                        <TextField
                            label="Rol"
                            value={rol}
                            setter={setRol}
                        />
                    </Grid>
                    <Grid xs={12} container item justify='center'>
                    	<input
                            style={{ marginTop: '2rem' }}
                    		type='file'
                    		ref={fileInput}
                    		accept="image/png"
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
                    <Grid xs={12} container item justify="center">
                        <Grid xs={4} container item justify='center'>
                            <Button
                                variant='company'
                                onClick={onClick}
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
