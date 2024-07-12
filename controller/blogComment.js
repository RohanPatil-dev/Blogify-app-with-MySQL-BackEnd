const jwt = require("jsonwebtoken")
const secret = "Rohan123504"

const blogs = require("../model/blogs")

const connection = require("../connection")

async function addReview(req,res) {
    try {

        jwt.verify(req.token, secret, async (err, data) => {

            if (err) throw err

            console.log(req.body)

            const { comments } = req.body;
            const id = req.params.id;

            // const newComment = { content };
            // const updatedBook = await blogs.findByIdAndUpdate(
            //     id,
            //     { $push: { review: newComment } },
            //     { new: true }
            // );

            connection.query("insert into comment(blogger_id,user_id,comments) values(?,?,?)",[id,data.id,comments],(err,data)=>{
                if(err) throw err;

                console.log(data);
                return res.json(data);
            })
        })
    } catch (error) {
        return res.json({ msg: "Server error" })
    }
}

async function getReview(req,res) {
    try {

        jwt.verify(req.token, secret, async (err, data) => {

            if (err) throw err

            const id = req.params.id

            // const getComments = await blogs.findById(id)

            connection.query("select * from comment where blogger_id =?",[id],(err,data)=>{
                  if(err) throw err;

                  console.log(data);

                  if (!data) {
                    return res.status(404).json({ error: "Blog not found !" })
                } else {
                    return res.status(200).json(data)
                }
            })



        })
    } catch (err) {
        return res.json({ msg: "Server error" })
    }
}

module.exports = {addReview,getReview}