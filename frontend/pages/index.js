import Page from 'components/page'

import styles from './main.module.sass'

import Video from 'components/page-components/video'
import Categories from 'components/page-components/categories'
import FeedbackForm from 'components/page-components/feedback-form'
import ContactsBlock from 'components/page-components/contacts-block'

export default function HomePage({pageData, services, contacts}) {


	return (
		<>
			<div >
				<ContactsBlock contacts={contacts}/>
				<div className="big-text">
					{pageData['short-description'].text}
				</div>
			</div>
			<Video/>
			<div className="medium-text" style={{margin: "0.8em 0"}}>{pageData['about'].text}</div>
			<Categories services={services}/>
			<FeedbackForm/>
		</>
	)
}


import { getData, getServices } from 'server-side/get-static-data'

export async function getStaticProps({locale}){

	const pageData = await getData('main-page', locale)

	const services = await getServices(locale)
	const { contacts } = await getData('contacts-page', locale)

	return { 
		props: { pageData, services, contacts },
		revalidate: 1
	}
}