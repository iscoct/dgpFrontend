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

const serverUrl = 'http://localhost:8000/';

function quePaginaDebeSerRenderizada(): JSX.Element {
    const [navigation, setNavigation] = useState<Symbol[]>([Pages.home]);
    const [ratingVote, setRatingVote] = useState<number>(5);
    const [userName, setUserName] = useState<string>('');
    const [userSurname, setUserSurname] = useState<string>('');
    const [userDateBirth, setUserDateBirth] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPhone, setUserPhone] = useState<string>('');
    const [userObservations, setUserObservations] = useState<string>('');
    const [userImage, setUserImage] = useState<string>('');
    const [userLocation, setUserLocation] = useState<string>('');
    const [hasCompletedSomeActivity, setHasCompletedSomeActivity] = useState<boolean>(false);
    const [isSuperuser, setIsSuperuser] = useState<boolean>(false);
    const currentNavigation = navigation[navigation.length - 1];
    const [idUserToModify, setIdUserToModify] = useState<number>(0);
    const [activityName, setActivityName] = useState<string>('');
    const [activityDescription, setActivityDescription] = useState<string>('');
    const [activityId, setActivityId] = useState<string>('');
    const [proposalDate, setProposalDate] = useState<Date>(new Date());
    const [proposalTime, setProposalTime] = useState<string>('');
    const [proposalLocation, setProposalLocation] = useState<string>('');
    let page: JSX.Element;

    function onPageChanged(page: any): void {
        setNavigation(navigation.concat(page))
    }

    function onBook(proposal: any): void {
        switch (navigation[navigation.length - 1]) {
            case Pages.apuntarseActividad: {
            	const url = `${serverUrl}api/apuntarse/${activityId}`;
        
            	fetch(url, {
            		method: 'PUT',
            		credentials: 'include'
            	}).then((res) => res.json()).then((jsonResponse) => {
            		console.log('Se ha propuesto la actividad');

            		onPageChanged(Pages.proponerFechaHoraActividad);
            	});
                
                break;
            } case Pages.proponerFechaHoraActividad: {
            	const url = `${serverUrl}api/proponerFechaLocalizacion/${activityId}`;
            	const { date, time, location } = proposal;

				fetch(url, {
					method: 'PUT',
					body: JSON.stringify({
						localizacion: location,
						fecha: date
					}),
					credentials: 'include'
				}).then((res) => res.json()).then((jsonResponse) => {
					console.log('Se ha propuesto fecha y hora');
					
					setProposalDate(date);
		        	setProposalTime(time);
		        	setProposalLocation(location);
		            onPageChanged(Pages.aceptarORechazarActividad);
				});
                break;
            } case Pages.aceptarORechazarActividad: {
            	const url = `${serverUrl}api/confirmarFechaLocalizacion/${activityId}`;
            	
            	fetch(url, {
            		method: 'PUT',
            		body: JSON.stringify({
            			cerrada: proposal.accepted
            		}),
            		credentials: 'include'
            	}).then((res) => res.json()).then((jsonResponse) => {
            		const copyNav = navigation.concat([]);
		            const pageToSignedintoActivity = 3;

		            copyNav.splice(navigation.length - pageToSignedintoActivity,
		                pageToSignedintoActivity);
		            
		            setNavigation(copyNav);
            	});
            }
        }
    }

    function onClickBack(): void {
        const copyNav = navigation.concat([]);

        copyNav.pop();

        setNavigation(copyNav);
    }

    function goToModifyUser(user: any): void {
        console.log('Se ha pedido modificar el usuario');

		setIdUserToModify(user.id);
        onPageChanged(Pages.modificarUsuario);
    }

    function onClickVote(): void {
    	const url = `${serverUrl}api/actividades/valorar/${activityId}`;
    	
		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				puntuacion: ratingVote
			}),
			credentials: 'include'
		}).then((res) => res.json()).then((jsonResponse) => {
			console.log('Votación correcta');
			
			onClickBack();
		});
    }
    
    function onClickActivity(activity: any, realizada = false): void {
  		const nextPage = realizada ? Pages.votarActividad : Pages.apuntarseActividad;

	    onPageChanged(nextPage);
	    
	    setActivityId(activity.id_actividad);
	    setActivityName(activity.nombre);
	    setActivityDescription(activity.descripcion);
    }
   
    function onClickIniciar(userLoginData: any): void {
    	const url = `${serverUrl}api/usuario`;

    	fetch(url, {
    		method: 'POST',
    		headers: {
    			'Content-Type': 'application/json'
    		},
    		body: JSON.stringify(userLoginData),
    		credentials: 'include'
    	}).then((res) => res.json()).then((jsonResponse) => {
    		if (jsonResponse.description === 'OK') {
    			fetch(url, {
    				method: 'GET',
    				headers: {
    					'Content-Type': 'application/json'
    				},
    				credentials: 'include'
    			}).then((res: any) => res.json()).then(({ usuario }: any) => {
    				setUserName(usuario.nombre);
    				setUserSurname(`${usuario.apellido1} ${usuario.apellido2}`);
    				setUserDateBirth(usuario.fecha_nacimiento);
    				setUserEmail(usuario.email);
    				setUserPhone(usuario.telefono);
    				setUserImage(usuario.imagen);
					setUserObservations(usuario.observaciones);
					setUserLocation(usuario.localidad);

					if (usuario.rol === 'administrador') {
						setIsSuperuser(true);
					}

    				onPageChanged(Pages.perfil);
    			});
    			
    			fetch(`${serverUrl}api/actividades`, {
    				method: 'GET',
    				headers: {
    					'Content-Type': 'application/json'
    				},
    				credentials: 'include'
    			}).then((res: any) => res.json()).then((jsonResponse: any) => {
    				if (jsonResponse.actividades.length > 0) {
    					setHasCompletedSomeActivity(true);
    				}
    			}).catch(() => {
    				console.log('Hubo algún problema con las actividades');
    			});
    		}
    	});
    }

    switch(currentNavigation) {
        case Pages.perfil: {
            const usualUser = {
                acciones: [
                    {
                        text: 'Lista de actividades',
                        onClick: () => onPageChanged(Pages.listaDeActividades)
                    },
                    {
                        text: 'Crear actividad',
                        onClick: () => onPageChanged(Pages.crearActividad)
                    }
                ]
            };
            
            if (hasCompletedSomeActivity) {
            	usualUser.acciones.push({
                    text: 'Realizadas',
                    onClick: () => onPageChanged(Pages.actividadesRealizadas)
                });
            }

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
                    nombre={`${userName} ${userSurname}`}
                    localidad={userLocation}
                    dateBirth={userDateBirth}
                    imagen={userImage}
                    email={userEmail}
                    telefono={userPhone}
                    observations={userObservations}
                    acciones={
                        isSuperuser ? superuser.acciones : usualUser.acciones
                    }
                />
            );

            break;
        } case Pages.listaDeActividades: {
            page = (
                <ActivityList
                    onClickBack = {onClickBack}
                    onClickActivity = {(activity: any) => onClickActivity(activity)}
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
            page = <Home onClickIniciar={onClickIniciar} />;
            break;
        }
        case Pages.apuntarseActividad:
        case Pages.proponerFechaHoraActividad:
        case Pages.aceptarORechazarActividad: {
            page = (
                <BookActivity
                    description={activityDescription}
                    date={proposalDate}
                    time={proposalTime}
                    location={proposalLocation}
                    title={activityName}
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
                    onClickBack={onClickBack}
                    crear={false}
                    id={idUserToModify}
                />
            );
            break;
        } case Pages.gestionarUsuarios: {
            page = (
                <UserManagement
                    onClickBack={onClickBack}
                    onModifyUser={goToModifyUser}
                />
            );
            break;
        } case Pages.actividadesRealizadas: {
            page = (
                <ActivityList
                	realizadas={true}
                    onClickBack = {onClickBack}
                    onClickActivity = {(activity: any) => onClickActivity(activity, true)}
                />
            );
            break;
        } case Pages.votarActividad:{
            page = (
                <VoteActivity
                    description={activityDescription}
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
