interface Diocese{
    id: number;
    name: string;
    holder: string;
}

export const getDiocese = ():Promise<Diocese[]>=>{
    return fetch('http://localhost:3000/Diocese/').then(
        response => response.json() as Promise<Diocese[]>
    )
}
