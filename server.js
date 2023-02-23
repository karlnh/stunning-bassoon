const path = require('path');
const express = require('express');
const ephb = require('express-handlebars');

const app = express();
const PORT = process.envPORT || 3001;

const sequelize = require('./config/connection');

const hb = ephb.create({});

app.engine('handlebars', hb.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});