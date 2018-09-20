//pedaco de codigo para fins de debug
function mouseClicked(){
    console.log(mouseX +" , " + mouseY)
    // console.log(sliders) 
    // ellipse(mouseX, mouseY, 50)  
    
}

// funcao de primeiro grau com Currying
var funcSegGrau = (a,b,c)=>  
    //retorna uma função de primeiro grau em funcao de x com os valores a e b fornecidos
    x => {
        return a * x * x + b *x + c
    }

//retorna uma função seno em funcao de x com os valores a, b, c e d fornecidos
var funcSeno = (a,b,c,d) => 
x => {
    return a + b * sin( c * x  + d)
}
var i //Referencia para o iterador 

var funcPrimGrau  = (a,b) => x => {
    return a*x + b
}

var funcExpo = (n, r) =>
t =>{
    return n*Math.exp(r*t)
}

var func
var grafico
function setup(){
    
    grafico = new Graphic(document.querySelector("div.grafico"), 80, 90, 0.1)
    grafico.setSpecie("Teste", funcSeno, '#ff0000', [
        grafico.createSlider("Valor de A", true, 0, 10, 1),
        grafico.createSlider("Valor de B", true, 0, 10, 1),
        grafico.createSlider("Valor de C", true, 0, 10, 1),
        grafico.createSlider("Valor de D", true, 0, 5, 0.1)
    ])
}

function draw(){   
    /* i = i || grafico.origin.x //
    if(construct) grafico.constructResults(i)
    if(i<grafico.limits.x && construct) i++     */
    grafico.run();
}   
