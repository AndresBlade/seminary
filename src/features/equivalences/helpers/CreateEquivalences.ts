export async function CreateEquivalences({id, subject_id,score,token}:{id:string,subject_id:number,score:number,token:string}) {
    return await fetch(`${import.meta.env.VITE_URL}/enrollment/create-by-equivalence/`,{
        method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			auth: token,
		},
        body:JSON.stringify({
            seminarian_id:id,
            subject_id:subject_id,
            subject_score:score
        })
    })
}