import React, { useState } from 'react';
import Home from './pages/home';
import Profile from './pages/profile';
import ActivityList from './pages/activityList';
import CreateActivity from './pages/createActivity';
import BookActivity from './pages/bookActivity';
import CreateUser from './pages/userData';
import UserManagement from './pages/userManagement';
import VoteActivity from './pages/voteActivity';
import Pages from './pages';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';

function quePaginaDebeSerRenderizada(): JSX.Element {
    const [navigation, setNavigation] = useState<Symbol[]>([Pages.home]);
    const [ratingVote, setRatingVote] = useState<number>(5);
    const currentNavigation = navigation[navigation.length - 1];
    let page: JSX.Element;

    function onPageChanged(page: any): void {
        setNavigation(navigation.concat(page))
    }

    function onBook(): void {
        switch (navigation[navigation.length - 1]) {
            case Pages.apuntarseActividad: {
                onPageChanged(Pages.proponerFechaHoraActividad);
                break;
            } case Pages.proponerFechaHoraActividad: {
                onPageChanged(Pages.aceptarORechazarActividad);
                break;
            } case Pages.aceptarORechazarActividad: {
                const copyNav = navigation.concat([]);
                const pageToSignedintoActivity = 3;

                copyNav.splice(navigation.length - pageToSignedintoActivity,
                    pageToSignedintoActivity);
                
                setNavigation(copyNav);
            }
        }
    }

    function onClickBack(): void {
        const copyNav = navigation.concat([]);

        copyNav.pop();

        setNavigation(copyNav);
    }

    function goToModifyUser(): void {
        console.log('Se ha pedido modificar el usuario');

        onPageChanged(Pages.modificarUsuario);
    }

    function onModifyUser(): void {
        console.log('Se ha finalizado la modificación del usuario');

        onClickBack();
    }

    function onRemoveUser(): void {
        console.log('Se ha pedido eliminar el usuario');
    }

    function voteActivity(): void {
        console.log('Se ha pedido votar una actividad');

        onPageChanged(Pages.votarActividad);
    }

    function onClickVote(): void {
        console.log('Se ha votado');
    }

    switch(currentNavigation) {
        case Pages.perfil: {
            const isUsualUser = true;
            const usualUser = {
                acciones: [
                    {
                        text: 'Lista de actividades',
                        onClick: () => onPageChanged(Pages.listaDeActividades)
                    },
                    {
                        text: 'Crear actividad',
                        onClick: () => onPageChanged(Pages.crearActividad)
                    },
                    {
                        text: 'Realizadas',
                        onClick: () => onPageChanged(Pages.actividadesRealizadas)
                    }
                ]
            };
            const superuser = {
                acciones: [
                    {
                        text: 'Añadir usuario',
                        onClick: () => onPageChanged(Pages.crearUsuario)
                    },
                    {
                        text: 'Gestionar Usuarios',
                        onClick: () => onPageChanged(Pages.gestionarUsuarios)
                    }
                ]
            };
            page = (
                <Profile
                    nombre = 'Cotán'
                    localidad = 'Jerez de la Frontera'
                    edad = {23}
                    email = 'francisco.jose.cotan.lopez@gmail.com'
                    telefono = {123456789}
                    description = 'Esta es mi historia'
                    acciones={
                        isUsualUser ? usualUser.acciones : superuser.acciones
                    }
                />
            );

            break;
        } case Pages.listaDeActividades: {
            page = (
                <ActivityList
                    actividades = {[
                        {
                            categoria: 'Dummy categoria',
                            title: 'Dummy title',
                            description: 'Dummy description'
                        },
                        {
                            categoria: 'Dummy categoria',
                            title: 'Dummy title',
                            description: 'Dummy description'
                        }
                    ]}
                    onClickBack = {onClickBack}
                    onClickActivity = {() => onPageChanged(Pages.apuntarseActividad)}
                />
            );
            break;
        } case Pages.crearActividad: {
            page = (
                <CreateActivity
                    onClickBack={onClickBack}
                />
            );
            break;
        } case Pages.home: {
            page = <Home onClickIniciar={() => onPageChanged(Pages.perfil)} />;
            break;
        }
        case Pages.apuntarseActividad:
        case Pages.proponerFechaHoraActividad:
        case Pages.aceptarORechazarActividad: {
            page = (
                <BookActivity
                    description='Dummy description'
                    onClickBack={onClickBack}
                    onClickBook={onBook}
                    phase={currentNavigation}
                />
            );
            break;
        } case Pages.crearUsuario: {
            page = (
                <CreateUser
                    onClickBack={onClickBack}
                />
            );
            break;
        } case Pages.modificarUsuario: {
            page = (
                <CreateUser
                    onClick={onModifyUser}
                    consulta={false}
                />
            );
            break;
        } case Pages.gestionarUsuarios: {
            page = (
                <UserManagement
                    usuarios={['Cotán', 'Montesino']}
                    onClickBack={onClickBack}
                    onModifyUser={goToModifyUser}
                    onRemoveUser={onRemoveUser}
                />
            );
            break;
        } case Pages.actividadesRealizadas: {
            page = (
                <ActivityList
                    actividades = {[
                        {
                            categoria: 'Dummy categoria',
                            title: 'Dummy title',
                            description: 'Dummy description'
                        },
                        {
                            categoria: 'Dummy categoria',
                            title: 'Dummy title',
                            description: 'Dummy description'
                        }
                    ]}
                    onClickBack = {onClickBack}
                    onClickActivity = {voteActivity}
                />
            );
            break;
        } case Pages.votarActividad:{
            page = (
                <VoteActivity
                    description='Dummy description'
                    onClickBack={onClickBack}
                    ratingValue={ratingVote}
                    onClickVote={onClickVote}
                    onRatingChange={
                        (event: any, newValue: number) => setRatingVote(newValue)
                    }
                />
            );
            break;
        } default : {
            page = <React.Fragment></React.Fragment>;
        }
    }

    return page;
}

export default function App(): JSX.Element {
    return quePaginaDebeSerRenderizada();
}