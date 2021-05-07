import cn from 'classnames'
import styles from './page.module.sass'

import Footer from './footer'
import Link from 'next/link'
import { useScroll } from 'components/scroll'
import { useCallback, useEffect, useRef } from 'react'

export default function Page ({children, style, contacts}){

	const pageRef = useRef()
	const { setOnTop, setPage } = useScroll()

	const scroll = (e) => {
		const top = e.target.scrollTop
		if(top < 100)
			setOnTop(true)
		else
			setOnTop(false)
	}

	useEffect(() => {
		if(children)
			setPage(pageRef.current)
		
	}, [children])

	return (
		<div className={cn(styles.content)} style={style} onScroll={scroll} ref={pageRef}>
			<div className={styles.noise}>
				<Link href="/"><a>
					<img src="/images/full-logo.png" alt="Логотип DigitalEvents" className={styles.logo}/>
					</a></Link>
				{children}
			</div>
			{<Footer contacts={contacts}/>}
		</div>
	)
}