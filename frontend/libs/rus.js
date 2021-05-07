export function numeral(count, one, two, five){
	if(!count) count = 0;
	//десять-девятнадцать
	if(count%100/10>>0 === 1)
		return five;
	//ноль, пять-девять
	if(count%10 >= 5 || count%10===0)
		return five;
	//один
	if(count%10 === 1)
		return one;

	//две-четыре
	return two;
}

export function num(count, one, two, five){
	return count + " " + numeral(count, one, two, five)
}

export function getChatDate(date){
	const dt = new Date(date)

	return `${dt.getDay()}.${dt.getMonth()}.${dt.getFullYear()}. в ${dt.getHours}:${dt.getMinutes}`
}

const locales = {
	'ru-RU': 'ru',
	'en-US': 'en'
}

export function localeToLang(locale){
	if(locale in locales) return locales[locale]
	return locale
}

export function _lang(item, locale){
	const lang = localeToLang(locale)
	if(typeof(item) === 'object')
		return item[lang] || item.ru
	
	return item
}

export function getLang(item, locale){
	const lang = localeToLang(locale)
	const newItem = {}
	for(const key in item)
		if(typeof item[key] === 'object' && (item[key][lang] || item[key]['ru']))
			newItem[key] = item[key][lang] || item[key]['ru']
		else
			newItem[key] = item[key]
			
	return newItem
}
