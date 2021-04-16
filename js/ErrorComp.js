"use strict";

/*export*/ const error = {
    data(){
        return {
            errorStr: '',
        }
    },

    methods: {
        showError(str){
            this.errorStr = str;
        }
    },

    mounted(){
        console.log('error', this);
    },
    template:`<div>{{errorStr}}</div>`
}