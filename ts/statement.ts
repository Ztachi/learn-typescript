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
//引入自定义

