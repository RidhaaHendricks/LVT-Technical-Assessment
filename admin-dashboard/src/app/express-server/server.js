const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors())

app.get('/api/tempNumbers', cors(), function (req, res) {
    // res.json({ message: "Hello!!!" })
    fetch('https://mocki.io/v1/635ce436-44ea-4137-b1dc-188e782cce2a')
        .then(response => response.json())
        .then(data => res.json({message: data}))
        .catch(error => console.error('Error', error));
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
