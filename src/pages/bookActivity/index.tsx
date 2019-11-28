import React, { useState } from 'react';
import Header from '../../components/header';
import { Grid, Typography } from '@material-ui/core';
import { Button, Form } from 'react-bootstrap';
import Pages from '../index';

import './bookActivity.scss';

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

export default function({ title, description, onClickBack, onClickBook, date, time, location, phase = 'signing' }: any): JSX.Element {
	function createSubpage(phase: Symbol, onClickBook: any): JSX.Element {
		const [date, setDate] = useState<string>('');
		const [time, setTime] = useState<string>('');
		const [location, setLocation] = useState<string>('');
		let subpage: JSX.Element = <></>;

		function signingIntoActivity(onClickBook: any): JSX.Element {
			return (
				<Grid item className='book__activity--section'>
				    <Button
				        onClick={onClickBook}
				        className='book__activity'
				    >
				        Apuntarse
				    </Button>
				</Grid>
			);
		}
		
		function acceptOrRejectActivity(onClickBook: any): JSX.Element {
			return (
				<Grid className='book__activity--section' container justify='center'>
				    <Grid xs={12} justify='center' container item>
				        <Typography style={{ color: 'white' }}>
				            Fecha Propuesta: {date}
				        </Typography>
				    </Grid>
				    <Grid xs={12} justify='center' container item>
				        <Typography style={{ color: 'white' }}>
				            Hora Propuesta: {time}
				        </Typography>
				    </Grid>
				    <Grid xs={12} justify='center' container item>
				        <Typography style={{ color: 'white' }}>
				            Localización Propuesta: {location}
				        </Typography>
				    </Grid>
				    <Grid xs={12} spacing={4} container item>
				        <Grid xs={6} justify='flex-end' container item>
				            <Button onClick={() => onClickBook({ accepted: true })} size='lg' variant='success'>
				                Aceptar
				            </Button>
				        </Grid>
				        <Grid xs={6} justify='flex-start' container item>
				            <Button onClick={() => onClickBook({ accepted: false })} size='lg' variant='danger'>
				                Rechazar
				            </Button>
				        </Grid>
				    </Grid>
				</Grid>
			);
		}
		
		function createDataProposal(onClickBook: any): JSX.Element {
			return (
				<Grid className='book__activity--section' container justify='center'>
					<Form>
					    <Input
					    	type='date'
					    	id='activityDate'
					    	label='Fecha'
					    	placeholder='dd/mm/aaaa'
					    	value={date}
					    	onChange={(event: any) => setDate(event.target.value)}
					    />
					    <Input
					    	type='time'
					    	id='activityHour'
					    	label='Hora'
					    	placeholder='00:00'
					    	value={time}
					    	onChange={(event: any) => setTime(event.target.value)}
					    />
					    <Input
				    		type='text'
				    		id='activityLocation'
				    		label='Localización'
				    		placeholder='Granada'
				    		value={location}
				    		onChange={(event: any) => setLocation(event.target.value)}
				    	/>
					    <Grid xs={12} justify='center' container item>
							<Button 
								onClick={() => onClickBook(
									{
										date, time, location
									}
								)}
								className='book__activity'
							>
							    Proponer
							</Button>
						</Grid>
					</Form>
				</Grid>
			);
		}

		switch(phase) {
		    case Pages.apuntarseActividad: {
		        subpage = signingIntoActivity(onClickBook);
		        break;
		    } case Pages.aceptarORechazarActividad: {
		        subpage = acceptOrRejectActivity(onClickBook);
		        break;
		    } case Pages.proponerFechaHoraActividad: {
		        subpage = createDataProposal(onClickBook);
		        break;
		    }
		}

		return subpage;
	}

    const subpage = createSubpage(phase, onClickBook);

    return (
        <React.Fragment>
            <Header
                title={title}
                icon='arrow_back'
                onIconClick={onClickBack}
            />
            <Grid className='book__activity--body' container justify='center'>
                <Grid container justify='center' item>
                    <Typography style={{ color: 'white' }}>
                        {description}
                    </Typography>
                </Grid>
                {subpage}
            </Grid>
        </React.Fragment>
    );
}
