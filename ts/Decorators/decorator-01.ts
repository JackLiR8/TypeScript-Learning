/**
 * @file Decorators
 */

// ================= Class Decorators ===================
/*  1. 类修饰符紧靠在类的前面声明，作用于类的constructor。
    2. 类装饰器表达式会在运行时当作函数被调用，类的constructor会作为唯一参数 */

// 例1
function sealed(constructor: Function) {
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}

@sealed
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }

  greet() {
    return `Hello, ${this.greeting}`
  }
}

let g = new Greeter('World!')
console.log(g.greet())
delete g.greeting
console.log(g.greet())

// 例2
function classDecorator<T extends {new(...args:any[]) : {}}>(constructor:T) {
  return class extends constructor {
    newProperty = 'new property'
    hello = 'override'
  }
}

@classDecorator
class Greeter2 {
  property = "property"
  hello: string
  constructor(m: string) {
    this.hello = m
  }
}

console.dir(new Greeter2('World'))
// {property: "property", hello: "override", newProperty: "new property"}

// ==================== Method Decorators =======================
/* 
  Methods Decorators 会在运行时被当做函数调用，有三个参数：
    1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    2. 成员的名字。
    3. 成员的属性描述符。

  如果方法装饰器返回一个值，它会被当做该方法的属性描述符
*/

// 例1
class G3 {
  greeting: string
  constructor(msg: string) {
    this.greeting = msg
  }

  @enumerable(false)
  greet() {
    return `Method Decorator: Hello, ${this.greeting}`
  }
}

function enumerable(value) {
  return function(
    traget: any, 
    propertyKey: string, 
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value
  }
}

let g3 = new G3('Decorators')
for (const key in g3) {
  console.log('key:', key)  // greeting
}
