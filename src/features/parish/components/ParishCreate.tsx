import Parish from '../styles/parish.module.css'
import ContentTitle from '../../ui/contentTitle/components/ContentTitle'
const ParishCreate = () => {
    return (
        <div className={Parish['parish-create__container']}>
            <ContentTitle title="Eclesiástico" subtitle="Agregar parroquia" />
            <form className={Parish['parish-create__form']}>
                <div className={Parish['parish-create__form-inputs']}>
                    <div className={Parish['parish-create__form-name']}>
                        <label htmlFor="name" className={Parish['parish-create__form-name--label']}>Nombre de la parrqouia*</label>
                        <input type="text" id="name" name="name" />
                    </div>
                    <div className={Parish['parish-create__form-parroco']}>
                        <label htmlFor="description" className={Parish['parish-create__form-parroco--label']}>Parroco</label>
                        <input type="text" id="parroco" name="parroco" />
                    </div>
                    <div className={Parish['parish-create__form-select']}>
                        <label htmlFor="diocesis" className={Parish['parish-create__form-diocesis--label']}>Diocesis a la que pertenece</label>
                        <select name="diocesis" id="diocesis">
                            <option value="taldiocesis">Tal Diocesis</option>
                            <option value="otradiocesis">Otra Diocesis</option>

                        </select>
                    </div>
                </div>
                <div className={Parish['parish-create__form-group']}>
                    <button type="submit" className={Parish['parish-create__form-button--save']} >Guardar</button>
                    <button type="reset" className={Parish['parish-create__form-button--reset']}>Limpiar</button>
                </div>
            </form>
        </div>
    )
}

export default ParishCreate
