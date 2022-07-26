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
        const thisComment = "/comment/" + this.$.props.selectedImage;
        fetch(thisComment)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.comments = response;
                
            })
            .catch((error) => {
            });
    },
    methods: {
        clickSubmit() {
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
                    this.comments.push(response);
                    this.comment = "";
                    this.username = "";
                });
        },
    },
    template: `
    <h3>Add a Comment!</h3>
    <div id="commentsField">
    <p>Comment
        <textarea type="text" name="comment" v-model="comment" placeholder="Enter your comment" rows="2"></textarea>
    </p>
    <p>Username
        <input type="text" name="username" v-model="username"/>
    </p>
    <button @click="clickSubmit">Submit</button>
    </div>
    
    <div id="commentsAray">
    
    <ul>
    <li v-for="comment in comments">{{comment.username}}: {{comment.comment}} <br> <div id="username2"> on {{comment.created_at}} </div></li>
    </ul>
   
    </div>
    `,
};

export default comment;
