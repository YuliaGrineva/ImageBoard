const selectedImage = {
    data() {
        return {
            selectedImage: {},
        };
    },
    mounted() {
        // const url = ;
        // fetch(url)
    },
    props: [],
    methods: {
        // clickOnX() {
        //     this.$emit("close");
        // },
    },
    template: `<div class="image-view">
     <img :src="selectedImage.url" id="bigImg"/>
     {{selectedImage.title}} {{selectedImage.description}} {{selectedImage.username}}
    <p @click="clickOnX">X HELLOOOO!</p> 
    </div>`,
};
export default selectedImage;
