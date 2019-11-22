import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Chip, Grid } from '@material-ui/core';
import Header from '../../components/header';

import './activityList.scss';

export default function({ onClickBack, onClickActivity, realizadas = false }: any): JSX.Element {
	const [activities, setActivities] = useState<any[]>([]);
	const typographyClasses = makeStyles({
        h6: {
            color: 'white'
        }
    })();
    const containerClass: any = makeStyles({
        actividad: {
            background: 'linear-gradient(#BE6F03, #FF9301)',
            marginTop: '5%'
        }
    })();
	const url = `http://localhost:8000/api/actividades${realizadas ? `/terminadas` : ''}`;

	useEffect(() => {
		fetch(url, {
			method: 'GET',
			credentials: 'include'
		}).then((response) => response.json()).then(({ actividades }: any) => {
			setActivities(actividades);
		}).catch(() => {
			console.log('Hubo algún error al pedir las actividades');
		});
	}, []);
	
	function crearActividad(activity: any, onClickActivity: any) {
		const { nombre, descripcion } = activity;

		return (
		    <Grid xs={8} classes={{ root: containerClass.actividad }} justify='center' item container>
		        <Grid xs={8} container item>
		            <Grid xs={12} container item>
		                <Typography
		                    classes={{ h6: typographyClasses.h6 }}
		                    variant='h6'
		                >
		                    {nombre}
		                </Typography>
		            </Grid>
		            <Grid xs={12} container item>
		                <Typography
		                    classes={{ h6: typographyClasses.h6 }}
		                    variant='h6'
		                >
		                    {descripcion}
		                </Typography>
		            </Grid>
		        </Grid>
		        <Grid onClick={() => onClickActivity(activity)} xs={4} container item>
		            <Grid xs={12} item>
		            </Grid>
		            <Grid xs={12} item>
		                <Chip label='Ver más'/>
		            </Grid>
		        </Grid>
		    </Grid>
		);
	}

    const activitiesSections: JSX.Element = activities ? (
        <React.Fragment>
            {activities.map((actividad: any, index: any): JSX.Element => {
                return (
                    <section key={index} className='activityWrapper'>
                        {crearActividad(actividad, onClickActivity)}
                    </section>
                );
            })}
        </React.Fragment>
    ) : <React.Fragment></React.Fragment>;

    return (
        <React.Fragment>
            <Header
                icon='arrow_back'
                onIconClick={onClickBack}
                title='Lista de actividades'
            />
            {activitiesSections}
        </React.Fragment>
    );
}
