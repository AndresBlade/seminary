import React from 'react'
import Roles from '../styles/roles.module.css'
import DeleteIcon from '../../../assets/deleteIcon.svg'
import EditIcon from '../../../assets/editIcon.svg'
import useApiGet from '../hooks/useApiGet'

export const RolesTable = () => {
    
    const apiUrl = 'https://localhost:3000/role/';
    const {data, loading, error} = useApiGet(apiUrl);

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
                        <tr className={Roles['roles-table__tbody--tr']}>
                            <td>Administrador</td>
                        </tr>     
                        <tr>
                            <td>
                                <button className={Roles['table-button__action']}><img src={EditIcon} alt="Editar" /></button>
                                <button className={Roles['table-button__action']}><img src={DeleteIcon} alt="Eliminar" /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
