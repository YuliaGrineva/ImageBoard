import comment from "./comments-component.js";
const selectedImage = {
    data() {
        return {
            image: {},
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
                console.log("data im fetch", image);
                this.image = image;
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
        <div id="commentsleft">
            <img :src="image.url" id="bigImg"/>
            <h2 id="title">{{image.title}}</h2>
            <h4 id="description" >{{image.description}}</h4>
            <h4 id="username">Uploaded by {{image.username}} on {{image.created_at}}</h4>    
            </div>
            <div id="commentsdiv">
            <comments-component 
                    v-if="selectedImage"
                    :selected-image="selectedImage">
            </comments-component>
            </div>
        </div>

    </div>`,
};
export default selectedImage;
