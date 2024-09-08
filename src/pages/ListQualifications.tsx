import { TitleList } from '../features/ui/title/components/TitleList'
import { Title } from '../features/ui/title/components/Title'
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle'
import {Qualifications} from '../features/professor/components/Qualifications'


export const ListQualifications = () => {
    
    return (
        <>
                <TitleList>
                    <Title content="Profesor" />
                    <BackgroundColoredSubtitle content="Crear evaluación" />
                    <Qualifications/>
                </TitleList>
        </>
    )
}


