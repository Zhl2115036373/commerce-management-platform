import {nanoid}  from "nanoid";
export const getNanoid=()=>{
    let nanoid_id = localStorage.getItem('NANOIDTOKEN')

    if(!nanoid_id){
        // 就生成一个游客临时身份
        nanoid_id= nanoid()
        localStorage.setItem('NANOIDTOKEN',nanoid_id)
    }
    return nanoid_id;
}