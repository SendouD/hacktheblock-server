const route = require('express').Router();
const AddressModel = require("../Models/TeamContractAddressModel");

route.post('/:id', async (req, res) => {
    const {answer} = req.body;

    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'Team ID is required' });
        }
        const contractDetails = await AddressModel.findOne({ teamId: req.params.id });
        if (!contractDetails) return res.status(404).json({ message: 'Contract address not found' });
        if(contractDetails.RandomNumber == answer) {
            await AddressModel.findOneAndUpdate({ teamId: req.params.id }, {verified: true});
            res.status(200).json({isEqual: true});
        }
        else {
            res.status(200).json({isEqual: false});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})

module.exports = route;