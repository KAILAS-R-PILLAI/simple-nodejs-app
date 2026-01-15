const express = require('express');
const app = express();
const request = require('request');

app.set("view engine", "ejs");

/* 1️⃣ Home page */
app.get('/', (req, res) => {
    res.render('index'); // renders your updated index.ejs
});

/* 2️⃣ Handle form submit → redirect to /person/:name */
app.get('/search', (req, res) => {
    const person = req.query.person;
    if (!person) return res.redirect('/'); // if empty, back to home

    // Redirect to /person/:name
    res.redirect(`/person/${encodeURIComponent(person)}`);
});

/* 3️⃣ Final result page */
app.get('/person/:name', (req, res) => {
    const title = encodeURIComponent(req.params.name);
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;

    request(
        {
            url,
            headers: {
                "User-Agent": "simple-nodejs-app/1.0 (contact: admin@example.com)"
            },
            timeout: 5000
        },
        (err, wikiRes, body) => {
            if (err || wikiRes.statusCode !== 200) {
                return res.render('404'); // render your 404.ejs
            }

            let data;
            try {
                data = JSON.parse(body);
            } catch (e) {
                return res.render('404');
            }

            // Display the Wikipedia summary
            res.send(`
                <h1>${data.title}</h1>
                <p>${data.extract}</p>
                <a href="/">Search again</a>
            `);
        }
    );
});

/* 4️⃣ Catch-all 404 */
app.get('*', (req, res) => {
    res.render('404');
});

/* 5️⃣ Start server */
app.listen(3000, () => {
    console.log("Listening at port 3000...");
});
