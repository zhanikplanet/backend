const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Client } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 5501;

app.use(cors());
app.use(bodyParser.json());

const saltRounds = 10;

const getClient = () => {
    return new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'log&reg',
        password: 'narutoplanet',
        port: 5432,
    });
};

app.get('/getUsers', async (req, res) => {
    let client;

    try {
        client = getClient();
        await client.connect();

        const result = await client.query('SELECT * FROM users');

        for (const user of result.rows) {
            try {
               
                const isPasswordMatch = await bcrypt.compare(password, user.password);

                if (isPasswordMatch) {
                    console.log('Success');
                } else {
                    console.log('Password does not match');
                }
            } catch (err) {
                console.error(err.message);
            }
        }

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (client) {
            await client.end();
        }
    }
});

app.post('/postUser', async (req, res) => {
    const client = getClient();
    const { username, email, password } = req.body;

    try {
        await client.connect();
        const existingUser = await client.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Account with this username or email already exists' });
        }

        const hash = await bcrypt.hash(password, saltRounds);

        await client.query(
            'INSERT INTO users(username, email, password) VALUES($1, $2, $3)',
            [username, email, hash]
        );

        res.json({ message: 'User added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.end();
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
