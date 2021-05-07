import styles from './contacts.module.sass'
import Contact from './contact.jsx'
import { useRouter } from 'next/router'
import { _lang } from 'libs/rus'

export default function Contacts ({contacts}){

	const { locale } = useRouter()

	return (
		<div className={styles.contacts}>
			<Contact title={_lang({ ru: "Электронная почта", en: "Email"}, locale)}>
				<a href={"mailto:"+contacts.email} className="a">{contacts.email}</a>
			</Contact>
			<Contact title={_lang({ ru: "Соц. сети", en: "Social Networks"}, locale)}>
				<a href={contacts.instagram} className="a" target="_blank">Instagram</a>,
				<a href={contacts.facebook} className="a" target="_blank"> FaceBook</a>,
				<a href={contacts.youtube} className="a" target="_blank"> YouTube</a>,
				<a href={contacts.telegram} className="a" target="_blank"> Telegram</a>,
				<a href={contacts.vk} className="a" target="_blank"> VK</a>
			</Contact>
			<Contact title={_lang({ ru: "Адрес", en: "Location"}, locale)}>
				{contacts.address}
			</Contact>
			<Contact title={_lang({ ru: "Телефон", en: "Phone"}, locale)}>
				<a href={"tel:"+contacts.phone.replace(/[^\d]/g, '')} className="a">{contacts.phone}</a>
			</Contact>
		</div>
	)
}