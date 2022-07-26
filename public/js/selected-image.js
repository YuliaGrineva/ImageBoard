import comment from "./comments-component.js";
const selectedImage = {
    data() {
        return {
            image: {},
        };
    },
    props: ["selected-image"],
    mounted() {
        const url = "/image/" + this.$.props.selectedImage;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((image) => {
                this.image = image;
            })
            .catch((error) => {
            });
    },
    methods: {
        clickOnX() {
            this.$emit("close");
        },
        clickOnBackground(event) {
            if (event.target.classList.contains("image-view-wrapper")) {
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
