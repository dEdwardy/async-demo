let idx = 0
let p = () => {
    return new Promise((resolve,reject) => {
        let time = Math.random()*5000
        setTimeout(() => {
            // console.log('xxx' + idx)
            // if(idx==9){
            //     reject('err')
            //     return
            // }
            console.log(time)
            resolve('ok' + idx)
            idx++;
        }, time)
    })
}
let promises = new Array(20).fill(p)
// let run = async () => {
//     let a = await p();
//     console.log(a)
// }
// run()
/**
 *  promise.all 限流版本  并行
 * @param {*} promises 
 * @param {*} max 
 */
let promiseAllWithLimit = (promises, max = 2) => {
    return new Promise((resolve, reject) => {
        let cur = 0, len = promises.length, resArr = [];
        let run = async () => {
            while (cur < len) {
                let curArr = promises.slice(cur, max + cur),stopF = false;
                let ps = curArr.map(i => i())
                console.log(ps)
                await Promise.all(ps).then(res => {
                    cur += max
                    console.log(res)
                    resArr = [...resArr,...res]
                }).catch(e => {
                    stopF = true;
                    reject(e)
                })
                if(stopF)break;
            }
        }
        run().then(() => {
            resolve(resArr)
        })
    })

}
promiseAllWithLimit(promises, 3).then(res => console.log(res)).catch(e => console.log(e))