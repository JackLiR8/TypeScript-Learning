/* 
    .......导出声明:
        任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加export关键字来导出。

    ....... 导出重命名
        export { A as B}

    ....... 重新导出
        我们经常会去扩展其它模块，并且只导出那个模块的部分内容。 
        重新导出功能并不会在当前模块导入那个模块或定义一个新的局部变量。
        
            export class ParseIntBasedZipCodeValidator {
                isAcceptable(s: string) {
                    return s.length === 5 && parseInt(s).toString() === s;
                }
            }

            // 导出原先的验证器但做了重命名
            export {ZipCodeValidator as RegExpBasedZipCodeValidator} from "./ZipCodeValidator";

        或者一个模块可以包裹多个模块，并把他们导出的内容联合在一起通过语法：export * from "module"。
*/

/* ................export = 和 import = require() .........................

        为了支持CommonJS和AMD的exports, TypeScript提供了export =语法

        export =语法定义一个模块的导出对象。 这里的对象一词指的是类，接口，命名空间，函数或枚举。

            若使用export =导出一个模块，则必须使用TypeScript的特定语法 import module = require("module")
        来导入此模块。
*/