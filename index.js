import jsonp from "jsonp";
import axios from "axios";


export let convertParamToString = function(params) {
    var str = "?";
    var paramArray = [];
    for (var key in params) {
        var param = key + "=" + params[key];
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
        var paramStr = convertParamToString(params || {});
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
    var href = newHref || window.location.search.substr(1);
    var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
    var matchResult = href.match(reg);
    var param = matchResult ? decodeURI(matchResult[2]) : "";
    return param;
}