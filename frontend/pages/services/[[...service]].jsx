import { useRouter } from 'next/router'

import CategoryList from 'components/page-components/services/category-list'
import Category from 'components/page-components/services/category'
import Project from 'components/page-components/services/project'

export default function ServicesPage({services}) {

	const router = useRouter()
	const { service } = router.query
	
	const categoryUrl = Array.isArray(service)?service[0]: ""
	const projectUrl = Array.isArray(service)?service[1]: ""
	
	const category = categoryUrl? services.find(item => item.url === categoryUrl): null
	const project = (projectUrl && category && category.projects)? category.projects.find(item => item.url === projectUrl): null

	return (
		<div>
			<h1 className="mt-0">Услуги</h1>
			<CategoryList services={services} activeCategory={categoryUrl}/>
			<Category category={category} activeProject={projectUrl} />
			<Project project={project} />
		</div>
	)
}

import { getServices, getData } from 'server-side/get-static-data'

export async function getStaticProps(){

	const services = await getServices()
	const { contacts } = await getData('contacts-page', 'ru')

	return { 
		props: { services, contacts },
		revalidate: 1
	}
}

export async function getStaticPaths() {
	const services = await getServices()

	const paths = [{ params: { service: false } }];
	for(let service of services){
		if(Array.isArray(service.projects))
			for(let project of service.projects)
				paths.push({params: { service: [service.url, project.url] }})
		
		paths.push({params: { service: [service.url] }})
	}
	
	return { paths, fallback: true }
}