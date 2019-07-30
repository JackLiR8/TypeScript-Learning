/* 
    类：
        继承    Inheritance

*/
    class Gretter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return 'Hello, ' + this.greeting
        }
    }

    let greeter = new Gretter('Ts')
    console.log(greeter.greet())        // Hello, Ts

/* ........................................ 继承 Inheritance ...............................................

    下面例子中，类从基类中继承了属性和方法。Dog是一个 派生类，它派生自 Animal 基类，通过 extends关键字。
    派生类通常被称作 子类，基类通常被称作 超类。
*/
    class Animal {
        move(distance: number = 0) {
            console.log(`Animal moved ${distance}m`)
        }
    }

    class Dog extends Animal {
        bark() {
            console.log('Wang!')
        }
    }

    const dog = new Dog();
    dog.bark()
    dog.move()
    dog.move(10)

// 看一个更复杂的例子
    class Animals {
        name: string;
        constructor(theName: string) {
            this.name = theName;
        }
        move(distance: number = 0) {
            console.log(`${this.name} moved ${distance} m`)
        }
    }

    class Horse extends Animals {
        constructor(name: string) {
            super(name);
        }
        move(distance: number = 60) {
            console.log('dada ... dada');
            super.move(distance);
        }
    }

    class Bird extends Animals {
        constructor(name: string) {
            super(name);
        }
        move(distance: number = 40) {
            console.log('flying.....')
            super.move(distance);
        }
    }

    let horse = new Horse('JackMa');
    let bird: Animal = new Bird('KG');

    horse.move();
    bird.move(100);

    /* 
        派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。 而且，在
        构造函数里访问 this的属性之前，我们 一定要调用 super()。

        注意：
            即使 bird 被声明为 Animal类型，但因为它的值是 Bird ，调用 bird.move(100)时，
            它会调用 Bird 里重写的方法：
    */
