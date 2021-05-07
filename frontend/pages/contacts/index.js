import Contacts from 'components/page-components/contacts'
import { _lang } from 'libs/rus'
import { useRouter } from 'next/router'


export default function ContactPage({contacts}) {

	const { locale } = useRouter()

	return (
		<div>
			<h1 className="mt-0">{_lang({ ru: "Контакты", en: "Contacts"}, locale)}</h1>
			<Contacts contacts={contacts}/>
		</div>
	)
}


import { getData } from 'server-side/get-static-data'

export async function getStaticProps({locale}){

	const { contacts } = await getData('contacts-page', locale)

	return { 
		props: { contacts },
		revalidate: 1
	}
}