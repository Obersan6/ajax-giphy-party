const form = $('form');
const input = $('#search');
const gifContainer = $('#gif-container');
const removeBtn = $('#remove-gifs-btn');

// Add event listener to 'form' of 'submit'
form.on('submit', function(event) {
    event.preventDefault();
    
    const userInput = input.val();
    input.val(''); 

    // Call function that makes the gif request with 2 inputs: userInput, key 
    makeGifRequest('SoJgRmpxIFs069rRss2JJDbVKYFdPfcu', userInput);
});

// Make GIF request
async function makeGifRequest(key, term) {
    try {
        const response = await axios.get('http://api.giphy.com/v1/gifs/search', {
            params: {
                api_key: key,
                q: term
            }
        });

        // console.log(response.data);

        const responseData = response.data; 

        if (responseData) { 
          
            let resultsGifs = responseData.data.length; 

            // Get a random GIF
            if (resultsGifs) {
                let randomGIF = Math.floor(Math.random() * resultsGifs);
                let newDiv = $('<div></div>');
                let newGIF = $('<img>', { src: responseData.data[randomGIF].images.original.url });
                console.log(newGIF);
                gifContainer.append(newDiv);
                newDiv.append(newGIF);    
            }
        }
    } catch (error) {
        console.error('Error fetching GIFs:', error);
    }
}

// Remove entire 'url' when removeBtn gets clicked
removeBtn.on('click', gifContainer, function() {
    gifContainer.remove();
});

