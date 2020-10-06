var p = new Promise((resolve, reject) => {
    resolve([1])
})

arr = []
p.then((result) => {
    arr = result
})
setTimeout(() => {
    console.log(arr)
}, 2000);
