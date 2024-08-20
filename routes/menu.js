const Fooditem = require('./../menu/foodSchema');
const express = require('express');
const router = express.Router();
router.use(express.json());


router.post('/',async(req,res)=>{
    try {
        const data = req.body;
        const newFoodItem = await Fooditem.insertMany(data);
        //const response = await newFoodItem.save();
        if (!newFoodItem) {
            res.status(404).json({ error: 'Data is not saved to database server' });
        }
        else {
            console.log('Data is saved to database server', newFoodItem);
            res.status(201).json(newFoodItem); // Ensure you return or handle the response once
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
        else if(first == 'available')response = await Fooditem.find({available:second});
        else if(first == 'category')response = await Fooditem.find({category:second});
        else if(first == 'price'){
            if (second.includes(':')) {
                const [operator, value] = second.split(':');
                const query = { price: { [`$${operator}`]: Number(value) } };
                response = await Fooditem.find(query);
            } else {
                // If `second` is a direct number, cast it to a number and find by exact price
                response = await Fooditem.find({ price: Number(second) });
            }
        }

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
router.delete('/:bool',async(req,res) => {
    try {
        const bool = req.params.bool;
        const response = await Fooditem.deleteMany({available:bool});
        if (!response) {
            res.status(404).json({ error: 'Data is not saved to database server' });
        }
        else {
            console.log('Data is saved to database server', response);
            res.status(201).json(response); 
        }
    } catch (error) {
        console.log('error is ',error);
        res.status(500).json({error:`Internal Server error --> ${error}`});
    }
})

module.exports = router;