export async function CreateSchedule({id,link,token}:{id:number,link:string,token:string}) {
    const response = await fetch(`${import.meta.env.VITE_URL}/horario/`,{
        method: 'PUT',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			auth: token,
		},
		body: JSON.stringify({
			id:id,
            link:link
		}),
    })
    
    return response
}