import React from 'react';
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
			result =
				<ActivityButton onClick={onClick} icon={<PersonAdd />}>Apuntarme</ActivityButton>;
			break;
		} case Subpages.madeByPartner: {
			result =
				<ActivityButton onClick={onClick} icon={<Star />}>Valorar</ActivityButton>;
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
						<ActivityButton onClick={() => onClick('Ver')} icon={<Visibility />}>Ver</ActivityButton>
					</Col>
					<Col xs={6}>
						<ActivityButton onClick={() => onClick('Chat')} icon={<Chat />}>Chat</ActivityButton>
					</Col>
				</React.Fragment>
			);
			break;
		}
	}

	return result;
}

function Activity({ data, onClick, page }: any): JSX.Element {
	const { titulo, categoria, nombre, fecha, localizacion, imagen } = data;

	return (
		<Container className="activity--section">
			<Row className="activity-title">
				{titulo}
			</Row>
			<Row>
				<Col className="activity-information--section">
					<Row className="activity-information">
						{`Categorías: ${categoria}`}
					</Row>
					<Row className="activity-information">
						{`Nombre: ${nombre}`}
					</Row>
					<Row className="activity-information">
						{`Fecha y hora: ${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`}
					</Row>
					<Row className="activity-information">
						{`Localización: ${localizacion}`}
					</Row>
				</Col>
				<Col>
					<Row className="activity-image--section">
						{imagen ?
							<Image src={`${process.env.SERVER_URL}images/${imagen}`} fluid />
							: 'No image was found'}
					</Row>
					<Row className="activity-button--section">
						<ActivityActions onClick={onClick} page={page} />
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

function ActivityList({ activities, onClickActivity, page }: any): JSX.Element {
	return (
		<React.Fragment>
			{activities.map((activity: any, index: any): JSX.Element => (
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