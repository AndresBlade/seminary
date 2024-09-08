import { SchedulesCreate } from "../features/schedules/components/SchedulesCreate"
import { BackgroundColoredSubtitle } from "../features/ui/title/components/BackgroundColoredSubtitle"
import { Title } from "../features/ui/title/components/Title"
import { TitleList } from "../features/ui/title/components/TitleList"

export const Schedules = () => {
    return (
        <div>   
            <TitleList>
                <Title content={"Horarios"}/>
                <BackgroundColoredSubtitle content={"Cargar Horario"}/>
                <SchedulesCreate/>
            </TitleList>
        </div>
    )
}