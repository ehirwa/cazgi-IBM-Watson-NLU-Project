Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@ehirwa 
chuongit
/
cazgi-IBM-Watson-NLU-Project
Public
forked from ibm-developer-skills-network/cazgi-IBM-Watson-NLU-Project
0
01k
Code
Pull requests
Actions
Projects
Wiki
Security
Insights
cazgi-IBM-Watson-NLU-Project/sentimentAnalyzeServer/sentimentAnalyzerServer.js /
@chuongit
chuongit Server and client side changes to implement the final project require…
…
Latest commit 2ccbea7 3 hours ago
 History
 2 contributors
@lavskillup@chuongit
166 lines (140 sloc)  5.31 KB
  
const express = require('express');
const app = new express();

/*This tells the server to use the client 
folder for all static resources*/
app.use(express.static('client'));

/*This tells the server to allow cross origin references*/
const cors_app = require('cors');
app.use(cors_app());

/*Uncomment the following lines to loan the environment 
variables that you set up in the .env file*/

const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

//The default endpoint for the webserver
app.get("/", (req, res) => {
    res.render('index.html');
});

//The endpoint for the webserver ending with /url/emotion
app.get("/url/emotion", (req, res) => {
    //Extract the url passed from the client through the request object
    let urlToAnalyze = req.query.url

    const analyzeParams = {
        "url": urlToAnalyze,
        "features": {
            "keywords": {
                "emotion": true,
                "limit": 1
            }
        },
    };

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            //Print the JSON returned by NLU instance as a formatted string
            console.log(JSON.stringify(analysisResults.result.keywords[0].emotion, null, 2));
            //Please refer to the image to see the order of retrieval
            return res.send(analysisResults.result.keywords[0].emotion, null, 2);
        })
        .catch(err => {
            let errMsg = "Could not do desired operation " + err;
            console.log(errMsg);
            return res.send(errMsg);
        });
});

//The endpoint for the webserver ending with /url/sentiment
app.get("/url/sentiment", (req, res) => {
    //Extract the url passed from the client through the request object
    let urlToAnalyze = req.query.url

    const analyzeParams = {
        "url": urlToAnalyze,
        "features": {
            "keywords": {
                "sentiment": true,
                "limit": 1
            }
        },
    };

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            //Print the JSON returned by NLU instance as a formatted string
            console.log(JSON.stringify(analysisResults.result.keywords[0].sentiment, null, 2));
            //Please refer to the image to see the order of retrieval
            return res.send(analysisResults.result.keywords[0].sentiment, null, 2);
        })
        .catch(err => {
            let errMsg = "Could not do desired operation " + err;
            console.log(errMsg);
            return res.send(errMsg);
        });
});

//The endpoint for the webserver ending with /text/emotion
app.get("/text/emotion", (req, res) => {
    //Extract the text passed from the client through the request object
    let textToAnalyze = req.query.text

    const analyzeParams = {
        "text": textToAnalyze,
        "features": {
            "keywords": {
                "emotion": true,
                "limit": 1
            }
        },
    };

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            //Print the JSON returned by NLU instance as a formatted string
            console.log(JSON.stringify(analysisResults.result.keywords[0].emotion, null, 2));
            //Please refer to the image to see the order of retrieval
            return res.send(analysisResults.result.keywords[0].emotion, null, 2);
        })
        .catch(err => {
            let errMsg = "Could not do desired operation " + err;
            console.log(errMsg);
            return res.send(errMsg);
        });
});

app.get("/text/sentiment", (req, res) => {
    //Extract the text passed from the client through the request object
    let textToAnalyze = req.query.text

    const analyzeParams = {
        "text": textToAnalyze,
        "features": {
            "keywords": {
                "sentiment": true,
                "limit": 1
            }
        },
    };

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            //Print the JSON returned by NLU instance as a formatted string
            console.log(JSON.stringify(analysisResults.result.keywords[0].sentiment, null, 2));
            //Please refer to the image to see the order of retrieval
            return res.send(analysisResults.result.keywords[0].sentiment, null, 2);
        })
        .catch(err => {
            let errMsg = "Could not do desired operation " + err;
            console.log(errMsg);
            return res.send(errMsg);
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete
