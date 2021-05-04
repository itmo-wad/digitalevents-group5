import React, { useState } from 'react'
import { lang as languages } from 'libs/constants'
import useSWR, { mutate } from 'swr'
import cn from 'classnames'
import { getLang, _lang } from 'libs/rus'
import { getPreview } from 'libs/youtube'
import { closeModal, openModal, openModalConfirm, openModalMedia } from 'components/modal-window'

import ListContainer from 'components/list-container'
import { useForm, Segment } from 'controls'
import { IoIosAdd, IoMdTrash, IoIosPlayCircle, IoMdCreate } from 'react-icons/io'
import { GET, REST } from 'libs/fetch'


const services = [
	{ id: 1, title: "BonVoyage", text: `Главный герой игры — Медведь с реактивным ранцем за спиной.
	Ваша задача петь популярную песню и с помощью...` },
	{ id: 2, title: "Торопыжка", text: `Главный герой игры — Медведь с реактивным ранцем за спиной.
	Ваша задача петь популярную песню и с помощью...` },
]

const cases = [
	{ type: "youtube", id: "JGwWNGJdvx8" },
	{ type: "image", src: "/images/1.jpg" },
	{ type: "image", src: "/images/2.jpg" }
]


const firstCategory = {
	_id: "0",
	title: "Все",
}

const addCategoryModal = {
	title: { type: "text", label: "Название категории", placeholder: "Категория" },
	url: { type: "text", label: "URL адрес", placeholder: "category" },
	text: { type: "textarea", rows: 5, placeholder: "Описание категории"}
}

function addOrUpdateCategory(lang, item){
	return async (values, form) => {
		if(!values.title) return form.setErrors({title: "Название категории должно быть заполнено!"})
		if(!values.url) return form.setErrors({url: "Категории необходим свой уникальный URL адрес"})
		const resp = await REST(item?('/api/services/'+item.url): '/api/services', {...values, lang}, item?'PUT': 'POST')
		if(resp.error) return form.setErrors(resp.error)
		mutate('/api/services')
		closeModal()
	}
}

function addOrUpdateProject(lang, selectedCategory, item){

	return async (values, form) => {
		if(!values.title) return form.setErrors({title: "Название проекта должно быть заполнено!"})
		if(!values.url) return form.setErrors({url: "Проекту необходим свой уникальный URL адрес"})
		const resp = await REST('/api/services/'+selectedCategory.url+'/'+(item?item.url: ''), {...values, lang}, item?'PUT': 'POST')
		if(resp.error) return form.setErrors(resp.error)
		mutate('/api/services')
		closeModal()
	}
}

const addProjectModal = {
	title: { type: "text", label: "Название проекта", placeholder: "Проект" },
	url: { type: "text", label: "URL адрес", placeholder: "project" },
}

export default function ServicesPage (){

	const form = useForm({lang: "ru"})
	const lang = form.get('lang')

	const [ category, selectCategory ] = useState()
	const [ project, selectProject ] = useState()

	const addCategory = () => openModal("Добавление категории", addCategoryModal, addOrUpdateCategory(lang))
	const deleteCategory = async (category) => {
		const resp = await REST('/api/services/'+category, {}, 'DELETE')
		if(resp.error) return console.log(resp)
		mutate('/api/services')
		closeModal()
	}

	const deleteProject = async (category, project) => {
		const resp = await REST('/api/services/'+category+'/'+project, {}, 'DELETE')
		if(resp.error) return console.log(resp)
		mutate('/api/services')
		closeModal()
	}

	const categoriesMenuItem = [
		{ title: "Редактировать категорию", icon: <IoMdCreate/>, onClick: item => {
			openModal("Изменение категории", addCategoryModal, addOrUpdateCategory(lang, item), getLang(item, lang))
		}},
		{ title: "Удалить категорию", icon: <IoMdTrash/>, onClick: (item) => {
			openModalConfirm('Удалить категорию?', _lang(item.title), () => deleteCategory(item.url))
		}}
	]

	const addProject = () => (category && category.url)?
		openModal("Добавление проекта", addProjectModal, addOrUpdateProject(lang, category)):
		null

	const projectsMenuItem = [
		{ title: "Редактировать проект", icon: <IoMdCreate/>, onClick: item => {
			openModal("Изменение проекта", addProjectModal, addOrUpdateProject(lang, category, item), getLang(item, lang))
		}},
		{ title: "Удалить проект", icon: <IoMdTrash/>, onClick: (item) => {
			openModalConfirm('Удалить категорию?', _lang(item.title), () => deleteProject(category.url, item.url))
		}}
	]

	

	const { data } = useSWR('/api/services', GET, { onSuccess: data => {
		selectCategory(lastCategory => {
				if(!lastCategory) return null;
				const newCategory = data.find(item => item._id === lastCategory._id)

				selectProject(project => {
					if(!project || !Array.isArray(newCategory.projects)) return null;
					return newCategory.projects.find(item => item.url === project.url)
				})

				return newCategory
			})
	}})
	
	return (
		<>
			<header>
				<h1>Услуги</h1>
				<Segment name="lang" form={form} options={languages}/>
			</header>
			<div className="services-blocks">
				<ListContainer 
					items={data} 
					title="Категории" 
					onAdd={addCategory} 
					menuItems={categoriesMenuItem} 
					onSelect={selectCategory}
					selectedItem={category}
					lang={lang}
					keyItem="url"
					keySub="url"
				/>
				{category && (
					<ListContainer 
						items={category?category.projects: []} 
						title="Проекты" 
						onAdd={addProject} 
						menuItems={projectsMenuItem} 
						onSelect={selectProject}
						selectedItem={project}
						lang={lang}
						keyItem="url"
						keySub="url"
					/>
				)}
				{project && (<ServiceContainer category={category} project={project} lang={lang} services={services} cases={cases}/>)}
			</div>
		</>
	)
}


