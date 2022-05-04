import comment from "./comments-component.js";
const selectedImage = {
    data() {
        return {
            title: "",
            url: "",
            username: "",
            description: "",
            created_at: "",
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
                this.created_at = image.rows[0].created_at;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        clickOnX() {
            this.$emit("close");
        },
        clickOnBackground(event) {
            if (event.target.classList.contains("image-view-wrapper")) {
                // hast du auf den hintergrund geclickt
                this.$emit("close");
            }
        },
    },
    components: {
        "comments-component": comment,
    },
    template: `
   <div class="image-view-wrapper" @click="clickOnBackground">
        <div class="image-view" >
            <p id="close" @click="clickOnX">X</p>
            <img :src="url" id="bigImg"/>
            <p id="title">{{this.title}}</p>
            <p id="description" >{{this.description}}</p>
            <p id="username">Uploaded by {{this.username}} on {{this.created_at}}</p>
                <comments-component 
                    v-if="selectedImage"
                    :selected-image="selectedImage">
                </comments-component>
        </div>

    </div>`,
};
export default selectedImage;
