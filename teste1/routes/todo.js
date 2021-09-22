var express = require('express')
var router = express.Router()
const _db = require("../services/db")
const { ObjectId } = require('mongodb')

_db.connectToDB((err) => {
    if (err) console.log(err)

    const checkBody = (req, res, next) => {
        if ("_id" in req.body) {
            req.body._id = ObjectId(req.body._id)
        }
        next();
    }

    router.get("/list", async (req, res) => {
        try {
            const results = await _db.findDocuments()
            res.send(results)
        }
        catch (e) {
            console.log(e)
        }

    });

    router.post("/add", async (req, res) => {
        const results = await _db.insertDocument(req.body)
        res.send(results)
    });

    router.patch("/update", checkBody, async (req, res) => {
        const results = await _db.updatedeDocumento(req.body)
        res.send(results)
    });

    router.delete("/delete", checkBody, async (req, res) => {
        const results = await _db.deletarDocumento(req.body)
        res.send(results)
    });
})
module.exports = router