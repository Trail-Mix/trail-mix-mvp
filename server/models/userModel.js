//
//  CREATE TABLE "users" (
// 	"_id" serial NOT NULL,
// 	"username" varchar(255) NOT NULL UNIQUE,
// 	"password" varchar(255) NOT NULL,
// 	"createdAt" TIMESTAMP(255) NOT NULL,
// 	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
// ) WITH (
//   OIDS=FALSE
// );


// const table =
//     "CREATE TABLE IF NOT EXISTS events (_id SERIAL PRIMARY KEY, id VARCHAR, summary VARCHAR, htmlLink VARCHAR, sequence INTEGER, createdat TIMESTAMP, updatedat TIMESTAMP, startat TIMESTAMP, endat TIMESTAMP)";
//   db.query(table, function(err, result) {
//     if (err) throw err;
//     console.log("Table created");
//     db.end();
