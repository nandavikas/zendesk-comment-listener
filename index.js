const express = require('express')
const request = require('request');

const app = express()

const port = process.env.PORT || 3000
const BOT_ID = "x1603101690876"

app.use(express.json())

app.post('/newComment', (req, res) => {
    console.log("body-------------------------------------------------------------->", req.body)
    if (req.body) {
        // const options = {
        //     'method': 'POST',
        //     'url': 'https://app.yellowmessenger.com/integrations/yellowmessenger/message',
        //     'headers': {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         "sender": req.body.sender,
        //         "botId": BOT_ID,
        //         "data": {
        //             "event": {
        //                 "code": "new_agent_message",
        //                 "payload": req.body.recent_comment
        //             }
        //         },
        //         "source": "syncApi"
        //     })

        // };
        const options = {
            'method': 'POST',
            'url': 'https://app.yellowmessenger.com/integrations/yellowmessenger/receive',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                "from": req.body.sender, 
                "to": BOT_ID, 
                "message": { 
                    "event": { 
                        "code": "new_agent_message", 
                        "data": { 
                            "type": "text", 
                            "Content": { 
                                "message": req.body.recent_comment
                            }, 
                            "payload": { 
                                "sender": req.body.sender
                            } 
                        } 
                    } 
                } 
            })

        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(`Event sent to bot - ${BOT_ID}`, response.body);
        });
    }
    res.send()
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})