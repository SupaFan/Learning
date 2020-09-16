const person = require('./foo.js')
const myFoo = new person('jFan', 29)
console.log(myFoo.getName())
console.log(myFoo.getAge())
myFoo.staticName = 'jfanSpace'
console.log(myFoo.staticFn())
// myFoo.staticFn()
