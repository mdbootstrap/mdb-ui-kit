
var _gaq=_gaq||[]
Split=(function(){var config={},defaults={cookieName:'abTest',cookieAge:30,customVariableName:'AB Test alternative',customVariableIndex:1}
function createCookie(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}
else var expires="";document.cookie=name+"="+value+expires+"; path=/";}
function readCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;}
function eraseCookie(name){createCookie(name,"",-1);}
function getKeys(obj)
{var keys=[];for(var i in obj)if(obj.hasOwnProperty(i))
{keys.push(i);}
return keys;}
function init(){alternatives=arguments[0]
options=arguments[1]
keys=getKeys(alternatives);config={}
if(options!=undefined){for(k in defaults){config[k]=(options[k]!=undefined)?options[k]:defaults[k];}}else{config=defaults;}
var alternative=readCookie(config.cookieName)
if(alternative){}else{alternative=keys[Math.floor(Math.random()*keys.length)]
createCookie(config.cookieName,alternative,config.cookieAge)}
_gaq.push(['_setCustomVar',config.customVariableIndex,config.customVariableName,alternative,1]);alternatives[alternative]();}
return{setup:function(args,options){init(args,options)}}})();
