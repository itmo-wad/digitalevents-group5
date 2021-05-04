
function toMultiLanguage (_data, schema, properties={}, lang=null){
	if(!lang && _data.lang) lang = _data.lang;

	const data = {}
	for(let key in _data){
		if(key === 'lang' || key === '_id' || !(key in properties)) continue;
		if(schema.includes(key))
			data[key] = { [lang]: _data[key] }
		else
			data[key] = _data[key]
	}

	return data
}

function toDotNotation (_data, startString=""){
	const data = {}
	const toDot = (obj, str='') => {
		for(let key in obj)
			if(typeof obj[key] === 'object' && !Array.isArray(obj[key]))
				toDot(obj[key], str+key+'.')
			else
				data[str+key] = obj[key]
	}
	toDot(_data, startString)
	return data
}

module.exports = { toMultiLanguage, toDotNotation }