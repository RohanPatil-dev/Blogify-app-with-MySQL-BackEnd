const jwt = require("jsonwebtoken") 
const secret = "Rohan123504"

// const blogs = require("../model/blogs")

const connection = require("../connection")

async function addBlogs(req, res) {
    try {
        const { blogger, title, description } = req.body

        if (!title && !description) {
            return res.status(400).json({ msg: "Form is empty" })
        } else if (!title) {
            return res.status(400).json({ msg: "Title is empty !" })
        } else if (!description) {
            return res.status(400).json({ msg: "Description is empty !" })
        } else {

            jwt.verify(req.token, secret, async (err, data) => {

                if (err) throw err

                // // const blog = await blogs.create({ blogger: data._id, title: title, description: description })

                await connection.query("insert into blog(blogger,title,description) values(?,?,?)", [data.id, title, description], (err, result) => {
                    if (err) throw err;

                    console.log(result);
                    return res.status(201).json({ msg: "success", result })

                })
            })
        }
    } catch (error) {
        return res.status(400).json({ msg: "error", error })
    }
}

// this will show when our blog is submitted and want to see all the blogs which is created by the perticular blogger
async function renderBlog(req, res) {
    try {
        jwt.verify(req.token, secret, async (err, data) => {
            if (err) throw err

            // const allData = await blogs.find({ blogger: data._id })

            connection.query("select * from blog where blogger =?",[data.id],(err,result)=>{
                 if(err) throw err;

                 console.log(result);

                 return res.status(201).json({ msg: "Success", allData: result })
            })

          
        })
    } catch (error) {
        return res.status(400).json({ msg: "Data is empty !" })
    }
}

async function getAllData(req, res) {
    try {
        jwt.verify(req.token, secret, async (err, data) => {
            if (err) throw err

            // //    const allData = await blogs.find({})

            await connection.query("select * from blog", async (err, data) => {
                if (err) throw err;

                return res.status(201).json({ msg: "Success", allData: data })
            })
        })

    } catch (error) {
        return res.status(400).json({ msg: "Data is empty !" })
    }
}

async function singleData(req, res) {
    try {
        jwt.verify(req.token, secret, async (err, data) => {
            if (err) throw err

            const id = req.params.id
            // const allData = await blogs.findById(id)

            connection.query("select * from blog where id =?", [id], (err, data) => {
                if (err) throw err;

                return res.status(201).json({ msg: "Success", allData: data })
            })
        })
    } catch (error) {
        return res.status(400).json({ msg: "Data is empty !" })
    }
}


function updateData(req, res) {
    try {
        jwt.verify(req.token, secret, async (err, data) => {
            if (err) throw err;
            const id = req.params.id
            // const allData = await blogs.findByIdAndUpdate(id, req.body)

            const { title, description } = req.body

            connection.query("update blog set title =?, description =? where id =?", [title, description, id], (err, data) => {
                if (err) throw err;
                return res.status(201).json({ msg: "Success", allData: data })
            })

        })
    } catch (error) {
        return res.status(400).json({ msg: "Data is empty !" })
    }
}


async function deleteData(req, res) {
    try {
        jwt.verify(req.token, secret, async (err, data) => {
            if (err) throw err;
            const id = req.params.id
            // const allData = await blogs.findByIdAndDelete(id)

            connection.query("delete from blog where id =?", [id], (err, data) => {
                if (err) throw err;

                return res.status(201).json({ msg: "Success", allData: data })
            })


        })
    } catch (error) {
        return res.status(400).json({ msg: "Data is empty !" })
    }
}

module.exports = { addBlogs, getAllData, singleData, updateData, deleteData, renderBlog }