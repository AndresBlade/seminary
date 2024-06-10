import RolesStyle from '../features/roles/styles/roles.module.css'
import { RolesCreate } from '../features/roles/components/RolesCreate'
export const Roles = () => {
    return (
        <div className={RolesStyle['roles-container']}>
            <RolesCreate />
        </div>
    )
}

