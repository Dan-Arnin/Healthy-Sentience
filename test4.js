const express = require("express");
const { request } = require("http");
const app = express();
const path = require("path");
const { response } = require("express");
const { info } = require("console");
const dfff = require("dialogflow-fulfillment");
const { platform } = require("os");
app.use(express.urlencoded({
    extended : true
}))
app.use(express.json());
const port = 6969;
app.get("/", (requ, resp)=>{
    resp.sendFile(path.join(__dirname, "/iframe.html"))
})
app.listen(port,() =>
{
    console.log("server is listening on port ", port)
});
app.post("/hdf",express.json(), (req, res) =>{
    const agent = new dfff.WebhookClient
    ({
        request : req,
        response : res
    })
    console.log(req.body);
    console.log(req.body.queryResult.intent.displayName);
    function gethelp(agent)
    {
        agent.add("I'll try to help you with the best of my abilities. To begin, could you tell me the code that you were assigned?")
    }
    function getcode(agent)
    {
        agent.add("test response from server")
    }
    var intentmap = new Map();
    intentmap.set("get help", gethelp);
    intentmap.set("get code", getcode);
    agent.handleRequest(intentmap);
});