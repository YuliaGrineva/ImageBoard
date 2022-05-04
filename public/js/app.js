import * as Vue from "./vue.js";
import selectedImage from "./selected-image.js";

import comment from "./comments-component.js";

const app = Vue.createApp({
    data() {
        return {
            selectedImage: null,
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
        onImgClick(image_id) {
            console.log("ich klicke on", image_id);
            this.selectedImage = image_id;
            console.log(image_id);
        },
        clickOnX() {
            console.log("gdfgdgdggdd");
            this.selectedImage = null;
        },
    },
});

app.mount("#main");

console.log("lalala");
