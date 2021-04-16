/*import {cart} from "./CartComp.js";
import {products} from "./ProductComp";
import {search_form} from "./SearchComp.js";
import {error} from "./ErrorComp.js";*/

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    components: {cart, products, search_form, error},
    methods: {
        getJson(url){
            return fetch(url) 
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.showError(error);
                    console.log(error);
                })
        },
    },
    mounted() {
        console.log('root', this);
    }

});

