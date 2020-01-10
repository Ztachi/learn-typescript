//布尔值
let isDone: boolean = false;
//---------------------


//数值-------
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
//---------------------


//字符串-------
let myName: string = 'Tom';
//---------------------


//空值-------
//可以用 void 表示没有任何返回值的函数
function alertName(): void {
    alert('My name is Tom');
}
//声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null
let unusable: void = undefined;
//---------------------


//Null 和 Undefined-------
let u: undefined = undefined;
let n: null = null;
//与 void 的区别是，undefined 和 null 是所有类型的子类型
/* let a:string=u;
let a:number=u;
let a:boolean=u; 
...
*/
//---------------------



//任意值-------
/* 
但如果是 any 类型，则允许被赋值为任意类型。
在任意值上访问任何属性都是允许的
也允许调用任何方法
可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值
变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型
*/
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
/* let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
anyThing.myName.setFirstName('Cat'); */
//---------------------



//类型推论-------
/* 
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
//等价于
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;
*/
//如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查
let myFavoriteNumber1;
myFavoriteNumber1 = 'seven';
myFavoriteNumber1 = 7;
//---------------------



//联合类型-------
/* 
联合类型（Union Types）表示取值可以为多种类型中的一种。
*/
let myFavoriteNumber2: string | number | boolean;
myFavoriteNumber2 = 'seven';
myFavoriteNumber2 = 7;
myFavoriteNumber2 = false;
/* //当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，
//我们只能访问此联合类型的所有类型里共有的属性或方法
function getLength(something: string | number): number {
    return something.length;
}
//ength 不是 string 和 number 的共有属性，所以会报错。 */
//---------------------

//数组的类型-------
//最简单的方法是使用「类型 + 方括号」来表示数组
let fibonacci: number[] = [1, 1, 2, 3, 5];
//数组的项中不允许出现其他的类型
// let fibonacci1: number[] = [1, '1', 2, 3, 5];
//数组的一些方法的参数也会根据数组在定义时约定的类型进行限制
let fibonacci2: number[] = [1, 1, 2, 3, 5];
// fibonacci2.push('8');
//我们也可以使用数组泛型（Array Generic） Array<elemType> 来表示数组
let fibonacci3: Array<number> = [1, 1, 2, 3, 5];
//接口也可以用来描述数组：
interface NumberArray {
    [index: number]: number;
}
let fibonacci4: NumberArray = [1, 1, 2, 3, 5];
/* 
虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。
不过有一种情况例外，那就是它常用来表示类数组。
比如 arguments
*/
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
//事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等
function sum1() {
    let args: IArguments = arguments;
}
//用 any 表示数组中允许出现任意类型
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
//---------------------


