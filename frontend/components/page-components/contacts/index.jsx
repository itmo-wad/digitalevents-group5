import styles from './contacts.module.sass'
import Contact from './contact.jsx'

export default function Contacts ({contacts}){

	return (
		<div className={styles.contacts}>
			<Contact title="Электронная почта">
				<a href={"mailto:"+contacts.email} className="a">{contacts.email}</a>
			</Contact>
			<Contact title="Соц. сети">
				<a href={contacts.instagram} className="a" target="_blank">Instagram</a>,
				<a href={contacts.facebook} className="a" target="_blank"> FaceBook</a>,
				<a href={contacts.youtube} className="a" target="_blank"> YouTube</a>,
				<a href={contacts.telegram} className="a" target="_blank"> Telegram</a>,
				<a href={contacts.vk} className="a" target="_blank"> VK</a>
			</Contact>
			<Contact title="Адрес">
				{contacts.address}
			</Contact>
			<Contact title="Телефон">
				<a href={"tel:"+contacts.phone.replace(/[^\d]/g, '')} className="a">{contacts.phone}</a>
			</Contact>
		</div>
	)
}