import React from 'react'
import Roles from '../styles/roles.module.css'
import {useRolePost} from '../hooks/useRolePost';


export const RolesCreate = () => {
    const [nameRole, setNameRole] = React.useState('');
    const [descriptionRole, setDescriptionRole] = React.useState('');
    const [permissionsRoles, setPermissionsRoles] = React.useState<number[]>([]);

    const permissionRolesIndex = ([] as number[])

    permissionsRoles.map((permission, index) => {
        if(permission === 1){
            permissionRolesIndex.push(index);
        }
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const name = nameRole;
        const description = descriptionRole;
        const numbers = permissionRolesIndex;
        useRolePost({name, description, numbers});
    }    
    return (
        <div className={Roles['roles-create__container']}>
            <div className={Roles['roles-create__h2--title']}>
                <h2>Agregar rol de usuario</h2>
            </div>
            <form action="POST" className={Roles['form']} onSubmit={handleSubmit}>
                <div className={Roles['roles-create__form']}>
                    <h2 className={Roles['roles-create__h2']}>Crear Rol</h2>
                    <label htmlFor="name">Nombre * </label>
                    <input type="text" name="name" id="name" className={Roles['input-name']} onChange={(e)=>setNameRole(e.target.value)} autoFocus />
                    <label htmlFor="description">Descripción</label>
                    <textarea name="description" id="description" className={Roles['input-name']} onChange={(e)=>setDescriptionRole(e.target.value)} ></textarea>
                    <div className={Roles['table-permission__container']}>
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
                                    <td><input type="checkbox" id="permission" value={9} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}}/></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input']} value={10} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-edit']} value={11} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-delete']} value={12} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                </tr>
                            </tr>
                            <tr className={Roles['table-permission__tbody--tr']}>
                                <td>Etapa</td>
                                <tr className={Roles['table-permission__tbody--options']}>
                                    <td><input type="checkbox" id="permission" value={17} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input']} value={18} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-edit']} value={19} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-delete']} value={20} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                </tr>
                            </tr>
                            <tr className={Roles['table-permission__tbody--tr']}>
                                <td>Instructor</td>
                                <tr className={Roles['table-permission__tbody--options']}>
                                    <td><input type="checkbox" id="permission" value={1} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input']} value={2} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-edit']} value={3} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-delete']} value={4} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                </tr>
                            </tr>
                            <tr className={Roles['table-permission__tbody--tr']}>
                                <td>Usuario</td>
                                <tr className={Roles['table-permission__tbody--options']}>
                                    <td><input type="checkbox" id="permission" value={5}onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input']} value={6} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-edit']} value={7} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-delete']} value={8} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                </tr>
                            </tr>
                            <tr className={Roles['table-permission__tbody--tr']}>
                                <td>Examen</td>
                                <tr className={Roles['table-permission__tbody--options']}>
                                    <td><input type="checkbox" id="permission" value={13} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input']} value={14} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-edit']} value={15} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-delete']} value={16} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                </tr>
                            </tr>
                            <tr className={Roles['table-permission__tbody--tr']}>
                                <td>Curso</td>
                                <tr className={Roles['table-permission__tbody--options']}>
                                    <td><input type="checkbox" id="permission" value={21} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input']} value={22} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}}/></td>
                                    <td> <input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-edit']} value={23} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-delete']} value={24} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                </tr>
                            </tr>
                            <tr className={Roles['table-permission__tbody--tr']}>
                                <td>Materias</td>
                                <tr className={Roles['table-permission__tbody--options']}>
                                    <td><input type="checkbox" id="permission" value={25} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input']} value={26} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-edit']} value={27} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                    <td><input type="checkbox" id="permission"  className={Roles['table-permission__tbody--input-delete']} value={28} onChange={(e:any)=>{setPermissionsRoles(prevPermissions => {
                                        const updatedPermissions = [...prevPermissions];
                                        updatedPermissions[e.target.value] = Number(!updatedPermissions[e.target.value]);
                                        return updatedPermissions;
                                    })}} /></td>
                                </tr>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    {
                        nameRole.length === 0 || descriptionRole.length === 0 || permissionRolesIndex.length === 0 ? <button type="submit" id='send' className={Roles['button-send']} disabled={true} >Crear</button>  : <button type="submit" id='send' className={Roles['button-send']}>Crear</button>
                    }
                    
                </div>
            </form>
        </div>
    )
}

