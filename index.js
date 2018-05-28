import jsonp from "jsonp";
import axios from "axios";


export let convertParamToString = function(params) {
    let str = "?";
    let paramArray = [];
    for (let key in params) {
        let param = key + "=" + params[key];
        paramArray.push(param);
    }
    paramArray.push("callback");
    if (paramArray.length > 0) {
        return paramArray.join("&");
    }
    return "";
}

export let post = function(action, params) {
    return new Promise((resolve, reject) => {
        axios.post(action, params)
            .then(function(response) {
                resolve(response)
            })
            .catch(function(error) {
                reject(error);
            });
    });
}

export let getJSON = function(action, params) {
    return new Promise((resolve, reject) => {
        let paramStr = convertParamToString(params || {});
        jsonp(action, {
            prefix: "jsonpCallback",
            param: paramStr
        }, (err, response) => {
        	if(err){
        		reject(err)
        	}else{
        		resolve(response)
        	}
            
        })
    });
}

export let get = function(action, params){
	return new Promise((resolve,reject)=>{
		if(params){
		   axios.get(action, {
		     params: params
		   })
		  .then(function (response) {
		     resolve(response);
		  })
		  .catch(function (error) {
		     reject(error);
		  });
		}else{
			axios.get(action)
		   .then(function (response) {
		       resolve(response);
		   })
		   .catch(function (error) {
		       reject(error);
		   });
		}
	})
}

export let getHrefParam = function(paramName, newHref) {
    let href = newHref || window.location.search.substr(1);
    let reg = new RegExp("(^|&|\\?)" + paramName + "=([^&]*)(&|$)");
    let matchResult = href.match(reg);
    let param = matchResult ? decodeURI(matchResult[2]) : "";
    return param;
}