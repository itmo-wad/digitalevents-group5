import React from 'react'
import BlockPage from 'pages/block-page'

const blocks = {
	"first": {
		title: "Первый блок",
		controls: {
			text: { type: "textarea", rows: 6, label: "Текст блока" },
			image: { type: "image", label: "Изображение"}
		}
	},
	"second": {
		title: "Второй блок",
		controls: {
			text: { type: "textarea", rows: 6, label: "Текст блока" },
			image: { type: "image", label: "Изображение"}
		}
	},
	"third": {
		title: "Третий блок",
		controls: {
			text: { type: "textarea", rows: 6, label: "Текст блока" },
			image: { type: "image", label: "Изображение"}
		}
	},
}

export default function MainPage(){

	return (
		<BlockPage blocks={blocks} title="О нас" page="about-page"/>
	)
}