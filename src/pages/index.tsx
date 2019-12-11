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
    assessmentActivity: Symbol.for('AssessmentActivity'),
    seeActivity: Symbol.for('SeeActivity'),
    adminSeeActivity: Symbol.for("AdminSeeActivity"),
    freeActivities: Symbol.for('FreeActivities'),
    activityListSignedUp: Symbol.for('ActivityListSignedUp'),
    chat: Symbol.for('Chat')
};

export { default as Home } from './home';
export { default as Profile } from './profile';
export { default as CreateActivity } from './createActivity';
export { default as SignUpIntoActivity } from './bookActivity';
export { default as UserData } from './userData';
export { default as UserManagement } from './userManagement';
export { default as ActivityList } from './activityList';
export { default as AssessmentActivity } from './voteActivity';
export { default as SeeActivity } from './seeActivity';
export { default as Chat } from './chat';