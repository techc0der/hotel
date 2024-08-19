const express = require('express');
const router = express.Router();
const Fooditem = require('./../menu/foodSchema');
router.use(express.json());


router.post('/',async(req,res)=>{
    try {
        const data = req.body;
        const newFoodItem = new Fooditem(data);
        const response = await newFoodItem.save();
        if (!response) {
            res.status(404).json({ error: 'Data is not saved to database server' });
        }
        else {
            console.log('Data is saved to database server', response);
            res.status(200).json(response); // Ensure you return or handle the response once
        }
    } catch (error) {
        console.log('error is ',error);
        res.status(500).json({error:`Internal Server error --> ${error}`});
    }
})

router.get('/:first/:second',async(req,res)=>{
    try {
        const first = req.params.first;
        const second = req.params.second;
        var response;

        if(first == 'name')response = await Fooditem.find({name:second});
        if(first == 'available')response = await Fooditem.find({available:second});
        if(first == 'category')response = await Fooditem.find({category:second});
        if(first == 'price')response = await Fooditem.find({price:second});

        if (!response) {
            res.status(404).json({ error: 'Data is not fetch from Database server' });
        }
        else {
            console.log('Data is fetch from Database server');
            res.status(200).json(response); 
        }
    } catch (error) {
        console.log('error is ',error);
        res.status(500).json({error:`Internal Server error --> ${error}`});
    }
})

module.exports = router;