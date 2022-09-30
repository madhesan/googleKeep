const router = require("express").Router();
const Notes = require('../models/notes');
const { User, validate } = require("../models/signup");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.detail[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});


//insert
router.post('/add', async (req, res) => {
    const savepost = new Notes(req.body);
    console.log(savepost);
    try {
        await savepost.save();
        res.send("inserted data");
    } catch (err) {
        console.log(err)
    }
});

//read
router.get('/read/:id', async (req, res) => {
    Notes.find({ $or: [{ user1: req.params.id }, { googleuser: req.params.id }] }, (err, data) => {
        if (err) {

            res.send(err)
        }
        res.send(data);
        console.log("aaa", data);
    })
});
//delete
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await Notes.findByIdAndRemove(id).exec();
    res.send("deleted");
});
//update
router.put('/update', async (req, res) => {

    const newName = req.body.newName;
    const newTitle = req.body.newTitle;
    const id = req.body.id;

    try {
        await Notes.findById(id, (err, updatedNote) => {
            updatedNote.text = newName;
            updatedNote.title = newTitle;
            updatedNote.save();
            res.send("update");
        });
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;