import { TitleList } from '../features/ui/title/components/TitleList'
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle'
import { Title } from '../features/ui/title/components/Title'
import { WorkerShowList } from '../features/worker/components/WorkerShowList'

const WorkerList = () => {
    return (
        <div>
            <TitleList>
                <Title content={'Trabajador'}/>
                <BackgroundColoredSubtitle content={'Lista trabajadores'}/>
                <WorkerShowList/>
            </TitleList>
        </div>
    )
    }

export default WorkerList
