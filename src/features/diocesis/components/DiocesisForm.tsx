import React, { useState } from 'react'
import Diocesis from '../styles/diocesis.module.css'
import { CreateDiocesis } from '../helpers/createDiocesis'

interface DiocesisFormProps {
    e: React.FormEvent<HTMLFormElement>;
    diocesisName: string;
    obispoName: string;
}
interface Diocesis{
    name: string;
    obispo: string;
}

export const DiocesisForm = () => {
    const [diocesisName, setDiocesisName] = useState('');
    const [obispoName, setObispoName] = useState('');
    const [error, setError] = useState<boolean>();
    const handleSubmit = ({
        e,
        diocesisName,
        obispoName
    }:DiocesisFormProps)=>{
        e.preventDefault();
        if(diocesisName.length === 0 && obispoName.length === 0){ 
            return alert('Por favor llene los campos');
        }else{
            const name = diocesisName;
            const obispo = obispoName;
            CreateDiocesis({name, obispo}).then((response)=>{
                if(response.status === 200){
                    setError(false)
                }else{
                    setError(true)
                }
            }).catch((error) => {
                console.log(error);
            });
            
        }
    };

    console.log(error);

    return (
        <form action='POST' onSubmit={(e)=>{handleSubmit({e,diocesisName,obispoName})}} className={Diocesis['diocesis-create__form']}>
                <div className={Diocesis['diocesis-create__form-inputs']}>
                    <div className={Diocesis['diocesis-create__form-name']}>
                        <label htmlFor="name" className={Diocesis['diocesis-create__form-name--label']}>Nombre de la diocesis*</label>
                        <input type="text" id="name" name="name" onChange={(e)=>{
                            setDiocesisName(e.target.value)
                        }} value={diocesisName}/>
                    </div>
                    <div className={Diocesis['diocesis-create__form-obispo']}>
                        <label htmlFor="description" className={Diocesis['diocesis-create__form-obispo--label']}>Obispo que la dirige</label>
                        <input type="text" id="obispo" name="obispo" onChange={(e)=>{
                            setObispoName(e.target.value)
                        }} value={obispoName} />
                    </div>
                </div>
                <div className={Diocesis['diocesis-create__form-group']}>
                    <button type="submit" className={Diocesis['diocesis-create__form-button--save']} >Guardar</button>
                    <button type="reset" className={Diocesis['diocesis-create__form-button--reset']}>Limpiar</button>
                </div>
        </form>
    )
}