function addOrUpdateService(lang, selectedCategory, selectedProject, index){

	return async (values, form) => {
		if(!values.title) return form.setErrors({title: "Название услуги должно быть заполнено!"})
		const resp = await REST(
			'/api/services/'+selectedCategory.url+'/'+selectedProject.url+'/'+(index !== undefined?index: ''), 
			{...values, lang}, index !== undefined?'PUT': 'POST'
		)
		if(resp.error) return form.setErrors(resp.error)
		mutate('/api/services')
		closeModal()
	}
}

const addServiceModal = {
	title: { type: "text", label: "Название услуги", placeholder: "Услуга" },
	text: { type: "textarea", rows: 5, placeholder: "Текст услуги" },
	gallery: { type: "gallery", label: "Галерея услуги" }
}

const galleryModal = {
	title: { type: "text", label: "Название проекта", placeholder: "Проект" }
}

function ServiceContainer ({project, category, lang, cases}){

	const addService = () => {
		openModal("Добавление услуги", addServiceModal, addOrUpdateService(lang, category, project));
	}

	const deleteService = async (index) => {
		const resp = await REST('/api/services/'+category.url+'/'+project.url+'/'+index, {}, 'DELETE')
		if(resp.error) return console.log(resp)
		mutate('/api/services')
		closeModal()
	}

	return (
		<div className="block-container" style={{flex: "1 1 auto"}}>
			<div className="block-header">
				<h3>{_lang(project.title, lang)}</h3>
				<button className={cn("button-filled")} onClick={addService}><IoIosAdd/>Добавить услугу</button>
			</div>
			<div className="list-container" style={{margin: "10px 0"}}>
			{project.services && project.services.map((item, index) => (
				<div className="list-item" key={index}>
					<button onClick={() => openModal(
						"Изменение услуги", 
						addServiceModal, 
						addOrUpdateService(lang, category, project, index), 
						getLang(item, lang),
						() => deleteService(index)
					)}>
						<div className="title">{_lang(item.title, lang)}</div>
						<div className="sub">{_lang(item.text, lang)}</div>
					</button>
				</div>
			))}
			</div>
			<Gallery 
				items={project.cases || []} 
				style={{marginTop: "12px"}} 
				api={`/api/services/${category.url}/${project.url}/cases`} 
				controls={galleryModal}
				lang={lang}
			/>
		</div>
	)
}

function getGalleryItemMap(onClick){
	return function galleryItemMap (item, index) {

		if(item.type === 1)
			return (
				<button key={index} className="youtube" onClick={() => onClick(item, index)} style={{backgroundImage: `url(${getPreview(item.id)}`}}>
					<IoIosPlayCircle/>
				</button>
			)

		if(item.type === 0)
			return (
				<button key={index} className="image" onClick={() => onClick(item, index)}>
					<img src={item.src} alt="Изображение галереи"/>
				</button>
			)

		return null;
	}
}

function Gallery ({items, style, className, api, lang}){
	

	const addPhoto = () => {
		openModalMedia("Добавить медиа", galleryModal, async (values, form) => {
			const resp = await REST(api, {...values, lang}, 'POST')
			if(resp.error) return console.log(resp)
			mutate('/api/services')
			closeModal()
		});
	}

	const onClick = (item, index) => {
		if(item.id) item = { ...item, url: "https://www.youtube.com/watch?v="+item.id }

		const deleteMedia = async () => {
			const resp = await REST(api+'/'+index, {}, 'DELETE')
			if(resp.error) return console.log(resp)
			mutate('/api/services')
			closeModal()
		}

		const editMedia = async (values, form) => {
			const resp = await REST(api+'/'+index, {...values, lang}, 'PUT')
			if(resp.error) return console.log(resp)
			mutate('/api/services')
			closeModal()
		}

		openModalMedia("Изменить медиа", galleryModal, editMedia, getLang(item, lang), deleteMedia);
	}


	return (
		<div className="gallery-container">
			<div className="block-header" style={{marginTop: "20px"}}>
				<h4>Реализованные проекты</h4>
				<button className={cn("button-filled")} onClick={addPhoto}><IoIosAdd/>Добавить фото/видео</button>
			</div>
			<div className={cn("gallery", className)} style={style}>
				{items.map(getGalleryItemMap(onClick))}
			</div>
		</div>
	)
}
