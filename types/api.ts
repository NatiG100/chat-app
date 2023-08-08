export type TypeLogin = {
    username:string,
    password:string,
}
export type TypeChangePassword = {
    oldPassword:string,
    newPassword:string,
    confirmPassword:string,
}

export enum permissions{
    ADD_MEMBER=1,
    CHANGE_MEMBER_STATUS=2,
    ADD_ADMIN=3,
    REMOVE_ADMIN=4,
    CHANGE_ADMIN_STATUS=5,
    FETCH_ADMINS=6,
}
export type TypeSuccessRes = {
    message:string,
}
export type TypeErrorRes = {
    message:string,
}