// const express = require('express');
const db = require('./db/connection');

// Connect to database
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});