const selectedImage = {
    data() {
        return {
            title: "",
            url: "",
            username: "",
            description: "",
            // selectedImage: null,
        };
    },
    props: ["selected-image"],
    mounted() {
        console.log("props: ", this.$.props.selectedImage);
        const url = "/image/" + this.$.props.selectedImage;
        console.log("URL: ", url);
        fetch(url)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((image) => {
                console.log("data im fetch", image.rows[0]);
                this.title = image.rows[0].title;
                this.url = image.rows[0].url;
                this.username = image.rows[0].username;
                this.description = image.rows[0].description;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        clickOnX() {
            this.$emit("close");
        },
    },
    template: `<div class="image-view" >
        <p id="close" @click="clickOnX">X</p>
        <img :src="url" id="bigImg" @click="clickOnX"/>
        <p id="title">{{this.title}}</p>
        <p id="description" >{{this.description}}</p>
        <p id="username">{{this.username}}</p>

    </div>`,
};
export default selectedImage;
