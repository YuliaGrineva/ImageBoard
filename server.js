
const express = require("express");
const app = express();
const db = require("./sql/db");
const path = require("path");
const uidSafe = require("uid-safe");
const multer = require("multer");
const s3 = require("./s3");

const storage = multer.diskStorage({
    // Directory
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "uploads"));
    },
    // Filename
    filename: (req, file, callback) => {     
        uidSafe(24).then((randomId) => {       
            const fileName = `${randomId}${path.extname(file.originalname)}`;
            callback(null, fileName);
        });
    },
});

const uploader = multer({ storage });

app.use(express.static("./public"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/images.json", (req, res) => {
    db.getAllImages().then((result) => {
        res.json(result.rows);
    });
});

app.post("/image", uploader.single("image"), s3.upload, (req, res) => {

    const { username, title, description } = req.body;
    const url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;

    if (req.file) {
        db.insertImage(url, username, title, description).then((data) =>

            res.json({
                url: url,
                username: username,
                title: title,
                description: description,
                id: data.id,

            })
        );
    } else {
        res.json({
            sucsess: false,
        });
    }
});

app.get("/more/:biggestId", (req, res) => {
    const lastId = req.params.biggestId;
    db.moreImages(lastId)
        .then((images) => {
            res.json(images.rows);
        })
        .catch((err) =>
            console.log("something went wrong with more button", err)
        );
});

app.get("/image/:id", (req, res) => {
    
    db.getImageById(req.params.id).then((image) => {
        if (!image) {
            res.status(404).json({
                message: "Image not found",
            });
            return;
        }
        res.json(image.rows[0]);
    });
});

app.get("/comment/:id", (req, res) => {
    const { id } = req.params;
    db.getAllCommentsById(id).then((comments) => {
        res.json(comments.rows);
    });
});

app.post("/comment/", (req, res) => {
    const { comment, username, selectedImage } = req.body;
    db.createComment(comment, username, selectedImage)
        .then((comment) => {
            res.json(comment.rows[0]);
        })
        .catch((err) => console.log("something went wrong with comments", err));
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});


