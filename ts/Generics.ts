//泛型
//泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

let arr = createArray(3, 'x');
arr.push(1);
console.log(arr);// ['x', 'x', 'x']

//Array<any> 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 value 的类型
//在调用的时候，可以指定它具体的类型为 string
//也可以不手动指定，而让类型推论自动推算出来
function createArray1<sss>(length: number, value: sss): Array<sss> {
    let result: sss[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
let arr1 = createArray1<string>(3, 'x');
// arr1.push(1);//Argument of type '1' is not assignable to parameter of type 'string'

//定义泛型的时候，可以一次定义多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

console.log(swap([7, 'seven']));

//泛型约束
//在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法

//Property 'length' does not exist on type 'T'
// function loggingIdentity<T>(arg: T): T {
//     console.log(arg.length);
//     return arg;
// }

//上例中，泛型 T 不一定包含属性 length，所以编译的时候报错了
//这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 length 属性的变量。这就是泛型约束
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
//此时如果调用 loggingIdentity 的时候，传入的 arg 不包含 length，那么在编译阶段就会报错了
// loggingIdentity(1)//Argument of type '1' is not assignable to parameter of type 'Lengthwise'
loggingIdentity('');

//多个类型参数之间也可以互相约束：
//要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}

//可以使用含有泛型的接口来定义函数的形状
interface CreateArrayFunc2 {
    <T>(length: number, value: T): Array<T>;
}

let createArray2: CreateArrayFunc2;
createArray2 = function <T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
// console.log(createArray2<string>(4, 4));//Argument of type '4' is not assignable to parameter of type 'string'
console.log(createArray2(4, 2));

//可以把泛型参数提前到接口名上
//此时在使用泛型接口的时候，需要定义泛型的类型
interface CreateArrayFunc3<T> {
    (length: number, value: T): Array<T>;
}
let createArray3: CreateArrayFunc3<number>;
createArray3 = function <T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
// console.log(createArray2(4, 'x'));//Argument of type '"x"' is not assignable to parameter of type 'number'
console.log(createArray3(4, 3));//Argument of type '"x"' is not assignable to parameter of type 'number'


//泛型也可以用于类的类型定义中
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
// myGenericNumber.zeroValue = '1';//Type '"1"' is not assignable to type 'number'
myGenericNumber.zeroValue = 1;
myGenericNumber.add = function (x, y) { return x + y; };

//泛型参数的默认类型
/* 
我们可以为泛型中的类型参数指定默认类型。
当使用泛型时没有在代码中直接指定类型参数，
从实际值参数中也无法推测出时，这个默认类型就会起作用
*/
function createArray4<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}