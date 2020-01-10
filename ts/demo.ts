const div=document.querySelector("#div");

function greeter(person: string) {
    return "Hello, " + person;
}

let user = '[1]';

div.innerHTML = greeter(user);

//----------------------
interface Person {
    firstName: string;
    lastName: string;
}

function interface(person: Person) {
    return person.firstName + person.lastName;
}
/* var a={firstName:'詹',lastName:'真琦',b:'wq'}
div.innerHTML+=interface(a); */
div.innerHTML+=interface({firstName:'詹',lastName:'真琦'});

//-------------------------------
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

function interfaceClass(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

div.innerHTML+=interfaceClass(new Student('a','b','c'));

console.log(new Student('a','b','c'));
class Student1 {
    fullName: string;
    constructor(public firstName, middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
console.log(new Student1('a','b','c'));
