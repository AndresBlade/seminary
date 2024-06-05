import React, {useEffect} from 'react'
import Roles from '../styles/roles.module.css'
import DeleteIcon from '../../../assets/deleteIcon.svg'
import EditIcon from '../../../assets/editIcon.svg'
import useApiGet from '../hooks/useApiGet'
import useApiDelete from '../hooks/useApiDelete'


export const RolesTable = () => {
    const [roleDelete, setRoleDelete] = React.useState<number>(0);
    const apiUrl = 'http://localhost:3000/role/';
    const {data, loading, error} = useApiGet(apiUrl);      
    const {deleteData} = useApiDelete(apiUrl,roleDelete);

    useEffect(() => {
        if (roleDelete !== 0) {
            deleteData();
            window.location.reload();
        }
    }, [roleDelete]);

    console.log(data, loading, error);
    return (
        <div className={Roles['roles-table__container']}>
            <div className={Roles['roles-table__h2']}>
                <h2>Lista Roles</h2>
            </div>
            <div className={Roles['roles-table']}>
                <div className={Roles['roles-search']}>
                    <input type="text" placeholder="Buscar" className={Roles['input-search']} />
                    <button className={Roles['button-search']}>Buscar</button>
                </div>
                <table className={Roles['roles-table__table']}>
                    <thead className={Roles['roles-table__thead']}>
                        <tr className={Roles['roles-table__thead--tr']} >
                            <th>Nombre</th>
                        </tr>
                        <tr className={Roles['roles-table__thead--tr']} >
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className={Roles['roles-table__tbody']}>
                        {
                            loading ? 
                                <tr className={Roles['animation-container']}>
                                    <td className={Roles['animation-loading']}></td>
                                    <td className={Roles['animation-loading__two']}></td>
                                </tr>
                            : error ? 
                                <tr>
                                    <td>Error al cargar los datos</td>
                                </tr> 
                            : data?.map((role:{name:string, id:number, description:string}) => {
                                return(
                                <tr className={Roles['roles-table__tbody--tr']} key={role.id}>
                                    <td className={Roles['roles-table__tbody--td']}>
                                        <div>{role.name}</div>
                                    </td>     
                                    <td>
                                        <div>
                                            <button className={Roles['table-button__action']}><img src={EditIcon} alt="Editar"  /></button>
                                            <button className={Roles['table-button__action']}
                                                onClick={
                                                    ()=>{
                                                        setRoleDelete(role.id)
                                                }
                                            }><img src={DeleteIcon} alt="Eliminar"  />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                        )})}
                        
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}
