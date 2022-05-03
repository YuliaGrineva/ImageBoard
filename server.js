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
        // 1. Generate a random string
        uidSafe(24).then((randomId) => {
            // 2. Construct random file name with extension
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
    console.log("here");
    db.getAllImages().then((result) => {
        res.json(result.rows);
    });
});

// app.post(
//     "/image",
//     uploader.single(
//         "image"
//     ) /*"image" corresponds to your form data input field name*/,
//     (req, res) => {
//         console.log("req.body:\t", req.body);
//         // Multer puts the file info in `req.file`
//         console.log("req.file:\t", req.file);

//         if (req.file) {
//             res.json({ success: true });
//         } else {
//             res.json({ success: false });
//         }
//     }
// );

app.post("/image", uploader.single("image"), s3.upload, (req, res) => {
    console.log("*****************");
    console.log("POST /upload.json Route");
    console.log("*****************");
    console.log("file:", req.file);
    console.log("input:", req.body);

    const { username, title, description } = req.body;
    const url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;

    if (req.file) {
        db.insertImage(url, username, title, description).then(
            res.json({
                url: url,
                username: username,
                title: title,
                description: description,
            })
        );
    } else {
        res.json({
            sucsess: false,
        });
    }
});



app.get("/image/:id", (req, res) => {
    console.log("req.params.id ", req.params.id);
    db.getImageById(req.params.id).then((image) => {
        console.log("IMG ON DB REQUEST ", image);
        if (!image) {
            res.status(404).json({
                message: "Image not found",
            });
            return;
        }
        res.json(image);
    });
});

app.get("/comments/:id", (req, res) => {
    
});

app.post("/comment/", (req, res) => {
    
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
