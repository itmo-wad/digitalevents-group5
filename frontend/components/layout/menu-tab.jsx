import cn from 'classnames'
import { useState } from 'react'

import styles from './layout.module.sass'

import Link from 'next/link'
import { useScroll } from 'components/scroll'
import { useRouter } from 'next/router'
import { _lang } from 'libs/rus'

function MenuTab({ tab, active }){

	const { onTop, scrollTo } = useScroll()
	const { pathname, locale } = useRouter()
	
	const anotherLocale = locale === 'ru-RU'? 
		{ locale: 'en-US', title: 'En' }: 
		{ locale: 'ru-RU', title: 'Ru' }

	if(tab.special) 
		return (
			<div className={cn(styles.navLink, styles.special)}>
				<Link href={tab.href}>
					<a className={styles.logo}><img src="/images/logo.png" alt="Логотип Digital-Events"/></a>
				</Link>
				
				<span role="button" tabIndex="0" className="a">{_lang({ ru: "Поиск", en: "Site search"}, locale)}</span>
				<a target="_blank" href="/presentation.pdf" className="a">{_lang({ ru: "Презентация", en: "Presentation"}, locale)}</a>

				<Link href={pathname} locale={anotherLocale.locale}>
					<a className="a">{anotherLocale.title}</a>
				</Link>

				<button className={cn(styles.arrow, !onTop && styles.active)} onClick={() => scrollTo(0)}>
					<img src="/images/up-arrow.svg" alt="Вернуться наверх"/>
				</button>
			</div>
		)
	
	return (
		<Link href={tab.href}>
			<a className={cn(styles.navLink, "a", active && styles.active)}>
				{_lang(tab.title, locale)}
			</a>
		</Link>
	)
}

export default MenuTab