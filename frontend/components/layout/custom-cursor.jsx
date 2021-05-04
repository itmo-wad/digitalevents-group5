import { useEffect, useRef, useState } from "react"
import styles from './custom-cursor.module.sass'

function CustomCursor (){

	const cursorRef = useRef()

	useEffect(() => {
		const cursorMove = (e) => {
			cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
		}

		window.addEventListener("mousemove", cursorMove)
		return () => window.removeEventListener("mousemove", cursorMove)
	}, [])


	return (
		<div ref={cursorRef} className={styles.cursor}>
		</div>
	)

}

export default CustomCursor