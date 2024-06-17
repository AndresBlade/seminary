import React, { useEffect, useState } from 'react'
import Diocesis from '../styles/diocesis.module.css'
import { CreateDiocesis } from '../helpers/createDiocesis'
import { editDiocesis } from '../helpers/editDiocesis';
import { useParams, useNavigate } from 'react-router-dom';
import useGet from '../../../shared/hooks/useGet'

interface DiocesisFormProps {
    e: React.FormEvent<HTMLFormElement>;
    diocesisName: string;
    obispoName: string;
}
interface Diocesis{
    name: string;
    obispo: string;
}
interface DiocesisData{
    mjs: string;    
    diocese:{
        id:number,
        name: string;
        holder: string;
    }
    
}
export const DiocesisForm = () => {
    const [diocesisName, setDiocesisName] = useState('');
    const [obispoName, setObispoName] = useState('');
    const [error, setError] = useState<boolean>();
    const {id}= useParams();
    const apiUrl = `http://localhost:3000/Diocese/${Number(id)}`
    const {data} = useGet<DiocesisData>(apiUrl);
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(isNaN(Number(id))) return;
        if(!data) return;

        setDiocesisName(data?.diocese.name);
        setObispoName(data?.diocese.holder);

    },[data, id])

    console.log(data)
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
            if(isNaN(Number(id))){
                CreateDiocesis({name, obispo}).then((response)=>{
                    if(response.status === 200){
                        setError(false)
                    }else{
                        setError(true)
                    }
                    navigate('..')
                }).catch((error) => {
                    console.log(error);
                });
                return;
            }
            editDiocesis({id:Number(id),name, obispo}).then((response)=>{
                if(response.status === 200){
                    setError(false)
                }else{
                    setError(true)
                }
                navigate('..')
            }).catch((error) => {
                console.log(error);
            });
        }
    };
    
    console.log(id);

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

