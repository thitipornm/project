const { Food } = require('../models')
module.exports = {
    // get all food
    async index(req, res) {
        try {
            const foods = await Food.findAll()
            res.send(foods)
        } catch (err) {
            res.status(500).send({
                error: 'The foods information was incorrect'
            })
        }
    },
    // create food
    async create(req, res) {
        console.log(JSON.stringify(req.body))
        try {
            const food = await Food.create(req.body)
            res.send(food.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create food incorrect'
            })
        }
    },
    // edit food, suspend, active
    async put(req, res) {
        try {
            await Food.update(req.body, {
                where: {
                    id: req.params.foodId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update food incorrect'
            })
        }
    },
    
// delete food
async remove(req, res) {
        try {
            const food = await Food.findOne({
                where: {
                    id: req.params.foodId
                }
            })
            if (!food) {
                return res.status(403).send({
                    error: 'The food  information was incorrect'
                })
            }
            await food.destroy()
            res.send(food)
        } catch (err) {
            res.status(500).send({
                error: 'The food  information was incorrect'
            })
        }
    },
    // get food  by id
    async show(req, res) {
        try {
            const food  = await Food.findByPk(req.params.foodId)
            res.send(food)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'The food  information was incorrect'
            })
        }
    }
}
