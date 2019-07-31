/* 
    1. 函数类型
    2. 可选参数和默认参数
    3. 剩余参数
    .............................. 函数类型 .......................................

    ........ 1. 为函数定义类型

        我们可以给每个参数添加类型之后再为函数本身添加返回值类型。 TypeScript能够根据返回语句
    自动推断出返回值类型，因此我们通常省略它。
*/
    function add(x: number, y: number): number {
        return x + y
    }

//  ......... 2. 完整的函数类型
    const myAdd: (x: number, y: number) => number = function(x: number, y: number): number {return x + y}

    /*  函数类型包含两部分：参数类型和返回值类型。当写出完整函数类型的时候，这两部分都是需要的。

        我们以参数列表的形式写出参数类型，为每个参数指定一个名字和类型。 这个名字只是为了增加可
    读性。只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。 我们也可
    以这么写： */
    const myAdd1: (basevalue: number, increment: number) => number = function(x: number, y: number): number {return x + y }

    /*  第二部分是返回值类型。 对于返回值，我们在函数和返回值类型之前使用( =>)符号。返回值类型
    是函数类型的必要部分，如果函数没有返回任何值，你也必须指定返回值类型为 void而不能留空。 */

// .......... 3. 推断类型 Inferring the types 

    /* 你会发现如果你在赋值语句的一边指定了类型但是另一边没有类型的话，
    TypeScript编译器会自动识别出类型.这叫做“按上下文归类”，是类型
    推论的一种。 它帮助我们更好地为程序指定类型。*/

    const predict: (x: number, y: number) => number = function(x: number, y: number) {return x + y}

/* ......................................... 可选参数和默认参数  ........................................
    Optional and Default Parameters 

    可选参数必须放在必须参数后面
*/
    function buildName(firstName: string, lastName?: string) {
        console.log(firstName +　' ' +  lastName)  
    }

    buildName('Kobe')
    buildName('Kobe','Bryant')

    /*  默认参数 
            如果带默认值的参数出现在最后，调用函数的时候可以省略
            如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值。
    */
    function buildNa(firstName: string, lastName = 'Curry', team: string) {
        console.log(`${firstName} ${lastName} ${team}`) 
    }

    // buildNa('Stephen', 'Warroir')  //  error:
    buildNa('Stephen', undefined, 'Warroir')  // Stephen Curry 

/* ..................................... 剩余参数 Rest Parameters ...................................
    
    在TypeScript里，你可以把所有参数收集到一个变量里：...restOfName: string[]
*/
    function join(base: string, ...rest: string[]) {
        console.log(`${base} ${rest.join(' ')}`) 
    }

    join('one') // one 
    join('one', 'two', 'three')     // one two three