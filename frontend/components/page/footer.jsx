import cn from 'classnames'
import styles from './page.module.sass'
import { _lang } from 'libs/rus'
import { useRouter } from 'next/router'
import _contacts from 'libs/contacts'

export default function Footer ({className, contacts}){

	if(!contacts) contacts = _contacts
	const { locale } = useRouter()

	return (
		<footer className={cn(styles.footer, className)}>
			<div className={cn("medium-text", styles.contacts)}>
				{_lang({ ru: "Контакты", en: "Contacts"}, locale)}
				<a href={`mailto:`+contacts.email} className="a">{contacts.email}</a>
				<a href={`tel:`+contacts.phone.replace(/[^\d]/g, '')} className="a">{contacts.phone}</a>
				<div className={styles.copyright}>©2021 Digital Events</div>
			</div>

			<div className={cn("medium-text", styles.contacts, styles.right)}>
				{_lang({ ru: "Соц. сети", en: "Social Networks"}, locale)}
				<a href={contacts.instagram} target="_blank" className="a">Instagram</a>
				<a href={contacts.facebook} target="_blank" className="a">FaceBook</a>
				<a href={contacts.youtube} target="_blank" className="a">YouTube</a>
				<a href={contacts.telegram} target="_blank" className="a">Telegram</a>
				<a href={contacts.vk} target="_blank" className="a">VK</a>
			</div>
		</footer>
	)
}