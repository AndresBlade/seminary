import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../features/login/context/AuthContext";
import { GetSchedules } from "../features/schedules/helpers/GetSchedules";
import { schedulesInterfaces } from "../features/schedules/interfaces/schedules";
import { ContentContainer } from "../features/ui/container/components/ContentContainer";
import SchedulesCSS from '../features/schedules/styles/schedules.module.css'
import { TitleList } from "../features/ui/title/components/TitleList";
import { Title } from "../features/ui/title/components/Title";
export const Home = () => {
	const {user} = useContext(AuthContext)
	const [schedules, setSchedules]=useState<schedulesInterfaces[] | null>(null)
	useEffect(()=>{
		if(!user?.token)return
		GetSchedules(user.token).then(response=>
			setSchedules(response)
		).catch(error=>{
			console.log(error)
			alert('Error al mostrar los horarios')
		});
	},[user?.token])
	return (
		<TitleList>
			<Title content={"Horarios"}/>
			<ContentContainer>
			<div className={SchedulesCSS.buttonsSchedulesHomeContainer}>
				{schedules?.map(schedules=>
					<button type="button" key={schedules.ID} disabled={schedules.link === null} className={SchedulesCSS.buttonsSchedulesHome}
						onClick={()=>{
							if(schedules.link){
								window.open(schedules.link )

							}
						}}
					>{schedules.Curso}</button>
				)}
			</div>
		</ContentContainer>

		</TitleList>
		


	);
};
