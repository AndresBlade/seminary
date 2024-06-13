import Worker from '../styles/worker.module.css'
const WorkerFormLabor = () => {
    return (
        <div className={Worker['worker-create__form-inputs']}>
            <h2>Información laboral</h2>
            <div className={Worker['worker-create__form--personal']}>
                <div className={Worker['worker-create__form--post']}>
                <label htmlFor="name" className={Worker['worker-create__form-post--label']}>Cargo actual</label>
                <select name="post" id="post" >
                    <option value="post1">Post 1</option>
                    <option value="post2">Post 2</option>
                    <option value="post3">Post 3</option>
                </select>
            </div>
            <h2>Información de salud</h2>
            <div className={Worker['worker-create__form--blood']}>
                <label htmlFor="lastName" className={Worker['worker-create__form-lastName--label']}>Tipo de sangre</label>
                <select name="blood" id="blood" >
                    <option value="post1">Post 1</option>
                    <option value="post2">Post 2</option>
                    <option value="post3">Post 3</option>
                </select>                        </div>    
            <div className={Worker['worker-create__form--condition']}>                        
                <label htmlFor="id" className={Worker['worker-create__form-id--label']}>Condicion medica</label>
                <input type="text" name="condition" id="condition" />
                </div>
                </div>
        </div>

    )
}

export default WorkerFormLabor
