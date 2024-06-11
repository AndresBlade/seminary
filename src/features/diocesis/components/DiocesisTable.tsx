import Diocesis from '../styles/diocesis.module.css'
import DeleteIcon from '../../../assets/deleteIcon.svg'
import EditIcon from '../../../assets/editIcon.svg'
import ContentTitle from '../../ui/contentTitle/components/ContentTitle'

export const DiocesisTable = () => {
    return (
        <div className={Diocesis['diocesis-table__container']}>
            <ContentTitle title="Diocesis" subtitle="Lista Diocesis" />
            <div className={Diocesis['diocesis-table__table']}>
                <table className={Diocesis['diocesis-table__table--container']}>
                    <thead className={Diocesis['diocesis-table__table--thead']}>
                        <tr>
                            <th>Diócesis</th>
                            <th>Obispo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className={Diocesis['diocesis-table__table--tbody']}>
                        <tr className={Diocesis['diocesis-table__table--tbody-tr']}>
                            <td>Diócesis de Celaya</td>
                            <td className={Diocesis['diocesis-table__table--tbody-tr-obispo']} >Obispo José Benjamín Castillo Plascencia</td>
                            <td className={Diocesis['diocesis-table__button--container']}>
                                <button className={Diocesis['diocesis-table__button--edit']}>
                                    <img src={EditIcon} alt="Editar" />
                                </button>
                                <button className={Diocesis['diocesis-table__button--delete']}>
                                    <img src={DeleteIcon} alt="Eliminar" />
                                </button>
                            </td>
                        </tr>
                        <tr className={Diocesis['diocesis-table__table--tbody-tr']}>
                            <td>Diócesis de Irapuato</td>
                            <td className={Diocesis['diocesis-table__table--tbody-tr-obispo']}>Obispo Enrique Díaz Díaz</td>
                            <td className={Diocesis['diocesis-table__button--container']}>
                                <button className={Diocesis['diocesis-table__button--edit']}>
                                    <img src={EditIcon} alt="Editar" />
                                </button>
                                <button className={Diocesis['diocesis-table__button--delete']}>
                                    <img src={DeleteIcon} alt="Eliminar" />
                                </button>
                            </td>
                        </tr>
                        <tr className={Diocesis['diocesis-table__table--tbody-tr']}>
                            <td>Diócesis de León</td>
                            <td className={Diocesis['diocesis-table__table--tbody-tr-obispo']}>Obispo Alfonso Cortés Contreras</td>
                            <td className={Diocesis['diocesis-table__button--container']}>
                                <button className={Diocesis['diocesis-table__button--edit']}>
                                    <img src={EditIcon} alt="Editar" />
                                </button>
                                <button className={Diocesis['diocesis-table__button--delete']}>
                                    <img src={DeleteIcon} alt="Eliminar" />
                                </button>
                            </td>
                        </tr>
                        <tr className={Diocesis['diocesis-table__table--tbody-tr']}>
                            <td>Diócesis de Salamanca</td>
                            <td className={Diocesis['diocesis-table__table--tbody-tr-obispo']}>Obispo Sede Vacante</td>
                            <td className={Diocesis['diocesis-table__button--container']}>
                                <button className={Diocesis['diocesis-table__button--edit']}>
                                    <img src={EditIcon} alt="Editar" />
                                </button>
                                <button className={Diocesis['diocesis-table__button--delete']}>
                                    <img src={DeleteIcon} alt="Eliminar" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        
        </div>
    )
}
