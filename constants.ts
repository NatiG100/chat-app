export const BASE_URL = "http://localhost:4000";
export const GET_IMG_URL = (imgId?:string)=>{
    if(!imgId){return undefined}
    return "https://ucarecdn.com/"+imgId+'/'
}