import cn from 'classnames'
import { useState } from 'react'

import styles from './layout.module.sass'

import Link from 'next/link'

function MenuTab({ tab, active }){

	const [ arrow, setArrow ] = useState(false)

	if(tab.special) 
		return (
			<div className={cn(styles.navLink, styles.special)}>
				<Link href={tab.href}>
					<a className={styles.logo}><img src="/images/logo.png" alt="Логотип Digital-Events"/></a>
				</Link>
				
				<span role="button" tabIndex="0" className="a">Поиск</span>
				<a target="_blank" href="/presentation.pdf" className="a">Презентация</a>

				<button className={cn(styles.arrow, arrow && styles.active)}>
					<img src="/images/up-arrow.svg" alt="Вернуться наверх"/>
				</button>
			</div>
		)
	
	return (
		<Link href={tab.href}>
			<a className={cn(styles.navLink, "a", active && styles.active)}>
				{tab.title}
			</a>
		</Link>
	)
}

export default MenuTab