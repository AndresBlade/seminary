import Parish from '../features/parish/styles/parish.module.css'
import ParisDataContent from '../features/parish/components/ParisDataContent'
import ContentTitle from '../features/ui/contentTitle/components/ContentTitle'
import UseGet from '../shared/hooks/useGet'
import { useNavigate } from 'react-router-dom'
interface ParishDataProps{
    msj: string,
    parishrepository: ParishDataContentProps[]
}
interface ParishDataContentProps{
    id: number,
    diocese_id: number,
    name: string,
    patron: string

}

export const ParishShowData = () => {
    const apiUrl = 'http://localhost:3000/parish/';
    const {data, loading, error} = UseGet<ParishDataProps>(apiUrl);
    return (
        <div className={Parish['parish-table__container']}>
            <ContentTitle title="Eclesiástico" subtitle="Lista parroquias" />

            <section className={Parish['data-show__container']}>
                <div className={Parish['data-show__title']}>
                    <h2>Parroquia</h2>
                    <h2>Parroco</h2>
                    <h2>Acciones</h2>
                </div>
                <div className={Parish['data-content__container']}>
                    {loading ? 
                        <div className={Parish['animation-container']}>
                            <div className={Parish['animation-loading']}></div>
                            <div className={Parish['animation-loading__two']}></div>
                        </div>
                        :error ? 
                                <div><p>Error al cargar los datos</p></div>
                        :data?.parishrepository.map((parish)=>{
                            return (
                                <ParisDataContent key={parish.id} id={parish.id} parroquia={parish.name} parroco={parish.patron}/>
                            )
                        })
                }
                </div>
            </section>
        </div>
    )
}

