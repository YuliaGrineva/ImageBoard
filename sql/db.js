const spicedPg = require("spiced-pg");

let DB_USERNAME, DB_PASSWORD, DB_NAME;

DB_USERNAME = require("../secrets.json").DB_USERNAME;
DB_PASSWORD = require("../secrets.json").DB_PASSWORD;
DB_NAME = require("../secrets.json").DB_NAME;

const dbUrl = `postgres:${DB_USERNAME}:${DB_PASSWORD}:@localhost:5432/${DB_NAME}`;
const db = spicedPg(dbUrl);

function getAllImages() {
    const query = `
        SELECT * FROM images
        ORDER BY id DESC 
        LIMIT 3
        
    `;

    const params = [];

    return db.query(query, params);
}

function moreImages(lastId) {
    const query = `
        SELECT *, (SELECT id FROM images
        ORDER BY id DESC 
        LIMIT 1)
        AS lowestId FROM images
WHERE id < $1
ORDER BY id DESC
LIMIT 3;

    `;

    const params = [lastId];

    return db.query(query, params);
}

function insertImage(url, username, title, description) {
    const query = `INSERT INTO images (url, username, title, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `;
    const params = [url, username, title, description];
    return db.query(query, params).then((result) => result.rows[0]);
}

function getImageById(id) {
    const query = `SELECT * FROM images WHERE id = $1`;
    const params = [id];
    return db.query(query, params);
}

function getAllCommentsById(image_id) {
    const query = `SELECT * FROM comments WHERE image_id = $1`;
    const params = [image_id];
    return db.query(query, params);
}

function createComment(comment, username, image_id) {
    const query = `INSERT INTO comments (comment, username, image_id)
        VALUES ($1, $2, $3)
        RETURNING *
        `;
    const params = [comment, username, image_id];
    return db.query(query, params);
}

module.exports = {
    getAllImages,
    insertImage,
    getImageById,
    getAllCommentsById,
    createComment,
    moreImages,
};
