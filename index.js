var app = new Vue({
    el: '#app',

    data: {
        time: 1500,
        mode: 0,
        cicle: 1,
        message: "Mantenha o foco.",
        pomodoros: document.cookie? JSON.parse(document.cookie):[],
        showHistorico: false,
    },

    methods: {
        setFocar: function() {
            this.time = 1500;
            this.mode = 0;
            this.message = "Mantenha o foco.";
        },
        setDescansar: function () {
            this.time = 300;
            this.mode = 1;
            this.message = "Descanse um pouco.";
        },
        setDescansoLongo: function () {
            this.time = 600;
            this.mode = 2;
            this.message = "Relaxe um pouco, você merece.";
        },
        save: function() {
            let datehour = new Date().toLocaleString();
            let pomodoro = {
                mode: this.mode,
                datetime: datehour,
            };
            this.pomodoros.unshift(pomodoro);
            document.cookie = JSON.stringify(this.pomodoros);
        },
        limparHistorico: function() {
            document.cookie = "";
            this.pomodoros = []
        },
        //responsável por decrementar tempo do pomodoro
        decremTime: function () {

            if(this.time <= 0){ // executa quando o ciclo terminar
                this.save();
                this.birl();    // som
                clearInterval(this.intervalo);
                this.intervalo = undefined;

                if ((this.cicle % 4) == 0){ // ao fazer 4 pomodoros ganhe um descanso longo
                    console.log("descanso longo")
                    this.setDescansoLongo();
                } else {
                    console.log("descanso curto");
                    this.setDescansar();
                }

                if (this.mode > 0){ // ao final do descanso voltar o foco
                    this.setFocar();
                }
                this.cicle ++;
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
            if (this.intervalo){
                this.naoVaiDar();}
                clearInterval(this.intervalo);
                this.intervalo = undefined;
            },
            reset: function () {
                this.pause();
                this.ajudaOMaluco();
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
            },
            ajudaOMaluco: function () {
                let audio1 = new Audio();
                audio1.src = "som/ajudaOMaluco.mp3";
                audio1.play();
            },
            naoVaiDar: function() {
                let audio1 = new Audio();
                audio1.src = "som/naoVaiDar.mp3";
                audio1.play();
            }

        }

    })
