module.exports = {
	
	name : "Allo Netflix - API",
	port : process.env.PORT || 3000,
	psql:{
		user : "postgres",
		host : "localhost",
		database : "dbtest",
		password : "postgres",
		port : 5432
	},
	secret: '25zqsfmjvbq$v2'
}