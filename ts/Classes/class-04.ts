/* 
    ................................ 高级技巧 Advanced Techniques ...........................................

    1. 构造函数 constructor functions

        当你在TypeScript里声明了一个类的时候，实际上同时声明了很多东西。 首先就是类的 实例的类型。
*/
(() => {
    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return `Hello, ${this.greeting}`
        }
    }

    let greeter: Greeter;
    greeter = new Greeter('Ts');
    console.log(greeter.greet())














})()