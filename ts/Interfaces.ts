//---------接口----------

/* 
在面向对象语言中，接口（Interfaces）是一个很重要的概念，
它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。
TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，
也常用于对「对象的形状（Shape）」进行描述。
*/
interface Person1 {
    name: string;
    age: number;
}

let tom: Person1 = {
    name: 'Tom',
    age: 25
};
/* 
上面的例子中，我们定义了一个接口 Person，接着定义了一个变量 tom，它的类型是 Person。
这样，我们就约束了 tom 的形状必须和接口 Person 一致。
接口一般首字母大写。
*/
//定义的变量比接口少了一些属性是不允许的
//多一些属性也是不允许的
//可见，赋值的时候，变量的形状必须和接口的形状保持一致
//---------------------

//可选属性
/* 
有时我们希望不要完全匹配一个形状，那么可以用可选属性
可选属性的含义是该属性可以不存在。
*/
interface Person3 {
    name: string;
    age?: number;
}

let tom1: Person3 = {
    name: 'Tom'
};
//这时仍然不允许添加未定义的属性
//---------------------

//任意属性
/* 
有时候我们希望一个接口允许有任意的属性，可以使用如下方式
一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
*/
interface Person4 {
    name: string;
    age?: number;
    // [propName: string]: string; 
    /*  任意属性的值允许是 string，
    但是可选属性 age 的值却是 number，number 不是 string 的子属性，
    所以报错*/
    [propName: string]: string | number;
}

let tom2: Person4 = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
//---------------------

//只读属性
/* 
有时候我们希望对象中的一些字段只能在创建的时候被赋值，
那么可以用 readonly 定义只读属性
*/
interface Person5 {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom3: Person5 = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

// tom3.id = 9527;
//只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候:
interface Person6 {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

// let tom6: Person6 = {
//     name: 'Tom',
//     gender: 'male'
// };

// tom6.id = 89757;
