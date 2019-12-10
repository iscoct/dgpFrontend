/* export {
    perfil: Symbol.for('Perfil'),
    listaDeActividades: Symbol.for('ListaDeActividades'),
    crearActividad: Symbol.for('CrearActividad'),
    home: Symbol.for('Home'),
    apuntarseActividad: Symbol.for('ApuntarseActividad'),
    proponerFechaHoraActividad: Symbol.for('ProponerFechaHoraActividad'),
    aceptarORechazarActividad: Symbol.for('AceptarORechazarActividad'),
    crearUsuario: Symbol.for('CrearUsuario'),
    gestionarUsuarios: Symbol.for('GestionarUsuarios'),
    modificarUsuario: Symbol.for('ModificarUsuario'),
    actividadesRealizadas: Symbol.for('ActividadesRealizadas'),
    votarActividad: Symbol.for('VotarActividad')
}; */

export default {
    profile: Symbol.for('Profile'),
    home: Symbol.for('Home'),
    signUpIntoActivity: Symbol.for('SignUpIntoActivity'),
    createActivity: Symbol.for('CreateActivity'),
    myActivities: Symbol.for('MyActivities'),
    realizedActivities: Symbol.for('RealizeActivities'),
    addUser: Symbol.for('AddUser'),
    manageUsers: Symbol.for('ManageUsers'),
    currentActivities: Symbol.for('CurrentActivities'),
    assessmentActivity: Symbol.for('AssessmentActivity')
};

export { default as Home } from './home';
export { default as Profile } from './profile';
export { default as CreateActivity } from './createActivity';
export { default as SignUpIntoActivity } from './bookActivity';
export { default as UserData } from './userData';
export { default as UserManagement } from './userManagement';
export { default as ActivityList } from './activityList';
export { default as AssessmentActivity } from './voteActivity';