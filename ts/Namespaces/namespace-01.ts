/* ................... 命名空间 ................................

    为了方便管理，可以把一个命名空间分配到多个文件里

    当涉及到多文件时，我们必须确保所有编译后的代码都被加载了。
    有两种方式：
        1. 把所有的输入文件编译为一个输出文件，需要使用--outFile标记：
            tsc --outFile sample.js Test.ts

        2. 编译每一个文件（默认方式），那么每个源文件都会对应生成一个JavaScript文件。 
           然后，在页面上通过 <script>标签把所有生成的JavaScript文件按正确的顺序引进来

    ................................... 别名 Aliases .................................... 

        另一种简化命名空间操作的方法是使用import q = x.y.z给常用的对象起一个短的名字。你可以用这种
    方法为任意标识符创建别名，也包括导入的模块中的对象。   */
    namespace Shapes {
        export namespace Polygons {
            export class Triangle { };
            export class Square { };
        }
    }

    import polygons = Shapes.Polygons;
    let sq = new polygons.Square();

/* .................................... 使用其它的 JavaScript库 .............................

        为了描述不是用TypeScript编写的类库的类型，我们需要声明类库导出的API。由于大部分程序库只提供
    少数的顶级对象，命名空间是用来表示它们的一个好办法。

        我们称其为声明是因为它不是外部程序的具体实现。 我们通常在 .d.ts里写这些声明。

    ...... 外部命名空间

        流行的程序库D3在全局对象d3里定义它的功能。 因为这个库通过一个 <script>标签加载
    （不是通过模块加载器），它的声明文件使用内部模块来定义它的类型。 为了让TypeScript编
    译器识别它的类型，我们使用外部命名空间声明。 

    // D3.d.ts
    declare namespace D3 {
        export interface Selectors {
            select: {
                (selector: string): Selection;
                (element: EventTarget): Selection;
            };
        }

        export interface Event {
            x: number;
            y: number;
        }

        export interface Base extends Selectors {
            event: Event;
        }
    }

    declare var d3: D3.Base;
*/

