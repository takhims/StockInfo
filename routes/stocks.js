const router = require('express').Router()
var socketClients  = require('../socketClient');
let Stock = require('../models/stocks')

router.route("/").get((req, res) => {
	console.log("main aa gya")
	Stock.find()
	.then(stocks => res.json(stocks))
	.catch(err => res.status(400).json('Error: ' + err))
})


router.route("/namelist").get(async (req, res) => {
	
	const data = await Stock.find({}, 'stockName').exec()
	console.log(data)
	res.send(data)
})

// router.route('/').post((req, res) => {
// 	const stockName = req.body.stockName
// 	const currentValue = req.body.currentValue
// 	const lowestValue = req.body.lowestValue
// 	const highestValue = req.body.highestValue
	
// 	const stock = new Stock({stockName: stockName, currentValue: currentValue, lowestValue: lowestValue, highestValue: highestValue })
	
// 	Stock.create(stock)
// 	.then( () => res.json('Stock Added Successfully!') )
// 	.catch(err => res.status(400).json('Error: ' + err))
// })
router.route("/").put((req, res) =>{

	// search for the symbol name in the databse
	// update all the values for that document
	const stockname = req.body.name 
	const currentvalue = req.body.value
	const lowestvalue =  req.body.lowestValue
	const highestvalue = req.body.highestValue
	const id = '5f8dcd86b5f1fe30d946e59b'
	console.log(stockname)
	console.log(currentvalue)
	console.log(lowestvalue)
	console.log(highestvalue)
	Stock.findOneAndUpdate({stockName: stockname},{$set: {currentValue: currentvalue, lowestValue: lowestvalue, highestValue: highestvalue}}, (err, re) => {
		if(err) {
			console.log('Error!')
			console.log(err.message)
		}
		else {
			console.log('Successfully Updated!')
			// console.log('socket clients', require('../socketClient'))
			// socketClients.forEach((socket) => {
			// // 	console.log('socket client id', socket.id);
				
			// 	socket.broadcast.emit('update_stock', JSON.stringify({
			// 		stockName: stockname,
			// 		currentValue: currentvalue,
			// 		lowestValue: lowestvalue,
			// 		highestValue: highestvalue,
			// 	}));
			// });
			socketClients[0].broadcast.emit('update_stock', JSON.stringify({
					stockName: stockname,
					currentValue: currentvalue,
					lowestValue: lowestvalue,
					highestValue: highestvalue,
				}));
			res.send('success!');
		}
	})
})


module.exports = router