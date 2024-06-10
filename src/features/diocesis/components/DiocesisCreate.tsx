import Diocesis from '../styles/diocesis.module.css'
export const DiocesisCreate = () => {
    return (
        <div className={Diocesis['diocesis-create__container']}>
            <div className={Diocesis['diocesis-create__container--titles']}>
                <div className={Diocesis['diocesis-create__h1-title']}>
                    <h1>Ecleciástico</h1>
                </div>
                <div className={Diocesis['diocesis-create__h2-title']}>
                    <h2>Agregar Diócesis</h2>
                </div>
            </div>

            <form className={Diocesis['diocesis-create__form']}>
                <div className={Diocesis['diocesis-create__form-inputs']}>
                    <div className={Diocesis['diocesis-create__form-name']}>
                        <label htmlFor="name" className={Diocesis['diocesis-create__form-name--label']}>Nombre de la diocesis*</label>
                        <input type="text" id="name" name="name" />
                    </div>
                    <div className={Diocesis['diocesis-create__form-obispo']}>
                        <label htmlFor="description" className={Diocesis['diocesis-create__form-obispo--label']}>Obispo que la dirige</label>
                        <input type="text" id="obispo" name="obispo" />
                    </div>
                </div>
                <div className={Diocesis['diocesis-create__form-group']}>
                    <button type="submit" className={Diocesis['diocesis-create__form-button--save']} >Guardar</button>
                    <button type="reset" className={Diocesis['diocesis-create__form-button--reset']}>Limpiar</button>
                </div>
            </form>
            
        </div>
    )
}

