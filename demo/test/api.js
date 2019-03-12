function Api(){
	this.name = "xujingwei";
	this.age = 28;
	this.sex = "male"
}

Api.prototype.getName = function(){
	console.log(this.name)
}
Api.prototype.getAge = function(){
	console.log(this.name)
}
Object.prototype.getSex = function(){
	console.log(this.sex)
}
var api = new Api();
//经历四步：
//1.创建一个新对象api
//2.将构造函数的作用域赋给新对象（this指向了这个新对象api）
//3.执行构造函数中的代码（为这个新对象api添加属性）
//4.返回新对象
//var api  ={};
//Api.call(api);
//api.__proto__ = Api.prototype;
//return api;