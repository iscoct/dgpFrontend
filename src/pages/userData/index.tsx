import React, { useState } from 'react';
import Header from '../../components/header';
import { Form, Button } from 'react-bootstrap';
import { Grid } from '@material-ui/core';

function Input({ type, id, label, placeholder }: any): JSX.Element {
    return (
        <Grid xs={12} container justify='center'>
            <Form.Group controlId={id}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type={type} placeholder={placeholder} />
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
	
	function onClick() {
		const url = `http://localhost:8000/api/usuario${crear ? 'nuevo' : ''}`;
		
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
				password
			})
		}).then((res) => res.json()).then((jsonResponse) => {
			console.log(`Response: ${JSON.stringify(jsonResponse)}`);
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
                            type='type'
                            id='userName'
                            label='Nombre'
                            placeholder={usuario.nombre || 'Introduzca su nombre'}
                            value={name}
                            onChange={(event: any) => setName(event.target.value)}
                        />
                        <Input
                            type='type'
                            id='primerApellido'
                            label='Primer apellido'
                            placeholder={usuario.primerApellido || 'Introduzca su primer apellido'}
                            value={firstSurname}
                            onChange={setFirstSurname}
                        />
                        <Input
                            type='type'
                            id='segundoApellido'
                            label='Segundo apellido'
                            placeholder={usuario.segundoApellido || 'Introduzca su segudo apellido'}
                            value={secondSurname}
                            onChange={setSecondSurname}
                        />
                        <Input
                            type='type'
                            id='dni'
                            label='DNI'
                            placeholder={usuario.dni || 'Introduzca su DNI'}
                            value={dni}
                            onChange={setDni}
                        />
                        <Input
                            type='type'
                            id='dateOfBirth'
                            label='Fecha de nacimiento'
                            placeholder={usuario.fechaDeNacimiento || 'dd/mm/aaaa'}
                        />
                        <Input
                            type='type'
                            id='localidad'
                            label='localidad'
                            placeholder={usuario.localidad || 'Introduzca su localidad'}
                            value={location}
                            onChange={setLocation}
                        />
                    </Grid>
                    <Grid xs={5} container item justify='center'>
                        <Input
                            type='type'
                            id='telefono'
                            label='Teléfono'
                            placeholder={usuario.telefono || 'Introduzca su teléfono'}
                            value={telephone}
                            onChange={setTelephone}
                        />
                        <Input
                            type='email'
                            id='email'
                            label='Email'
                            placeholder={usuario.email || 'Introduzca su email'}
                            value={email}
                            onChange={setEmail}
                        />
                        <Input
                            type='password'
                            id='password'
                            label='Password'
                            placeholder={'Introduzca su contraseña'}
                            value={password}
                            onChange={setPassword}
                        />
                        <Input
                            type='text'
                            id='aspiraciones'
                            label='Aspiraciones'
                            placeholder={usuario.aspiraciones || 'Introduzca sus aspiraciones'}
                            value={aspirations}
                            onChange={setAspirations}
                        />
                        <Input
                            type='type'
                            id='observaciones'
                            label='Observaciones'
                            placeholder={usuario.observaciones || 'Introduzca sus observaciones'}
                            value={observations}
                            onChange={setObservations}
                        />
                        <Input
                            type='type'
                            id='rol'
                            label='Rol'
                            placeholder={usuario.rol || 'Introduzca su rol'}
                            value={rol}
                            onChange={setRol}
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
