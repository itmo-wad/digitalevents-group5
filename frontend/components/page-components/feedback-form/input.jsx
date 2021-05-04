import styles from './feedback-form.module.sass'

export default function Input ({label, placeholder, name, value, onChange}){

	const _onChange = (e) => {
		const value = e.target.value
		onChange({[name]: value})
	}
	
	return (
		<div className={styles.input}>
			<label>{label}</label>
			<input type="text" placeholder={placeholder} name={name} value={value || ""} onChange={_onChange}/>
		</div>
	)
}
