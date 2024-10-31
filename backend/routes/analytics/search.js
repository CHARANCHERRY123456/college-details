const express = require("express");
const User = require('../../models/user.js'); // Adjust path as needed
const search = express.Router();

search.get("/" , (req , res)=>{
    res.json({
        success : true
    })
})

search.get('/names', async (req, res) => {
    console.log("searched for the name");
    try {
        // Fetch only the NAME field from all documents
        const names = await User.find({}, 'NAME'); // 'NAME' specifies the field projection
        console.log(names , "is the names");
        res.json(names);
    } catch (error) {
        console.error("Error fetching names:", error);
        res.status(500).json({ error: "An error occurred while fetching names" });
    }
});

module.exports = search