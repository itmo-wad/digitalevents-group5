import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ScrollContext = createContext()

function bezierBlend(t)
{
	const sqt = t * t;
	return sqt / ( 2 * (sqt - t) + 1 );
}

export function ScrollProvider ({children}){

	const [ onTop, setOnTop ] = useState(true)
	const [ page, setPage ] = useState(null)

	
	const scrollTo = useCallback((targetScroll) => {
		const startScroll = page.scrollTop;
		let startTime;
		let length = 500;
		let scrolling = true;

		const step = timestamp => {
			if(!scrolling) return;
			if(!startTime) startTime = timestamp;
			let progress = (timestamp - startTime) / length;

			if(progress > 1) progress = 1;
			page.scroll(0, startScroll + (targetScroll-startScroll)*bezierBlend(progress));

			if(progress < 1)
				window.requestAnimationFrame(step);
		}
		window.requestAnimationFrame(step);
	}, [ page ])

	return (
		<ScrollContext.Provider value={{onTop, setOnTop, scrollTo, page, setPage}}>
			{children}
		</ScrollContext.Provider>
	)
}

export function useScroll (){
	return useContext(ScrollContext)
}