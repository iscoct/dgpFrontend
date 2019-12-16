import React, { useState } from 'react';
import Pages, { Home, Profile, CreateActivity, AssessmentActivity, Chat,
    UserData, UserManagement, ActivityList, SeeActivity } from './pages';
import { login as remoteLogin, getUserOwnData } from './interactionsWithServer';
import _ from 'lodash';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';

export default function App(): JSX.Element {
    const [navigation, setNavigation] = useState<Symbol[]>([Pages.home]);
    const [error, setError] = useState<boolean>(false);
    let currentPage: JSX.Element = <></>;

    function login({ email, password }: any): void {
        remoteLogin({ email, password }).then(({ id_usuario }: any) => {
            console.log("Por aquí pasamos");

            getUserOwnData().then((jsonResponse: any) => {
                console.log(jsonResponse);
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
                    name="Tomás Santos Ortega"
                    location="Pulianas, Granada"
                    age={23}
                    isAdmin={false}
                    onClick={
                        (page: any) => setNavigation(navigation.concat([page]))
                    }
                />
            );
            break;
        }
        case Pages.createActivity: {
            currentPage = (
                <CreateActivity
                    onClickBack={onPageBack}
                    onClick={() => console.log("Create activity was clicked")}
                />
            );
            break;
        }
        case Pages.addUser: {
            currentPage = (
                <UserData
                    create={true}
                    onClickBack={onPageBack}
                />
            );
            break;
        }
        case Pages.manageUsers: {
            currentPage = (
                <UserManagement
                    onClickBack={onPageBack}
                    onModifyUser={(user: any) => console.log(`Se ha clickado para modificar a ${user}`)}
                    onRemoveUser={(user: any) => console.log(`Se ha clickado para eliminar a ${user}`)}
                    onSeeActivities={(user: any) => console.log(`Se ha clickado para ver las actividades de ${user}`)}
                    users={[
                        "Usuario 1",
                        "Usuario 2",
                        "Usuario 3"
                    ]}
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
