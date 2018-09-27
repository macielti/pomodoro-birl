var app = new Vue({
    el: '#app',

    data: {
        time: 1500,
        mode: 0,
    },

    methods: {
        setFocar: function() {
            this.time = 1500;
            this.mode = 0;
        },
        setDescansar: function () {
            this.time = 300;
            this.mode = 1;
        },
        setDescansoLongo: function () {
            this.time = 600;
            this.mode = 2;
        },
        decremTime: function () {
            if(this.time <= 0){
                this.birl();
                clearInterval(this.intervalo);
            } else{
                this.time --;
            }

        },
        iniciar: function () {
            if (!this.intervalo){
                this.intervalo = setInterval(this.decremTime, 1000);
                this.eitaPorra();
            }
        },
        pause: function () {
            clearInterval(this.intervalo);
            this.intervalo = undefined;
        },
        reset: function () {
            this.pause();
            switch (this.mode) {
                case 0:
                    this.setFocar();
                    break;
                case 1:
                    this.setDescansar();
                    break;
                case 2:
                    this.setDescansoLongo();
                    break;
            }
        },
        birl: function () {
              let audio1 = new Audio();
              audio1.src = "som/birl.mp3";
              audio1.play();
        },
        eitaPorra: function() {
            let audio1 = new Audio();
            audio1.src = "som/eitaPorra.mp3";
            audio1.play();
        }

    }

})
