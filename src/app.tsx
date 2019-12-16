import React, { useState } from 'react';
import Pages, { Home, Profile, CreateActivity, AssessmentActivity, Chat,
    UserData, UserManagement, ActivityList, SeeActivity } from './pages';
import { login as remoteLogin, getUserOwnData, getUsers, removeUser,
    getMyOwnActivities, createActivity, newUser, modifyUser, getSpecificUser } from './interactionsWithServer';
import { User, RolUsuario } from './types';
import _ from 'lodash';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';

export default function App(): JSX.Element {
    const [navigation, setNavigation] = useState<Symbol[]>([Pages.home]);
    const [error, setError] = useState<boolean>(false);
    const [ownUser, setOwnUser] = useState<User>();
    const [allUsers, setAllUsers] = useState<Array<User>>();
    const [specificUser, setSpecificUser] = useState<User>();
    let currentPage: JSX.Element = <></>;

    function login({ email, password }: any): void {
        remoteLogin({ email, password }).then(() => {

            getUserOwnData().then(({ usuario }: any) => {
                setOwnUser(usuario);
            }).catch(() => {
                setError(true);
            });

        }).then(() => {
            setNavigation([Pages.profile]);
            setError(false);
        }).catch(() => {
            setError(true);
        });
    }

    function onPageBack() {
        setNavigation(_.dropRight(navigation));
    }

    function onAssessmentActivity() {
        console.log('An activity was clicked');

        const newNavigation = navigation.concat([Pages.assessmentActivity]);

        setNavigation(newNavigation);
    }

    function onSeeActivity() {
        console.log("An activity was clicked");

        const newNavigation = navigation.concat([Pages.seeActivity]);

        setNavigation(newNavigation);
    }

    function onClickSignedUpActivity(event: any) {
        const nextPage: Symbol = event === 'Ver' ? Pages.seeActivity : Pages.chat;

        setNavigation(navigation.concat([nextPage]));
    }

    function onProfileClick(page: any) {
        switch (page) {
            case Pages.manageUsers: {
                getUsers().then(({ usuarios }: any) => {
                    setAllUsers(usuarios);
                    setError(false);
                }).catch(() => {
                    setError(true);
                });

                break;
            }
            case Pages.myActivities: {
                getMyOwnActivities().then((jsonResponse: any) => {
                    console.log(`Json response: ${JSON.stringify(jsonResponse)}`);
                }).catch(() => {
                    setError(true);
                });

                break;
            }
        }

        setNavigation(navigation.concat([page]));
    }

    function onRemoveUser(user: any) {
        removeUser(user).then(() => {
            onPageBack();
            setError(false);
        }).catch(() => {
            setError(true);
        });
    }

    function onCreateActivity(actividad: any) {
        createActivity(actividad).then(() => {
            onPageBack();
            setError(false);
        }).catch(() => {
            setError(true);
        });
    }

    function onGoingToModifyUser(user: any) {
        getSpecificUser(user).then(({ usuario }: any) => {
            setSpecificUser(usuario);
            setNavigation(navigation.concat([Pages.modifyUser]));
            setError(false);
        }).catch(() => {
            setError(false);
        });
    }

    function onModifyUser(user: any) {
        const currentPage = navigation[navigation.length];

        if (currentPage === Pages.addUser) {
            newUser(user).then((jsonResponse: any) => {
                console.log(`Json response: ${jsonResponse}`);
                setError(false);
            }).catch(() => {
                setError(true);
            });
        } else {
            modifyUser(user).then((jsonResponse: any) => {
                console.log(`Json response: ${jsonResponse}`);
                setError(false);
            }).catch(() => {
                setError(true);
            });
        }
    }

    switch (navigation[navigation.length - 1]) {
        case Pages.home: {
            currentPage = (
                <Home
                    onClickIniciar={login}
                    error={error}
                />
            );
            break;
        }
        case Pages.profile: {
            currentPage = (
                <Profile
                    name={ownUser ? ownUser.nombre : ''}
                    location={ownUser ? ownUser.localidad : ''}
                    age={ownUser ? ownUser.fecha_nacimiento : ''}
                    isAdmin={ownUser && ownUser.rol === RolUsuario[RolUsuario.administrador]}
                    image={ownUser ? ownUser.imagen : ''}
                    onClick={onProfileClick}
                />
            );
            break;
        }
        case Pages.createActivity: {
            currentPage = (
                <CreateActivity
                    onClickBack={onPageBack}
                    onClick={onCreateActivity}
                />
            );
            break;
        }
        case Pages.addUser: {
            currentPage = (
                <UserData
                    create={true}
                    onClickBack={onPageBack}
                    onClick={onModifyUser}
                />
            );
            break;
        }
        case Pages.modifyUser: {
            currentPage = (
                <UserData
                    create={false}
                    onClickBack={onPageBack}
                    onClick={onModifyUser}
                    user={specificUser}
                />
            );
            break;
        }
        case Pages.manageUsers: {
            currentPage = (
                <UserManagement
                    onClickBack={onPageBack}
                    onModifyUser={onGoingToModifyUser}
                    onRemoveUser={onRemoveUser}
                    onSeeActivities={(user: any) => console.log(`Se ha clickado para ver las actividades de ${user}`)}
                    users={allUsers}
                />
            );
            break;
        }
        case Pages.myActivities: {
            currentPage = (
                <ActivityList
                    activities={
                        [
                            {
                                titulo: 'Titulo de la actividad',
                                localizacion: 'Calle Elvira junto Hipercor',
                                nombre: 'Juan Fernández Del Amo',
                                categoria: 'Deporte',
                                fecha: new Date()
                            },
                            {
                                titulo: 'Titulo de la actividad',
                                localizacion: 'Calle Elvira junto Hipercor',
                                nombre: 'Juan Fernández Del Amo',
                                categoria: 'Deporte',
                                fecha: new Date()
                            }
                        ]
                    }
                    onClickBack={onPageBack}
                    onClickActivity={onSeeActivity}
                    page='proposeByUser'
                />
            );
            break;
        }
        case Pages.realizedActivities: {
            currentPage = (
                <ActivityList
                    activities={
                        [
                            {
                                titulo: 'Titulo de la actividad',
                                localizacion: 'Calle Elvira junto Hipercor',
                                nombre: 'Juan Fernández Del Amo',
                                categoria: 'Deporte',
                                fecha: new Date()
                            },
                            {
                                titulo: 'Titulo de la actividad',
                                localizacion: 'Calle Elvira junto Hipercor',
                                nombre: 'Juan Fernández Del Amo',
                                categoria: 'Deporte',
                                fecha: new Date()
                            }
                        ]
                    }
                    onClickBack={onPageBack}
                    onClickActivity={onAssessmentActivity}
                    page='madeByPartner'
                />
            );
            break;
        }
        case Pages.currentActivities: {
            currentPage = (
                <ActivityList
                    activities={
                        [
                            {
                                titulo: 'Titulo de la actividad',
                                localizacion: 'Calle Elvira junto Hipercor',
                                nombre: 'Juan Fernández Del Amo',
                                categoria: 'Deporte',
                                fecha: new Date()
                            },
                            {
                                titulo: 'Titulo de la actividad',
                                localizacion: 'Calle Elvira junto Hipercor',
                                nombre: 'Juan Fernández Del Amo',
                                categoria: 'Deporte',
                                fecha: new Date()
                            }
                        ]
                    }
                    onClickBack={onPageBack}
                    onClickActivity={() => setNavigation(navigation.concat([Pages.adminSeeActivity]))}
                    page='madeByVolunteer'
                />
            );
            break;
        }
        case Pages.assessmentActivity: {
            currentPage = (
                <AssessmentActivity
                    onClickBack={onPageBack}
                    title="Título de la actividad"
                    description="Dummy description"
                    volunteerName="Dummy volunteer name"
                    onClickVote={() => console.log("It wanted to vote an activity")}
                />
            );
            break;
        }
        case Pages.seeActivity: {
            currentPage = (
                <SeeActivity
                    onClickBack={onPageBack}
                    localization="Calle Madrid, Granada"
                    date={new Date()}
                    participants={["Juan Fernández Ortiz"]}
                    onClick={() => console.log("On see activity click")}
                />
            );

            break;
        }
        case Pages.signUpIntoActivity: {
            currentPage = (
                <SeeActivity
                    onClickBack={onPageBack}
                    localization="Calle Elvira Junto Hipercor"
                    date={new Date()}
                    participants={["Juan Fernández Ortiz"]}
                    onClick={() => console.log("On sign up activity")}
                    page='signUp'
                />
            );

            break;
        }
        case Pages.adminSeeActivity: {
            currentPage = (
                <SeeActivity
                    onClickBack={onPageBack}
                    localization="Calle Elvira Junto Hipercor"
                    date={new Date()}
                    participants={["Juan Fernández Ortiz"]}
                    page="adminSee"
                    assessments={
                        [
                            {
                                userName: "Juan Fernández López",
                                rate: 4,
                                rol: "Socio",
                                description: "Me ha gustado la actividad, el voluntario era incluso demasiado simpático jeje, repetiré"
                            },
                            {
                                userName: "Juan Fernández López",
                                rate: 4,
                                rol: "Socio",
                                description: "Me ha gustado la actividad, el voluntario era incluso demasiado simpático jeje, repetiré"
                            }
                        ]
                    }
                />
            );
            break;
        }
        case Pages.freeActivities: {
            currentPage = (
                <ActivityList
                    activities={
                        [
                            {
                                titulo: 'Titulo de la actividad',
                                localizacion: 'Calle Elvira junto Hipercor',
                                nombre: 'Juan Fernández Del Amo',
                                categoria: 'Deporte',
                                fecha: new Date()
                            },
                            {
                                titulo: 'Titulo de la actividad',
                                localizacion: 'Calle Elvira junto Hipercor',
                                nombre: 'Juan Fernández Del Amo',
                                categoria: 'Deporte',
                                fecha: new Date()
                            }
                        ]
                    }
                    onClickBack={onPageBack}
                    onClickActivity={() => setNavigation(navigation.concat([Pages.signUpIntoActivity]))}
                    page='free'
                />
            );

            break;
        }
        case Pages.activityListSignedUp: {
            currentPage = (
                <ActivityList
                    activities={
                        [
                            {
                                titulo: 'Titulo de la actividad',
                                localizacion: 'Calle Elvira junto Hipercor',
                                nombre: 'Juan Fernández Del Amo',
                                categoria: 'Deporte',
                                fecha: new Date()
                            },
                            {
                                titulo: 'Titulo de la actividad',
                                localizacion: 'Calle Elvira junto Hipercor',
                                nombre: 'Juan Fernández Del Amo',
                                categoria: 'Deporte',
                                fecha: new Date()
                            }
                        ]
                    }
                    onClickBack={onPageBack}
                    onClickActivity={onClickSignedUpActivity}
                    page='signUp'
                />
            );

            break;
        }
        case Pages.chat: {
            currentPage = (
                <Chat
                    onClickBack={onPageBack}
                    title='Título de la actividad'
                    otherUserName='Juan Fernández Ortiz'
                    messages={
                        [
                            {
                                text: "My own message",
                                owner: "Mine"
                            },
                            {
                                text: "His message",
                                owner: "Yours"
                            },
                            {
                                text: "My own message",
                                owner: "Mine"
                            }
                        ]
                    }
                />
            );

            break;
        }
    }

    return currentPage;
}
