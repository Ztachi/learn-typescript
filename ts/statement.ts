//声明文件

//当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能
/* 

declare var/const/let 声明全局变量
declare function 声明全局方法 只能用来定义类型，不能用来定义具体的实现
declare class 声明全局类 只能用来定义类型，不能用来定义具体的实现
declare enum 声明全局枚举类型
declare namespace 声明（含有子属性的）全局对象
interface 和 type 声明全局类型
export 导出变量
export namespace 导出（含有子属性的）对象
export default ES6 默认导出
export = commonjs 导出模块
export as namespace UMD 库声明全局变量
declare global 扩展全局变量
declare module 扩展模块
/// <reference /> 三斜线指令

*/

//编译器并不知道 $ 或 jQuery 是什么东西
// $("#div")
//我们需要使用 declare var 来定义它的类型
declare var $: (s: string) => any;
console.log($("#div"));

//通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件
/* 
// src/jQuery.d.ts

declare var jQuery: (selector: string) => any;
*/


/* 
jQuery 的声明文件不需要我们定义了，社区已经帮我们定义好了
https://microsoft.github.io/TypeSearch/
cnpm install @types/jquery --save-dev
*/


//declare namespace-----
/* 
jQuery 是一个全局变量，它是一个对象，提供了一个 jQuery.ajax 方法可以调用，
那么我们就应该使用 declare namespace jQuery 来声明这个拥有多个子属性的全局变量。
*/
/* 
假如 jQuery 既是一个函数，可以直接被调用 jQuery('#foo')，
又是一个对象，拥有子属性 jQuery.ajax()（事实确实如此），
那么我们可以组合多个声明语句，它们会不冲突的合并起来 */
declare function jQuery(selector: string): any;
declare namespace jQuery {
    //暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中
    interface AjaxSettings {
        method?: 'GET' | 'POST'
        data?: any;
    }
    function ajax(url: string, settings?: AjaxSettings): void;
    //也可以使用 const, class, enum 等语句
    const version: number;
    class Event {
        blur(eventType: EventType): void
    }
    enum EventType {
        CustomClick
    }
    //如果对象拥有深层的层级，则需要用嵌套的 namespace 来声明深层的属性的类型
    namespace fn {
        function extend(object: any): void;
    }
}
jQuery.ajax('/api/get_something', { method: 'GET' });
//在外部使用内部 interface
let settings: jQuery.AjaxSettings = {
    method: "POST"
}
console.log(jQuery.version, settings);
//假如 jQuery 下仅有 fn 这一个属性（没有 ajax 等其他属性或方法），则可以不需要嵌套 namespace
declare namespace jQuery.fn {
    function extend(object: any): void;
}

//npm 包---
//自定义声明文件引入
import  test  from 'test';
/* 
npm 包的声明文件与全局变量的声明文件有很大区别。
在 npm 包的声明文件中，使用 declare 不再会声明一个全局变量，
而只会在当前文件中声明一个局部变量。只有在声明文件中使用 export 导出，
然后在使用方 import 导入后，才会应用到这些类型声明。
*/
/* 
export 的语法与普通的 ts 中的语法类似，区别仅在于声明文件中禁止定义具体的实现
*/


//直接扩展全局变量-------
/* 
有的第三方库扩展了一个全局变量，可是此全局变量的类型却没有相应的更新过来，
就会导致 ts 编译错误，此时就需要扩展全局变量的类型。比如扩展 String 类型
*/
//通过声明合并，使用 interface String 即可给 String 添加属性或方法
/* 
interface String {
    prependHello(): string;
}

'foo'.prependHello();
*/
//使用 declare global 可以在 npm 包或者 UMD 库的声明文件中扩展全局变量的类型
//注意即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，
//用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件。
/* 
declare global {
    interface String {
        prependHello(): string;
    }
}

export {};
*/


//三斜线指令-----
/* 
类似于声明文件中的 import，它可以用来导入另一个声明文件。
与 import 的区别是，当且仅当在以下几个场景下，我们才需要使用三斜线指令替代 import：
*/
//当我们在书写一个全局变量的声明文件时
//当我们需要依赖一个全局变量的声明文件时
