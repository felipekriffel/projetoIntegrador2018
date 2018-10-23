class LinearRegressionFunction{
    constructor(name, color){
        this.name = name
        this.color = color
        this.func = (a,b) => (x) => a + b*x
        this.curriedFunc
        this.pointsList = []

        this.avg = {
            x: 0,
            y: 0
        }

        //seguindo modelo y = a + bx
        this.params = { 
            a: 0,
            b: 0
        }
    }

    curryFunction(){
        this.updateParams()
        this.curriedFunc = this.func(this.params.a, this.params.b)
    }

    getFunction(){
        if(!this.curriedFunc) this.curryFunction()
        return this.curriedFunc
    }

    setPoint(point){
        this.pointsList.push(point)
        // this.updateParams()
        this.curryFunction()
        // console.table(this.pointsList)
    }

    setPoints(pointsArray){
        this.pointsList = pointsArray
        this.updateParams()
    }

    updateParams(){
        let elementsNumber = this.pointsList.length
        let sumX = this.pointsList.reduce((acc,point)=>acc+point.x,0) 
        let sumY = this.pointsList.reduce((acc,point)=>acc+point.y,0)

        // console.log(this.pointsList)
        // console.log(sumX);
        

        this.avg.x = sumX/elementsNumber
        this.avg.y = sumY/elementsNumber

        let b = this.pointsList.reduce((acc, point) => acc + (point.x-this.avg.x)*(point.y-this.avg.y), 0) / 
                this.pointsList.reduce((acc, point) => acc + Math.pow((point.x - this.avg.x),2), 0)

        // console.log(this.pointsList.reduce((acc, point) => acc + (point.x-this.avg.x)*(point.y-this.avg.y),0))

        this.params.b = b
        this.params.a = this.avg.y - b*this.avg.x
        // console.log(this.params.a)
        // console.log(this.params.b)
    }
}