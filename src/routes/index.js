const bodyParser = require('body-parser')

//Импортируем все файлы с роутами
const baseRoutes = require('./base');
const blocksRoutes = require('./blocks') 
const servicesRoutes = require('./services')
const imageRoutes = require('./images')

module.exports = function (app, db) {
	app.use(bodyParser.json())
	app.use(bodyParser.raw({ limit: '5mb', type: 'image/*' }))

	baseRoutes(app, db)
	blocksRoutes(app, db)
	servicesRoutes(app, db)
	imageRoutes(app, db)

	app.use(function(err, _req, res, _next) {
		
		console.error(err.stack);
		res.status(500).send('Something broke!');
	});
	// Тут, позже, будут и другие обработчики маршрутов 
}