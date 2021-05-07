import { useState } from 'react'
import cn from 'classnames'
import styles from './feedback-form.module.sass'
import { _lang } from 'libs/rus'
import { useRouter } from 'next/router'

import Input from './input'

const _items = {
	ru: {
		name: { label: "Имя", placeholder: "Введите ваше имя" },
		mail: { label: "Электронная почта", placeholder: "Введите ваш e-mail" },
		phone: { label: "Телефон", placeholder: "Введите ваш номер телефона" },
		message: { label: "Сообщение", placeholder: "Напишите ваше сообщение" },
	},
	en: {
		name: { label: "Name", placeholder: "Input your name" },
		mail: { label: "Email", placeholder: "Input your e-mail" },
		phone: { label: "Phone", placeholder: "Input your phone number" },
		message: { label: "Message text", placeholder: "Input your message" },
	}
}

export default function FeedbackForm ({contacts}){

	const [ values, setValues ] = useState({})
	const { locale } = useRouter()

	const onChange = (obj) => {
		console.log(obj)
		setValues({...values, ...obj})
	}

	const onSubmit = (e) => {
		e.preventDefault()
	}

	const items = _lang(_items, locale)

	return (
		<div>
			<h2>{_lang({ ru: "Задайте вопрос", en: "Ask a question"}, locale)}</h2>
			<form onSubmit={onSubmit} className={cn("ml", styles.form)}>
				{Object.keys(items).map(key => (
					<Input key={key} name={key} {...items[key]} onChange={onChange} value={values[key]}/>
				))}
				<div className={styles.buttons}>
					<button className="button">{_lang({ ru: "Отправить", en: "Send"}, locale)}</button>
					<button className="button">{_lang({ ru: "Отправить в телеграм", en: "Send to Telegram"}, locale)}</button>
				</div>
			</form>
		</div>
	)
}