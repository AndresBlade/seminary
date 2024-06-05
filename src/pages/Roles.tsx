import React from 'react'
import RolesStyle from '../features/roles/styles/roles.module.css'
import { RolesCreate } from '../features/roles/components/RolesCreate'
import { RolesTable } from '../features/roles/components/RolesTable'
export const Roles = () => {
    return (
        <div className={RolesStyle['roles-container']}>
            <RolesTable />
        </div>
    )
}

