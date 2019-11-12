import React, { useState } from 'react';
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

export default function({ crear = true, onClickBack, usuario = {} }: any): JSX.Element {
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

	function onClick() {
		const url = `http://localhost:8000/api/usuario${crear ? '/nuevo' : ''}`;
		
		fetch(url, {
			method: 'POST',
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
		}).then((res) => res.json()).then((jsonResponse) => {
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
                            placeholder={usuario.nombre || 'Introduzca su nombre'}
                            value={name}
                            onChange={(event: any) => setName(event.target.value)}
                        />
                        <Input
                            type='text'
                            id='primerApellido'
                            label='Primer apellido'
                            placeholder={usuario.primerApellido || 'Introduzca su primer apellido'}
                            value={firstSurname}
                            onChange={(event: any) => setFirstSurname(event.target.value)}
                        />
                        <Input
                            type='text'
                            id='segundoApellido'
                            label='Segundo apellido'
                            placeholder={usuario.segundoApellido || 'Introduzca su segudo apellido'}
                            value={secondSurname}
                            onChange={(event: any) => setSecondSurname(event.target.value)}
                        />
                        <Input
                            type='text'
                            id='dni'
                            label='DNI'
                            placeholder={usuario.dni || 'Introduzca su DNI'}
                            value={dni}
                            onChange={(event: any) => setDni(event.target.value)}
                        />
                        <Input
                            type='date'
                            id='dateOfBirth'
                            label='Fecha de nacimiento'
                            placeholder={usuario.fechaDeNacimiento || 'dd/mm/aaaa'}
                            value={dateOfBirth}
                            onChange={(event: any) => setDateOfBirth(event.target.value)}
                        />
                        <Input
                            type='text'
                            id='localidad'
                            label='localidad'
                            placeholder={usuario.localidad || 'Introduzca su localidad'}
                            value={location}
                            onChange={(event: any) => setLocation(event.target.value)}
                        />
                    </Grid>
                    <Grid xs={5} container item justify='center'>
                        <Input
                            type='text'
                            id='telefono'
                            label='Teléfono'
                            placeholder={usuario.telefono || 'Introduzca su teléfono'}
                            value={telephone}
                            onChange={(event: any) => setTelephone(event.target.value)}
                        />
                        <Input
                            type='email'
                            id='email'
                            label='Email'
                            placeholder={usuario.email || 'Introduzca su email'}
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
                            placeholder={usuario.aspiraciones || 'Introduzca sus aspiraciones'}
                            value={aspirations}
                            onChange={(event: any) => setAspirations(event.target.value)}
                        />
                        <Input
                            type='text'
                            id='observaciones'
                            label='Observaciones'
                            placeholder={usuario.observaciones || 'Introduzca sus observaciones'}
                            value={observations}
                            onChange={(event: any) => setObservations(event.target.value)}
                        />
                        <Input
                            type='text'
                            id='rol'
                            label='Rol'
                            placeholder={usuario.rol || 'Introduzca su rol'}
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
