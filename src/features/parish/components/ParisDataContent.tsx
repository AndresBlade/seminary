import { HTMLAttributes, FC, useState, useEffect } from 'react'
import Parish from '../styles/parish.module.css'
import EditIcon from '../../../assets/editIcon.svg'
import DeleteIcon from '../../../assets/deleteIcon.svg'
import useDelete from '../../../shared/hooks/useDelete'
import { useNavigate } from 'react-router-dom'
interface ParisDataContentProps {
    parroquia: string
    parroco: string
    id:number

}
export type ParisDataContentProp = HTMLAttributes<HTMLDivElement> & ParisDataContentProps;

const ParisDataContent: FC<ParisDataContentProps> = ({id,parroquia,parroco}) => {
    const apiUrl = 'http://localhost:3000/parish/';
    const [parroquiaDelete, setParroquiaDelete] = useState<number>(0);
    const {deleteData} = useDelete({apiUrl,idDelete:parroquiaDelete});
    const navigate = useNavigate();

    useEffect(()=>{
        if(parroquiaDelete !== 0){
            deleteData().catch(console.error);
            setTimeout(() => {
                window.location.reload()
            },2000)
        }
    },[parroquiaDelete,deleteData])

    console.log(`id para eliminar: ${parroquiaDelete}`)
    return (
        <div className={Parish['data-content']} key={id} >
            <p>{parroquia}</p>
            <p>{parroco}</p>
            <div className={Parish['data-buttons']}>
                <button onClick={()=>{
                    navigate(`./${id}`)
                }}>
                    <img src={EditIcon} alt="Editar"/>                     
                </button>
                <button type='button' onClick={()=>{
                    setParroquiaDelete(id)
                }}>
                    <img src={DeleteIcon} alt="Eliminar" />
                </button>
            </div>
        </div>
    )
}

export default ParisDataContent
