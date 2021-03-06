const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stockSchema = new Schema({
	
	stockName: String,
	currentValue: Number,
	lowestValue: Number,
	highestValue: Number
})

const Stock = mongoose.model('Stock', stockSchema)
module.exports = Stock