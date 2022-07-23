export function numberWithCommas(x) {
    if(x === null || x === undefined){
        return x
    }else{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    
}

export function refineFloat(value){
    return Number(Math.round(value+'e2')+'e-2').toFixed(2) 
}

export function refineFloatForValue(value){
    return Number(Math.round(value+'e2')+'e-2')
}