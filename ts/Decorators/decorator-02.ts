/**
 * @file Decorators
 * 
 * 1. Property Decorators
 */
import "reflect-metadata";

// ================= Property Decorators ===================
/* 
  属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：
    1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    2. 成员的名字。

    注意  
    属性描述符不会做为参数传入属性装饰器，这与TypeScript是如何初始化属性
    装饰器的有关。 因为目前没有办法在定义一个原型对象的成员时描述一个实例
    属性，并且没办法监视或修改一个属性的初始化方法。返回值也会被忽略。因此，
    属性描述符只能用来监视类中是否声明了某个名字的属性。
*/

class Gt1 {
  @format('Hello, %s')
  greeting: string

  constructor(msg: string) {
    this.greeting = msg
  }

  greet() {
    let formatString = getFormat(this, "greeting");
    return formatString.replace("%s", this.greeting);
  }
}

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

// ==================== Parameter Decorators =======================


// ==================== MetaData ============================