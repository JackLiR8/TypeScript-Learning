/*  接口：
        1. 函数属性
        2. 可索引的类型
        3. 类类型
    
    .............................. 函数属性 ..................................

    除了描述带有属性的普通对象外，接口也可以描述函数类型。

    为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表
    和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
*/
interface SearchFunc {
    (source: string, subString: string): boolean;
}

// 下例创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。
let mySearch: SearchFunc;
mySearch = function(source: string, subString:string) {
    let result = source.search(subString);
    return result > -1;
}

/* 
    函数的参数名不需要与接口里定义的名字相匹配.
    函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。
*/
mySearch = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
}

/* ...................................... 可索引的类型 ................................

        可以描述那些能够“通过索引得到”的类型，比如a[10]或ageMap["daniel"]。可索引类型具有
        一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。 
*/
interface StringArray {
    [index: number]: string;
}

let ma: StringArray;
ma = ['hello', 'world'];

let myStr: string = ma[0];
console.log(myStr)          // hello

/*      TypeScript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，
        但是数字索引的返回值必须是字符串索引返回值类型的子类型。这是因为当使用 
        number来索引时，JavaScript会将它转换成string然后再去索引对象。 也就是
        说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此
        两者需要保持一致。 

        字符串索引签名能够很好的描述dictionary模式，并且它们也会确保所有属性与
        其返回值类型相匹配。 因为字符串索引声明了 obj.property和obj["property"]
        两种形式都可以。 下面的例子里， name的类型与字符串索引类型不匹配，所以类型
        检查器给出一个错误提示：
*/
interface NumberDictionary {
    [index: string]: number;
    length: number;
    // name: string;    // Error    name 的类型是 string, 与索引返回的类型不匹配
}

// 你可以将索引签名设置为只读，这样就防止了给索引赋值：
interface ReadonlyStringArray {
    readonly [index: number]: string
}
let ma1: ReadonlyStringArray = ['hello','TS']
// ma1[2] = 'Good'      // error

/* ............................ 类类型 ....................................

    实现接口
        TypeScript也能够用接口来明确的强制一个类去符合某种契约

        */
            interface ClockInterface1 {
                currentTime: Date;
                setTime(d: Date): void;
            }
    
            class Clock implements ClockInterface1 {
                currentTime: Date = new Date();
                setTime(d: Date) {
                    this.currentTime = d;
                }
                constructor(h: number, m: number) { }
            }

/*        接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类
        是否具有某些私有成员。


    类静态部分与实例部分的区别

          类具有两个类型：静态部分的类型和实例的类型。 你会注意到，当你用构造器签名去定义
        一个接口并试图定义一个类去实现这个接口时会得到一个错误。*/
        interface Demo {
            new (hour: number, minute: number);
        }

        /* 
            class DemoClass implements Demo {
                constructor(hour: number, minute: number) {

                }
            } 
        */

    /* 这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的
    静态部分，所以不在检查的范围内。因此，我们应该直接操作类的静态部分。*/
        interface ClockConstructor {
            new (hour: number, minute: number): ClockInterface;
        }
        interface ClockInterface {
            tick():void;
        }

        function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
            return new ctor(hour,minute);
        }

        class DigitalClock implements ClockInterface {
            constructor(h: number, m: number) {}
            tick() {
                console.log('beep beep')
            }
        }
        class AnalogClock implements ClockInterface {
            constructor(h: number, m: number) { };
            tick() {
                console.log('tick tick')
            }
        }

        let digital = createClock(DigitalClock, 12, 17);
        let analog = createClock(AnalogClock, 7, 32);
        digital.tick();
        analog.tick();


