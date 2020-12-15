const { request, response } = require("express");
const express = require("express");
const fs = require("fs");

let dbData;


function updateDb() {
    dbData = JSON.parse(
        fs.readFileSync("dataBase", {
            encoding: "utf8",
        })
    );
    fs.writeFileSync("dataBase", JSON.stringify(dbData, {}, 4));
}
updateDb();

function fetchShortenedUrls() {
    updateDb();
    shortened = {};
    dbData.forEach((user) => {
        user.urls.forEach((url) => {
            shortened[url.shortened] = url.original;
        });
    });
    return shortened;
}

const server = express();


server.use(
    express.urlencoded({
        extended: true,
    })
);



server.get("/", (request, response) => {
    updateDb();
    response.sendFile(__dirname + "/browserSide/homePage.html");
});

server.get('/browserSide/signup.html', (request,response)=>{
    response.sendFile(__dirname+'/browserSide/signup.html')
})

server.post('/signup', (request, response) => {
    console.log(request.body);
    response.end('ok')
})

server.get("/:shortenedUrl", (request, response) => {
    let shortenedUrls = fetchShortenedUrls();
    console.log(shortenedUrls);
    let requestedUrl = request.params.shortenedUrl;
    console.log(requestedUrl);
    let redirectionUrl = shortenedUrls[requestedUrl];
    console.log(redirectionUrl);
    if (redirectionUrl == undefined) {
        console.log(false);
        response.sendStatus(404);
    } else {
        console.log(true);
        response.redirect("http://" + redirectionUrl);
    }
});

server.listen(process.env.PORT || 8080, (error) => {
    if (error) {
        console.log("Run Server: Success\n\t",error.message);
    } else {
        console.log("Run Server: Success");
    }
});
