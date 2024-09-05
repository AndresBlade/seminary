import { SeminarianNotes } from "../features/seminarian/components/SeminarianNotes"
import { TitleList } from "../features/ui/title/components/TitleList"
import { BackgroundColoredSubtitle } from "../features/ui/title/components/BackgroundColoredSubtitle"
import { Title } from "../features/ui/title/components/Title"
export const Seminarian = () => {
    return (
        <div>
            <TitleList>
                <Title content={"Seminarista"}/>
                <BackgroundColoredSubtitle content={"Historial académico"} />
            </TitleList>
            <SeminarianNotes/>
        </div>
    )
}