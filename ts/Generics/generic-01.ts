/* 
    1. 泛型变量
    2. 泛型类型（泛型接口）
    3. 泛型类
    4. 泛型约束 Generic Constraints 
    ....................................... 泛型 Generics ...............................................
*/
    function identity<T>(arg:T): T {
        return arg
    }

    identity<string>('hello')

/* ............ 泛型变量

    上例中，如果我们想要打印出arg的长度
        function identity<T>(arg:T): T {
            const l = arg.length    // error: 泛型 T 上不存在length属性
            return arg
        }

    这些类型变量代表的是任意类型，所以使用这个函数的人可能传入的是个数字，而数字是没有 .length属性的

        我们想操作T类型的数组而不直接是T。由于我们操作的是数组，所以.length属性是应该存在的。
    我们可以像创建其它数组一样创建这个数组：  */

    function loggingIdentity<T>(arg: T[]): T[] {
        console.log(arg.length);
        return arg;
    }

    /* 泛型函数loggingIdentity，接收类型参数T和参数arg，它是个元素类型是T的数组，并返回元素类型是
    T的数组。 这可以让我们把泛型变量T当做类型的一部分使用，而不是整个类型，增加了灵活性 */

/* ........... 泛型类型

    泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样：

    我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。  */
    function iden<T>(arg: T): T {
        return arg
    }
    
    const myIden1: <U>(arg: U) => U = iden

    // 我们还可以使用带有调用签名的对象字面量来定义泛型函数：
    const myIden2: {<T>(arg: T): T} = iden

    // 我们把上面例子里的对象字面量拿出来做为一个接口：
    interface GenericIden {
        <T>(arg: T): T;
    }

    let myIden3: GenericIden = iden

    /*  一个相似的例子，我们可能想把泛型参数当作整个接口的一个参数。 这样我们就能清楚的知道
    使用的具体是哪个泛型类型（比如： Dictionary<string>而不只是Dictionary）。 这样接口里
    的其它成员也能知道这个参数的类型了。 */

    interface GenericIdent<T> {
        (arg: T): T;
    }

    let myIden4: GenericIdent<number> = iden;
    iden<string>('hah')
    myIden4(1)

    /*  不再描述泛型函数, 而是把非泛型函数签名作为泛型类型的一部分。  当我们使用 GenericIdent
     的时候，还得传入一个类型参数来指定泛型类型（这里是：number），锁定了之后代码里使用的类型。
     
     注意，无法创建泛型枚举和泛型命名空间。*/

/* ................................... 泛型类 Generic Classes ................................... 

    泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。
*/ 
    class GenericNumber<T> {
        value: T ;
        add: (x: T, y: T) => T
    }

    const myGeneNum = new GenericNumber<number>();
    myGeneNum.value = 2;
    myGeneNum.add = function(x, y) {return x + y}
    console.log(myGeneNum.add(3,4))

    /*  与接口一样，直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型。

        类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。 */

/*  ....................................... 泛型约束 ..............................................
    Generic Constraints  
        对泛型进行条件约束   
*/
    interface Lengthwise {
        length: number;
    }

    function len<T extends Lengthwise>(arg: T): T {
        console.log(arg.length)
        return arg
    }

    // len(1)  error 
    len('hello')    // 5
    len([1,2,3])    // 3

/* .............. 泛型类型中使用类型参数

        你可以声明一个类型参数，且它被另一个类型参数所约束。 比如，现在我们想要用属性名从对象里获取这个属性。
    并且我们想要确保这个属性存在于对象 obj上，因此我们需要在这两个类型之间使用约束。   */

    function getProperty<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];
    }

    let x = {a: 1, b: 2, c: 3, d: 4 }

    getProperty(x, 'a')
    // getProperty(x, 'm')  // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'

/* .................... 在泛型里使用类类型

       在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型 ：   */
       function create1<T>(c: {new(): T; }): T {
           return new c();
       }

       // 一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系。
       
       class BeeKeeper {
            hasMask: boolean;
        }
        
        class ZooKeeper {
            nametag: string;
        }
        
        class life {
            numLegs: number;
        }
        
        class Bee extends life {
            keeper: BeeKeeper;
        }
        
        class Lion extends life {
            keeper: ZooKeeper;
        }
        
        function createInstance<A extends life>(c: new () => A): A {
            return new c();
        }
        
        createInstance(Lion).keeper.nametag;  // typechecks!
        createInstance(Bee).keeper.hasMask;   // typechecks!