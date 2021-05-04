import cn from 'classnames'
import styles from './services.module.sass'

export default function Service ({service}){

	return (
		<>
			<h2>{service.title.ru}</h2>
			<div className="medium-text">{service.text.ru}</div>
			<div className={cn(styles.gallery, styles.bordered)}>{Array.isArray(service.gallery) && service.gallery.map((item, index) => (
				<img key={index} src={item.src} alt={service.title.ru}/>
			))}</div>
		</>
	)
}