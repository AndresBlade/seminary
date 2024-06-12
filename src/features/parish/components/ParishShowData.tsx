import Parish from '../styles/parish.module.css'
import ParisDataContent from './ParisDataContent'
import UseGet from '../../../shared/hooks/useGet'
const ParishShowData = () => {
    return (
        <section className={Parish['data-show__container']}>
            <div className={Parish['data-show__title']}>
                <h2>Parroquia</h2>
                <h2>Parroco</h2>
                <h2>Acciones</h2>
            </div>
            <div className={Parish['data-content__container']}>
                <ParisDataContent id={1} parroquia='San Juan' parroco='Juan Perez'/>
            </div>
        </section>
    )
}

export default ParishShowData
