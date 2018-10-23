class SliderFunction{
    constructor(name, func, color, sliders){
        //lança erro se o nome não for String
        if(typeof name !== "string") 
            throw new TypeError("name parameter must be an String")

        //lança erro se a função passada não for uma function
        if(typeof func !== "function") 
            throw new TypeError("func parameter must be an function")
        
        //lança erro se o array de sliders não for um array ou não tiver Inputs do tipo 'range'
        if(!sliders instanceof Array || 
            !sliders.every(slider=> slider instanceof HTMLInputElement && slider.type == "range")) 
            throw new TypeError("sliders parameter must be an Array of Input obects with 'range' type")
        
        if(sliders.length !== func.length)
            throw new Error("there must be the same number of sliders and function parameters")

        this.name = name
        this.func = func 
        this.curriedFunc
        this.color = color
        this.sliders = sliders
        
    }

    getFunction(){
        //retorna a funcao 'curryada'
        if(!this.curriedFunc) this.curryFunction()
        return this.curriedFunc
    }

    getSliderValues(){
        //pega os valores dos sliders no array passado
        return this.sliders.map((slider)=> slider.valueAsNumber)
    }

    curryFunction(){
        //usa rest parameters passando como parametro o array com valores de slider
        this.curriedFunc = this.func(...this.getSliderValues())        
    }
}