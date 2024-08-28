import { Client } from "pg";

const client=new Client({
    connectionString:"postgresql://mydb_owner:2ZLRbD4vhiqd@ep-billowing-leaf-a5hyoja9.us-east-2.aws.neon.tech/mydb?sslmode=require"
})

// async function createuser() {
//     await client.connect();
//     const result=await client.query(`
            
//             CREATE TABLE addresses(
//             id SERIAL PRIMARY KEY,
//             user_id INTEGER NOT NULL,
//             village VARCHAR(100) UNIQUE NOT NULL,
//             district VARCHAR(100) UNIQUE NOT NULL,
//             state VARCHAR(100) UNIQUE NOT NULL,
//             pincode VARCHAR(255) NOT NULL,
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//             FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//             );
//         `)
//     console.log(result)
// }

// createuser()



async function getData() {
    try {
        // const string: insertQuery=""
        await client.connect();
        // const email="nithinlinga46@gmail.com"
        const query='SELECT * FROM  users where email=$1';
        
        const result=await client.query(query,["nithinlinga46@gmail.com"]);
        if(result.rows.length>0){
            console.log("User found:",result.rows);
            return result.rows[0];

        }
        else{
            console.log("User not found:");
            return null;
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
    finally{
        await client.end();
    }
}
getData().catch(console.error);

// async function getuserData(){
//     try {
//         await  client.connect();
//         const query=`SELECT u.id,u.firstname,u.lastname,u.email,a.village,a.district,a.state,a.pincode
//                      FROM users u
//                      JOIN addresses a ON u.id=a.user_id
//                      WHERE u.id=1;
//         `

//         const result=await client.query(query);
//         if(result.rows.length>0){
//                         console.log("User found:",result.rows);
//                         return result.rows[0];
            
//                     }
//                     else{
//                         console.log("User not found:");
//                         return null;
//                     }

//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
//     finally{
//         await client.end();
//     }
// }

// getuserData();