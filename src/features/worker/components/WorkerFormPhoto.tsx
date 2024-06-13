import Worker from '../styles/worker.module.css'

const WorkerFormPhoto = () => {
    return (
        <div className={Worker['worker-create__form-inputs']}>
            <h2>Foto del trabajador</h2>
            <div className={Worker['worker-create__form--photo']}>
                <div className={Worker['worker-create__form--facebook']}>
                    <img src="" alt="photoWorker" />
                    <label htmlFor="facebook" className={Worker['worker-create__form-facebook--label']}>Seleccione una foto</label>
                    <input type="file" name="photo" id="photo" />
                </div>
            </div>

        </div>

    )
}

export default WorkerFormPhoto
