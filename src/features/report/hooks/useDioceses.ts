import { useContext, useEffect, useState } from 'react';
import { Diocese, getDiocese } from '../../diocesis/helpers/getDiocese';
import { AuthContext } from '../../login/context/AuthContext';

export const useDiocesis = () => {
	const [dioceses, setDioceses] = useState<Diocese[] | null>(null);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (!user) return;
		getDiocese(user.token)
			.then(dioceses => setDioceses(dioceses))
			.catch(error => console.log(error));
	}, [user]);

	return dioceses;
};
