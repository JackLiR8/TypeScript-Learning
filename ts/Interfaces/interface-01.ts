/* 
    接口：
        1. 用途
        2. 可选属性
        3. 只读属性
        4. 额外属性检查
.................................. 接口 ...............................
 
    TypeScript的核心原则之一是对值所具有的结构进行类型检查.在TypeScript里，接口的作用就
    是为这些类型命名和为你的代码或第三方代码定义契约。
*/

interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label)
}

let myObj = {size: 10, label: 'size 10 object'}
printLabel(myObj)

/* 
        LabelledValue接口就好比一个名字，用来描述上面例子里的要求。 
    它代表了有一个 label属性且类型为string的对象。

    1.  我们只会去关注值的外形。只要传入的对象满足上面提到的必要条件，那么它就是被允许的。
    2.  还有一点值得提的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并
        且类型也是对的就可以
*/
/* 
    ............................ 可选属性 ....................................

        接口里的属性不全都是必需的。有些是只在某些条件下存在，或者根本不存在。 可选属性在
    应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。

        可选属性的好处之一是可以对可能存在的属性进行预定义;
        好处之二是可以捕获引用了不存在的属性时的错误。
*/

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: 'white', area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width
    }
    return newSquare
}
  
let s1 = createSquare({color: "black"});
let s2 = createSquare({width: 20});
console.log(s1, s2)

/* 
    ............................. 只读属性 ..........................

        一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 
        readonly来指定只读属性:
*/

interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = {x: 10, y: 20};
// p1.x = 5    Error 

    /* 
        TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，
        因此可以确保数组创建后再也不能被修改：
    */

let a: number[] = [1, 2, 3];
let ro: ReadonlyArray<number> = a;

// ro[0] = 12;       error!
// ro.push(5);       error!
// ro.length = 100;     error!
// a = ro;              error!

    /* 可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 
        但是你可以用类型断言重写：  */
    a = ro as number[]

/* ............................... 额外的属性检查 .................................

    createSquare({color: 'blue', opacity:0.5}) 上面的例子中， 如果一个对象字面量
    存在任何“目标类型”不包含的属性时，你会得到一个错误。
    绕开这些检查的方法如下：
*/
// 1. 类型断言
let s3 = createSquare({width: 10, opacity: 0.5} as SquareConfig)

/* 2.   最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有
        某些做为特殊用途使用的额外属性。

        如果 SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它： */
interface SquareConf {
    width?: number;
    color?: string;
    [propName: string]: any;
}
function createSquare1(config: SquareConf) : {square: number; color: string} {
    let newSquare = {color:'blue', square:100}
    // ...
    return newSquare
}

let s4 = createSquare1({width: 10, opacity: 0.5})

// 3. 将这个对象赋值给一个另一个变量： 因为 squareOptions不会经过额外属性检查，
//    所以编译器不会报错。
let squareOptions = {width: 10, opacity: 0.5}
let s5 = createSquare(squareOptions)