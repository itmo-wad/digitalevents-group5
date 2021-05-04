import { useEffect } from "react";

export function getStyle (index, page, length, linkHeight){

	const right = (length-index-1)*linkHeight;
	const left = index*linkHeight

	if(index < page)
		return { left: left+'em' };

	if(index === page)
		return { left: left+'em' }

	if(index > page)
		return {left: `calc(100vw - ${right+linkHeight}em)` };
}

