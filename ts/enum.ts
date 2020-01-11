//枚举---------
//枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
//枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射
enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat };

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true

//我们也可以给枚举项手动赋值
//未手动赋值的枚举项会接着上一个枚举项递增
enum Days1 { Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat };

console.log(Days1["Sun"] === 7); // true
console.log(Days1["Mon"] === 1); // true
console.log(Days1["Tue"] === 2); // true
console.log(Days1["Sat"] === 6); // true

//如果未手动赋值的枚举项与手动赋值的重复,TypeScript 并不会报错
//Days[3] 的值先是 "Sun"，而后又被 "Wed" 覆盖了
enum Days2 { Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat };

console.log(Days2["Sun"] === 3); // true
console.log(Days2["Wed"] === 3); // true
console.log(Days2[3] === "Sun"); // false
console.log(Days2[3] === "Wed"); // true

//手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查
//num Days {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};

//手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1
/* 
enum Days {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1.5); // true
console.log(Days["Tue"] === 2.5); // true
console.log(Days["Sat"] === 6.5); // true

*/

//计算所得项
enum Color { Red, Green, Blue = "blue".length };
console.log(Color.Red, Color.Green, Color['Blue']);//0 1 4
//如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错
//enum Color {Red = "red".length, Green, Blue};

//常数枚举-
//常数枚举是使用 const enum 定义的枚举类型
//常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

console.log([Directions.Up, Directions.Down, Directions.Left, Directions.Right]);
/* //假如包含了计算成员，则会在编译阶段报错
const enum Color {Red, Green, Blue = "blue".length}; */

//外部枚举-
//外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型
//declare 定义的类型只会用于编译时的检查，编译结果中会被删除
declare enum Directions1 {
    Up,
    Down,
    Left,
    Right
}
//同时使用 declare 和 const 也是可以的：

declare const enum Directions2 {
    Up = 4,
    Down,
    Left,
    Right
}
console.log([Directions2.Up, Directions2.Down, Directions2.Left, Directions2.Right]);