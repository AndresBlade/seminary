export const getCardWorker= (
    {id,token}:{id:string,token:string}
) => {
	return fetch(`${import.meta.env.VITE_URL}/worker/ficha/${id}`, {
		headers: { auth: token },
	})
		.then(response => response.blob())
		.then(data => window.open(URL.createObjectURL(data)));
};
