import React, { Dispatch, HTMLAttributes, SetStateAction } from 'react';

export interface inputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface containerProps
	extends React.DetailedHTMLProps<
		HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {}

export interface labelProps
	extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export interface selectProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export interface DataContent extends React.AllHTMLAttributes<HTMLDivElement> {}

export interface getUserProps {}

export interface getParishByDioceseProps {
	id: number;
	diocese_id: number;
	name: string;
	patron: string;
}
export interface SocialMediaProps {
	category: number;
	link: string;
}

export interface SocialMediaInputProps {
	id: number;
	icon: string;
	description: string;
}
export interface socialMediaModalCardProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: string;
	description?: string;
}
export interface socialMediaModalProps {
	setModal: Dispatch<SetStateAction<boolean>>;
	modal: boolean;
	socialMedia: {
		category: number;
		link: string;
	}[];
	setSocialMedia: Dispatch<SetStateAction<SocialMediaProps[]>>;
}
export interface titleProps {
	title: string;
}

export interface buttonNextBackProps {
	setNumber: Dispatch<SetStateAction<number>>;
	initial?: boolean;
	final?: boolean;
}

export interface personalInfoProps {
	name: string;
	lastName: string;
	id: string;
	birthDate: string;
	bloodType: string;
	medicalRecord: string;
	rol: string;
	diocese?: string;
	parish?: string;
}

export interface contactInfoProps {
	phone: string;
	phoneFamily: string;
	description: string;
	descriptionFamily: string;
	email: string;
}

export interface seminarianInfo {
	academicTraining?: string;
	stage?: string;
	linkTitle?: string;
	apostolates: string;
	ministriesReceived?: string;
	condition: string;
	status: string;
	nameSeminaryExternal?: string;
	yearOfIncome?: number;
}

export interface professionalInfo {
	academicTraining: string;
	linkTitle: string;
	startingDate: string;
	instructorPosition: string;
}

export type blood = Record<string, string>;

export type positionInstructor = Record<string, string>;

export interface userEditProps {
	id: string;
	apostleships: string;
	location: string;
	Ministery?: string;
	status: string;
	parish_id: number;
	diocesi_id: number;
	degrees?: [
		{
			id: number;
			description: string;
			link: string;
			user_id: string;
		}
	];
	person: {
		id: string;
		profile_picture_path: string;
		forename: string;
		surname: string;
		email: string;
		birthdate: string;
		medical_record: string;
		BloodType: string;
		cellpones: [
			{
				phone_number: string;
				description: string;
			},
			{
				phone_number: string;
				description: string;
			}
		];
		medias: [
			{
				social_media_category: number;
				link: string;
			}
		];
		date_String: string;
	};
	foreing_Data?: {
		seminary_name: string;
		stage: string;
		stage_year: number;
	};
}
