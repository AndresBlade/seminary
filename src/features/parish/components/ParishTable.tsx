import React from 'react'
import Parish from '../styles/parish.module.css'
import EditIcon from '../../../assets/editIcon.svg'
import DeleteIcon from '../../../assets/deleteIcon.svg'

const ParishTable = () => {
    return (
        <div className={Parish['parish-table__container']}>
            <div className={Parish['parish-table__container--titles']}>
                    <div className={Parish['parish-table__h1-title']}>
                        <h1>Ecleciástico</h1>
                    </div>
                    <div className={Parish['parish-table__h2-title']}>
                        <h2>Agregar parroquia</h2>
                    </div>
            </div>
            <div className={Parish['parish-table__table']}>
                <table className={Parish['parish-table__table--container']}>
                    <thead className={Parish['parish-table__table--thead']}>
                        <tr>
                            <th>Parroquia</th>
                            <th>Parroco</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className={Parish['parish-table__table--tbody']}>
                        <tr className={Parish['parish-table__table--tbody-tr']}>
                            <td>Diócesis de Celaya</td>
                            <td className={Parish['parish-table__table--tbody-tr-parroco']} >Obispo José Benjamín Castillo Plascencia</td>
                            <td className={Parish['parish-table__button--container']}>
                                <button className={Parish['parish-table__button--edit']}>
                                    <img src={EditIcon} alt="Editar" />
                                </button>
                                <button className={Parish['parish-table__button--delete']}>
                                    <img src={DeleteIcon} alt="Eliminar" />
                                </button>
                            </td>
                        </tr>
                        <tr className={Parish['parish-table__table--tbody-tr']}>
                            <td>Diócesis de Irapuato</td>
                            <td className={Parish['parish-table__table--tbody-tr-parroco']}>Obispo Enrique Díaz Díaz</td>
                            <td className={Parish['parish-table__button--container']}>
                                <button className={Parish['parish-table__button--edit']}>
                                    <img src={EditIcon} alt="Editar" />
                                </button>
                                <button className={Parish['parish-table__button--delete']}>
                                    <img src={DeleteIcon} alt="Eliminar" />
                                </button>
                            </td>
                        </tr>
                        <tr className={Parish['parish-table__table--tbody-tr']}>
                            <td>Diócesis de León</td>
                            <td className={Parish['parish-table__table--tbody-tr-parroco']}>Obispo Alfonso Cortés Contreras</td>
                            <td className={Parish['parish-table__button--container']}>
                                <button className={Parish['parish-table__button--edit']}>
                                    <img src={EditIcon} alt="Editar" />
                                </button>
                                <button className={Parish['parish-table__button--delete']}>
                                    <img src={DeleteIcon} alt="Eliminar" />
                                </button>
                            </td>
                        </tr>
                        <tr className={Parish['parish-table__table--tbody-tr']}>
                            <td>Diócesis de León</td>
                            <td className={Parish['parish-table__table--tbody-tr-parroco']}>Obispo Alfonso Cortés Contreras</td>
                            <td className={Parish['parish-table__button--container']}>
                                <button className={Parish['parish-table__button--edit']}>
                                    <img src={EditIcon} alt="Editar" />
                                </button>
                                <button className={Parish['parish-table__button--delete']}>
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

export default ParishTable
