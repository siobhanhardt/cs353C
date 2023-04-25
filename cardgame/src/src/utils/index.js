 export function getRandomCard(ary,length){
    let fanhuideshuzu = [];
    while (fanhuideshuzu.length !== length) {
        let randomCont = Math.floor(Math.random() * ary.length);
        let ti = ary[randomCont]
        if(fanhuideshuzu.includes(ti)){
            continue;
        }
        fanhuideshuzu.push(ti);   
    }
    return fanhuideshuzu;
}



