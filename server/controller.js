const helper = require('../database/dbHelpers')

const controller = {
    get: (req, res) => {
        helper.get(req.params.id)
        .then((data) => {
            let arr = [];
            let arr2 = [];
            arr.push(data)
            //seperates to two strings
            let rev = arr[0].review[0].split("_");
            for (let i = 0; i < rev.length; i++) {
                arr2.push(rev[i].split('|'));
            }
            let arr3 = arr2.map(array => {
                return array = {
                    customerReview: array[0],
                    quotes: array[1],
                    customerScore: array[2],
                    score: array[3],
                    name: array[4],
                    description: array[5],
                    likes: array[6],
                    time: array[7]
                }
            })
            for (let i = 0; i < arr3.length; i ++) {
                arr[0].review[i] = arr3[i];
            }
            res.status(200).send(arr)

        })
        .catch((err) => {
            res.status(400).send(err)
            
        })
    },

    post: (req, res) => {
        helper.post(req.body)
        .then(() => {
            res.status(201).send('Item Posted')
        })
        .catch((err) => {
            res.status(401).send(err)
        })
    },

    put: (req, res) => {
        helper.put(req.params.id, req.body)
        .then(() => {
            res.status(202).send('Item Updated')
        })
        .catch((err) => {
            res.status(402).send(err)
        })
    },

    delete: (req, res) => {
        helper.delete(req.params.id)
        .then(() => {
            res.status(203).send('Item Deleted')
        })
        .catch((err) => {
            res.status(403).send(err)
        })
    }
}

module.exports = controller;