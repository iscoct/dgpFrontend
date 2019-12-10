import React, { useState } from 'react';
import Pages, { Home, Profile, CreateActivity, AssessmentActivity,
    UserData, UserManagement, ActivityList } from './pages';
import { login as remoteLogin } from './interactionsWithServer';
import _ from 'lodash';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';

export default function App(): JSX.Element {
    const [navigation, setNavigation] = useState<Symbol[]>([Pages.home]);
    const [error, setError] = useState<boolean>(false);
    let currentPage: JSX.Element = <></>;

    function login({ email, password }: any): void {
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

        remoteLogin({ email, password }).then(() => {
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
                    isAdmin={true}
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
                    onClickActivity={() => console.log('An activity was clicked')}
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
                    onClickActivity={() => console.log('An activity was clicked')}
                    page='madeByVolunteer'
                />
            );
            break;
        }
        case Pages.assessmentActivity: {
            currentPage = (
                <AssessmentActivity
                
                />
            );
            break;
        }
    }

    return currentPage;
}