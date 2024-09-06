import { TitleList } from '../features/ui/title/components/TitleList'
import { Title } from '../features/ui/title/components/Title'
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle'
import EquivalencesCreate from '../features/equivalences/components/EquivalencesCreate'

const Equivalences = () => {
    return (
        <>
            <TitleList>
                <Title content={'Equivalencia'} />
                <BackgroundColoredSubtitle content={'Registrar equivalencia'} />
            </TitleList>
            <EquivalencesCreate />
        </>

    )
    
}

export default Equivalences
