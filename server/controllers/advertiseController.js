const fs = require('fs')
const cloudinary = require('../utils/cloudinary')
const Advertise = require('../model/advertiseModel')

// post an advertise
const postAd = async (req, res) => {

    const { division, area,category, condition, title, description, price, isNegotiable } = req.body

    if (!division || !area || !category || !condition || !title || !description || !price || !isNegotiable) {
        return res.send("please fill all the fileds")
    }

    // upload photos to cloudinary
    const uploader = async (path) => await cloudinary.uploads(path, 'images');

    try {
        if (req.method === 'POST') {
            const urls = []
            const files = req.files;
            for (const file of files) {
                const { path } = file;
                const newPath = await uploader(path)
                urls.push(newPath)
                fs.unlinkSync(path)
            }
            for(let i=0; i <= 50; i++){
            const advertise = new Advertise({
                user: req.user.id,
                division: division,
                area: area,
                category: category,
                images: urls,
                condition: condition,
                title: title,
                description: description,
                price: price,
                isNegotiable: isNegotiable
            })
            await advertise.save();
            }

            res.status(200).json({
                message: 'Posted advertise successfully',
            })
        } else {
            res.status(405).json({
                err: `${req.method} method not allowed`
            })
        }
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
}

// get all ads with pagination and filtering
const getAllAds = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const { division, area, category, price, searchKeyword } = req.body;

        let filterData = {};
        if(division){
            filterData.division = new RegExp(division, "i")
        }
        if(area){
            filterData.area = new RegExp(area, "i")
        }
        if(category){
            filterData.category = new RegExp(category, "i")
        }
        if(price){
            filterData.price = {$gte: price}
        }

        if (searchKeyword) filterData.searchKeyword = { title: new RegExp(searchKeyword, "i") };
        
        const ads = await Advertise.find({$text: {$search: searchKeyword}}).limit(limit * 1).skip((page - 1) * limit)
        const count = await Advertise.countDocuments()
        
        res.json({
            ads,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = { postAd, getAllAds }