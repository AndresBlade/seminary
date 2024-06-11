import Diocesis from '../styles/diocesis.module.css'
import DeleteIcon from '../../../assets/deleteIcon.svg'
import EditIcon from '../../../assets/editIcon.svg'
import UseGet from '../../../shared/hooks/useGet'
import useApiDelete from '../../../shared/hooks/useDelete'
import { useEffect, useState } from 'react'

interface Diocesis{
    id: number;
    name: string;
    holder: string;

}

const DiocesisShowData = () => {
    const apiUrl = 'http://127.0.0.1:3000/Diocese/';
    const [diocesisDelete, setDiocesisDelete] = useState<number>(0); // [1
    const {data, loading, error} = UseGet(apiUrl);
    const {deleteData} = useApiDelete({apiUrl,idDelete:diocesisDelete}); 

    useEffect(()=>{
        if(diocesisDelete !== 0){
            deleteData().catch(console.error);
        }
    },[diocesisDelete,deleteData])


    return (
        <div className={Diocesis['diocesis-table__table']}>
        <table className={!loading ? Diocesis['diocesis-table__table--container'] : Diocesis['diocesis-table__table--container-loading']}>
            <thead className={Diocesis['diocesis-table__table--thead']}>
                <tr>
                    <th>Diócesis</th>
                    <th>Obispo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className={Diocesis['diocesis-table__table--tbody']}>
                {loading ? <tr className={Diocesis['animation-container']}>
                                    <td className={Diocesis['animation-loading']}></td>
                                    <td className={Diocesis['animation-loading__two']}></td>
                                </tr>

                :
                
                    error ? <tr><td>Error al cargar los datos</td></tr>
                :
                (data as [])?.map((diocesis:Diocesis)=>{
                    return (
                        <tr key={diocesis.id} className={Diocesis['diocesis-table__table--tbody-tr']}>
                            <td>{diocesis.name}</td>
                            <td className={Diocesis['diocesis-table__table--tbody-tr-obispo']} >{diocesis.holder}</td>
                            <td className={Diocesis['diocesis-table__button--container']}>
                                <button className={Diocesis['diocesis-table__button--edit']}>
                                    <img src={EditIcon} alt="Editar"  />
                                </button>
                                <button className={Diocesis['diocesis-table__button--delete']} onClick={()=>{
                                        setDiocesisDelete(diocesis.id);
                                    }}>
                                    <img src={DeleteIcon} alt="Eliminar" />
                                </button>
                            </td>
                        </tr>
                    )
                    
                })}
            </tbody>
        </table>
    </div>
    )
}

export default DiocesisShowData
