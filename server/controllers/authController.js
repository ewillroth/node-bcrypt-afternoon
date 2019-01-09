const bcrypt = require('bcryptjs')

const register = async (req,res) => {
	const db = req.app.get('db')
	const {username, password, isAdmin} = req.body
	const existingUser = await db.get_user(username)
	if(existingUser.length!==0){
		res.status(409).json("Username Taken")
	}else{
		const hash = await bcrypt.hashSync(password, 10)
		var user = await db.register_user(isAdmin, username, hash)
		user = user[0]
		console.log(user)
		req.session.user = { isAdmin: user.is_admin, id: user.id, username: user.username}
		res.status(201).json(req.session.user)
	}
}

const login = async (req,res) => {
	const db = req.app.get('db')
	const {username, password} = req.body
	const foundUser = await db.get_user(username)
	const user = foundUser[0]
	if(!user){
		res.status(401).json("User not found. Please register as a new user before logging in")
	}else{
		const isAuthenticated = bcrypt.compareSync(password,user.hash)
		if(!isAuthenticated){
			res.status(403).json("Incorrect password")
		}else{
			req.session.user = user
			res.status(200).json(req.session.user)
		}
	}
}

const logout = (req,res) => {
	req.session.destroy()
	res.sendStatus(200)
}

module.exports = {
	register,
	login,
	logout
}