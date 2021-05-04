import React from 'react'
import BlockPage from 'pages/block-page'

const blocks = {
	"contacts": {
		title: "Контакты",
		controls: {
			email: { type: "text", label: "E-mail", placeholder: "E-mail" },
			phone: { type: "text", label: "Номер телефона", placeholder: "Номер"  },
			address: { type: "text", label: "Адрес", placeholder: "Введите адрес" },
			instagram: { type: "text", label: "Instagram", placeholder: "Ссылка на страницу"  },
			facebook: { type: "text", label: "Facebook", placeholder: "Ссылка на страницу"  },
			youtube: { type: "text", label: "Youtube", placeholder: "Ссылка на страницу"  },
			telegram: { type: "text", label: "Telegram", placeholder: "Ссылка на страницу"  },
			vk: { type: "text", label: "VK", placeholder: "Ссылка на страницу"  },
		}
	}
}

export default function MainPage(){

	return (
		<BlockPage blocks={blocks} title="О нас" page="contacts-page"/>
	)
}