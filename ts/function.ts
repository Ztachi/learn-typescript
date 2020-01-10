//函数的类型
/* 
一个函数有输入和输出，要在 TypeScript 中对其进行约束，
需要把输入和输出都考虑到，其中函数声明的类型定义较简单：
*/

function sum2(x: number, y: number): number {
    return x + y;
}

//输入多余的（或者少于要求的）参数，是不被允许的
// sum2(1, 2, 3);
// sum2(1);

//写一个对函数表达式（Function Expression）的定义，可能会写成这样
let mySum = function (x: number, y: number): number {
    return x + y;
};
/* 这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，
而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的。
如果需要我们手动给 mySum 添加类型，则应该是这样： */
let mySum1: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
//自己拓展
let mySum2: (x: number, y?: number | string) => any = function (x, y: string = '2') {
    return x + y + '%';
};
console.log(mySum1(1, 2));
console.log(mySum2(1));

//我们也可以使用接口的方式来定义一个函数需要符合的形状
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    return source.search(subString) !== -1;
}

//可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了
/* function buildName(firstName?: string, lastName: string) {
    if (firstName) {
        return firstName + ' ' + lastName;
    } else {
        return lastName;
    }
}
 */

/* 
TypeScript 会将添加了默认值的参数识别为可选参数
此时就不受「可选参数必须接在必需参数后面」的限制了
*/
function buildName1(firstName: string = 'a', lastName: string) {
    return firstName + ' ' + lastName;
}
console.log(buildName1(undefined, 'cat'));

//剩余参数
//用数组的类型来定义它
function push(array: any[], ...items: any[]) {
    items.forEach(function (item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);

//重载允许一个函数接受不同数量或类型的参数时，作出不同的处理
/* 
输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串
我们可以使用重载定义多个 reverse 的函数类型
*/
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
console.log(reverse(1234), reverse('abcd'));
/*
我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。
在编辑器的代码提示中，可以正确的看到前两个提示。
TypeScript 会优先从最前面的函数定义开始匹配，
所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
*/
