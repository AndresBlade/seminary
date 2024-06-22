import { ParishDataContentPropss } from "../../../pages/ParishShowData";

interface Parish{
    msj: string,
    parishrepository: ParishDataContentPropss[];
}

export const GetParish = ():Promise<Parish[]>=>{
    return fetch('http://127.0.0.1:3000/parish').then(
        response => response.json() as Promise<Parish[]>
    )
}