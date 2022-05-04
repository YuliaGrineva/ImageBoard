const comment = {
    data() {
        return {
            comments: [],
            username: "",
            comment: "",
            created_at: "",
        };
    },
    props: ["selected-image"],
    mounted() {
        console.log("props: ", this.$.props.selectedImage);
        const thisComment = "/comment/" + this.$.props.selectedImage;
        console.log("comment ", thisComment);
        fetch(thisComment)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((response) => {
                console.log("comments array", response);
                this.comments = response;
                //   this.username = image.rows[0].username;
                // this.comment = image.rows[0].comment;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        clickSubmit() {
            console.log(this.username, this.comment, this.selectedImage);
            const comment = JSON.stringify({
                username: this.username,
                comment: this.comment,
                selectedImage: this.selectedImage,
            });
            fetch("/comment/", {
                headers: {
                    "Content-type": "application/json",
                },
                body: comment,
                method: "POST",
            })
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    console.log("RESPONSE", response);
                    this.comments.push(response);
                    return response;
                    //response.rows[0];
                });
        },
    },
    template: `
    <p>Add a Comment!</p>
    <div id="commentsField">
    <p>Comment
        <input type="text" name="comment" v-model="comment" />
    </p>
    <p>Username
        <input type="text" name="username" v-model="username"/>
    </p>
    <button @click="clickSubmit">Submit</button>
    </div>
    <div id="commentsAray">
    <div v-for="comment in comments" >
    <ul>
    <li>{{comment.username}}: {{comment.comment}} <br> <div id="username2"> on {{comment.created_at}} </div></li>
    </ul>
    </div>
    </div>
    `,
};

export default comment;
