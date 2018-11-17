class Graphic extends p5{   
    /* 
    Classe de gráfico cartesiano para ser utilizado com o Framework p5.js
    */
   
    constructor(div, widthPor, heightPor, scalePorc, quadrant){
    super(()=>{},false,false)
        this.wid = div.offsetWidth*widthPor/100 //largura do grafico 
        this.hei = div.offsetHeight*heightPor/100 //altura do grafico
        this.scale = scalePorc/100 * this.hei //numero de pixels por unidade

        switch(quadrant){
            case "1":
                this.origin = {
                    x: (0.06*this.hei), //origem horizontal do grafico
                    y: (0.94*this.hei) //origem vertical do grafico
                }
                this.quad = quadrant
                break;
            default:
                this.origin = {
                    x: (0.5*this.hei), //origem horizontal do grafico
                    y: (0.5*this.hei) //origem vertical do grafico
                }
                this.quad = "all"
        }

        this.limits = {
            start:{
                x: (0.06*this.hei), //origem horizontal do grafico
                y: (0.94*this.hei) //origem vertical do grafico
                 
            },
            end:{
                x: (0.95*this.wid), //limite horizontal do grafico
                y: (0.06*this.hei) //limite vertical do grafico
            }
        }
        this.construct = false //define se deve executar o método de construção ou não
        this.i = this.floor(this.limits.start.x) //valor de referencia para o iterador do grafico
        
        this.functions = [] //array com todas as espécies envolvidas
        
        this.superiorContainer = div
        this.canvasContainer = document.createElement("div")
        this.canvas //o elemento canvas utilizado
        // console.log(this.canvas.elt)
        this.sliders = [] //array com todos os sliders usados no grafico
        this.slidersContainer //elemento que contém todos os sliders
        this.graphDiv = document.createElement("div")
        
        this.buttons =  {
            startBt : "",
            stopBt : "",
            restartBt : ""
        }

        this.constructHTML()
        
        this.setup = this.setup.bind(this)
        this.draw = this.draw.bind(this)
        this.pointsList = []
        // this.start()
        
    }
    
    constructHTML(){
        //criando div pro grafico
        // this.graphDiv = document.createElement("div")
        this.graphDiv.className = "graph-container"
        this.graphDiv.style.display = "flex"
        this.graphDiv.style.flexDirection = "row"
        document.body.appendChild(this.graphDiv)
        
        //adicionar canvas à div
        this.canvasContainer.style.height = this.hei+"px"
        this.canvasContainer.style.width = this.wid+"px"
        this.graphDiv.appendChild(this.canvasContainer)
        
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
        
        //adiciona div do grafico à div superior
        this.superiorContainer.appendChild(this.graphDiv)
        //adiciona botãoo à div do grafico
        this.superiorContainer.appendChild(btDiv)
    }
    
    draw(){
        /* 
        Função que executa a animação do gráfico 
        */
       
       //constroi resultado se o atributo 'construct' for true
       if(this.construct){
           //pega valor existente de i ou a origem do grafico caso não estiver definido
           this.i = this.i || this.limits.start.x 
           //constroi gráfico usando iterador
           this.constructResults(this.i)
           //incrementa o iterador se não atingiu o limite
           if(this.i<this.limits.end.x) this.i++    
        }
    }
    
    constructResults(px){ //cor da linha e valor de x atual
        this.strokeWeight(3)        
        this.functions.forEach(func => {
            this.stroke(func.color)
            let px2 = px+1
            let x1 = (px-this.origin.x)/this.scale // x1 = px1 / (px/un)
            let x2 = (px2-this.origin.x)/this.scale // x2 = px1 + 1 / px/un
            let py1 = this.origin.y - (func.getFunction()(x1) * this.scale) // Y1 px  =  Y1 un * E px/un
            let py2 = this.origin.y - (func.getFunction()(x2) * this.scale) // Y2 px  =  Y2 un * E px/un
            this.line(px,py1,px2,py2)
            /* let obj = { //codigo pra debug
                Xgraphic1: px,
                Ygraphic1: py1,
                Xfunction1: x1,
                Yfunction1: func.getFunction()(x1),
                Xgraphic2: px2,
                Ygraphic2: py2,
                Xfunction2: x2,
                Yfunction2: func.getFunction()(x2),
            }
            console.table(obj) */
        });


    }
    
    //cria div para sliders e adicona ao documento
    constructSliders(){
        this.slidersContainer = document.createElement("div")
        this.slidersContainer.className = "sliders-superior"
        this.graphDiv.appendChild(this.slidersContainer)
    }
    
    //constroi slider com valor atribuido
    createSlider(legenda, showValue, min, max, step){

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
        
        if(showValue){
            slider.addEventListener('change', ev=>{
                this.functions.forEach(specie=>specie.curryFunction())
                ev.target.previousSibling.innerText = legenda + ": " + ev.target.value
            })
        
        }else{
            slider.addEventListener('change', ev=>
            this.functions.forEach(specie=>specie.curryFunction()))
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
        // O(0.06h , 0.94h)
        
        //desenha eixos do plano
        
        let arrowLength = 0.02*this.hei        
        this.background(186)
        this.stroke(255)
        this.strokeWeight(4)
        
        if(this.origin.y!=this.limits.end.y){
            this.line(this.origin.x,
                this.origin.y,
                this.origin.x,
                this.limits.end.y)
            
            this.line(this.origin.x,
                this.limits.end.y,
                this.origin.x-(arrowLength)*this.cos(this.PI/3),
                this.limits.end.y+(arrowLength)*this.sin(this.PI/3))
            this.line(this.origin.x,
                this.limits.end.y,
                this.origin.x+(arrowLength)*this.cos(this.PI/3),
             this.limits.end.y+(arrowLength)*this.sin(this.PI/3))
        }
        if(this.origin.x!=this.limits.end.x){
            this.line(this.origin.x,
                this.origin.y,
                this.limits.end.x,
                this.origin.y)
        //desenha flecha abaixo do eixo x
            this.line(this.limits.end.x,
                this.origin.y,
                this.limits.end.x-(arrowLength*this.cos(-this.PI/6)) ,
                this.origin.y-(arrowLength*this.sin(-this.PI/6)))
            //desenha flecha acima do eixo x
            this.line(this.limits.end.x,
                this.origin.y,
                this.limits.end.x-(arrowLength*this.cos(-this.PI/6)),
                this.origin.y+(arrowLength*this.sin(-this.PI/6)))
        }
        if(this.origin.y!=this.limits.start.y){
            this.line(this.origin.x, this.origin.y, this.origin.x, this.limits.start.y)
            
            this.line(this.origin.x, 
                this.limits.start.y,
                this.origin.x-(arrowLength)*this.cos(this.PI/3),
                this.limits.start.y-(arrowLength)*this.sin(this.PI/3))
            this.line(this.origin.x,
                this.limits.start.y,
                this.origin.x+(arrowLength)*this.cos(this.PI/3),
                this.limits.start.y-(arrowLength)*this.sin(this.PI/3))
        }
        if(this.origin.x!=this.limits.start.x){
            this.line(this.origin.x,
                this.origin.y,
                this.limits.start.x,
                this.origin.y)
                //desenha flecha abaixo do eixo x
            this.line(this.limits.start.x,
                this.origin.y,
                this.limits.start.x+(arrowLength*this.cos(-this.PI/6)) ,
                this.origin.y-(arrowLength*this.sin(-this.PI/6)))
            //desenha flecha acima do eixo x
            this.line(this.limits.start.x,
                this.origin.y,
                this.limits.start.x+(arrowLength*this.cos(-this.PI/6)),
                this.origin.y+(arrowLength*this.sin(-this.PI/6)))
        }
        
        //desenha eixo x
        
        
    }

    mousePressed(){
        // console.table([this.mouseX-this.origin.x, this.origin.y-this.mouseY])
        if(!(this.mouseX>0 && this.mouseX<this.wid && this.mouseY<this.hei && this.mouseY>0))
            return
        this.restart()
        this.noStroke()
        this.fill(0)
        this.pointsList.forEach((point)=>{
            this.ellipse(point.x,point.y,this.hei*0.02)
        })
        
        this.ellipse(this.mouseX, this.mouseY, this.hei*0.02)

        this.pointsList.push({
            x: this.mouseX,
            y: this.mouseY
        })

        
        this.functions.forEach((func)=>{
            if(func instanceof LinearRegressionFunction) func.setPoint({
                x: (this.mouseX-this.origin.x)/this.scale,
                y: (this.origin.y-this.mouseY)/this.scale
            })
        })
    }
    
    restart(){
        this.getPlane()
        this.i = 0
    }
    
    //criar especie
    //TODO: fazer método pra inserir com imagem
    //TODO: fazer método pra inserir contagem no html 

    setFunction(nome, funcao, cor){
        this.functions.push(new Function(nome,funcao,cor))
    }

    setSliderFunction(nome, funcao, cor, sliders){
        this.functions.push(new SliderFunction(nome, funcao, cor, sliders))
    }

    setLinearRegression(nome, cor){
        this.mousePressed = this.mousePressed.bind(this)
        this.functions.push(new LinearRegressionFunction(nome, cor))
    }
            
    setup(){
        this.canvas = this.createCanvas(this.wid, this.hei)        
        this.canvasContainer.appendChild(this.canvas.elt)
        this.getPlane()
    }
} 