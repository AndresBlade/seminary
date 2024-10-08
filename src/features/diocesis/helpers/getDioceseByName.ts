interface Diocese {
	id: number;
	name: string;
	holder: string;
}
interface DioceseWrapper {
	msj: string;
	diocese: Diocese[];
}

export const getDioceseByName = ({
	name,
	token,
}: {
	name: string;
	token: string;
}) => {
	return fetch(`${import.meta.env.VITE_URL}/Diocese/search/${name}`, {
		headers: {
			auth: token,
		},
	})
		.then(response => response.json() as Promise<DioceseWrapper>)
		.then(data => data.diocese);
};
