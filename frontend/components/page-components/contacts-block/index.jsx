
import { _lang } from 'libs/rus'
import { useRouter } from 'next/router'
import styles from './contacts-block.module.sass'

export default function ContactsBlock ({contacts}){

	const { locale } = useRouter()

	return (
		<>
			<div className={styles.spacer} ></div>
			<div className={styles.block}>

					<div>{_lang({ ru: "Контакты", en: "Contacts"}, locale)}</div>
					<a href={`mailto:`+contacts.email} className="a">{contacts.email}</a>
					<a href={`tel:`+contacts.phone.replace(/[^\d]/g, '')} className="a">{contacts.phone}</a>


					<div style={{marginTop: "0.9em"}}>{_lang({ ru: "Соц. сети", en: "Social Networks"}, locale)}</div>
					<a href={contacts.instagram} target="_blank" className="a">Instagram</a>
					<a href={contacts.facebook} target="_blank" className="a">FaceBook</a>
					<a href={contacts.youtube} target="_blank" className="a">YouTube</a>
					<a href={contacts.telegram} target="_blank" className="a">Telegram</a>
					<a href={contacts.vk} target="_blank" className="a">VK</a>
			</div>
		</>
	)
}