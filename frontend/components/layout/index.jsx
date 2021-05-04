import cn from 'classnames'
import { useRouter } from 'next/router'
import { getStyle } from './libs'

import styles from './layout.module.sass'
import MenuTab from './menu-tab'
import Head from './head'
import CustomCursor from './custom-cursor'
import Page from '../page'

const menu = [
	{ href: "/", title: "Главная", special: true },
	{ href: "/about", title: "О нас" },
	{ href: "/services", title: "Услуги" },
	{ href: "/contacts", title: "Контакты" }
]

const linkHeight = 2

if (process.browser) {
	const resize = () => {
		let vh = window.innerHeight * 0.01
		document.documentElement.style.setProperty('--vh', `${vh}px`)
	}

	window.addEventListener('resize', resize)
	resize()
}

function Layout({children, contacts}){

	const router = useRouter()
	//page - это индекс текущей страницы
	const page = menu.reduce((page, item, index) => router.pathname.startsWith(item.href)?index: page, 0)

	return (
		<div className={styles.main}>
			<Head title={menu[page].title}/>
			<CustomCursor/>
			{menu.map((item, index) => (
				<div key={item.href}  className={cn(styles.contentWrapper, index===page && styles.active)}	style={getStyle(index, page, menu.length, linkHeight)}>
					<MenuTab tab={item} active={index === page} />
					{ index === page? (
						<Page key={index} contacts={contacts}>
						 { children }
						</Page> 
					):(
						<Page key={index} style={{width: `calc(100vw - ${linkHeight*menu.length}em)`}}/>
					)}
				</div>
			))}
			<button className={styles.mobileMenuButton}>Меню</button>
		</div>
	)
}

export default Layout