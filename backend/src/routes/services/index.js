const ObjectID = require('mongodb').ObjectID;
const validate = require('../../libs/validate')
const { toMultiLanguage, toDotNotation } = require('../../libs/db-extensions')

const projectRoutes = require('./projects')
const servicesRoutes = require('./services')

const properties = {
	url: { type: "string" },
	title: { type: "string" },
	_id: { type: "string" },
	text: { type: "string" },
	lang: { type: "string" }
}

const multiLanguage = [ "title", "text" ]

const postSchema = { properties, required: ["title", "url", "lang"] }

module.exports = function(app, db) {

	app.get('/services', async (req, res) => {

		const services = await getCategories(db)	
		res.json(services)
	})

	app.post('/services', validate(postSchema), async (req, res) => {
		const category = await addCategory(db, req.body)
		res.json(category)
	})

	app.put('/services/:category', validate(postSchema), async (req, res) => {
		const category = await updateCategory(db, req.params.category, req.body)
		res.json(category)
	})

	app.delete('/services/:category', async(req, res) => {
		const resp = await deleteCategory(db, req.params.category)
		res.json(resp)
	})

	app.post('/services/:category/move', async (req, res) => {
		const resp = await moveCategory(db, req.params.category, req.body)
		res.json(resp)
	})

	projectRoutes(app, db)
	servicesRoutes(app, db)
}


async function getCategories(db){
	const categories = await db.collection('services').find({}, { sort: { sort: 1 } }).toArray()

	return categories
}


async function addCategory(db, _data){
	const data = toMultiLanguage(_data, multiLanguage, properties)
	
	try{
		await db.collection('services').insertOne(data)
		return { success: "success" }
	}catch(e){
		console.log(e)
		return { error: { url: "Данный URL уже существует"} }
	}
}

async function updateCategory (db, category, _data){
	const data = toDotNotation(toMultiLanguage(_data, multiLanguage, properties))


	try{
		await db.collection('services').updateOne({url: category}, {$set: data})
		return {success: "success"}
	}catch(e){
		return { error: { url: "Произошла ошибка"} } 
	}
}

async function deleteCategory (db, category){
	const resp = await db.collection('services').deleteOne({url: category})
	return { count: resp.deletedCount }
}

async function moveCategory(db, url, { pos }){

	const category = await db.collection('services').findOne({ url }, { projection: { sort: 1 }})	
	if(!category) return { error: { url: "wrong category url" }}

	const operator = pos < 0? { $gt: category.sort }: { $lt: category.sort }

	const lastCategory = await db.collection('services').findOne({ sort: operator }, { 
		projection: { sort: 1 }, sort: { sort: -pos } 
	})

	if(!lastCategory) return { error: { sort: "category can't move" }}

	await db.collection('services').updateOne({ _id: category._id }, { $set: { sort: lastCategory.sort } })
	await db.collection('services').updateOne({ _id: lastCategory._id }, { $set: { sort: category.sort } })

	return { success: "success" }
}