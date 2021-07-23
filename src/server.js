const express = require('express');

const app = express();
app.get('/ping', (req, res) =>
    res.json({
        content: "Foobar hello!!"
    }));
app.listen(3000);