//类型断言
/* 
当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，
我们只能访问此联合类型的所有类型里共有的属性或方法
*/
/* function getLength(something: string | number): number {
    return something.length;
} */

/* 
有时候，我们确实需要在还不确定类型的时候就访问其中一个类型的属性或方法，比如：
*/
/* 
function getLength(something: string | number): number {
    if (something.length) {
        return something.length;
    } else {
        return something.toString().length;
    }
}
*/

//此时可以使用类型断言，将 something 断言成 string：
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}

//类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的
// function toBoolean(something: string | number): boolean {
//     return <boolean>something;
// }