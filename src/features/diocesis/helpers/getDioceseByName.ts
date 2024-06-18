interface Diocese{
    
    id: number;
    name: string;
    holder: string;
}
interface DioceseWrapper{
    msj: string;
    diocese: Diocese[];
}

export const getDioceseByName =({name}:{name:string})=>{
    return fetch(`http://localhost:3000/Diocese/search/${name}`).then(
        response => response.json() as Promise<DioceseWrapper>
    ).then(data => data.diocese)
}