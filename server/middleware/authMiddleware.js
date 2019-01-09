const usersOnly = (req,res,next) => {
	if(!req.session.user){
		res.status(401).json("Please log in")
	}else{
		next()
	}
}

const adminsOnly = (req,res,next) => {
	if(!req.session.user.is_admin){
		res.status(403).json("You are not an admin")
	}else {
		next()
	}
}

module.exports = {
	usersOnly,
	adminsOnly
}