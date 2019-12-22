import React, { useEffect, useState } from 'react';
import { Button } from '../../components';
import { PersonAdd, Star, Visibility, Chat } from '@material-ui/icons';
import { Image, Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/header';
import Subpages from './subpages';

import './activityList.scss';

function ActivityButton({ onClick, icon, children }: any): JSX.Element {
	return (
		<Button
			className="activity--button"
			endIcon={icon}
			onClick={onClick}
			variant="secondary"
		>
			{children}
		</Button>
	);
}

function ActivityActions(props: any): JSX.Element {
	const { onClick } = props;
	const page: 'free' | 'madeByPartner' | 'madeByVolunteer' | 'signUp' | 'proposeByUser'= props.page;
	const subpage = Subpages[page];
	let result: JSX.Element = <></>;

	switch (subpage) {
		case Subpages.free: {
			result = (
				<ActivityButton onClick={onClick} icon={<PersonAdd />}>Apuntarme</ActivityButton>
			);

			break;
		} case Subpages.madeByPartner: {
			result = (
				<ActivityButton onClick={onClick} icon={<Star />}>Valorar</ActivityButton>
			);
			break;
		}
		case Subpages.madeByVolunteer:
		case Subpages.proposeByUser: {
			result =
				<ActivityButton onClick={onClick} icon={<Visibility />}>Ver</ActivityButton>;
			break;
		} case Subpages.signUp: {
			result = (
				<React.Fragment>
					<Col xs={6}>
						<ActivityButton onClick={() => onClick({ action: 'Ver' })} icon={<Visibility />}>Ver</ActivityButton>
					</Col>
					<Col xs={6}>
						<ActivityButton onClick={() => onClick({ action: 'Chat' })} icon={<Chat />}>Chat</ActivityButton>
					</Col>
				</React.Fragment>
			);
			break;
		}
	}

	return result;
}

function getFormattedDate(fecha: any): string {
	return fecha instanceof Date ?
		`${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`
		: fecha;
}

function Activity({ data, onClick, page }: any): JSX.Element {
	const { nombre, fecha, localizacion,
		imagen, etiquetas, id_creador, id_actividad } = data;
	const [owner, setOwner] = useState<any>('');

	useEffect(() => {
		const url = `${process.env.SERVER_URL}api/usuarioNombre/${id_creador}`
		
		fetch(url, {
			method: 'GET',
			credentials: 'include'
		}).then((res) => res.json()).then(({ usuario }: any) => {
			setOwner(usuario);
		});

	}, []);

	return (
		<Container className="activity--section">
			<Row className="activity-title">
				{nombre}
			</Row>
			<Row>
				<Col className="activity-information--section">
					<Row className="activity-information">
						{etiquetas && etiquetas.join(", ")}
					</Row>
					<Row className="activity-information">
						{owner && `${owner.rol}: ${owner.nombre} ${owner.apellido1} ${owner.apellido2}`}
					</Row>
					{ fecha &&
						(
							<Row className="activity-information">
								{`Fecha y hora: ${getFormattedDate(fecha)}`}
							</Row>
						)
					}
					<Row className="activity-information">
						{localizacion && `Localización: ${localizacion}`}
					</Row>
				</Col>
				<Col>
					<Row className="activity-image--section">
						{imagen &&
							(
								<Image src={`${process.env.SERVER_URL}images/${imagen}`} fluid />
							)
						}
					</Row>
					<Row className="activity-button--section">
						<ActivityActions onClick={(...args: any) => onClick({ ...args, id_actividad })} page={page} />
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

function ActivityList({ activities, onClickActivity, page }: any): JSX.Element {
	return (
		<React.Fragment>
			{activities && activities.map((activity: any, index: any): JSX.Element => (
				<Activity
					key={index}
					page={page}
					data={activity}
					onClick={onClickActivity}
				/>
			))}
		</React.Fragment>	
	)
}

export default function({ activities, onClickBack, onClickActivity, page = 'free' }: any) {
	return (
		<React.Fragment>
			<Header
				icon='arrow_back'
                onIconClick={onClickBack}
				title='Lista de actividades'
			/>
			<ActivityList
				page={page}
				activities={activities}
				onClickActivity={onClickActivity}
			/>
		</React.Fragment>
	);
}