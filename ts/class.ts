//类-----------------
/* 

类(Class)：定义了一件事物的抽象特点，包含它的属性和方法

对象（Object）：类的实例，通过 new 生成

面向对象（OOP）的三大特性：封装、继承、多态

封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。
外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，
同时也保证了外界无法任意更改对象内部的数据

继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性

多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。
比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。
此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，
程序会自动判断出来应该如何执行 eat

存取器（getter & setter）：用以改变属性的读取和赋值行为

修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法

抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。
抽象类中的抽象方法必须在子类中被实现

接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。
一个类只能继承自另一个类，但是可以实现多个接口
*/

//ES7 中有一些关于类的提案，TypeScript 也实现了它们
//ES6 中实例的属性只能通过构造函数中的 this.xxx 来定义，ES7 提案中可以直接在类里面定义
//ES7 提案中，可以使用 static 定义一个静态属性
/* 
TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。
public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
*/
class Animal {
    name = 'Jack';
    static num = 42;
    public age: number;
    private sex: number;
    //只读属性关键字，只允许出现在属性声明或索引签名中
    readonly version: string = '1.0';
    //↓修饰符还可以使用在构造函数参数中，等同于类中定义该属性，使代码更简洁。(public height)
    public constructor(params: { age?: number, sex?: number } = { age: 0, sex: 0 }, public height: number = 60) {
        // ...
        this.age = params.age;
        this.sex = this.sex;
    }
    //当构造函数修饰为 private 时，该类不允许被继承或者实例化
    // private constructor(name) {
    //     this.name = name;
    // }
    //当构造函数修饰为 protected 时，该类只允许被继承
    // protected constructor(name) {
    //     this.name = name;
    // }
}

let jack = new Animal({ age: 3 });
console.log(jack, Animal.num); // Jack
//TypeScript 编译之后的代码中，并没有限制 private 属性在外部的可访问性
// console.log(jack.sex)//Property 'sex' is private and only accessible within class 'Animal'.
//jack.version=10//只读


//使用 private 修饰的属性或方法，在子类中也是不允许访问的
class Cat extends Animal {
    //如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面
    constructor(params, public readonly v: string = '1.0') {
        super(params);
        // console.log(this.sex);//Property 'sex' is private and only accessible within class 'Animal'.
    }
}


//抽象类
//abstract 用于定义抽象类和其中的抽象方法
//抽象类是不允许被实例化
//需要注意的是，即使是抽象方法，TypeScript 的编译结果中，仍然会存在这个类

abstract class Animal1 {
    public name;
    public constructor(name) {
        this.name = name;
    }
    //抽象类中的抽象方法
    public abstract sayHi();
}
// let sam = new Animal1('sam');//Cannot create an instance of an abstract class

//抽象类中的抽象方法必须被子类实现
/* class Dog extends Animal1 {
    public eat() {
        console.log(`${this.name} is eating.`);
    }
// Non-abstract class 'Dog' does not implement inherited abstract member 'sayHi' from class 'Animal1'
} */
class Dog extends Animal1 {
    public sayHi(): string {
        const s = `Meow, My name is ${this.name}`;
        console.log(s);
        return s;
    }
}

let dog = new Dog('sam');
console.log(dog)



//类实现接口-------
/* 
实现（implements）是面向对象中的一个重要概念。
一般来讲，一个类只能继承自另一个类，
有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），
用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性。

举例来说，门是一个类，防盗门是门的子类。
如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法。
这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，
作为一个接口，防盗门和车都去实现它：
*/
interface Alarm {
    alert();
}

//一个类可以实现多个接口
interface Light {
    lightOn();
    lightOff();
}

//接口与接口之间可以是继承关系
//接口能够继承自多个接口
interface run {
    speedUp();
    slowDown();
}

interface LightableAlarm extends Alarm, run {
    lightOn();
    lightOff();
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert');
    }
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}

class Car1 implements LightableAlarm {
    alert() {
        console.log('Car1 alert');
    }
    lightOn() {
        console.log('Car1 light on');
    }
    lightOff() {
        console.log('Car1 light off');
    }
    speedUp() {
        console.log('Car1 speedUp');
    }
    slowDown() {
        console.log('Car1 slowDown');
    }
}
const car1 = new Car1();
console.log(car1.slowDown());

//接口也可以继承类：
interface Point3d extends Animal1 {
    x: number;
    y: number;
    z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3, name: 'Jack', sayHi: () => { } };
console.log(point3d);

//混合类型
//一个函数还可以有自己的属性和方法
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { return start.toString() };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

let aaa:any=c?.interval;