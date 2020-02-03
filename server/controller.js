const helper = require('../database/dbHelpers')

const controller = {
    get: (req, res) => {
        helper.get()
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(400).send(err)
            
        })
    }
}

module.exports = controller;