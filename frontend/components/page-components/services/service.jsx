import cn from 'classnames'
import { _lang } from 'libs/rus'
import { useRouter } from 'next/router'
import styles from './services.module.sass'

export default function Service ({service}){

	const { locale } = useRouter()

	return (
		<>
			<h2>{_lang(service.title, locale)}</h2>
			<div className="medium-text">{_lang(service.text, locale)}</div>
			<div className={cn(styles.gallery, styles.bordered)}>{Array.isArray(service.gallery) && service.gallery.map((item, index) => (
				<img key={index} src={item.src} alt={_lang(service.title)}/>
			))}</div>
		</>
	)
}