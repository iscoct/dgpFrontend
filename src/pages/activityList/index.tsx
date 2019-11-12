import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Chip, Grid } from '@material-ui/core';
import Header from '../../components/header';

import './activityList.scss';

function crearActividad({ categoria, title, description, onClickActivity }: any) {
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

    return (
        <Grid xs={8} classes={{ root: containerClass.actividad }} justify='center' item container>
            <Grid xs={8} container item>
                <Grid xs={12} container item>
                    <Typography
                        classes={{ h6: typographyClasses.h6 }}
                        variant='h6'
                    >
                        {categoria}
                    </Typography>
                </Grid>
                <Grid xs={12} container item>
                    <Typography
                        classes={{ h6: typographyClasses.h6 }}
                        variant='h6'
                    >
                        {title}
                    </Typography>
                </Grid>
                <Grid xs={12} container item>
                    <Typography
                        classes={{ h6: typographyClasses.h6 }}
                        variant='h6'
                    >
                        {description}
                    </Typography>
                </Grid>
            </Grid>
            <Grid onClick={onClickActivity} xs={4} container item>
                <Grid xs={12} item>
                </Grid>
                <Grid xs={12} item>
                    <Chip label='Ver más'/>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default function({ onClickBack, onClickActivity }: any): JSX.Element {
	const [activities, setActivities] = useState<any[]>([]);
	const url = 'http://localhost:8000/api/actividades';

	useEffect(() => {
		fetch(url, {
			method: 'GET',
			credentials: 'include'
		}).then((response) => response.json()).then((jsonResponse) => {
			setActivities(jsonResponse);
		}).catch(() => {
			console.log('Hubo algún error al pedir las actividades');
		});
	});
    const activitiesSections: JSX.Element = activities ? (
        <React.Fragment>
            {activities.map((actividad: any, index: any): JSX.Element => {
                return (
                    <section key={index} className='activityWrapper'>
                        {crearActividad({
                            ...activities,
                            onClickActivity
                        })}
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
