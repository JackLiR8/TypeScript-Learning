/* 
    类：
        Public, private, and protected modifiers
        Readonly modifier

................................. Public, private, and protected modifiers ...............................
    公共、私有、受保护 修饰符

    默认为public 
*/

// ............. private 
// 成员被标记成 private时，它就只能在类的内部访问

class Modif {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    getName () {
        return this.name;
    }
}

const m = new Modif('Kobe')
// m.name   Error: 
console.log(m.getName())        // Kobe

/* 
        TypeScript使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，
    如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。

        当我们比较带有 private或 protected成员的类型的时候，情况就不同了。 如果其中一个类型里
    包含一个 private成员，那么只有当另外一个类型中也存在这样一个 private成员， 并且它们都是来自
    同一处声明时，我们才认为这两个类型是兼容的。 对于 protected成员也使用这个规则。
*/

class Animal1 {
    private name: string;
    constructor(theName: string) {
        this.name = theName;
    }
}

class Rhino extends Animal1 {
    constructor() { super('Rhino'); }
}

class Employee {
    private name: string;
    constructor(theName: string) {
        this.name = theName;
    }
}

let animal = new Animal1('Goat');
let rhino = new Rhino();
let employee = new Employee('Bob');
 
animal = rhino;
// animal = employee;   // 错误: Animal 与 Employee 不兼容. (Animal ，Employee 无private,protected 时不报错)   

/* .............. protected

protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问。

*/
class Person {
    protected name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Employee1 extends Person {
    private department: string;
    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }
    public getElevatorPitch() {
        return `Hello, I'm ${this.name}. I work in ${this.department}`
    }
}

const howard = new Employee1('Howard', 'Sales');
console.log(howard.getElevatorPitch());
// console.log(howard.name)     // Error: name 受保护，只能在Person 及其子类中访问

/* 
    构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。
*/
class Person1 {
    protected name: string;
    protected constructor(theName: string) {
        this.name = theName;
    }
}

class Employee2 extends Person1 {
    private department: string;
    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }
}

const Stephen = new Employee2('Stephen', 'Sales');
// const John = new Person1('John')     // error: Person的构造函数是受保护的，即可在类声明中访问

/* ........................................... readonly ................................

    readonly关键字将属性设置为只读的。只读属性必须在声明时或构造函数里被初始化。
*/
    class RO {
        readonly name: string;
        constructor(theName: string){
            this.name = theName;
        }
    }

    const ro1 = new RO('puma')
    console.log(ro1.name)       // puma
    // ro1.name = 'wolf'      // error: name is read-only

    /* 
        参数属性
                在上面的例子中，我们必须在Octopus类里定义一个只读成员 name和一个参数为 theName的构造
            函数，并且立刻将 theName的值赋给 name。 参数属性可以方便地让我们在一个地方定义并初始化
            一个成员.下例使用参数属性：

                仅在构造函数里使用 readonly name: string参数来创建和初始化 name成员。
            把声明和赋值合并至一处。

                参数属性通过给构造函数参数前面添加一个访问限定符来声明。 使用 private限定一个参数
            属性会声明并初始化一个私有成员；对于 public和 protected来说也是一样。
    */
    class RO2 {
        constructor(readonly name: string){
            // ...
        }
    }

    const ro2 = new RO2('ostrich')