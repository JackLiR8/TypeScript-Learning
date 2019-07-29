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

    

*/