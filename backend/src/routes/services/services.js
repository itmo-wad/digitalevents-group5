const ObjectID = require('mongodb').ObjectID;
const validate = require('../../libs/validate')
const { toMultiLanguage, toDotNotation } = require('../../libs/db-extensions')
const fs = require('fs')
const { base, mv } = require('../../libs/path')

const properties = {
	title: { type: "string" },
	_id: { type: "string" },
	text: { type: "string" },
	lang: { type: "string" },
	src: { type: "string" },
	type: { type: "integer" },
	id: { type: "string" },
	gallery: { type: "array" }
}

const multiLanguage = [ "title", "text" ]

const postSchema = { properties, required: ["title", "lang"] }
const casesSchema = { properties }

module.exports = function(app, db) {

	app.post('/services/:category/:project', validate(postSchema), async (req, res) => {
		const category = await addService(db, req.params.category, req.params.project, req.body)
		res.json(category)
	})

	app.put('/services/:category/:project/:id', validate(postSchema), async (req, res) => {
		const category = await updateService(db, req.params.category, req.params.project, req.params.id, req.body)
		res.json(category)
	})

	app.delete('/services/:category/:project/:id', async (req, res) => {
		const resp = await deleteService(db, req.params.category, req.params.project, req.params.id)
		res.json(resp)
	})

	app.post('/services/:category/:project/cases', validate(casesSchema), async(req, res) => {
		if(req.body.type === 0 && !req.body.src || req.body.type === 1 && !req.body.id) return res.json({error: "wrong type"})

		const resp = await addCase(db, req.params.category, req.params.project, req.body)
		res.json(resp)
	})

	app.put('/services/:category/:project/cases/:id', validate(casesSchema), async(req, res) => {
		const resp = await updateCase(db, req.params.category, req.params.project, req.params.id, req.body)
		res.json(resp)
	})

	app.delete('/services/:category/:project/cases/:id', async(req, res) => {
		const resp = await deleteCase(db, req.params.category, req.params.project, req.params.id)
		res.json(resp)
	})
}


async function getCategories(db){
	const categories = await db.collection('services').find({}).toArray()

	return categories
}


async function addService(db, category, project, _data){
	const data = toMultiLanguage(_data, multiLanguage, properties)

	try{
		await db.collection('services').updateOne({url: category, "projects.url": project}, {$push: { 'projects.$.services': data } })
		return { success: "success" }
	}catch(e){
		return { error: { url: "Данный URL уже существует"} }
	}
}

async function updateService (db, category, project, index, _data){
	const data = toDotNotation(toMultiLanguage(_data, multiLanguage, properties), `projects.$.services.${index}.`)
	
	try{
		await db.collection('services').updateOne({url: category, "projects.url": project}, {$set: data})
		return {success: "success"}
	}catch(e){
		return { error: { url: "Произошла ошибка"} } 
	}
}

async function deleteService (db, category, project, index){
	try{
		await db.collection('services').updateOne(
			{ url: category, "projects.url": project }, 
			{ $unset: { [`projects.$.services.${index}`]: 1 }}
		)

		const resp = await db.collection('services').updateOne(
			{ url: category, "projects.url": project }, 
			{ $pull: { "projects.$.services": null } }
		)

		return { count: resp.modifiedCount }
	}catch(e){
		console.log(e)
		return { error: { title: "Произошла ошибка"} }
	}
}

async function addCase (db, category, project, _data){
	const data = toMultiLanguage(_data, multiLanguage, properties)

	try{
		if(data.type === 0 && data.src.startsWith('/db/temp')) 
			data.src = await mv(data.src, '/db/cases')
		
		await db.collection('services').updateOne({url: category, "projects.url": project}, {$push: { 'projects.$.cases': data } })

		return data
	}catch(e){
		console.log(e)
		return { error: { title: "Произошла ошибка"} }
	}
}

async function updateCase(db, category, project, index, _data){
	const data = toDotNotation(toMultiLanguage(_data, multiLanguage, properties), `projects.$.cases.${index}.`)
	
	try{
		await db.collection('services').updateOne(
			{ url: category, "projects.url": project }, 
			{ $set: data }
		)

		return data
	}catch(e){
		console.log(e)
		return { error: { title: "Произошла ошибка"} }
	}
}

async function deleteCase (db, category, project, index){
	try{
		await db.collection('services').updateOne(
			{ url: category, "projects.url": project }, 
			{ $unset: { [`projects.$.cases.${index}`]: 1 }}
		)

		const resp = await db.collection('services').updateOne(
			{ url: category, "projects.url": project }, 
			{ $pull: { "projects.$.cases": null } }
		)

		return { count: resp.modifiedCount }
	}catch(e){
		console.log(e)
		return { error: { title: "Произошла ошибка"} }
	}
}