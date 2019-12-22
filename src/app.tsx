/* eslint-disable max-len */
/* eslint-disable no-extra-parens */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-statements */
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import Pages, { Home, Profile, CreateActivity, AssessmentActivity, Chat,
    UserData, UserManagement, ActivityList, SeeActivity } from './pages';
import { login as remoteLogin, getUserOwnData, getUsers, removeUser,
    getMyOwnActivities, createActivity, newUser, modifyUser,
    getSpecificUser, getActivities, getFinishedActivities,
    getActivity, signUpIntoActivity, closeActivity, voteActivity,
    getActivitiesFromSpecificUser } from './interactionsWithServer';
import { User, RolUsuario } from './types';
import _ from 'lodash';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';
import { Activity } from './types';

export default function App(): JSX.Element {
    const [navigation, setNavigation] = useState<symbol[]>([Pages.home]);
    const [error, setError] = useState<boolean>(false);
    const [ownUser, setOwnUser] = useState<User>();
    const [allUsers, setAllUsers] = useState<User[]>();
    const [specificUser, setSpecificUser] = useState<User>();
    const [activities, setActivities] = useState<Activity[]>();
    const [specificActivity, setSpecificActivity] = useState<Activity>();
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

    function onGetSpecificActivity({ id_actividad, nextPage }: any) {
        getActivity(id_actividad).then(({ actividad }: any) => {
            setSpecificActivity(actividad);
            setError(false);
        }).catch(() => {
            setError(false);
        });

        setNavigation(navigation.concat([nextPage]));
    }

    function onSignUpIntoActivity({ id_actividad }: any) {
        signUpIntoActivity(id_actividad).then(({ descripcion }: any) => {
            console.log(`Descripción a la vuelta de Sign Up: ${descripcion}`);

            onPageBack();
            setError(false);
        }).catch(() => {
            setError(true);
        });
    }

    function onSeeActivitiesFromUser({ id }: any) {
        getActivitiesFromSpecificUser(id).then(({ actividades }: any) => {
            setActivities(actividades);
            setNavigation(navigation.concat([Pages.currentActivities]));
            setError(false);
        }).catch(() => {
            setError(true);
        });
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
                getMyOwnActivities().then(({ actividades }: any) => {
                    setActivities(actividades);
                    setError(false);
                }).catch(() => {
                    setError(true);
                });

                break;
            }
            case Pages.freeActivities:
            case Pages.currentActivities: {
                getActivities().then(({ actividades }: any) => {
                    setActivities(actividades);
                    setError(false);
                }).catch(() => {
                    setError(true);
                });

                break;
            }
            case Pages.realizedActivities: {
                getFinishedActivities().then(({ actividades }: any) => {
                    setActivities(actividades);
                    setError(false);
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

    function onClickVote(vote: any) {
        voteActivity(vote).then(({ description }: any) => {
            console.log(`Descripción tras votar en el servidor: ${description}`);

            onPageBack();
            onPageBack();
            setError(false);
        }).catch(() => {
            setError(true);
        });
    }

    function onCloseActivity(actividad: any) {
        closeActivity(actividad).then(({ description }: any) => {
            console.log(`Descripción al terminal la actividad: ${description}`)

            onPageBack();
            setError(false);
        }).catch(() => {
            setError(true);
        });
    }

    function onModifyUser(user: any) {
        const currentPage = navigation[navigation.length - 1];

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
                    onSeeActivities={onSeeActivitiesFromUser}
                    users={allUsers}
                />
            );
            break;
        }
        case Pages.myActivities: {
            currentPage = (
                <ActivityList
                    activities={activities}
                    onClickBack={onPageBack}
                    onClickActivity={({ ...args }: any) => onGetSpecificActivity({ ...args, nextPage: Pages.seeActivity})}
                    page='proposeByUser'
                />
            );
            break;
        }
        case Pages.realizedActivities: {
            currentPage = (
                <ActivityList
                    activities={activities}
                    onClickBack={onPageBack}
                    onClickActivity={({ ...args }: any) => onGetSpecificActivity({ ...args, nextPage: Pages.assessmentActivity })}
                    page='madeByPartner'
                />
            );
            break;
        }
        case Pages.currentActivities: {
            currentPage = (
                <ActivityList
                    activities={activities}
                    onClickBack={onPageBack}
                    onClickActivity={({ ...args }: any) => onGetSpecificActivity({ ...args, nextPage: Pages.adminSeeActivity })}
                    page='madeByVolunteer'
                />
            );
            break;
        }
        case Pages.assessmentActivity: {
            currentPage = (
                <AssessmentActivity
                    onClickBack={onPageBack}
                    onClickVote={onClickVote}
                    activity={specificActivity}
                />
            );
            break;
        }
        case Pages.seeActivity: {
            currentPage = (
                <SeeActivity
                    onClickBack={onPageBack}
                    onClick={onCloseActivity}
                    activity={specificActivity}
                />
            );

            break;
        }
        case Pages.signUpIntoActivity: {
            currentPage = (
                <SeeActivity
                    onClickBack={onPageBack}
                    onClick={onSignUpIntoActivity}
                    activity={specificActivity}
                    page='signUp'
                />
            );

            break;
        }
        case Pages.adminSeeActivity: {
            currentPage = (
                <SeeActivity
                    onClickBack={onPageBack}
                    onClick={() => console.log("Se ha cliqueado")}
                    activity={specificActivity}
                    page="adminSee"
                />
            );
            break;
        }
        case Pages.freeActivities: {
            currentPage = (
                <ActivityList
                    activities={activities}
                    onClickBack={onPageBack}
                    onClickActivity={({ ...args }: any) => onGetSpecificActivity({ ...args, nextPage: Pages.signUpIntoActivity})}
                    page='free'
                />
            );

            break;
        }
        case Pages.activityListSignedUp: {
            currentPage = (
                <ActivityList
                    activities={activities}
                    onClickBack={onPageBack}
                    onClickActivity={({ ...args }: any) => onGetSpecificActivity({ ...args, nextPage: Pages.chat })}
                    page='signUp'
                />
            );

            break;
        }
        case Pages.chat: {
            currentPage = (
                <Chat
                    onClickBack={onPageBack}
                    ownUser={ownUser}
                    activity={specificActivity}
                />
            );

            break;
        }
    }

    return currentPage;
}
