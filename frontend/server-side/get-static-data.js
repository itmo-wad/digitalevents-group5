import getDB from  './db'

export async function getData(page, lang){
	const db = await getDB("blocks")
	const blocks = await db.find({page}).toArray()

	const response = {}

	for(let item of blocks){
		if(!(item.block in response) || item.lang === lang)
			response[item.block] = item.value
	}

	return response
	
}

export async function getServices(){
	const db = await getDB('services')
	const services = await db.find({}, { projection: { _id: 0 }}).toArray()


	return services
}
