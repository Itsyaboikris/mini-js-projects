const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

function loading() {
    loader.hidden  = false;
    quoteContainer.hidden = true;
}

function complete() {
    loader.hidden  = true;
    quoteContainer.hidden = false;
}


function newQuote() {
    loading();

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    if (!quote.author || quote.author == "type.fit") {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author.split(',')[0];
    }

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }

    quoteText.textContent = quote.text;

    complete();
}

async function getQuotes() {
    loading();

    const apiUrl = 'http://type.fit/api/quotes'

    try {
        const response = await fetch (apiUrl)
        apiQuotes = await response.json()
        
        newQuote();

    } catch (error) {

    }

}


function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// event listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();