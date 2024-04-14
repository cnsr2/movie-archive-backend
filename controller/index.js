const path = require('path');


const hello = async (req,res) => {

    let data = {"hi":"naber"}

    res.status(200).json(data)
}

module.exports = hello;