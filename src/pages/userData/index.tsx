import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import { Form, Button } from 'react-bootstrap';
import { Grid } from '@material-ui/core';

function Input({ type, id, label, placeholder, value, onChange }: any): JSX.Element {
    return (
        <Grid xs={12} container justify='center'>
            <Form.Group controlId={id}>
                <Form.Label>{label}</Form.Label>
                <Form.Control value={value} type={type}
                	placeholder={placeholder} onChange={onChange} />
            </Form.Group>
        </Grid>
    );
}

export default function({ crear = true, onClickBack, id }: any): JSX.Element {
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
	const baseUrl = 'http://localhost:8000/';

	useEffect(() => {
		if (id) {
			const url = `${baseUrl}api/usuario/${id}`;
			
			fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
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
		const url = `${baseUrl}api/usuario${crear ? '/nuevo' : ''}`;
		const method = crear ? 'POST' : 'PUT';

		fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nombre: name,
				apellido1: firstSurname,
				apellido2: secondSurname,
				DNI: dni,
				localidad: location,
				email,
				telefono: telephone,
				aspiraciones: aspirations,
				observaciones: observations,
				fecha_nacimiento: dateOfBirth,
				password,
				rol
			}),
			credentials: 'include'
		}).then((res) => res.json()).then((jsonResponse: any) => {
			console.log(`Se ha creado el usuario correctamente`);
			
			onClickBack();
		});
	}

    return (
        <React.Fragment>
            <Header
                icon='arrow_back'
                onIconClick={onClickBack}
                title={crear ? 'Nuevo usuario' : 'Datos usuario'}
            />
            <Form>
                <Grid justify='center' container>
                    <Grid xs={5} container item justify='center'>
                        <Input
                            type='text'
                            id='userName'
                            label='Nombre'
                            placeholder={'Introduzca su nombre'}
                            value={name}
                            onChange={(event: any) => setName(event.target.value)}
                        />
                        <Input
                            type='text'
                            id='primerApellido'
                            label='Primer apellido'
                            placeholder={'Introduzca su primer apellido'}
                            value={firstSurname}
                            onChange={(event: any) => setFirstSurname(event.target.value)}
                        />
                        <Input
                            type='text'
                            id='segundoApellido'
                            label='Segundo apellido'
                            placeholder={'Introduzca su segudo apellido'}
                            value={secondSurname}
                            onChange={(event: any) => setSecondSurname(event.target.value)}
                        />
                        <Input
                            type='text'
                            id='dni'
                            label='DNI'
                            placeholder={'Introduzca su DNI'}
                            value={dni}
                            onChange={(event: any) => setDni(event.target.value)}
                        />
                        <Input
                            type='date'
                            id='dateOfBirth'
                            label='Fecha de nacimiento'
                            placeholder={'dd/mm/aaaa'}
                            value={dateOfBirth}
                            onChange={(event: any) => setDateOfBirth(event.target.value)}
                        />
                        <Input
                            type='text'
                            id='localidad'
                            label='localidad'
                            placeholder={'Introduzca su localidad'}
                            value={location}
                            onChange={(event: any) => setLocation(event.target.value)}
                        />
                    </Grid>
                    <Grid xs={5} container item justify='center'>
                        <Input
                            type='text'
                            id='telefono'
                            label='Teléfono'
                            placeholder={'Introduzca su teléfono'}
                            value={telephone}
                            onChange={(event: any) => setTelephone(event.target.value)}
                        />
                        <Input
                            type='email'
                            id='email'
                            label='Email'
                            placeholder={'Introduzca su email'}
                            value={email}
                            onChange={(event: any) => setEmail(event.target.value)}
                        />
                        <Input
                            type='password'
                            id='password'
                            label='Password'
                            placeholder={'Introduzca su contraseña'}
                            value={password}
                            onChange={(event: any) => setPassword(event.target.value)}
                        />
                        <Input
                            type='text'
                            id='aspiraciones'
                            label='Aspiraciones'
                            placeholder={'Introduzca sus aspiraciones'}
                            value={aspirations}
                            onChange={(event: any) => setAspirations(event.target.value)}
                        />
                        <Input
                            type='text'
                            id='observaciones'
                            label='Observaciones'
                            placeholder={'Introduzca sus observaciones'}
                            value={observations}
                            onChange={(event: any) => setObservations(event.target.value)}
                        />
                        <Input
                            type='text'
                            id='rol'
                            label='Rol'
                            placeholder={'Introduzca su rol'}
                            value={rol}
                            onChange={(event: any) => setRol(event.target.value)}
                        />
                    </Grid>
                    <Grid xs={12} container item justify='center'>
                        <Button
                            size='lg'
                            variant='success'
                            onClick={onClick}
                        >
                            {crear ? 'Finalizar' : 'Modificar'}
                        </Button>
                    </Grid>
                </Grid>                
            </Form>
        </React.Fragment>
    );
}
