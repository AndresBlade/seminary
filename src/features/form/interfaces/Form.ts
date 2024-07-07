import React, { Dispatch, HTMLAttributes, SetStateAction } from "react"

export interface inputProps extends React.InputHTMLAttributes<HTMLInputElement>{}

export interface containerProps extends React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement>{}

export interface labelProps extends React.LabelHTMLAttributes<HTMLLabelElement>{}

export interface selectProps extends React.SelectHTMLAttributes<HTMLSelectElement>{}

export interface SocialMediaProps{
    category:number
    link:string
}

export interface SocialMediaInputProps{
    id:number
    icon:string
    description:string
    
}
export interface socialMediaModalCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    icon?:string
    description?:string
}
export interface socialMediaModalProps{
    setModal: Dispatch<SetStateAction<boolean>>
    modal : boolean
    socialMedia:{
        category:number,
        link:string
    }[]
    setSocialMedia: Dispatch<SetStateAction<SocialMediaProps[]>>
}
export interface titleProps{
    title: string
}

export interface buttonNextBackProps{
    setNumber: Dispatch<SetStateAction<number>>
    initial?: boolean
    final?: boolean
}

export interface personalInfoProps{
    name: string,
    lastName: string,
    id: string,
    birthDate: string,
    bloodType:string,
    medicalRecord:string,
    rol:string
}

export interface contactInfoProps{
    phone: string,
    description: string,
    phoneFamily: string,
    descriptionFamily: string,
    email: string,
}

export interface seminarianInfo{
    academicTraining: string,
    stage:string,
    diocese:string,
    parish: string,
    apostolates:string,
    ministriesReceived:string,
    condition:string,
    status:string
}