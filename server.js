// Provided Boilerplate Code
const { response } = require('express');
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// My Code
// API Quote Router
const apiQuotesRouter = express.Router();
app.use('/api/quotes', apiQuotesRouter);

// Get Random Quote
apiQuotesRouter.get('/random', (request, response, next) => {
    response.send({
        quote: getRandomElement(quotes)
    });
})

// Get All Quotes or All Quotes by One Person
apiQuotesRouter.get('/', (request, response, next) => {
    const requestedPerson = request.query.person;
    if (requestedPerson) {
        const quotesByPerson = [];
        quotes.forEach(quote => {
            if (quote.person === requestedPerson) {
                quotesByPerson.push(quote);
            }
        })

        response.send({ quotes: quotesByPerson });
    } else {
        response.send({ quotes: quotes });
    }
})

// Post New Quote
apiQuotesRouter.post('/', (request, response, next) => {
    if (request.query.quote && request.query.person) {
        quotes.push(request.query);
        response.status(201).send({ quote: request.query });
    } else {
        response.status(400).send("Invalid quote format.");
    }
})

// Open Server
app.listen(PORT);