const fs = require('fs')
const cloudinary = require('../utils/cloudinary')
const PostAd = require('../model/postAdModel')


const postAdController = async (req, res) => {
    const { category, subCategory, condition,title, description, price, isNegotiable } = req.body

    if(!category || !subCategory || !condition || !title || !description || !price || !isNegotiable){
        return res.send("please fill all the fileds")
    }
    
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
    
            const postAd = new PostAd({
                user: req.user.id,
                category: category,
                subCategory: subCategory,
                images: urls,
                condition: condition,
                title: title,
                description: description,
                price: price,
                isNegotiable: isNegotiable
            })
    
            await postAd.save();
    
            res.status(200).json({
                message: 'images uploaded successfully',
                data: postAd
            })
        } else {
            res.status(405).json({
                err: `${req.method} method not allowed`
            })
        }
    } catch (err) {
        if(err){
            console.log(err)
        }
    }

}

module.exports = postAdController