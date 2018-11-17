//pedaco de codigo para fins de debug
function mouseClicked(){
    console.log(mouseX +" , " + mouseY)
    // console.log(sliders) 
    // ellipse(mouseX, mouseY, 50)  
    
}

var funcLog = ()=>{

}

//funcao 
var funcSegGrau = (a,b,c)=>  
x => {
    return a * x * x + b *x + c
}

//retorna uma função seno em funcao de x com os valores a, b, c e d fornecidos
var funcSeno = (a,b,c,d) => 
x => {
    return a + b * Math.sin( c * x  + d)
}

// funcao de primeiro grau com Currying
var funcPrimGrau  = (a,b) => x => {
    return a*x + b
}

var funcExpo = (n, r) =>
t =>{
    return n*Math.exp(r*t)
}

var func
var grafico

grafico = new Graphic(document.querySelector("div.grafico"), 80, 90, 10, "all")
// grafico.setSliderFunction("Teste", funcPrimGrau, '#ff0000', [
//     grafico.createSlider("Valor de A", true, 0, 10, 1),
//     grafico.createSlider("Valor de B", true, 0, 10, 1)
// ])
// grafico.setLinearRegression("Teste", "#ff0000")

grafico.setFunction("Oba", x=>{return Math.log(x)},"#ff0000")