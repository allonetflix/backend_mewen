module.exports = {
	
	name : "Allo Netflix - API",
	port : process.env.PORT || 3000,
	psql:{
		// Heroku
		// user : "fmkoletitysdzj",
		// host : "ec2-107-21-103-146.compute-1.amazonaws.com",
		// database : "d4uga9bcq91l38",
		// password : "647d4450526e1ca89e8992040491ba9c4e19a4c744459c0b0e4eb5f18838959f",
		// port : 5432
		// localhost
		user : "postgres",
		host : "localhost",
		database : "dbtest",
		password : "postgres",
		port : 5432
	},
	secret: '25zqsfmjvbq$v2'
}