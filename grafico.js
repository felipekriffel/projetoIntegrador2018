class Graphic{   
    /* 
        Classe de gráfico cartesiano para ser utilizado com o Framework p5.js
     */

    constructor(width, height, scalePorc){
        this.width = width //largura do grafico 
        this.height = height //altura do grafico
        this.scale = scalePorc * height //numero de pixels por unidade
        this.origin = {
            x: (0.06*this.height), //origem horizontal do grafico
            y: (0.94*this.height) //origem vertical do grafico
        }
        this.limits = {
            x: (0.95*width), //limite horizontal do grafico
            y: (0.06*height) //limite vertical do grafico
        }
        this.construct = false //define se deve executar o método de construção ou não
        this.i //valor de referencia para o iterador do grafico

        this.species = [] //array com todas as espécies envolvidas

        this.canvas = createCanvas(width, height) //o elemento canvas utilizado
        this.sliders = [] //array com todos os sliders usados no grafico
        this.slidersContainer //elemento que contém todos os sliders

        this.buttons =  {
            startBt : "",
            stopBt : "",
            restartBt : ""
        }
        
        this.getPlane()
        this.constructHTML()
    }

    constructHTML(){
        //criando div pro grafico
        let graphDiv = document.createElement("div")
        graphDiv.className = "graph-container"
        graphDiv.style.display = "flex"
        graphDiv.style.flexDirection = "row"
        document.body.appendChild(graphDiv)

        //adicionar canvas à div
        graphDiv.appendChild(this.canvas.elt)

        //criar div pra botões
        let btDiv = document.createElement("div")
        btDiv.className = "button-container"
        btDiv.style.display = "flex"

        //criar botoes
        this.buttons.startBt = document.createElement("button")
        this.buttons.startBt.className = "button-start"
        this.buttons.startBt.innerText = "Iniciar"       
        this.buttons.stopBt  = document.createElement("button")
        this.buttons.stopBt.className = "button-stop"
        this.buttons.stopBt.innerText = "Parar"
        this.buttons.restartBt  = document.createElement("button")
        this.buttons.restartBt.className = "button-restart"
        this.buttons.restartBt.innerText = "Reiniciar"
        
        //adiciona evento para alterar o valor de construct
        this.buttons.startBt.addEventListener("click", ev=>{
            this.construct = true
        })

        this.buttons.stopBt.addEventListener("click", ev=>{
            this.construct = false
        })

        this.buttons.restartBt.addEventListener("click", ev => this.restart())

        //adicionar botoes à btDiv
        btDiv.appendChild(this.buttons.startBt)
        btDiv.appendChild(this.buttons.stopBt)
        btDiv.appendChild(this.buttons.restartBt)

        //adicionar btDiv ao documento
        document.body.appendChild(btDiv)

    }

    run(){
        /* 
            Função que executa a animação do gráfico 
         */
        
        //constroi resultado se o atributo 'construct' for true
        if(this.construct){
            //pega valor existente de i ou a origem do grafico caso não estiver definido
            this.i = this.i || this.origin.x 
            //constroi gráfico usando iterador
            this.constructResults(this.i)
            //incrementa o iterador se não atingiu o limite
            if(this.i<this.limits.x) this.i++    
        }
    }
    
    constructResults(px){ //cor da linha e valor de x atual
        strokeWeight(3)        
        this.species.forEach(specie => {
            stroke(specie.color)
            let px2 = px+1
            let x1 = (px-this.origin.x)/this.scale // x1 = px1 / (px/un)
            let x2 = (px2-this.origin.x)/this.scale // x2 = px1 + 1 / px/un
            let py1 = this.origin.y - (specie.getFunction()(x1) * this.scale) // Y1 px  =  Y1 un * E px/un
            let py2 = this.origin.y - (specie.getFunction()(x2) * this.scale) // Y2 px  =  Y2 un * E px/un
            line(px,py1,px2,py2)
            /* let obj = [ //codigo pra debug
                x1,
                x2,
                specie.curryFunction()(x1),
                specie.curryFunction()(x2)
            ] */
        });
    }

    //cria div para sliders e adicona ao documento
    constructSliders(){
        this.slidersContainer = document.createElement("div")
        this.slidersContainer.className = "sliders-superior"
        document.querySelector(".graph-container").appendChild(this.slidersContainer)
    }

    //constroi slider com valor atribuido
    createSlider(legenda, showValue, min, max, step, ){
        //cria container para sliders se não existe ainda
        if(!this.slidersContainer)
            this.constructSliders()


            //cria div para manter  o slider
        let internDiv = document.createElement("div")
        internDiv.className = "sliders-container"

        //cria paragrafo com a legenda indicada
        let text = document.createElement("p")
        text.className = 'legenda'
        
        //cria slider
        let slider = document.createElement("input")
        slider.type = "range"
        slider.className = "slider"
        slider.min = min
        slider.max = max
        slider.step = step
        slider.value = max < min ? min : min + (max - min)/2
        

        text.innerText = legenda + ": " + slider.value
        //se showValue for verdadeiro, cria evento para exibir o valor atual
        /* if(showValue){    
            slider.addEventListener('mousedown', ev=>{
                ev.target.previousSibling.innerText = legenda + ": " + ev.target.value
            })
            slider.addEventListener('mouseup', ev=>{
                ev.target.previousSibling.innerText = legenda + ": " + ev.target.value
            })
        } */
        if(showValue){
            slider.addEventListener('change', ev=>{
                this.species.forEach(specie=>specie.curryFunction())
                ev.target.previousSibling.innerText = legenda + ": " + ev.target.value
            })
            // slider.addEventListener('mouseup', ev=>{
            //     this.species.forEach(specie=>specie.curryFunction())
            //     ev.target.previousSibling.innerText = legenda + ": " + ev.target.value
            // })
            // slider.addEventListener('keypress', ev=>{
            //     this.species.forEach(specie=>specie.curryFunction())
            //     ev.target.previousSibling.innerText = legenda + ": " + ev.target.value
            // })
        }else{
            slider.addEventListener('mousedown', ev=>
                this.species.forEach(specie=>specie.curryFunction()))
            slider.addEventListener('mouseup', ev=>
                this.species.forEach(specie=>specie.curryFunction()))
            slider.addEventListener('keypress', ev=>
                this.species.forEach(specie=>specie.curryFunction()))
        }

        
        // adiciona slider ao array de sliders
        this.sliders.push({
            slider: slider,
            legenda: text
        })
        
        //adiciona containers ao documento
        internDiv.appendChild(text)
        internDiv.appendChild(slider)
        this.slidersContainer.appendChild(internDiv)

        return slider
    }

    
    //constroi o grafico cartesiano
    getPlane(){ 
        //origem do plano fica a 6% da origem do gráfico
        // O(0.06*h , 0.94h)
        
        //desenha eixos do plano
        let arrowLength = 0.02*this.height        
        background(186)
        stroke(255)
        strokeWeight(4)
        
        //desenha eixo y
        line(this.origin.x, this.origin.y, this.origin.x, 0.05*this.height)
        //desenha flecha à esquerda do eixo Y
        line(this.origin.x, 0.05*this.height, this.origin.x-(arrowLength)*cos(PI/3), 0.05*this.height+(arrowLength)*sin(PI/3))
        //desenha flecha à direita do eixo y
        line(this.origin.x, 0.05*this.height, this.origin.x+(arrowLength)*cos(PI/3), 0.05*this.height+(arrowLength)*sin(PI/3))
        
        //desenha eixo x
        line(this.origin.x, this.origin.y, 0.95*this.width, this.origin.y)
        //desenha flecha abaixo do eixo x
        line(0.95*this.width,this.origin.y, 0.95*this.width-(arrowLength*cos(-PI/6)) , this.origin.y-(arrowLength*sin(-PI/6)))
        //desenha flecha acima do eixo x
        line(0.95*this.width,
            this.origin.y,
            0.95*this.width-(arrowLength*cos(-PI/6)) ,
            this.origin.y+(arrowLength*sin(-PI/6)))
        
    }

    restart(){
        this.getPlane()
        this.i = 0
    }

    //criar especie
    //TODO: fazer método pra inserir com imagem
    //TODO: fazer método pra inserir contagem no html 
    setSpecie(nome, funcao, cor, sliders){        
        this.species.push(new Specie(nome, funcao, cor, sliders))
    }

} 