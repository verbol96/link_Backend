const {User, Order, Photo, Status} = require('../models/models')


class orderController{
    async addOrder(req,res) {
        const {phone, name, nikname, typePost, firstClass, postCode, city, adress, oblast, raion, codeInside, codeOutside, price, other, photo} = req.body
        let user = await User.findOne({where: {phone: phone}})
        
        if(user===null){
            user = await User.create({phone, name, nikname, typePost, firstClass, postCode, city, adress, oblast, raion})
        }else{
            await User.update(
                {
                    phone: phone, name: name, nikname: nikname, typePost: typePost, firstClass: firstClass, postCode:postCode,
                    city: city, adress:adress, oblast: oblast, raion: raion
                },
                {where:{id: user.id}}
            )
        }
        
        const order = await Order.create({codeInside, codeOutside, price, other, userId: user.id, status: 1})
        await photo.map(el=>
            Photo.create({type: el.type, format: el.format, amount: el.amount, paper: el. paper, orderId: order.id }))

        await Status.create({step: 1, orderId: order.id})
        return res.json(user)
    }

    async getAll(req,res){
        const order = await Order.findAll()
        const user = await User.findAll()
        const photo = await Photo.findAll()
        return res.json({user, order, photo})
    }

    async updateStatus(req,res){
        const id = req.params.id
        const {status} = req.body
        const order = await Order.update({status: status}, {where: {id:id}})
        return res.json(order)
    }

    async updateOrder(req,res){
        const id = req.params.id
        const {phone, name, nikname, typePost, firstClass, postCode, city, adress, oblast, raion, codeInside, codeOutside, price, other, photo, userId} = req.body


        await Order.update(
            {
                codeInside: codeInside, codeOutside: codeOutside, price: price, other: other
            },
            {where:{id: id}}
        )
       
        await User.update(
            {
                phone: phone, name: name, nikname: nikname, typePost: typePost, firstClass: firstClass, postCode:postCode,
                city: city, adress:adress, oblast: oblast, raion: raion
            },
            {where:{id: userId}}
        )

        await Photo.destroy({where: {orderId: id}})

        await photo.map(el=>
            Photo.create({type: el.type, format: el.format, amount: el.amount, paper: el. paper, orderId: id }))

        return res.json(id)
    }

    async deleteOrder(req,res){
        const id = req.params.id
        const order = await Order.destroy({where: {id: id}})
        await Status.destroy({where: {orderId: id}})
        return res.json(order)
    }

    
    
}

module.exports = new orderController()