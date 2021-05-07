const chalk = require('chalk')

//Мы изменяем только вот эту вот схему
const indexes = {
	users: { 
		login: { unique: true },
		token: { unique: true }
	},
	services: {
		sort: { sort: 1 },
		url: { unique: true }
	}
}

module.exports = async function(db){
	const dbNames = await db.listCollections({}).map(e => e.name).toArray()

	for(let collectionName in indexes){
		if(!dbNames.includes(collectionName)){
			const collection = await db.createCollection(collectionName)
			
			for(let key in indexes[collectionName]){
				const { sort, ...index } = indexes[collectionName][key]	
				await collection.createIndex({[key]: sort || 1}, index)
			}

			console.log(`Collection ${chalk.cyan(collectionName)} created`)
		}
	}

	const services = await db.collection('services').find({}, { projection: { sort: 1, url: 1 }, sort: { sort: 1 } }).toArray()
	for(let i = 0; i < services.length; i++){
		if(!services[i].sort){
			await db.collection('services').updateOne({ _id: services[i]._id }, { $set: { sort: i } })
			console.log(`Service ${services[i].url} sorting`)
		}
	}
	
}