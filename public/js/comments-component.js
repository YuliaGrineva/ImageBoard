const comment = {
    data() {
        return {
            comments: [],
            username: "",
            comment: "",
        };
    },
    props: ["id"],
    mounted() {},
    methods: {
        clickSubmit() {
            this.$emit("post");
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
    <button>Submit</button>
    </div>
    <div id="commentsAray">
    </div>
    `,
};


export default comment;
