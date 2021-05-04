import Contacts from 'components/page-components/contacts'

export default function ContactPage({contacts}) {
	return (
		<div>
			<h1 className="mt-0">Контакты</h1>
			<Contacts contacts={contacts}/>
		</div>
	)
}


import { getData } from 'server-side/get-static-data'

export async function getStaticProps(){

	const { contacts } = await getData('contacts-page', 'ru')

	return { 
		props: { contacts },
		revalidate: 1
	}
}