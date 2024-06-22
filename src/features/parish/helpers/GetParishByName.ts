interface Parish{
    id: number;
    diocese_id: number;
    name: string;
    patron: string;
}
interface parishWrapper{
    msj: string;
    parish: Parish[];
}

export const GetParishByName =({name}:{name:string})=>{
    return fetch(`http://localhost:3000/parish/search/${name}`).then(
        response => response.json() as Promise<parishWrapper>
    ).then(data => data.parish)
}