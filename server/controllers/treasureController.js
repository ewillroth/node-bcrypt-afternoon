const dragonTreasure = async (req,res) => {
	const db = req.app.get('db')
	const gold = await db.get_dragon_treasure(1)
	res.status(200).json(gold)
}

const getMyTreasure = async (req,res) => {
	const db = req.app.get('db')
	const gems = await db.get_user_treasure(req.session.user.id)
	res.status(200).json(gems)
}

const addUserTreasure = async (req,res) => {
	const treasureUrl = req.body.treasureURL
	const id = req.session.user.id
	const db = req.app.get('db')
	const newTreasure = await db.add_user_treasure(treasureUrl, id)
	res.status(200).json(newTreasure)
}

const getAllTreasure = async (req,res) => {
	const db = req.app.get('db')
	const hoard = await db.get_all_treasure()
	res.status(200).json(hoard)
}


module.exports = {
	dragonTreasure,
	getMyTreasure,
	addUserTreasure,
	getAllTreasure
}