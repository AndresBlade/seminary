import PeriodCSS from '../styles/PeriodCSS.module.css'
import { ContentContainer } from '../../ui/container/components/ContentContainer'
import DataHeader from './DataHeader'
import DataContent from './DataContent'
import AddIcon from '../../../assets/MaterialSymbolsAddCircleOutline.svg'
import Input from './Input'
import editIcon from '../../../assets/editIcon.svg'
import deleteIcon from '../../../assets/deleteIcon.svg'
import Modal from './Modal'
import { useState } from 'react'
import { Label } from '../../subject/components/Label'
export const Period = () => {
    const [showModal, setShowModal]=useState(false);
    return (
        <ContentContainer>
            <div className={PeriodCSS.addPeriod}>
                <h2>Lista periodos académicos</h2>
                <button className={PeriodCSS.buttonAddPeriod} onClick={()=>{
                    setShowModal(true)
                }}>
                    <img src={AddIcon} alt="añadir" />
                    Agregar nuevo
                </button>
            </div>
            <div className={PeriodCSS.findPeriod}>
                <Input type='text' placeholder='Busca aquí...'/>
                <button className={PeriodCSS.buttonFind}>
                    Buscar
                </button>
            </div>

            <DataHeader>
                <p>Periodo</p>
                <p>Fecha inicio</p>
                <p>Fecha Final</p>
                <p>Actual</p>
                <p>Acciones</p>
            </DataHeader>
            <DataContent>
                <p>2020</p>
                <p>20/07/2022</p>
                <p>24/07/2023</p>
                <div className={PeriodCSS.statusPeriodContainer}>
                    <div className={PeriodCSS.statusPeriod}></div>
                    
                </div>          
                <div>
                    <button className={PeriodCSS.buttonActions}>
                        <img src={editIcon} alt="editar" />
                    </button>
                    <button className={PeriodCSS.buttonActions}>
                        <img src={deleteIcon} alt="eliminar" />
                    </button>
                </div>
            </DataContent>
            
            {
                showModal ? (
                    <Modal
                        setShowModal={setShowModal}
                    >
                        <p className={PeriodCSS.titleModal}>Agregar periodo academico</p>

                        <Input type='text' />
                        <Input type='date'/>
                        <Input type='date'/>

                        <p>¿Perído actual?</p>
                        <input type="radio" />
                        <input type="radio" />

                    </Modal>
                ):null
            }
            
        </ContentContainer>
    )
}
