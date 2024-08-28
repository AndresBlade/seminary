import { InputProps } from "../interfaces/Period"
import PeriodCSS from "../styles/PeriodCSS.module.css"

const Input = (InputProps:InputProps) => {
    return (
        <input className={PeriodCSS.inputPeriod}
            {...InputProps}
        />
    )
}

export default Input
