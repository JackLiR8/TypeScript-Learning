/*  
    基础类型:
        1. boolean
        2. number
        3. string
        4. 数组 Array
        5. 元组 Tuple
        6. 枚举 enum
        7. Any
        8. Void
        9. Null , undefined
        10. Never
        11. Object
    
    类型断言：
        <string>value
        value as string

 ................................ 基础数据类型 ...................... */
// 1. 布尔值 boolean
let isDone: boolean = true;

// 2. 数字 number
    /* 和JavaScript一样，TypeScript里的所有数字都是浮点数。 这些
    浮点数的类型是 number */
let num: number = 123;

// 3. 字符串
let player: string = 'jack'

/* 4. 数组
     
        TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。 

            第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组;
            第二种方式是使用数组泛型，Array<元素类型>：
 */
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];

/* 5. 元组 Tuple
     
        元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同.
*/
let tuple: [string, number];
tuple = ['hello', 1];
// tuple = [1,'hello']  报错 
console.log(tuple[0].charAt(1))     // e

// tuple[1].subStr;         // 报错  数字没有 subStr 方法
// console.log(tuple[2].toString())     // 报错 tuple 没有元素处于 [2] 的位置
// tuple[2] = 'world'   报错 不能将 'world' 类型分配给 undefined

/* 6. 枚举 enum
     
        默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。
*/

enum Color {blue, yellow, red}

let c: Color = Color.red
console.log(c)      // 2

    /* 
        枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，
        但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：
    */

let colorName: string = Color[2]
console.log(colorName)  // red

/* 
    7. Any
        使用 any类型来标记还不清楚类型的变量
        any类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。

        let notSure: string;
        notSure = 4       // 报错
*/
let notSure: any;
notSure = 4;
notSure = 'haha';
notSure = true;

// 当你只知道一部分数据的类型时，any类型也是有用的。 
let list: any[] = [1, true, 'free']

list[1] = 100;
list[2] = true;
console.log(list)      // [1, 100, true]

/* 
    8. Void 
        void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，
        你通常会见到其返回值类型是 void：

        声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
*/

function warnUser() : void {
    console.log('warning');
}

/* 
    9. Null 和 Undefined
        undefined和null两者各自有自己的类型分别叫做undefined和null。 
        和 void相似，它们的本身的类型用处不是很大：

        默认情况下null和undefined是所有类型的子类型。

        然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。
*/

/* 
    10. Never
        1.  never类型表示的是那些永不存在的值的类型。 变量也可能是 never类型，当它们被永不
            为真的类型保护所约束时。

        2.  never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型
            或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never
*/

// 返回never的函数必须存在无法达到的终点
    function error(message: string): never {
        throw new Error(message)
    }

/* 
    11. Object

        1.  object表示非原始类型，也就是除number，string，boolean，symbol，null或
            undefined之外的类型

            使用object类型，就可以更好的表示像Object.create这样的API
*/

function create(o: object | null): void {

};

create({prop: 0})
create(null)

// create()         都报错
// create(42)
// create('string')
// create(false)
// create(undefined)


/* ............................... 类型断言 ..................................... 

        类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 
        它没有运行时的影响，只是在编译阶段起作用。
*/

// 类型断言有两种形式。 其一是“尖括号”语法：
let someValue: any = 'hello, ts'

let strLength: number = (<string>someValue).length;
console.log(strLength)

// 另一个为as语法, 当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。
let strLength2: number = (someValue as string).length;
console.log(strLength2)
