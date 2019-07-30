/* ............................  继承接口 Extending Interfaces ........................... 

    和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，
    可以更灵活地将接口分割到可重用的模块里。    
*/
    interface Shape {
        color: string;
    }

    interface Square extends Shape {
        sideLength: number;
    }

    let square = {} as Square;
    square.color = 'blue';
    square.sideLength = 10;

    // 一个接口可以继承多个接口，创建出多个接口的合成接口。
    interface PenStroke {
        penWidth:　number;
    }

    interface Square1 extends Shape, PenStroke {
        sideLength: number;
    }

    let s = {} as Square1;
    s.color = 'pink';
    s.sideLength = 10;
    s.penWidth = 5.0;

/* ................................... 混合类型 Hybrid Types ....................................

    接口能够描述JavaScript里丰富的类型。 因为JavaScript其动态灵活的特点，有时你会希望
    一个对象可以同时具有上面提到的多种类型。

    一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性。
*/
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = (function (start: number) { }) as Counter;
    counter.interval = 123;
    counter.reset = function () { };
    return counter
}

let c1 = getCounter();
c1(10);
c1.reset();
c1.interval = 5.0

/* ......................................... 接口继承类 interfaces extending classes .............................

        当接口继承了一个类类型时，它会继承类的成员但不包括其实现( 在不 extends 类的情况下无法
    implements 这个接口)。 接口同样会继承到类的private和protected成员。 这意味着当你创建了一
    个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

*/
class Control {
    private state: any;
}

interface SelectabelControl extends Control {
    select(): void;
}

class Button extends Control implements SelectabelControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

class Location1 {

}

/*      Error: Property 'state' is missing in type 'Image'.

    class Image1 implements SelectabelControl {
        private state: any;
        select() { }
    }

        在上面的例子里，SelectableControl包含了Control的所有成员，包括私有成员state。
    因为 state是私有成员，所以只能够是Control的子类们才能实现SelectableControl接口。
    因为只有 Control的子类才能够拥有一个声明于Control的私有成员state，这对私有成员的兼
    容性是必需的

        在Control类内部，是允许通过 SelectableControl 的实例来访问私有成员state的。 实际上，
    SelectableControl 接口和拥有 select 方法的 Control 类是一样的。 Button 和 TextBox 类是
    SelectableControl 的子类（因为它们都继承自Control并有select方法），但Image和Location类
    并不是这样的。
*/