const database = require('./db.json');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


const getValues = (values) => {
    const response = {
        status: 200,
        values
    }
    if (!values) {
        response.status = 404;
        response.values = {};
    }
    return response;
};


const getFilteredValues = (values, { query }) => {
    const paramToQuery = Object.keys(query)[0];
    const paramToQueryValue = query[paramToQuery];
    return values.filter((value) => (!value[paramToQuery]) ? false : new RegExp(paramToQueryValue, 'gi').test(value[paramToQuery]));
};

app.get('/:key', (req, res) => {
    const { key } = req.params;
    const values = database[key];
    const filteredValues = Object.keys(req.query).length === 0 ? null : getFilteredValues(values, req);
    const { status, values: responseValue } = getValues(filteredValues || values);
    res.status(status).json(responseValue);

});

app.listen(port, () => console.log(`Scart running on port ${port}!`))