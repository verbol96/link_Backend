const {Product} = require('../models/models')


class productController{
    async addProduct(req,res) {
        const {title, description, price} = req.body
        const product = await Product.create({title, description, price})
        return res.json(product)
    }

    async getAll(req,res){
        const products = await Product.findAll()
        if(products.length===0) return res.json("нету продуктов")
        return res.json(products)
    }

    async getOne(req,res){
        const {id} = req.body
        const product = await Product.findOne({where:{id: id}})
        return res.json(product)
    }
}

module.exports = new productController()