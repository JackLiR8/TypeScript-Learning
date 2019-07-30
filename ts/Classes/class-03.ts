/* 
    1. 存储器 Accessors
    2. 静态属性 Static Properties
    3. 抽象类   Abstract Classes

.................................... 存储器 Accessors .........................................

    TypeScript支持通过getters/setters来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。
*/
    const nameMaxlength = 10 

    class User {
        private _fullName: string = '';
        get fullName(): string {
            return this._fullName
        }
        set fullName(newName: string) {
            if (newName && newName.length　> nameMaxlength) {
                throw new Error(`fullName has a max length of ${nameMaxlength}`)
            }

            this._fullName = newName;
        }
    }

    let user = new User();
    user.fullName = 'jack';
    // user.fullName = 'JackLeeStephens'  // Error: fullName has a max length of 10

    /* 
        存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。
        其次，只带有 get不带有 set的存取器自动被推断为 readonly。
    */

/* .............................................. 静态属性 Static Properties  .......................................

        使用static 定义的属性只能通过类本身访问，实例访问不到。 与ES6 类似

    ............................................ 抽象类 Abstract Classes ............................................

            抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。
        abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。

            抽象类中的 抽象方法 不包含具体实现并且必须在派生类中实现。 !!!
            抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含
        abstract关键字并且可以包含访问修饰符。
*/
(() => {
    abstract class Department {
        constructor(public name: string) { }
        printName():void {
            console.log(`Department name: ${this.name}`)
        }
        abstract printMeeting(): void;
    }

    class AccountingDepartment extends Department {
        constructor() {
            super("Accounting and Auditing"); // constructors in derived classes must call super()
        }
        
        printMeeting(): void {
            console.log('The Accounting Department meets each Monday at 10am.');
        }
    
        generateReports(): void {
            console.log('Generating accounting reports...');
        }
    }

    let department: Department; // 允许创建一个对抽象类型的引用
    // department = new Department()   error: 无法创建抽象类实例
    department = new AccountingDepartment() // 允许对一个抽象子类进行实例化和赋值;
    department.printMeeting();
    department.printName();
    // department.generateReports()        // // 错误: 类型 Department 上不存在 generateReports 属性

})()