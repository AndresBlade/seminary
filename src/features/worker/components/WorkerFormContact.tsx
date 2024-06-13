import Worker from '../styles/worker.module.css'

const WorkerFormContact = () => {
    return (
        <div className={Worker['worker-create__form-inputs']}>
            <h2>Información de contacto</h2>
            <div className={Worker['worker-create__form--personal']}>
                <div className={Worker['worker-create__form--phone']}>
                    <label htmlFor="phone" className={Worker['worker-create__form-phone--label']}>Teléfono</label>
                    <input type="text" name="phone" id="phone" />
                </div>
                <div className={Worker['worker-create__form--email']}>
                    <label htmlFor="email" className={Worker['worker-create__form-email--label']}>Correo</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className={Worker['worker-create__form--phoneFamily']}>
                    <label htmlFor="address" className={Worker['worker-create__form-phoneFamily--label']}>Telefono de contacto familiar</label>
                    <input type="text" name="phoneFamily" id="phoneFamily" />
                </div>
                <div className={Worker['worker-create__form--nameContact']}>
                    <label htmlFor="address" className={Worker['worker-create__form-nameContact--label']}>Telefono de contacto familiar</label>
                    <input type="text" name="nameContact" id="nameContact" value='' />
                </div>
            </div>

        </div>

    )
}

export default WorkerFormContact
