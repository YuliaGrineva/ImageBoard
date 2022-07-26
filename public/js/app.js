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
            moreImages: true,
        };
    },
    mounted() {
        addEventListener("popstate", () => {
            this.selectedImage = location.pathname.slice(1);
        });
        window.addEventListener("scroll", this.scroll);
        const idFromUrl = location.pathname.slice(1);
        this.selectedImage = idFromUrl;


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
                    this.title = "";
                    this.description = "";
                    this.username = "";
                });
        },

        handleFileChange(e) {
            this.image = e.target.files[0];
        },
        onImgClick(image_id) {
            this.selectedImage = image_id;
            history.pushState({}, "", this.selectedImage);
        },
        clickOnX() {
            this.selectedImage = null;
            history.pushState({}, "", "/");
        },
        clickOnMore() {
            const biggestId = this.images[this.images.length - 1].id;
            fetch("/more/" + biggestId)
                .then((images) => images.json())
                .then((image) => {
                    if (image.length) {
                        const biggestId = image[0].biggestId;
                        for (let i = 0; i < image.length; i++) {
                            if (biggestId === image[i].id) {
                                this.seen = false;
                            }
                        }
                    }
                    this.images = [...this.images, ...image];
                    if (image.length === 0) {
                        this.moreImages = false;
                    }
                })
                .catch((err) => {
                    console.log("something went wrong with more button", err);
                });
        },
    },
});

app.mount("#main");
