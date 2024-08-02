import { HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes } from "react";

export interface DataContentProps extends HTMLAttributes<HTMLDivElement>{}
export interface ModalProps extends HTMLAttributes<HTMLDivElement>{}
export interface DataHeaderProps extends HTMLAttributes<HTMLDivElement>{}
export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement>{}

export interface CreatePeriod{
    start_date:string,
    end_date: string
}

export interface GetPeriod{
    id:number
    start_date:string
    end_date:string
    status:string
    semester:number
    start_strin:string
    end_string:string
    name:string
}