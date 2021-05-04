import React from 'react'
import BlockPage from 'pages/block-page'

const blocks = {
	"short-description": {
		title: "Краткое описание",
		controls: {
			text: { type: "textarea", rows: 3, label: "Текст блока" },
			showContacts: { type: "checkbox", label: "Показывать контакты", default: false }
		}
	},
	video: {
		title: "Блок с видео",
		controls: {
			video: { type: "text", label: "Ссылка на youtube" }
		}
	},
	about: {
		title: "Информация",
		controls: {
			text: { type: "textarea", rows: 3, label: "Текст блока" }
		}
	}
}

export default function MainPage(){

	return (
		<BlockPage blocks={blocks} title="Главная страница" page="main-page"/>
	)
}