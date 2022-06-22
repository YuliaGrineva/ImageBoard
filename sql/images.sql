DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS images;




CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    url VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://i.pinimg.com/564x/71/2b/0c/712b0c86abd610ce37d0aba5da151ec9.jpg',
    'Yulia G.',
    'Vergesslicher Engel',
    'Klee designed in 1939 his series of charming, clumsy and dutiful angels.'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Paul_Klee_~_Engel_-_befruchtet_~_1939.jpg/754px-Paul_Klee_~_Engel_-_befruchtet_~_1939.jpg?20150103031524',
    'Yulia G.',
    'Engel - befruchtet ',
    '1939'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://i.pinimg.com/564x/7f/63/29/7f6329cf48010011527868ad2442921c.jpg',
    'Yulia G.',
    'He cries',
    '1939'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://i.pinimg.com/564x/ab/64/ca/ab64ca924b50aa1e3bb91ed3c463fb5c.jpg',
    'Yulia G.',
    'Hässlischer Engel',
    '1939'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://www.universal-prints.de/media_kunst/img/16/m/16_kle472~paul-klee_angel-full-of-hope-1939.jpg',
    'Yulia G.',
    'Angel full of hope',
    '1939'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://www.universal-prints.de/media_kunst/img/16/m/16_kle470~paul-klee_angel-in-king-garden-1939.jpg',
    'Yulia G.',
    'Angel in King garden',
    '1939'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://img.posterlounge.de/images/l/1905122.jpg',
    'Yulia G.',
    'Engel',
    '1939'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://postkarten-mit-herz.de/wp-content/uploads/2018/07/pk_074_schellenengel.jpg',
    'Yulia G.',
    'Schnellenengel',
    '1939'
);
INSERT INTO images (url, username, title, description) VALUES (
    'https://assets.germanposters.de/products/2d86/klee-paul-engelsam-1939-large.jpg',
    'Yulia G.',
    'Engelsam',
    '1939'
);

CREATE TABLE comments(
    id SERIAL primary key,
    username VARCHAR NOT NULL,
    comment VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_id INT NOT NULL REFERENCES images(id)
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'Philipp',
    'great pic!',
    1
);