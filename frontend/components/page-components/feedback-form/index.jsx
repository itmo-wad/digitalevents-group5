import { useState } from 'react'
import cn from 'classnames'
import styles from './feedback-form.module.sass'

import Input from './input'

const items = {
	name: { label: "Имя", placeholder: "Введите ваше имя" },
	mail: { label: "Электронная почта", placeholder: "Введите ваш e-mail" },
	phone: { label: "Телефон", placeholder: "Введите ваш номер телефона" },
	message: { label: "Сообщение", placeholder: "Напишите ваше сообщение" },
}

export default function FeedbackForm ({contacts}){

	const [ values, setValues ] = useState({})

	const onChange = (obj) => {
		console.log(obj)
		setValues({...values, ...obj})
	}

	const onSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<div>
			<h2>Задайте вопрос</h2>
			<form onSubmit={onSubmit} className={cn("ml", styles.form)}>
				{Object.keys(items).map(key => (
					<Input key={key} name={key} {...items[key]} onChange={onChange} value={values[key]}/>
				))}
				<div className={styles.buttons}>
					<button className="button">Отправить</button>
					<button className="button">Отправить в Telegram</button>
				</div>
			</form>
		</div>
	)
}