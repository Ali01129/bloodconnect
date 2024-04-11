const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Donor=require('../models/donor');

//add Donor
router.post('/adddonor',[
        // express validators
        body('name','Enter a valid Name').isLength({ min: 3 }),
        body('group','Enter a valid blood Group(example: A+)').isLength({ min: 2 }),
        body('city','Enter a valid city').isLength({ min: 2 }),
        body('phone1','Phone number must be atlest 11 digit long').isLength({ min: 11 }),
        body('phone2','Phone number must be atlest 11 digit long').optional().isLength({ min: 11 })
],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let donor = await Donor.findOne({
        name: req.body.name,
        group: req.body.group,
        $or: [
            { phone1: req.body.phone1 },
            { phone2: req.body.phone1 },
            { phone1: req.body.phone2 },
            { phone2: req.body.phone2 }
        ]
    });
    
    if (!donor) {
        donor=await Donor.create({
            name:req.body.name,
            group:req.body.group,
            city:req.body.city,
            phone1:req.body.phone1,
            phone2:req.body.phone2,
        });
        res.json({created:donor});
    }
    else{
        return res.status(400).json({ errors: "Donor already exist" });
    }
});
//view donor
router.post('/viewdonor',async(req,res)=>{
    try {
        const donors = await Donor.find({});
        res.json({ donors });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
//search donor
router.post('/searchdonor',[
], async (req, res) => {

    try {
        const name = req.body.name;
        const donors = await Donor.find({ name: { $regex: name, $options: 'i' } });
        res.json({ donors });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
//search group
router.post('/searchgroup',[
    body('group','Enter a valid group').isLength({ min: 2,max:3 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const donors = await Donor.find({ group:req.body.group });
        res.json({ donors });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
module.exports = router;