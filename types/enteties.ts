export type TypeUser = {
    id:number,
    firstName:string,
    lastName?:string,
    userName:string,
    phoneNumber:string,
    profileImg?:string,
    status?:string,
}

export type TypeGroup = {
    id:number,
    name:string,
    description?:string,
    link?:string,
    profileImg?:string,
    superAdmin:number,
}

export type TypeChat = {
    id:number,
    groupId?:number,
    user1?:number,
    user2?:number,
}

export type TypeMessage = {
    id:number,
    chatId:number,
    senderId:number,
    timeStamp:Date,
    updatedAt:Date
    text:string,
    image?:string,
    video?:string,
    audio?:string,
    type:"TEXT"|"VIDEO"|"AUDIO",
    seen:boolean,
}