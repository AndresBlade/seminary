import { CreateAssessments } from '../features/professor/components/CreateAssessments'
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle'
import { Title } from '../features/ui/title/components/Title'
import { TitleList } from '../features/ui/title/components/TitleList'

export const CreateAssessmentsNew = () => {
    return (
        <>
            <TitleList>
                <Title content="Profesor" />
                <BackgroundColoredSubtitle content="Crear evaluación" />
            </TitleList>
            <CreateAssessments/>
        </>
    )
}

