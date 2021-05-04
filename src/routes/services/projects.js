const ObjectID = require('mongodb').ObjectID;
const validate = require('../../libs/validate')
const { toMultiLanguage, toDotNotation } = require('../../libs/db-extensions')

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

	app.post('/services/:category', validate(postSchema), async (req, res) => {
		const resp = await addProject(db, req.params.category, req.body)
		res.json(resp)
	})

	app.put('/services/:category/:project', validate(postSchema), async (req, res) => {
		const resp = await updateProject(db, req.params.category, req.params.project, req.body)
		res.json(resp)
	})

	app.delete('/services/:category/:project', async(req, res) => {
		const resp = await deleteProject(db, req.params.category, req.params.project)
		res.json(resp)
	})
}

async function addProject(db, category, _data){
	const data = toMultiLanguage(_data, multiLanguage, properties)

	try{
		const project = await db.collection('services').findOne(
			{url: category, 'projects.url': _data.url}, 
			{projection: { 'projects.$': 1 } }
		)
		if(project) throw new Error("Url already exist")
		await db.collection('services').updateOne({url: category}, {$push: { projects: data } })
		return { success: "success" }
	}catch(e){
		return { error: { url: "Данный URL уже существует"} }
	}
}

async function updateProject (db, category, project, _data){
	const data = toDotNotation(toMultiLanguage(_data, multiLanguage, properties), 'projects.$.')
	console.log(category)
	try{
		await db.collection('services').updateOne({url: category, "projects.url": project}, {$set: data})
		return {success: "success"}
	}catch(e){
		return { error: { url: "Произошла ошибка"} } 
	}
}


async function deleteProject (db, category, project){
	const resp = await db.collection('services').updateOne({ url: category }, { $pull: {projects: { url: project } } })
	return { count: resp.modifiedCount }
}