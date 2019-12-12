import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { ZoomIn, ListAlt, PlaylistAddCheck, PhotoCamera } from '@material-ui/icons';
import { Container, Row, Col } from 'react-bootstrap';
import { Header } from '../../components';
import classNames from 'classnames';
import Pages from '../';

import './profile.scss';

const NavigationElement = ({ text, onClick, icon }: any) => {
    return (
        <Col className="navigation__choose">
            <Row onClick={onClick} className="icon--section">
                {icon || <PhotoCamera />}
            </Row>
            <Typography align="center" className="profile--typography" variant="body1">{text}</Typography>
        </Col>
    );
};

const PersonalDataElement = ({ section, text }: any) => {
    return (
        <Row className='profile--row personal--data'>
            <Typography className="profile--typography" variant={section}>{text}</Typography>
        </Row>
    );
};

const VolunteerNavigation = ({ onClick }: any) => {
    return (
        <Container className="navigation__section">
            <Row>
                <NavigationElement
                    onClick={() => onClick(Pages.freeActivities)}
                    text="Apuntarse"
                    icon={<ZoomIn />}
                />
                <NavigationElement
                    onClick={() => onClick(Pages.createActivity)}
                    text="Crear"
                />
                <NavigationElement
                    onClick={() => onClick(Pages.myActivities)}
                    text="Mis actividades"
                    icon={<ListAlt />}
                />
                <NavigationElement
                    onClick={() => onClick(Pages.realizedActivities)}
                    text="Realizadas"
                    icon={<PlaylistAddCheck />}
                />
                <NavigationElement
                    onClick={() => onClick(Pages.activityListSignedUp)}
                    text="Apuntadas"
                />
            </Row>
        </Container>
    );
}

const AdministratorNavigation = ({ onClick }: any) => {
    return (
        <Container className="navigation__section">
            <Row>
                <NavigationElement
                    onClick={() => onClick(Pages.addUser)}
                    text="Añadir Usuario"
                />
                <NavigationElement
                    onClick={() => onClick(Pages.manageUsers)}
                    text="Gestionar Usuarios"
                />
                <NavigationElement
                    onClick={() => onClick(Pages.currentActivities)}
                    text="Actividades Actuales"
                />
            </Row>
        </Container>
    );
}

export default function Profile({ image, name, onClick, location, age, isAdmin = false }: any): JSX.Element {
	const avatar = image ? <Avatar src={`http://localhost:8000/images/${image}`} />
         : <Avatar>?</Avatar>;
    const mainContainerClassName = classNames('profile--container', { 'no-admin--section': ! isAdmin });

    return (
        <React.Fragment>
            <Header title="Perfil" />
            <Container className={mainContainerClassName}>
                <Row className='avatar profile--row'>
                    {avatar}
                </Row>
                <Container className="profile__personal__data__section">
                    <PersonalDataElement section="h4" text={name} />
                    <PersonalDataElement section="h5" text={location} />
                    <PersonalDataElement section="h5" text={`${age} años`} />
                </Container>
                {isAdmin ? <AdministratorNavigation onClick={onClick} />
                    : <VolunteerNavigation onClick={onClick} />}
            </Container>
        </React.Fragment>
    );
}
