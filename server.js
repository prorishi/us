const express = require("express");
const fs = require('fs');

function dataBase() {
    fs.readFileSync('dataBase', (err,data)=>{
        if(err)console.log(err)
        console.log(data)
        return JSON.parse(data)
    })
}
// fs.writeFile('dataBase', JSON.stringify({
    
// }), err=>{console.log(err)})
console.log(dataBase())

// const server = express();

// server.get('/', (request, response)=>{
//     response.sendFile(__dirname + '/homePage.html')
// })

// server.listen(process.env.PORT || 8080, (error) => {
//     if (error) {
//         console.log(error.message);
//     } else {
//         console.log("Run Server: Success");
//     }
// });



