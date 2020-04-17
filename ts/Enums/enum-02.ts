/**
 * @file 枚举
 * 
 * 1. 联合枚举与枚举成员的类型
 * 2. 运行时的枚举
 * 3. 外部枚举 Ambient enums 
 */

/* 
    ================= 联合枚举与枚举成员的类型 ====================

    存在一种特殊的非计算的常量枚举成员的子集：字面量枚举成员。

    字面量枚举成员是指不带有初始值的常量枚举成员，或者是值被初始化为:
        + 任何字符串字面量（例如： "foo"， "bar"， "baz"）
        + 任何数字字面量（例如： 1, 100）
        + 应用了一元 -符号的数字字面量（例如： -1, -100）

    当所有的枚举成员都拥有字面量枚举值时：
        1. 枚举成员成了类型
        2. 枚举类型本身变成了每个枚举成员的 联合。
*/
    // 枚举成员当做类型
        enum ShapeKind {
            Circle,
            Square,
        }

        interface Circle {
            kind: ShapeKind.Circle;
            radius: number;
        }

        interface Square {
            kind: ShapeKind.Square;
            sideLength: number;
        }

        const c2: Circle = {
            // kind: ShapeKind.Square,   / error: 不能把ShapeKind.Square类型分配给ShapeKind.Circle
            kind: ShapeKind.Circle,
            radius: 100,
        }

    /*  枚举类型本身变成了每个枚举成员的 联合
        通过联合枚举，类型系统可以知道枚举里的值的集合。 因此，TypeScript能够
        捕获在比较值的时候犯的愚蠢的错误. 例： */
        enum E3 {
            Foo,
            Bar,
        }

        /* function f(x: E3) {
            if (x !== E3.Foo || x !== E3.Bar ) {
                // error: always true

            }
        } */

/* ======================== 运行时的枚举 ===========================

    枚举是在运行时真正存在的对象。

    ............ 反向映射
        除了创建一个以属性名做为对象成员的对象之外，数字枚举成员还具有了 反向映射，从枚举值到枚举名字。

        枚举类型被编译成一个对象，它包含了正向映射（ name -> value）和反向映射（ value -> name）。
        引用枚举成员总会生成为对属性访问并且永远也不会内联代码。
        
        注意：字符串枚举成员没有反向映射。*/

        enum Enum {
            A
        }

        const Ea = Enum.A;
        const nameOfEa = Enum[Ea]
        console.log(nameOfEa)       // A

    /* ........... 常量枚举 const enums
            常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。
        常量枚举成员在使用的地方会被内联进来。 之所以可以这么做是因为，常量枚举不允许包含
        计算成员。  */

        const enum Enum1 {
            A = 1,
            B = A * 2,
        }

/* ========================= 外部枚举 Ambient enums =========================

        外部枚举用来描述已经存在的 枚举类型的形状。 */

        declare enum Enum2 {
            A = 1,
            B,
            C = 2
        }

        /* 外部枚举和非外部枚举之间有一个重要的区别，在正常的枚举里，
        没有初始化方法的成员被当成常数成员。对于非常数的外部枚举而言，
        没有初始化方法时被当做需要经过计算的。 */