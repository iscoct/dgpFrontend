import React from 'react';
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

export default function({ consulta, onClick, onClickBack, usuario = {} }: any): JSX.Element {
    return (
        <React.Fragment>
            <Header
                icon='arrow_back'
                onIconClick={onClickBack}
                title={consulta ? 'Nuevo usuario' : 'Datos usuario'}
            />
            <Form>
                <Grid justify='center' container>
                    <Grid xs={5} container item justify='center'>
                        <Input
                            type='type'
                            id='userName'
                            label='Nombre'
                            placeholder={usuario.nombre || 'Introduzca su nombre'}
                        />
                        <Input
                            type='type'
                            id='primerApellido'
                            label='Primer apellido'
                            placeholder={usuario.primerApellido || 'Introduzca su primer apellido'}
                        />
                        <Input
                            type='type'
                            id='segundoApellido'
                            label='Segundo apellido'
                            placeholder={usuario.segundoApellido || 'Introduzca su segudo apellido'}
                        />
                        <Input
                            type='type'
                            id='dni'
                            label='DNI'
                            placeholder={usuario.dni || 'Introduzca su DNI'}
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
                        />
                    </Grid>
                    <Grid xs={5} container item justify='center'>
                        <Input
                            type='type'
                            id='telefono'
                            label='Teléfono'
                            placeholder={usuario.telefono || 'Introduzca su teléfono'}
                        />
                        <Input
                            type='email'
                            id='email'
                            label='Email'
                            placeholder={usuario.email || 'Introduzca su email'}
                        />
                        <Input
                            type='password'
                            id='password'
                            label='Password'
                            placeholder={'Introduzca su contraseña'}
                        />
                        <Input
                            type='text'
                            id='aspiraciones'
                            label='Aspiraciones'
                            placeholder={usuario.aspiraciones || 'Introduzca sus aspiraciones'}
                        />
                        <Input
                            type='type'
                            id='observaciones'
                            label='Observaciones'
                            placeholder={usuario.observaciones || 'Introduzca sus observaciones'}
                        />
                        <Input
                            type='type'
                            id='rol'
                            label='Rol'
                            placeholder={usuario.rol || 'Introduzca su rol'}
                        />
                    </Grid>
                    <Grid xs={12} container item justify='center'>
                        <Button
                            size='lg'
                            variant='success'
                            onClick={onClick}
                        >
                            {consulta ? 'Finalizar' : 'Modificar'}
                        </Button>
                    </Grid>
                </Grid>                
            </Form>
        </React.Fragment>
    );
}