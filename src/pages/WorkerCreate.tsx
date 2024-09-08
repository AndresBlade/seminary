
import { TitleList } from '../features/ui/title/components/TitleList'
import { Title } from '../features/ui/title/components/Title'
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle'
import { WorkerRegister } from '../features/worker/components/WorkerRegister'

const WorkerCreate = () => {
    return (
        <div>
            <TitleList>
                <Title content={'Trabajador'}/>
                <BackgroundColoredSubtitle content={'Registrar trabajador'}/>
                <WorkerRegister/>
            </TitleList>
        </div>
        
    )
}

export default WorkerCreate
