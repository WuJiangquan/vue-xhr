**"vue-xhr"**  is an adapter for axios and jsonp

# install
  `npm install vue-xhr --save `
# import 
**es6**
```
import xhr from "vue-xhr";
```
**amd**
```
require("vue-xhr",function(xhr){
    
})
```
# import  methods

```
import {get,post,getJSON,getHrefParam} from "vue-xhr";
```
#   methods

##   get
```
xhr.get("/user?id=01")
.then((response)=>{
	console.log(response)
})
.catch((error)=>{
	console.log(error)
})
```
**or**

```
xhr.get("/user",{
	id : 01
})
.then((response)=>{
	console.log(response)
})
.catch((error)=>{
	console.log(error)
})
```

##   post

```
xhr.post("/user",{
	name : "jorn",
	sex : "female"
})
.then((response)=>{
	console.log(response)
})
.catch((error)=>{
	console.log(error)
})
```

##   getJSON
```
xhr.getJSON("/user",{
	name : "jorn",
	sex : "female"
})
.then((response)=>{
	console.log(response)
})
.catch((error)=>{
	console.log(error)
})
```

##   getHrefParam
```
//window.location.href example : https://www.gm99.com?test=abc&test2=efg
let newHref = "www.gm99.com?test=a1b1c1&test2=e1f1g1"
xhr.getHrefParam("test") 
//result : abc
xhr.getHrefParam("test",newHref) 
//result : a1b1c1
xhr.getHrefParam("test2") 
//result : efg
xhr.getHrefParam("test2",newHref) 
//result : e1f1g1
```

