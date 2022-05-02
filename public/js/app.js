import * as Vue from "./vue.js";
import selectedImage from "./selected-image.js";

const app = Vue.createApp({
    data() {
        return {
            selectedImage: {},
            images: [],
            title: "",
            description: "",
            username: "",
            image: null,
            id: null,
        };
    },
    mounted() {
        fetch("/images.json")
            .then((resp) => resp.json())
            .then((resp) => {
                this.images = resp;
            });
    },
    components: {
        "selected-image": selectedImage,
    },
    methods: {
        handleSubmit(e) {
            // Prevent the default form submission behavior
            e.preventDefault();

            // Create your data with the right encoding
            const formData = new FormData();
            formData.append("title", this.title);
            formData.append("image", this.image);
            formData.append("username", this.username);
            formData.append("description", this.description);

            // Trigger an Ajax to the server:
            fetch("/image", {
                method: "POST",
                body: formData,
            })
                .then((allImages) => {
                    //insertedimege
                    return allImages.json();
                })
                .then((allImages) => {
                    this.images.unshift(allImages);
                });
        },

        handleFileChange(e) {
            console.log("Handle File Change");
            this.image = e.target.files[0];
        },
        onImgClick(selectedImage) {
            console.log("ich klicke on", selectedImage);
            this.selectedImage = selectedImage;
            console.log(selectedImage);
        },
        clickOnX() {
            this.imageView = null;
        },
    },
});

app.mount("#main");

console.log("lalala");
