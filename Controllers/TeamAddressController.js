const route = require('express').Router();
const AddressModel = require("../Models/TeamContractAddressModel");
route.get('/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'Team ID is required' });
        }
        const contractAddress = await AddressModel.findOne({ teamId: req.params.id });
        console.log(contractAddress);
        if (!contractAddress) return res.status(404).json({ message: 'Contract address not found' });
        res.json({contractAddress: contractAddress.contractAddress});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})

route.post('/',async(req,res)=>{
    try {
        const team =new AddressModel(req.body);
        await team.save();
        res.json(team);
        
    } catch (error) {
        console.log(error);
    }
})


module.exports = route;