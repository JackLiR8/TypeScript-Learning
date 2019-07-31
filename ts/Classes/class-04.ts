/* 
    Advanced Techniques
        1. 构造函数
        2. 类当接口
        
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

    let greeter: Greeter;       // Greeter类的实例的类型是 Greeter
    greeter = new Greeter('Ts');
    console.log(greeter.greet())

    // 另一个例子
    class Greet {
        static standardGreeting = "Hello,there";
        greeting: string = '';
        greet() {
            if (this.greeting) {
                return `Hello, ${this.greeting}`
            } else {
                return Greet.standardGreeting
            }
        }
    }

    let greeter1: Greet;
    greeter1 = new Greet();
    console.log(greeter1.greet());      // Hello,there

    let greeterMaker: typeof Greet = Greet;
    greeterMaker.standardGreeting = 'Hey, I am maker '

    let greeter2 = new greeterMaker();
    console.log(greeter2.greet())       // Hey, I am maker 

    /* 
        greeterMaker 变量保存了类的构造函数；typeof Greet 可以取到 Greet 类的类型，而不是实例的类型；
        这个类型包含了类的所有静态成员和构造函数。 
    */

/*  2. 把类当接口使用

            类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，
        所以你能够在允许使用接口的地方使用类。
*/
    class Point {
        x: number = 0;
        y: number = 0;
    }

    interface Point3d extends Point {
        z: number;
    }

    const point3d: Point3d = {x: 1, y: 2, z: 3}
    console.log(point3d)
})()