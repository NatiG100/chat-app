import { TypeUser } from "./enteties"

export type TypeLogin = {
    username:string,
    password:string,
}
export type TypeChangePassword = {
    oldPassword:string,
    newPassword:string,
    confirmPassword:string,
}
export type UpdateProfile = Omit<Partial<TypeUser>,"profileImg">&{
    profileImg:File|null
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

export type APIFeatures<Type> = {
    query?:string,
    select?:Partial<Type>,
    page?:number,
    limit?:number,
}
export type MultiResponse<Type> = {
    meta:{
        totalCount:number
    },
    data:Partial<Type>[]
}