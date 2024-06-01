import React from 'react'
import Roles from '../styles/roles.module.css'

export const RolesCreate = () => {
    const [nameRole, setNameRole] = React.useState('')
    const [permissionsRoles, setPermissionsRoles] = React.useState(new Array(28).fill(false));

    const handleOnChange = (position: number)=> {
        const updatedPermission = permissionsRoles.map((permission, index) => {
            if(index === position){
                return !permission
            }else{
                return permission
            }

        })
        setPermissionsRoles(updatedPermission)
    }

    return (
        <div className={Roles['roles-create__container']}>
            <form action="POST" className={Roles['form']}>
                <div className={Roles['roles-create__form']}>
                    <h2 className={Roles['roles-create__h2']}>Crear Rol</h2>
                    <label htmlFor="name">Nombre * </label>
                    <input onChange={(e)=>setNameRole(e.target.value)} type="text" name="name" id="name" className={Roles['input-name']} />
                    <table className={Roles['table-permission']}>
                        <thead className={Roles['table-permission__thead']}>
                            <tr>
                                <th>Ruta</th>
                                <tr className={Roles['table-permission__thead--options']}>
                                    <th>Ver</th>
                                    <th>crear</th>
                                    <th>editar</th>
                                    <th>eliminar</th>
                                </tr>
                            </tr>
                        </thead>
                        <tbody className={Roles['table-permission__tbody']}>
                            <tr className={Roles['table-permission__tbody--tr']}>
                                <td>seminaristas</td>
                                <tr className={Roles['table-permission__tbody--options']}>
                                    <td><input type="checkbox" id="permission" /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input']} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-edit']} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-delete']} /></td>
                                </tr>
                            </tr>
                            <tr className={Roles['table-permission__tbody--tr']}>
                                <td>Etapa</td>
                                <tr className={Roles['table-permission__tbody--options']}>
                                    <td><input type="checkbox" id="permission" /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input']} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-edit']} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-delete']} /></td>
                                </tr>
                            </tr>
                            <tr className={Roles['table-permission__tbody--tr']}>
                                <td>Instructor</td>
                                <tr className={Roles['table-permission__tbody--options']}>
                                    <td><input type="checkbox" id="permission" /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input']} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-edit']} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-delete']} /></td>
                                </tr>
                            </tr>
                            <tr className={Roles['table-permission__tbody--tr']}>
                                <td>Usuario</td>
                                <tr className={Roles['table-permission__tbody--options']}>
                                    <td><input type="checkbox" id="permission" /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input']} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-edit']} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-delete']} /></td>
                                </tr>
                            </tr>
                            <tr className={Roles['table-permission__tbody--tr']}>
                                <td>Examen</td>
                                <tr className={Roles['table-permission__tbody--options']}>
                                    <td><input type="checkbox" id="permission" /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input']} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-edit']} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-delete']} /></td>
                                </tr>
                            </tr>
                            <tr className={Roles['table-permission__tbody--tr']}>
                                <td>Curso</td>
                                <tr className={Roles['table-permission__tbody--options']}>
                                    <td><input type="checkbox" id="permission" /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input']} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-edit']} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-delete']} /></td>
                                </tr>
                            </tr>
                            <tr className={Roles['table-permission__tbody--tr']}>
                                <td>Materias</td>
                                <tr className={Roles['table-permission__tbody--options']}>
                                    <td><input type="checkbox" id="permission" /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input']} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-edit']} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-delete']} /></td>
                                </tr>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit" className={Roles['button-send']}>Create</button>
                </div>
            </form>
        </div>
    )
}

