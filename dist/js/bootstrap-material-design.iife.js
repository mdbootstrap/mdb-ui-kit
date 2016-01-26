/*!
 * Bootstrap Material Design v4.0.0-prealpha (https://github.com/FezVrasta/bootstrap-material-design)
 * Copyright 2014-2016 Federico Zivolo
 * Licensed under MIT (https://github.com/FezVrasta/bootstrap-material-design/blob/master/LICENSE)
 */


(function () {
  'use strict';

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers;

  (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){s(r[o]);}return s;})({1:[function(_dereq_,module,exports){(function(global){"use strict";_dereq_(189);_dereq_(2);if(global._babelPolyfill){throw new Error("only one instance of babel-polyfill is allowed");}global._babelPolyfill=true;}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"189":189,"2":2}],2:[function(_dereq_,module,exports){module.exports=_dereq_(190);},{"190":190}],3:[function(_dereq_,module,exports){module.exports=function(it){if(typeof it!='function')throw TypeError(it+' is not a function!');return it;};},{}],4:[function(_dereq_,module,exports){ // 22.1.3.31 Array.prototype[@@unscopables]
  var UNSCOPABLES=_dereq_(84)('unscopables'),ArrayProto=Array.prototype;if(ArrayProto[UNSCOPABLES]==undefined)_dereq_(32)(ArrayProto,UNSCOPABLES,{});module.exports=function(key){ArrayProto[UNSCOPABLES][key]=true;};},{"32":32,"84":84}],5:[function(_dereq_,module,exports){var isObject=_dereq_(39);module.exports=function(it){if(!isObject(it))throw TypeError(it+' is not an object!');return it;};},{"39":39}],6:[function(_dereq_,module,exports){ // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
  'use strict';var toObject=_dereq_(81),toIndex=_dereq_(77),toLength=_dereq_(80);module.exports=[].copyWithin||function copyWithin(target /*= 0*/,start /*= 0, end = @length*/){var O=toObject(this),len=toLength(O.length),to=toIndex(target,len),from=toIndex(start,len),$$=arguments,end=$$.length>2?$$[2]:undefined,count=Math.min((end===undefined?len:toIndex(end,len))-from,len-to),inc=1;if(from<to&&to<from+count){inc=-1;from+=count-1;to+=count-1;}while(count-->0){if(from in O)O[to]=O[from];else delete O[to];to+=inc;from+=inc;}return O;};},{"77":77,"80":80,"81":81}],7:[function(_dereq_,module,exports){ // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
  'use strict';var toObject=_dereq_(81),toIndex=_dereq_(77),toLength=_dereq_(80);module.exports=[].fill||function fill(value /*, start = 0, end = @length */){var O=toObject(this,true),length=toLength(O.length),$$=arguments,$$len=$$.length,index=toIndex($$len>1?$$[1]:undefined,length),end=$$len>2?$$[2]:undefined,endPos=end===undefined?length:toIndex(end,length);while(endPos>index){O[index++]=value;}return O;};},{"77":77,"80":80,"81":81}],8:[function(_dereq_,module,exports){ // false -> Array#indexOf
  // true  -> Array#includes
  var toIObject=_dereq_(79),toLength=_dereq_(80),toIndex=_dereq_(77);module.exports=function(IS_INCLUDES){return function($this,el,fromIndex){var O=toIObject($this),length=toLength(O.length),index=toIndex(fromIndex,length),value; // Array#includes uses SameValueZero equality algorithm
  if(IS_INCLUDES&&el!=el)while(length>index){value=O[index++];if(value!=value)return true; // Array#toIndex ignores holes, Array#includes - not
  }else for(;length>index;index++){if(IS_INCLUDES||index in O){if(O[index]===el)return IS_INCLUDES||index;}}return !IS_INCLUDES&&-1;};};},{"77":77,"79":79,"80":80}],9:[function(_dereq_,module,exports){ // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex
  var ctx=_dereq_(18),IObject=_dereq_(35),toObject=_dereq_(81),toLength=_dereq_(80),asc=_dereq_(10);module.exports=function(TYPE){var IS_MAP=TYPE==1,IS_FILTER=TYPE==2,IS_SOME=TYPE==3,IS_EVERY=TYPE==4,IS_FIND_INDEX=TYPE==6,NO_HOLES=TYPE==5||IS_FIND_INDEX;return function($this,callbackfn,that){var O=toObject($this),self=IObject(O),f=ctx(callbackfn,that,3),length=toLength(self.length),index=0,result=IS_MAP?asc($this,length):IS_FILTER?asc($this,0):undefined,val,res;for(;length>index;index++){if(NO_HOLES||index in self){val=self[index];res=f(val,index,O);if(TYPE){if(IS_MAP)result[index]=res; // map
  else if(res)switch(TYPE){case 3:return true; // some
  case 5:return val; // find
  case 6:return index; // findIndex
  case 2:result.push(val); // filter
  }else if(IS_EVERY)return false; // every
  }}}return IS_FIND_INDEX?-1:IS_SOME||IS_EVERY?IS_EVERY:result;};};},{"10":10,"18":18,"35":35,"80":80,"81":81}],10:[function(_dereq_,module,exports){ // 9.4.2.3 ArraySpeciesCreate(originalArray, length)
  var isObject=_dereq_(39),isArray=_dereq_(37),SPECIES=_dereq_(84)('species');module.exports=function(original,length){var C;if(isArray(original)){C=original.constructor; // cross-realm fallback
  if(typeof C=='function'&&(C===Array||isArray(C.prototype)))C=undefined;if(isObject(C)){C=C[SPECIES];if(C===null)C=undefined;}}return new (C===undefined?Array:C)(length);};},{"37":37,"39":39,"84":84}],11:[function(_dereq_,module,exports){ // getting tag from 19.1.3.6 Object.prototype.toString()
  var cof=_dereq_(12),TAG=_dereq_(84)('toStringTag') // ES3 wrong here
  ,ARG=cof(function(){return arguments;}())=='Arguments';module.exports=function(it){var O,T,B;return it===undefined?'Undefined':it===null?'Null' // @@toStringTag case
  :typeof (T=(O=Object(it))[TAG])=='string'?T // builtinTag case
  :ARG?cof(O) // ES3 arguments fallback
  :(B=cof(O))=='Object'&&typeof O.callee=='function'?'Arguments':B;};},{"12":12,"84":84}],12:[function(_dereq_,module,exports){var toString={}.toString;module.exports=function(it){return toString.call(it).slice(8,-1);};},{}],13:[function(_dereq_,module,exports){'use strict';var $=_dereq_(47),hide=_dereq_(32),mix=_dereq_(54),ctx=_dereq_(18),strictNew=_dereq_(70),defined=_dereq_(20),forOf=_dereq_(28),$iterDefine=_dereq_(43),step=_dereq_(45),ID=_dereq_(83)('id'),$has=_dereq_(31),isObject=_dereq_(39),setSpecies=_dereq_(66),DESCRIPTORS=_dereq_(21),isExtensible=Object.isExtensible||isObject,SIZE=DESCRIPTORS?'_s':'size',id=0;var fastKey=function fastKey(it,create){ // return primitive with prefix
  if(!isObject(it))return (typeof it==="undefined"?"undefined":babelHelpers.typeof(it))=='symbol'?it:(typeof it=='string'?'S':'P')+it;if(!$has(it,ID)){ // can't set id to frozen object
  if(!isExtensible(it))return 'F'; // not necessary to add id
  if(!create)return 'E'; // add missing object id
  hide(it,ID,++id); // return object id with prefix
  }return 'O'+it[ID];};var getEntry=function getEntry(that,key){ // fast case
  var index=fastKey(key),entry;if(index!=='F')return that._i[index]; // frozen object case
  for(entry=that._f;entry;entry=entry.n){if(entry.k==key)return entry;}};module.exports={getConstructor:function getConstructor(wrapper,NAME,IS_MAP,ADDER){var C=wrapper(function(that,iterable){strictNew(that,C,NAME);that._i=$.create(null); // index
  that._f=undefined; // first entry
  that._l=undefined; // last entry
  that[SIZE]=0; // size
  if(iterable!=undefined)forOf(iterable,IS_MAP,that[ADDER],that);});mix(C.prototype,{ // 23.1.3.1 Map.prototype.clear()
  // 23.2.3.2 Set.prototype.clear()
  clear:function clear(){for(var that=this,data=that._i,entry=that._f;entry;entry=entry.n){entry.r=true;if(entry.p)entry.p=entry.p.n=undefined;delete data[entry.i];}that._f=that._l=undefined;that[SIZE]=0;}, // 23.1.3.3 Map.prototype.delete(key)
  // 23.2.3.4 Set.prototype.delete(value)
  'delete':function _delete(key){var that=this,entry=getEntry(that,key);if(entry){var next=entry.n,prev=entry.p;delete that._i[entry.i];entry.r=true;if(prev)prev.n=next;if(next)next.p=prev;if(that._f==entry)that._f=next;if(that._l==entry)that._l=prev;that[SIZE]--;}return !!entry;}, // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
  // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
  forEach:function forEach(callbackfn /*, that = undefined */){var f=ctx(callbackfn,arguments.length>1?arguments[1]:undefined,3),entry;while(entry=entry?entry.n:this._f){f(entry.v,entry.k,this); // revert to the last existing entry
  while(entry&&entry.r){entry=entry.p;}}}, // 23.1.3.7 Map.prototype.has(key)
  // 23.2.3.7 Set.prototype.has(value)
  has:function has(key){return !!getEntry(this,key);}});if(DESCRIPTORS)$.setDesc(C.prototype,'size',{get:function get(){return defined(this[SIZE]);}});return C;},def:function def(that,key,value){var entry=getEntry(that,key),prev,index; // change existing entry
  if(entry){entry.v=value; // create new entry
  }else {that._l=entry={i:index=fastKey(key,true), // <- index
  k:key, // <- key
  v:value, // <- value
  p:prev=that._l, // <- previous entry
  n:undefined, // <- next entry
  r:false // <- removed
  };if(!that._f)that._f=entry;if(prev)prev.n=entry;that[SIZE]++; // add to index
  if(index!=='F')that._i[index]=entry;}return that;},getEntry:getEntry,setStrong:function setStrong(C,NAME,IS_MAP){ // add .keys, .values, .entries, [@@iterator]
  // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
  $iterDefine(C,NAME,function(iterated,kind){this._t=iterated; // target
  this._k=kind; // kind
  this._l=undefined; // previous
  },function(){var that=this,kind=that._k,entry=that._l; // revert to the last existing entry
  while(entry&&entry.r){entry=entry.p;} // get next entry
  if(!that._t||!(that._l=entry=entry?entry.n:that._t._f)){ // or finish the iteration
  that._t=undefined;return step(1);} // return step by kind
  if(kind=='keys')return step(0,entry.k);if(kind=='values')return step(0,entry.v);return step(0,[entry.k,entry.v]);},IS_MAP?'entries':'values',!IS_MAP,true); // add [@@species], 23.1.2.2, 23.2.2.2
  setSpecies(NAME);}};},{"18":18,"20":20,"21":21,"28":28,"31":31,"32":32,"39":39,"43":43,"45":45,"47":47,"54":54,"66":66,"70":70,"83":83}],14:[function(_dereq_,module,exports){ // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  var forOf=_dereq_(28),classof=_dereq_(11);module.exports=function(NAME){return function toJSON(){if(classof(this)!=NAME)throw TypeError(NAME+"#toJSON isn't generic");var arr=[];forOf(this,false,arr.push,arr);return arr;};};},{"11":11,"28":28}],15:[function(_dereq_,module,exports){'use strict';var hide=_dereq_(32),mix=_dereq_(54),anObject=_dereq_(5),strictNew=_dereq_(70),forOf=_dereq_(28),method=_dereq_(9),WEAK=_dereq_(83)('weak'),isObject=_dereq_(39),$has=_dereq_(31),isExtensible=Object.isExtensible||isObject,find=method(5),findIndex=method(6),id=0; // fallback for frozen keys
  var frozenStore=function frozenStore(that){return that._l||(that._l=new FrozenStore());};var FrozenStore=function FrozenStore(){this.a=[];};var findFrozen=function findFrozen(store,key){return find(store.a,function(it){return it[0]===key;});};FrozenStore.prototype={get:function get(key){var entry=findFrozen(this,key);if(entry)return entry[1];},has:function has(key){return !!findFrozen(this,key);},set:function set(key,value){var entry=findFrozen(this,key);if(entry)entry[1]=value;else this.a.push([key,value]);},'delete':function _delete(key){var index=findIndex(this.a,function(it){return it[0]===key;});if(~index)this.a.splice(index,1);return !! ~index;}};module.exports={getConstructor:function getConstructor(wrapper,NAME,IS_MAP,ADDER){var C=wrapper(function(that,iterable){strictNew(that,C,NAME);that._i=id++; // collection id
  that._l=undefined; // leak store for frozen objects
  if(iterable!=undefined)forOf(iterable,IS_MAP,that[ADDER],that);});mix(C.prototype,{ // 23.3.3.2 WeakMap.prototype.delete(key)
  // 23.4.3.3 WeakSet.prototype.delete(value)
  'delete':function _delete(key){if(!isObject(key))return false;if(!isExtensible(key))return frozenStore(this)['delete'](key);return $has(key,WEAK)&&$has(key[WEAK],this._i)&&delete key[WEAK][this._i];}, // 23.3.3.4 WeakMap.prototype.has(key)
  // 23.4.3.4 WeakSet.prototype.has(value)
  has:function has(key){if(!isObject(key))return false;if(!isExtensible(key))return frozenStore(this).has(key);return $has(key,WEAK)&&$has(key[WEAK],this._i);}});return C;},def:function def(that,key,value){if(!isExtensible(anObject(key))){frozenStore(that).set(key,value);}else {$has(key,WEAK)||hide(key,WEAK,{});key[WEAK][that._i]=value;}return that;},frozenStore:frozenStore,WEAK:WEAK};},{"28":28,"31":31,"32":32,"39":39,"5":5,"54":54,"70":70,"83":83,"9":9}],16:[function(_dereq_,module,exports){'use strict';var global=_dereq_(30),$def=_dereq_(19),$redef=_dereq_(62),mix=_dereq_(54),forOf=_dereq_(28),strictNew=_dereq_(70),isObject=_dereq_(39),fails=_dereq_(25),$iterDetect=_dereq_(44),setToStringTag=_dereq_(67);module.exports=function(NAME,wrapper,methods,common,IS_MAP,IS_WEAK){var Base=global[NAME],C=Base,ADDER=IS_MAP?'set':'add',proto=C&&C.prototype,O={};var fixMethod=function fixMethod(KEY){var fn=proto[KEY];$redef(proto,KEY,KEY=='delete'?function(a){return IS_WEAK&&!isObject(a)?false:fn.call(this,a===0?0:a);}:KEY=='has'?function has(a){return IS_WEAK&&!isObject(a)?false:fn.call(this,a===0?0:a);}:KEY=='get'?function get(a){return IS_WEAK&&!isObject(a)?undefined:fn.call(this,a===0?0:a);}:KEY=='add'?function add(a){fn.call(this,a===0?0:a);return this;}:function set(a,b){fn.call(this,a===0?0:a,b);return this;});};if(typeof C!='function'||!(IS_WEAK||proto.forEach&&!fails(function(){new C().entries().next();}))){ // create collection constructor
  C=common.getConstructor(wrapper,NAME,IS_MAP,ADDER);mix(C.prototype,methods);}else {var instance=new C() // early implementations not supports chaining
  ,HASNT_CHAINING=instance[ADDER](IS_WEAK?{}:-0,1)!=instance // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
  ,THROWS_ON_PRIMITIVES=fails(function(){instance.has(1);}) // most early implementations doesn't supports iterables, most modern - not close it correctly
  ,ACCEPT_ITERABLES=$iterDetect(function(iter){new C(iter);}) // eslint-disable-line no-new
  // for early implementations -0 and +0 not the same
  ,BUGGY_ZERO;if(!ACCEPT_ITERABLES){C=wrapper(function(target,iterable){strictNew(target,C,NAME);var that=new Base();if(iterable!=undefined)forOf(iterable,IS_MAP,that[ADDER],that);return that;});C.prototype=proto;proto.constructor=C;}IS_WEAK||instance.forEach(function(val,key){BUGGY_ZERO=1/key===-Infinity;});if(THROWS_ON_PRIMITIVES||BUGGY_ZERO){fixMethod('delete');fixMethod('has');IS_MAP&&fixMethod('get');}if(BUGGY_ZERO||HASNT_CHAINING)fixMethod(ADDER); // weak collections should not contains .clear method
  if(IS_WEAK&&proto.clear)delete proto.clear;}setToStringTag(C,NAME);O[NAME]=C;$def($def.G+$def.W+$def.F*(C!=Base),O);if(!IS_WEAK)common.setStrong(C,NAME,IS_MAP);return C;};},{"19":19,"25":25,"28":28,"30":30,"39":39,"44":44,"54":54,"62":62,"67":67,"70":70}],17:[function(_dereq_,module,exports){var core=module.exports={version:'1.2.5'};if(typeof __e=='number')__e=core; // eslint-disable-line no-undef
  },{}],18:[function(_dereq_,module,exports){ // optional / simple context binding
  var aFunction=_dereq_(3);module.exports=function(fn,that,length){aFunction(fn);if(that===undefined)return fn;switch(length){case 1:return function(a){return fn.call(that,a);};case 2:return function(a,b){return fn.call(that,a,b);};case 3:return function(a,b,c){return fn.call(that,a,b,c);};}return function() /* ...args */{return fn.apply(that,arguments);};};},{"3":3}],19:[function(_dereq_,module,exports){var global=_dereq_(30),core=_dereq_(17),hide=_dereq_(32),$redef=_dereq_(62),PROTOTYPE='prototype';var ctx=function ctx(fn,that){return function(){return fn.apply(that,arguments);};};var $def=function $def(type,name,source){var key,own,out,exp,isGlobal=type&$def.G,isProto=type&$def.P,target=isGlobal?global:type&$def.S?global[name]||(global[name]={}):(global[name]||{})[PROTOTYPE],exports=isGlobal?core:core[name]||(core[name]={});if(isGlobal)source=name;for(key in source){ // contains in native
  own=!(type&$def.F)&&target&&key in target; // export native or passed
  out=(own?target:source)[key]; // bind timers to global for call from export context
  if(type&$def.B&&own)exp=ctx(out,global);else exp=isProto&&typeof out=='function'?ctx(Function.call,out):out; // extend global
  if(target&&!own)$redef(target,key,out); // export
  if(exports[key]!=out)hide(exports,key,exp);if(isProto)(exports[PROTOTYPE]||(exports[PROTOTYPE]={}))[key]=out;}};global.core=core; // type bitmap
  $def.F=1; // forced
  $def.G=2; // global
  $def.S=4; // static
  $def.P=8; // proto
  $def.B=16; // bind
  $def.W=32; // wrap
  module.exports=$def;},{"17":17,"30":30,"32":32,"62":62}],20:[function(_dereq_,module,exports){ // 7.2.1 RequireObjectCoercible(argument)
  module.exports=function(it){if(it==undefined)throw TypeError("Can't call method on  "+it);return it;};},{}],21:[function(_dereq_,module,exports){ // Thank's IE8 for his funny defineProperty
  module.exports=!_dereq_(25)(function(){return Object.defineProperty({},'a',{get:function get(){return 7;}}).a!=7;});},{"25":25}],22:[function(_dereq_,module,exports){var isObject=_dereq_(39),document=_dereq_(30).document // in old IE typeof document.createElement is 'object'
  ,is=isObject(document)&&isObject(document.createElement);module.exports=function(it){return is?document.createElement(it):{};};},{"30":30,"39":39}],23:[function(_dereq_,module,exports){ // all enumerable object keys, includes symbols
  var $=_dereq_(47);module.exports=function(it){var keys=$.getKeys(it),getSymbols=$.getSymbols;if(getSymbols){var symbols=getSymbols(it),isEnum=$.isEnum,i=0,key;while(symbols.length>i){if(isEnum.call(it,key=symbols[i++]))keys.push(key);}}return keys;};},{"47":47}],24:[function(_dereq_,module,exports){var MATCH=_dereq_(84)('match');module.exports=function(KEY){var re=/./;try{'/./'[KEY](re);}catch(e){try{re[MATCH]=false;return !'/./'[KEY](re);}catch(f){ /* empty */}}return true;};},{"84":84}],25:[function(_dereq_,module,exports){module.exports=function(exec){try{return !!exec();}catch(e){return true;}};},{}],26:[function(_dereq_,module,exports){'use strict';var hide=_dereq_(32),redef=_dereq_(62),fails=_dereq_(25),defined=_dereq_(20),wks=_dereq_(84);module.exports=function(KEY,length,exec){var SYMBOL=wks(KEY),original=''[KEY];if(fails(function(){var O={};O[SYMBOL]=function(){return 7;};return ''[KEY](O)!=7;})){redef(String.prototype,KEY,exec(defined,SYMBOL,original));hide(RegExp.prototype,SYMBOL,length==2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
  // 21.2.5.11 RegExp.prototype[@@split](string, limit)
  ?function(string,arg){return original.call(string,this,arg);} // 21.2.5.6 RegExp.prototype[@@match](string)
  // 21.2.5.9 RegExp.prototype[@@search](string)
  :function(string){return original.call(string,this);});}};},{"20":20,"25":25,"32":32,"62":62,"84":84}],27:[function(_dereq_,module,exports){'use strict'; // 21.2.5.3 get RegExp.prototype.flags
  var anObject=_dereq_(5);module.exports=function(){var that=anObject(this),result='';if(that.global)result+='g';if(that.ignoreCase)result+='i';if(that.multiline)result+='m';if(that.unicode)result+='u';if(that.sticky)result+='y';return result;};},{"5":5}],28:[function(_dereq_,module,exports){var ctx=_dereq_(18),call=_dereq_(41),isArrayIter=_dereq_(36),anObject=_dereq_(5),toLength=_dereq_(80),getIterFn=_dereq_(85);module.exports=function(iterable,entries,fn,that){var iterFn=getIterFn(iterable),f=ctx(fn,that,entries?2:1),index=0,length,step,iterator;if(typeof iterFn!='function')throw TypeError(iterable+' is not iterable!'); // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length=toLength(iterable.length);length>index;index++){entries?f(anObject(step=iterable[index])[0],step[1]):f(iterable[index]);}else for(iterator=iterFn.call(iterable);!(step=iterator.next()).done;){call(iterator,f,step.value,entries);}};},{"18":18,"36":36,"41":41,"5":5,"80":80,"85":85}],29:[function(_dereq_,module,exports){ // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  var toString={}.toString,toIObject=_dereq_(79),getNames=_dereq_(47).getNames;var windowNames=(typeof window==="undefined"?"undefined":babelHelpers.typeof(window))=='object'&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];var getWindowNames=function getWindowNames(it){try{return getNames(it);}catch(e){return windowNames.slice();}};module.exports.get=function getOwnPropertyNames(it){if(windowNames&&toString.call(it)=='[object Window]')return getWindowNames(it);return getNames(toIObject(it));};},{"47":47,"79":79}],30:[function(_dereq_,module,exports){ // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global=module.exports=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();if(typeof __g=='number')__g=global; // eslint-disable-line no-undef
  },{}],31:[function(_dereq_,module,exports){var hasOwnProperty={}.hasOwnProperty;module.exports=function(it,key){return hasOwnProperty.call(it,key);};},{}],32:[function(_dereq_,module,exports){var $=_dereq_(47),createDesc=_dereq_(61);module.exports=_dereq_(21)?function(object,key,value){return $.setDesc(object,key,createDesc(1,value));}:function(object,key,value){object[key]=value;return object;};},{"21":21,"47":47,"61":61}],33:[function(_dereq_,module,exports){module.exports=_dereq_(30).document&&document.documentElement;},{"30":30}],34:[function(_dereq_,module,exports){ // fast apply, http://jsperf.lnkit.com/fast-apply/5
  module.exports=function(fn,args,that){var un=that===undefined;switch(args.length){case 0:return un?fn():fn.call(that);case 1:return un?fn(args[0]):fn.call(that,args[0]);case 2:return un?fn(args[0],args[1]):fn.call(that,args[0],args[1]);case 3:return un?fn(args[0],args[1],args[2]):fn.call(that,args[0],args[1],args[2]);case 4:return un?fn(args[0],args[1],args[2],args[3]):fn.call(that,args[0],args[1],args[2],args[3]);}return fn.apply(that,args);};},{}],35:[function(_dereq_,module,exports){ // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var cof=_dereq_(12);module.exports=Object('z').propertyIsEnumerable(0)?Object:function(it){return cof(it)=='String'?it.split(''):Object(it);};},{"12":12}],36:[function(_dereq_,module,exports){ // check on default Array iterator
  var Iterators=_dereq_(46),ITERATOR=_dereq_(84)('iterator'),ArrayProto=Array.prototype;module.exports=function(it){return (Iterators.Array||ArrayProto[ITERATOR])===it;};},{"46":46,"84":84}],37:[function(_dereq_,module,exports){ // 7.2.2 IsArray(argument)
  var cof=_dereq_(12);module.exports=Array.isArray||function(arg){return cof(arg)=='Array';};},{"12":12}],38:[function(_dereq_,module,exports){ // 20.1.2.3 Number.isInteger(number)
  var isObject=_dereq_(39),floor=Math.floor;module.exports=function isInteger(it){return !isObject(it)&&isFinite(it)&&floor(it)===it;};},{"39":39}],39:[function(_dereq_,module,exports){module.exports=function(it){return (typeof it==="undefined"?"undefined":babelHelpers.typeof(it))==='object'?it!==null:typeof it==='function';};},{}],40:[function(_dereq_,module,exports){ // 7.2.8 IsRegExp(argument)
  var isObject=_dereq_(39),cof=_dereq_(12),MATCH=_dereq_(84)('match');module.exports=function(it){var isRegExp;return isObject(it)&&((isRegExp=it[MATCH])!==undefined?!!isRegExp:cof(it)=='RegExp');};},{"12":12,"39":39,"84":84}],41:[function(_dereq_,module,exports){ // call something on iterator step with safe closing on error
  var anObject=_dereq_(5);module.exports=function(iterator,fn,value,entries){try{return entries?fn(anObject(value)[0],value[1]):fn(value); // 7.4.6 IteratorClose(iterator, completion)
  }catch(e){var ret=iterator['return'];if(ret!==undefined)anObject(ret.call(iterator));throw e;}};},{"5":5}],42:[function(_dereq_,module,exports){'use strict';var $=_dereq_(47),descriptor=_dereq_(61),setToStringTag=_dereq_(67),IteratorPrototype={}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _dereq_(32)(IteratorPrototype,_dereq_(84)('iterator'),function(){return this;});module.exports=function(Constructor,NAME,next){Constructor.prototype=$.create(IteratorPrototype,{next:descriptor(1,next)});setToStringTag(Constructor,NAME+' Iterator');};},{"32":32,"47":47,"61":61,"67":67,"84":84}],43:[function(_dereq_,module,exports){'use strict';var LIBRARY=_dereq_(49),$def=_dereq_(19),$redef=_dereq_(62),hide=_dereq_(32),has=_dereq_(31),SYMBOL_ITERATOR=_dereq_(84)('iterator'),Iterators=_dereq_(46),$iterCreate=_dereq_(42),setToStringTag=_dereq_(67),getProto=_dereq_(47).getProto,BUGGY=!([].keys&&'next' in [].keys()) // Safari has buggy iterators w/o `next`
  ,FF_ITERATOR='@@iterator',KEYS='keys',VALUES='values';var returnThis=function returnThis(){return this;};module.exports=function(Base,NAME,Constructor,next,DEFAULT,IS_SET,FORCE){$iterCreate(Constructor,NAME,next);var getMethod=function getMethod(kind){if(!BUGGY&&kind in proto)return proto[kind];switch(kind){case KEYS:return function keys(){return new Constructor(this,kind);};case VALUES:return function values(){return new Constructor(this,kind);};}return function entries(){return new Constructor(this,kind);};};var TAG=NAME+' Iterator',proto=Base.prototype,_native=proto[SYMBOL_ITERATOR]||proto[FF_ITERATOR]||DEFAULT&&proto[DEFAULT],_default=_native||getMethod(DEFAULT),methods,key; // Fix native
  if(_native){var IteratorPrototype=getProto(_default.call(new Base())); // Set @@toStringTag to native iterators
  setToStringTag(IteratorPrototype,TAG,true); // FF fix
  if(!LIBRARY&&has(proto,FF_ITERATOR))hide(IteratorPrototype,SYMBOL_ITERATOR,returnThis);} // Define iterator
  if((!LIBRARY||FORCE)&&(BUGGY||!(SYMBOL_ITERATOR in proto))){hide(proto,SYMBOL_ITERATOR,_default);} // Plug for library
  Iterators[NAME]=_default;Iterators[TAG]=returnThis;if(DEFAULT){methods={values:DEFAULT==VALUES?_default:getMethod(VALUES),keys:IS_SET?_default:getMethod(KEYS),entries:DEFAULT!=VALUES?_default:getMethod('entries')};if(FORCE)for(key in methods){if(!(key in proto))$redef(proto,key,methods[key]);}else $def($def.P+$def.F*BUGGY,NAME,methods);}return methods;};},{"19":19,"31":31,"32":32,"42":42,"46":46,"47":47,"49":49,"62":62,"67":67,"84":84}],44:[function(_dereq_,module,exports){var ITERATOR=_dereq_(84)('iterator'),SAFE_CLOSING=false;try{var riter=[7][ITERATOR]();riter['return']=function(){SAFE_CLOSING=true;};Array.from(riter,function(){throw 2;});}catch(e){ /* empty */}module.exports=function(exec,skipClosing){if(!skipClosing&&!SAFE_CLOSING)return false;var safe=false;try{var arr=[7],iter=arr[ITERATOR]();iter.next=function(){safe=true;};arr[ITERATOR]=function(){return iter;};exec(arr);}catch(e){ /* empty */}return safe;};},{"84":84}],45:[function(_dereq_,module,exports){module.exports=function(done,value){return {value:value,done:!!done};};},{}],46:[function(_dereq_,module,exports){module.exports={};},{}],47:[function(_dereq_,module,exports){var $Object=Object;module.exports={create:$Object.create,getProto:$Object.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:$Object.getOwnPropertyDescriptor,setDesc:$Object.defineProperty,setDescs:$Object.defineProperties,getKeys:$Object.keys,getNames:$Object.getOwnPropertyNames,getSymbols:$Object.getOwnPropertySymbols,each:[].forEach};},{}],48:[function(_dereq_,module,exports){var $=_dereq_(47),toIObject=_dereq_(79);module.exports=function(object,el){var O=toIObject(object),keys=$.getKeys(O),length=keys.length,index=0,key;while(length>index){if(O[key=keys[index++]]===el)return key;}};},{"47":47,"79":79}],49:[function(_dereq_,module,exports){module.exports=false;},{}],50:[function(_dereq_,module,exports){ // 20.2.2.14 Math.expm1(x)
  module.exports=Math.expm1||function expm1(x){return (x=+x)==0?x:x>-1e-6&&x<1e-6?x+x*x/2:Math.exp(x)-1;};},{}],51:[function(_dereq_,module,exports){ // 20.2.2.20 Math.log1p(x)
  module.exports=Math.log1p||function log1p(x){return (x=+x)>-1e-8&&x<1e-8?x-x*x/2:Math.log(1+x);};},{}],52:[function(_dereq_,module,exports){ // 20.2.2.28 Math.sign(x)
  module.exports=Math.sign||function sign(x){return (x=+x)==0||x!=x?x:x<0?-1:1;};},{}],53:[function(_dereq_,module,exports){var global=_dereq_(30),macrotask=_dereq_(76).set,Observer=global.MutationObserver||global.WebKitMutationObserver,process=global.process,isNode=_dereq_(12)(process)=='process',head,last,notify;var flush=function flush(){var parent,domain;if(isNode&&(parent=process.domain)){process.domain=null;parent.exit();}while(head){domain=head.domain;if(domain)domain.enter();head.fn.call(); // <- currently we use it only for Promise - try / catch not required
  if(domain)domain.exit();head=head.next;}last=undefined;if(parent)parent.enter();}; // Node.js
  if(isNode){notify=function notify(){process.nextTick(flush);}; // browsers with MutationObserver
  }else if(Observer){var toggle=1,node=document.createTextNode('');new Observer(flush).observe(node,{characterData:true}); // eslint-disable-line no-new
  notify=function notify(){node.data=toggle=-toggle;}; // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  }else {notify=function notify(){ // strange IE + webpack dev server bug - use .call(global)
  macrotask.call(global,flush);};}module.exports=function asap(fn){var task={fn:fn,next:undefined,domain:isNode&&process.domain};if(last)last.next=task;if(!head){head=task;notify();}last=task;};},{"12":12,"30":30,"76":76}],54:[function(_dereq_,module,exports){var $redef=_dereq_(62);module.exports=function(target,src){for(var key in src){$redef(target,key,src[key]);}return target;};},{"62":62}],55:[function(_dereq_,module,exports){ // 19.1.2.1 Object.assign(target, source, ...)
  var $=_dereq_(47),toObject=_dereq_(81),IObject=_dereq_(35); // should work with symbols and should have deterministic property order (V8 bug)
  module.exports=_dereq_(25)(function(){var a=Object.assign,A={},B={},S=Symbol(),K='abcdefghijklmnopqrst';A[S]=7;K.split('').forEach(function(k){B[k]=k;});return a({},A)[S]!=7||Object.keys(a({},B)).join('')!=K;})?function assign(target,source){ // eslint-disable-line no-unused-vars
  var T=toObject(target),$$=arguments,$$len=$$.length,index=1,getKeys=$.getKeys,getSymbols=$.getSymbols,isEnum=$.isEnum;while($$len>index){var S=IObject($$[index++]),keys=getSymbols?getKeys(S).concat(getSymbols(S)):getKeys(S),length=keys.length,j=0,key;while(length>j){if(isEnum.call(S,key=keys[j++]))T[key]=S[key];}}return T;}:Object.assign;},{"25":25,"35":35,"47":47,"81":81}],56:[function(_dereq_,module,exports){ // most Object methods by ES6 should accept primitives
  var $def=_dereq_(19),core=_dereq_(17),fails=_dereq_(25);module.exports=function(KEY,exec){var $def=_dereq_(19),fn=(core.Object||{})[KEY]||Object[KEY],exp={};exp[KEY]=exec(fn);$def($def.S+$def.F*fails(function(){fn(1);}),'Object',exp);};},{"17":17,"19":19,"25":25}],57:[function(_dereq_,module,exports){var $=_dereq_(47),toIObject=_dereq_(79),isEnum=$.isEnum;module.exports=function(isEntries){return function(it){var O=toIObject(it),keys=$.getKeys(O),length=keys.length,i=0,result=[],key;while(length>i){if(isEnum.call(O,key=keys[i++])){result.push(isEntries?[key,O[key]]:O[key]);}}return result;};};},{"47":47,"79":79}],58:[function(_dereq_,module,exports){ // all object keys, includes non-enumerable and symbols
  var $=_dereq_(47),anObject=_dereq_(5),Reflect=_dereq_(30).Reflect;module.exports=Reflect&&Reflect.ownKeys||function ownKeys(it){var keys=$.getNames(anObject(it)),getSymbols=$.getSymbols;return getSymbols?keys.concat(getSymbols(it)):keys;};},{"30":30,"47":47,"5":5}],59:[function(_dereq_,module,exports){'use strict';var path=_dereq_(60),invoke=_dereq_(34),aFunction=_dereq_(3);module.exports=function() /* ...pargs */{var fn=aFunction(this),length=arguments.length,pargs=Array(length),i=0,_=path._,holder=false;while(length>i){if((pargs[i]=arguments[i++])===_)holder=true;}return function() /* ...args */{var that=this,$$=arguments,$$len=$$.length,j=0,k=0,args;if(!holder&&!$$len)return invoke(fn,pargs,that);args=pargs.slice();if(holder)for(;length>j;j++){if(args[j]===_)args[j]=$$[k++];}while($$len>k){args.push($$[k++]);}return invoke(fn,args,that);};};},{"3":3,"34":34,"60":60}],60:[function(_dereq_,module,exports){module.exports=_dereq_(30);},{"30":30}],61:[function(_dereq_,module,exports){module.exports=function(bitmap,value){return {enumerable:!(bitmap&1),configurable:!(bitmap&2),writable:!(bitmap&4),value:value};};},{}],62:[function(_dereq_,module,exports){ // add fake Function#toString
  // for correct work wrapped methods / constructors with methods like LoDash isNative
  var global=_dereq_(30),hide=_dereq_(32),SRC=_dereq_(83)('src'),TO_STRING='toString',$toString=Function[TO_STRING],TPL=(''+$toString).split(TO_STRING);_dereq_(17).inspectSource=function(it){return $toString.call(it);};(module.exports=function(O,key,val,safe){if(typeof val=='function'){val.hasOwnProperty(SRC)||hide(val,SRC,O[key]?''+O[key]:TPL.join(String(key)));val.hasOwnProperty('name')||hide(val,'name',key);}if(O===global){O[key]=val;}else {if(!safe)delete O[key];hide(O,key,val);}})(Function.prototype,TO_STRING,function toString(){return typeof this=='function'&&this[SRC]||$toString.call(this);});},{"17":17,"30":30,"32":32,"83":83}],63:[function(_dereq_,module,exports){module.exports=function(regExp,replace){var replacer=replace===Object(replace)?function(part){return replace[part];}:replace;return function(it){return String(it).replace(regExp,replacer);};};},{}],64:[function(_dereq_,module,exports){ // 7.2.9 SameValue(x, y)
  module.exports=Object.is||function is(x,y){return x===y?x!==0||1/x===1/y:x!=x&&y!=y;};},{}],65:[function(_dereq_,module,exports){ // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */var getDesc=_dereq_(47).getDesc,isObject=_dereq_(39),anObject=_dereq_(5);var check=function check(O,proto){anObject(O);if(!isObject(proto)&&proto!==null)throw TypeError(proto+": can't set as prototype!");};module.exports={set:Object.setPrototypeOf||('__proto__' in {}? // eslint-disable-line
  function(test,buggy,set){try{set=_dereq_(18)(Function.call,getDesc(Object.prototype,'__proto__').set,2);set(test,[]);buggy=!(test instanceof Array);}catch(e){buggy=true;}return function setPrototypeOf(O,proto){check(O,proto);if(buggy)O.__proto__=proto;else set(O,proto);return O;};}({},false):undefined),check:check};},{"18":18,"39":39,"47":47,"5":5}],66:[function(_dereq_,module,exports){'use strict';var global=_dereq_(30),$=_dereq_(47),DESCRIPTORS=_dereq_(21),SPECIES=_dereq_(84)('species');module.exports=function(KEY){var C=global[KEY];if(DESCRIPTORS&&C&&!C[SPECIES])$.setDesc(C,SPECIES,{configurable:true,get:function get(){return this;}});};},{"21":21,"30":30,"47":47,"84":84}],67:[function(_dereq_,module,exports){var def=_dereq_(47).setDesc,has=_dereq_(31),TAG=_dereq_(84)('toStringTag');module.exports=function(it,tag,stat){if(it&&!has(it=stat?it:it.prototype,TAG))def(it,TAG,{configurable:true,value:tag});};},{"31":31,"47":47,"84":84}],68:[function(_dereq_,module,exports){var global=_dereq_(30),SHARED='__core-js_shared__',store=global[SHARED]||(global[SHARED]={});module.exports=function(key){return store[key]||(store[key]={});};},{"30":30}],69:[function(_dereq_,module,exports){ // 7.3.20 SpeciesConstructor(O, defaultConstructor)
  var anObject=_dereq_(5),aFunction=_dereq_(3),SPECIES=_dereq_(84)('species');module.exports=function(O,D){var C=anObject(O).constructor,S;return C===undefined||(S=anObject(C)[SPECIES])==undefined?D:aFunction(S);};},{"3":3,"5":5,"84":84}],70:[function(_dereq_,module,exports){module.exports=function(it,Constructor,name){if(!(it instanceof Constructor))throw TypeError(name+": use the 'new' operator!");return it;};},{}],71:[function(_dereq_,module,exports){var toInteger=_dereq_(78),defined=_dereq_(20); // true  -> String#at
  // false -> String#codePointAt
  module.exports=function(TO_STRING){return function(that,pos){var s=String(defined(that)),i=toInteger(pos),l=s.length,a,b;if(i<0||i>=l)return TO_STRING?'':undefined;a=s.charCodeAt(i);return a<0xd800||a>0xdbff||i+1===l||(b=s.charCodeAt(i+1))<0xdc00||b>0xdfff?TO_STRING?s.charAt(i):a:TO_STRING?s.slice(i,i+2):(a-0xd800<<10)+(b-0xdc00)+0x10000;};};},{"20":20,"78":78}],72:[function(_dereq_,module,exports){ // helper for String#{startsWith, endsWith, includes}
  var isRegExp=_dereq_(40),defined=_dereq_(20);module.exports=function(that,searchString,NAME){if(isRegExp(searchString))throw TypeError('String#'+NAME+" doesn't accept regex!");return String(defined(that));};},{"20":20,"40":40}],73:[function(_dereq_,module,exports){ // https://github.com/ljharb/proposal-string-pad-left-right
  var toLength=_dereq_(80),repeat=_dereq_(74),defined=_dereq_(20);module.exports=function(that,maxLength,fillString,left){var S=String(defined(that)),stringLength=S.length,fillStr=fillString===undefined?' ':String(fillString),intMaxLength=toLength(maxLength);if(intMaxLength<=stringLength)return S;if(fillStr=='')fillStr=' ';var fillLen=intMaxLength-stringLength,stringFiller=repeat.call(fillStr,Math.ceil(fillLen/fillStr.length));if(stringFiller.length>fillLen)stringFiller=stringFiller.slice(0,fillLen);return left?stringFiller+S:S+stringFiller;};},{"20":20,"74":74,"80":80}],74:[function(_dereq_,module,exports){'use strict';var toInteger=_dereq_(78),defined=_dereq_(20);module.exports=function repeat(count){var str=String(defined(this)),res='',n=toInteger(count);if(n<0||n==Infinity)throw RangeError("Count can't be negative");for(;n>0;(n>>>=1)&&(str+=str)){if(n&1)res+=str;}return res;};},{"20":20,"78":78}],75:[function(_dereq_,module,exports){var $def=_dereq_(19),defined=_dereq_(20),fails=_dereq_(25),spaces="\t\n\u000b\f\r   ᠎    "+"         　\u2028\u2029﻿",space='['+spaces+']',non="​",ltrim=RegExp('^'+space+space+'*'),rtrim=RegExp(space+space+'*$');var $export=function $export(KEY,exec){var exp={};exp[KEY]=exec(trim);$def($def.P+$def.F*fails(function(){return !!spaces[KEY]()||non[KEY]()!=non;}),'String',exp);}; // 1 -> String#trimLeft
  // 2 -> String#trimRight
  // 3 -> String#trim
  var trim=$export.trim=function(string,TYPE){string=String(defined(string));if(TYPE&1)string=string.replace(ltrim,'');if(TYPE&2)string=string.replace(rtrim,'');return string;};module.exports=$export;},{"19":19,"20":20,"25":25}],76:[function(_dereq_,module,exports){'use strict';var ctx=_dereq_(18),invoke=_dereq_(34),html=_dereq_(33),cel=_dereq_(22),global=_dereq_(30),process=global.process,setTask=global.setImmediate,clearTask=global.clearImmediate,MessageChannel=global.MessageChannel,counter=0,queue={},ONREADYSTATECHANGE='onreadystatechange',defer,channel,port;var run=function run(){var id=+this;if(queue.hasOwnProperty(id)){var fn=queue[id];delete queue[id];fn();}};var listner=function listner(event){run.call(event.data);}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if(!setTask||!clearTask){setTask=function setImmediate(fn){var args=[],i=1;while(arguments.length>i){args.push(arguments[i++]);}queue[++counter]=function(){invoke(typeof fn=='function'?fn:Function(fn),args);};defer(counter);return counter;};clearTask=function clearImmediate(id){delete queue[id];}; // Node.js 0.8-
  if(_dereq_(12)(process)=='process'){defer=function defer(id){process.nextTick(ctx(run,id,1));}; // Browsers with MessageChannel, includes WebWorkers
  }else if(MessageChannel){channel=new MessageChannel();port=channel.port2;channel.port1.onmessage=listner;defer=ctx(port.postMessage,port,1); // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  }else if(global.addEventListener&&typeof postMessage=='function'&&!global.importScripts){defer=function defer(id){global.postMessage(id+'','*');};global.addEventListener('message',listner,false); // IE8-
  }else if(ONREADYSTATECHANGE in cel('script')){defer=function defer(id){html.appendChild(cel('script'))[ONREADYSTATECHANGE]=function(){html.removeChild(this);run.call(id);};}; // Rest old browsers
  }else {defer=function defer(id){setTimeout(ctx(run,id,1),0);};}}module.exports={set:setTask,clear:clearTask};},{"12":12,"18":18,"22":22,"30":30,"33":33,"34":34}],77:[function(_dereq_,module,exports){var toInteger=_dereq_(78),max=Math.max,min=Math.min;module.exports=function(index,length){index=toInteger(index);return index<0?max(index+length,0):min(index,length);};},{"78":78}],78:[function(_dereq_,module,exports){ // 7.1.4 ToInteger
  var ceil=Math.ceil,floor=Math.floor;module.exports=function(it){return isNaN(it=+it)?0:(it>0?floor:ceil)(it);};},{}],79:[function(_dereq_,module,exports){ // to indexed object, toObject with fallback for non-array-like ES3 strings
  var IObject=_dereq_(35),defined=_dereq_(20);module.exports=function(it){return IObject(defined(it));};},{"20":20,"35":35}],80:[function(_dereq_,module,exports){ // 7.1.15 ToLength
  var toInteger=_dereq_(78),min=Math.min;module.exports=function(it){return it>0?min(toInteger(it),0x1fffffffffffff):0; // pow(2, 53) - 1 == 9007199254740991
  };},{"78":78}],81:[function(_dereq_,module,exports){ // 7.1.13 ToObject(argument)
  var defined=_dereq_(20);module.exports=function(it){return Object(defined(it));};},{"20":20}],82:[function(_dereq_,module,exports){ // 7.1.1 ToPrimitive(input [, PreferredType])
  var isObject=_dereq_(39); // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  module.exports=function(it,S){if(!isObject(it))return it;var fn,val;if(S&&typeof (fn=it.toString)=='function'&&!isObject(val=fn.call(it)))return val;if(typeof (fn=it.valueOf)=='function'&&!isObject(val=fn.call(it)))return val;if(!S&&typeof (fn=it.toString)=='function'&&!isObject(val=fn.call(it)))return val;throw TypeError("Can't convert object to primitive value");};},{"39":39}],83:[function(_dereq_,module,exports){var id=0,px=Math.random();module.exports=function(key){return 'Symbol('.concat(key===undefined?'':key,')_',(++id+px).toString(36));};},{}],84:[function(_dereq_,module,exports){var store=_dereq_(68)('wks'),uid=_dereq_(83),_Symbol=_dereq_(30).Symbol;module.exports=function(name){return store[name]||(store[name]=_Symbol&&_Symbol[name]||(_Symbol||uid)('Symbol.'+name));};},{"30":30,"68":68,"83":83}],85:[function(_dereq_,module,exports){var classof=_dereq_(11),ITERATOR=_dereq_(84)('iterator'),Iterators=_dereq_(46);module.exports=_dereq_(17).getIteratorMethod=function(it){if(it!=undefined)return it[ITERATOR]||it['@@iterator']||Iterators[classof(it)];};},{"11":11,"17":17,"46":46,"84":84}],86:[function(_dereq_,module,exports){'use strict';var $=_dereq_(47),DESCRIPTORS=_dereq_(21),createDesc=_dereq_(61),html=_dereq_(33),cel=_dereq_(22),has=_dereq_(31),cof=_dereq_(12),$def=_dereq_(19),invoke=_dereq_(34),arrayMethod=_dereq_(9),IE_PROTO=_dereq_(83)('__proto__'),isObject=_dereq_(39),anObject=_dereq_(5),aFunction=_dereq_(3),toObject=_dereq_(81),toIObject=_dereq_(79),toInteger=_dereq_(78),toIndex=_dereq_(77),toLength=_dereq_(80),IObject=_dereq_(35),fails=_dereq_(25),ObjectProto=Object.prototype,A=[],_slice=A.slice,_join=A.join,defineProperty=$.setDesc,getOwnDescriptor=$.getDesc,defineProperties=$.setDescs,$indexOf=_dereq_(8)(false),factories={},IE8_DOM_DEFINE;if(!DESCRIPTORS){IE8_DOM_DEFINE=!fails(function(){return defineProperty(cel('div'),'a',{get:function get(){return 7;}}).a!=7;});$.setDesc=function(O,P,Attributes){if(IE8_DOM_DEFINE)try{return defineProperty(O,P,Attributes);}catch(e){ /* empty */}if('get' in Attributes||'set' in Attributes)throw TypeError('Accessors not supported!');if('value' in Attributes)anObject(O)[P]=Attributes.value;return O;};$.getDesc=function(O,P){if(IE8_DOM_DEFINE)try{return getOwnDescriptor(O,P);}catch(e){ /* empty */}if(has(O,P))return createDesc(!ObjectProto.propertyIsEnumerable.call(O,P),O[P]);};$.setDescs=defineProperties=function defineProperties(O,Properties){anObject(O);var keys=$.getKeys(Properties),length=keys.length,i=0,P;while(length>i){$.setDesc(O,P=keys[i++],Properties[P]);}return O;};}$def($def.S+$def.F*!DESCRIPTORS,'Object',{ // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor:$.getDesc, // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  defineProperty:$.setDesc, // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
  defineProperties:defineProperties}); // IE 8- don't enum bug keys
  var keys1=('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,'+'toLocaleString,toString,valueOf').split(',') // Additional keys for getOwnPropertyNames
  ,keys2=keys1.concat('length','prototype'),keysLen1=keys1.length; // Create object with `null` prototype: use iframe Object with cleared prototype
  var _createDict=function createDict(){ // Thrash, waste and sodomy: IE GC bug
  var iframe=cel('iframe'),i=keysLen1,gt='>',iframeDocument;iframe.style.display='none';html.appendChild(iframe);iframe.src='javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument=iframe.contentWindow.document;iframeDocument.open();iframeDocument.write('<script>document.F=Object</script'+gt);iframeDocument.close();_createDict=iframeDocument.F;while(i--){delete _createDict.prototype[keys1[i]];}return _createDict();};var createGetKeys=function createGetKeys(names,length){return function(object){var O=toIObject(object),i=0,result=[],key;for(key in O){if(key!=IE_PROTO)has(O,key)&&result.push(key);} // Don't enum bug & hidden keys
  while(length>i){if(has(O,key=names[i++])){~$indexOf(result,key)||result.push(key);}}return result;};};var Empty=function Empty(){};$def($def.S,'Object',{ // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
  getPrototypeOf:$.getProto=$.getProto||function(O){O=toObject(O);if(has(O,IE_PROTO))return O[IE_PROTO];if(typeof O.constructor=='function'&&O instanceof O.constructor){return O.constructor.prototype;}return O instanceof Object?ObjectProto:null;}, // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
  getOwnPropertyNames:$.getNames=$.getNames||createGetKeys(keys2,keys2.length,true), // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  create:$.create=$.create||function(O, /*?*/Properties){var result;if(O!==null){Empty.prototype=anObject(O);result=new Empty();Empty.prototype=null; // add "__proto__" for Object.getPrototypeOf shim
  result[IE_PROTO]=O;}else result=_createDict();return Properties===undefined?result:defineProperties(result,Properties);}, // 19.1.2.14 / 15.2.3.14 Object.keys(O)
  keys:$.getKeys=$.getKeys||createGetKeys(keys1,keysLen1,false)});var construct=function construct(F,len,args){if(!(len in factories)){for(var n=[],i=0;i<len;i++){n[i]='a['+i+']';}factories[len]=Function('F,a','return new F('+n.join(',')+')');}return factories[len](F,args);}; // 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
  $def($def.P,'Function',{bind:function bind(that /*, args... */){var fn=aFunction(this),partArgs=_slice.call(arguments,1);var bound=function bound() /* args... */{var args=partArgs.concat(_slice.call(arguments));return this instanceof bound?construct(fn,args.length,args):invoke(fn,args,that);};if(isObject(fn.prototype))bound.prototype=fn.prototype;return bound;}}); // fallback for not array-like ES3 strings and DOM objects
  var buggySlice=fails(function(){if(html)_slice.call(html);});$def($def.P+$def.F*buggySlice,'Array',{slice:function slice(begin,end){var len=toLength(this.length),klass=cof(this);end=end===undefined?len:end;if(klass=='Array')return _slice.call(this,begin,end);var start=toIndex(begin,len),upTo=toIndex(end,len),size=toLength(upTo-start),cloned=Array(size),i=0;for(;i<size;i++){cloned[i]=klass=='String'?this.charAt(start+i):this[start+i];}return cloned;}});$def($def.P+$def.F*(IObject!=Object),'Array',{join:function join(){return _join.apply(IObject(this),arguments);}}); // 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
  $def($def.S,'Array',{isArray:_dereq_(37)});var createArrayReduce=function createArrayReduce(isRight){return function(callbackfn,memo){aFunction(callbackfn);var O=IObject(this),length=toLength(O.length),index=isRight?length-1:0,i=isRight?-1:1;if(arguments.length<2)for(;;){if(index in O){memo=O[index];index+=i;break;}index+=i;if(isRight?index<0:length<=index){throw TypeError('Reduce of empty array with no initial value');}}for(;isRight?index>=0:length>index;index+=i){if(index in O){memo=callbackfn(memo,O[index],index,this);}}return memo;};};var methodize=function methodize($fn){return function(arg1 /*, arg2 = undefined */){return $fn(this,arg1,arguments[1]);};};$def($def.P,'Array',{ // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach:$.each=$.each||methodize(arrayMethod(0)), // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map:methodize(arrayMethod(1)), // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter:methodize(arrayMethod(2)), // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some:methodize(arrayMethod(3)), // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every:methodize(arrayMethod(4)), // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce:createArrayReduce(false), // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight:createArrayReduce(true), // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf:methodize($indexOf), // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf:function lastIndexOf(el,fromIndex /* = @[*-1] */){var O=toIObject(this),length=toLength(O.length),index=length-1;if(arguments.length>1)index=Math.min(index,toInteger(fromIndex));if(index<0)index=toLength(length+index);for(;index>=0;index--){if(index in O)if(O[index]===el)return index;}return -1;}}); // 20.3.3.1 / 15.9.4.4 Date.now()
  $def($def.S,'Date',{now:function now(){return +new Date();}});var lz=function lz(num){return num>9?num:'0'+num;}; // 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
  // PhantomJS and old webkit had a broken Date implementation.
  var date=new Date(-5e13-1),brokenDate=!(date.toISOString&&date.toISOString()=='0385-07-25T07:06:39.999Z'&&fails(function(){new Date(NaN).toISOString();}));$def($def.P+$def.F*brokenDate,'Date',{toISOString:function toISOString(){if(!isFinite(this))throw RangeError('Invalid time value');var d=this,y=d.getUTCFullYear(),m=d.getUTCMilliseconds(),s=y<0?'-':y>9999?'+':'';return s+('00000'+Math.abs(y)).slice(s?-6:-4)+'-'+lz(d.getUTCMonth()+1)+'-'+lz(d.getUTCDate())+'T'+lz(d.getUTCHours())+':'+lz(d.getUTCMinutes())+':'+lz(d.getUTCSeconds())+'.'+(m>99?m:'0'+lz(m))+'Z';}});},{"12":12,"19":19,"21":21,"22":22,"25":25,"3":3,"31":31,"33":33,"34":34,"35":35,"37":37,"39":39,"47":47,"5":5,"61":61,"77":77,"78":78,"79":79,"8":8,"80":80,"81":81,"83":83,"9":9}],87:[function(_dereq_,module,exports){ // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
  'use strict';var $def=_dereq_(19);$def($def.P,'Array',{copyWithin:_dereq_(6)});_dereq_(4)('copyWithin');},{"19":19,"4":4,"6":6}],88:[function(_dereq_,module,exports){ // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
  var $def=_dereq_(19);$def($def.P,'Array',{fill:_dereq_(7)});_dereq_(4)('fill');},{"19":19,"4":4,"7":7}],89:[function(_dereq_,module,exports){'use strict'; // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
  var KEY='findIndex',$def=_dereq_(19),forced=true,$find=_dereq_(9)(6); // Shouldn't skip holes
  if(KEY in [])Array(1)[KEY](function(){forced=false;});$def($def.P+$def.F*forced,'Array',{findIndex:function findIndex(callbackfn /*, that = undefined */){return $find(this,callbackfn,arguments.length>1?arguments[1]:undefined);}});_dereq_(4)(KEY);},{"19":19,"4":4,"9":9}],90:[function(_dereq_,module,exports){'use strict'; // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
  var KEY='find',$def=_dereq_(19),forced=true,$find=_dereq_(9)(5); // Shouldn't skip holes
  if(KEY in [])Array(1)[KEY](function(){forced=false;});$def($def.P+$def.F*forced,'Array',{find:function find(callbackfn /*, that = undefined */){return $find(this,callbackfn,arguments.length>1?arguments[1]:undefined);}});_dereq_(4)(KEY);},{"19":19,"4":4,"9":9}],91:[function(_dereq_,module,exports){'use strict';var ctx=_dereq_(18),$def=_dereq_(19),toObject=_dereq_(81),call=_dereq_(41),isArrayIter=_dereq_(36),toLength=_dereq_(80),getIterFn=_dereq_(85);$def($def.S+$def.F*!_dereq_(44)(function(iter){Array.from(iter);}),'Array',{ // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from:function from(arrayLike /*, mapfn = undefined, thisArg = undefined*/){var O=toObject(arrayLike),C=typeof this=='function'?this:Array,$$=arguments,$$len=$$.length,mapfn=$$len>1?$$[1]:undefined,mapping=mapfn!==undefined,index=0,iterFn=getIterFn(O),length,result,step,iterator;if(mapping)mapfn=ctx(mapfn,$$len>2?$$[2]:undefined,2); // if object isn't iterable or it's array with default iterator - use simple case
  if(iterFn!=undefined&&!(C==Array&&isArrayIter(iterFn))){for(iterator=iterFn.call(O),result=new C();!(step=iterator.next()).done;index++){result[index]=mapping?call(iterator,mapfn,[step.value,index],true):step.value;}}else {length=toLength(O.length);for(result=new C(length);length>index;index++){result[index]=mapping?mapfn(O[index],index):O[index];}}result.length=index;return result;}});},{"18":18,"19":19,"36":36,"41":41,"44":44,"80":80,"81":81,"85":85}],92:[function(_dereq_,module,exports){'use strict';var addToUnscopables=_dereq_(4),step=_dereq_(45),Iterators=_dereq_(46),toIObject=_dereq_(79); // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  module.exports=_dereq_(43)(Array,'Array',function(iterated,kind){this._t=toIObject(iterated); // target
  this._i=0; // next index
  this._k=kind; // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  },function(){var O=this._t,kind=this._k,index=this._i++;if(!O||index>=O.length){this._t=undefined;return step(1);}if(kind=='keys')return step(0,index);if(kind=='values')return step(0,O[index]);return step(0,[index,O[index]]);},'values'); // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  Iterators.Arguments=Iterators.Array;addToUnscopables('keys');addToUnscopables('values');addToUnscopables('entries');},{"4":4,"43":43,"45":45,"46":46,"79":79}],93:[function(_dereq_,module,exports){'use strict';var $def=_dereq_(19); // WebKit Array.of isn't generic
  $def($def.S+$def.F*_dereq_(25)(function(){function F(){}return !(Array.of.call(F) instanceof F);}),'Array',{ // 22.1.2.3 Array.of( ...items)
  of:function of() /* ...args */{var index=0,$$=arguments,$$len=$$.length,result=new (typeof this=='function'?this:Array)($$len);while($$len>index){result[index]=$$[index++];}result.length=$$len;return result;}});},{"19":19,"25":25}],94:[function(_dereq_,module,exports){_dereq_(66)('Array');},{"66":66}],95:[function(_dereq_,module,exports){'use strict';var $=_dereq_(47),isObject=_dereq_(39),HAS_INSTANCE=_dereq_(84)('hasInstance'),FunctionProto=Function.prototype; // 19.2.3.6 Function.prototype[@@hasInstance](V)
  if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto,HAS_INSTANCE,{value:function value(O){if(typeof this!='function'||!isObject(O))return false;if(!isObject(this.prototype))return O instanceof this; // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O=$.getProto(O)){if(this.prototype===O)return true;}return false;}});},{"39":39,"47":47,"84":84}],96:[function(_dereq_,module,exports){var setDesc=_dereq_(47).setDesc,createDesc=_dereq_(61),has=_dereq_(31),FProto=Function.prototype,nameRE=/^\s*function ([^ (]*)/,NAME='name'; // 19.2.4.2 name
  NAME in FProto||_dereq_(21)&&setDesc(FProto,NAME,{configurable:true,get:function get(){var match=(''+this).match(nameRE),name=match?match[1]:'';has(this,NAME)||setDesc(this,NAME,createDesc(5,name));return name;}});},{"21":21,"31":31,"47":47,"61":61}],97:[function(_dereq_,module,exports){'use strict';var strong=_dereq_(13); // 23.1 Map Objects
  _dereq_(16)('Map',function(get){return function Map(){return get(this,arguments.length>0?arguments[0]:undefined);};},{ // 23.1.3.6 Map.prototype.get(key)
  get:function get(key){var entry=strong.getEntry(this,key);return entry&&entry.v;}, // 23.1.3.9 Map.prototype.set(key, value)
  set:function set(key,value){return strong.def(this,key===0?0:key,value);}},strong,true);},{"13":13,"16":16}],98:[function(_dereq_,module,exports){ // 20.2.2.3 Math.acosh(x)
  var $def=_dereq_(19),log1p=_dereq_(51),sqrt=Math.sqrt,$acosh=Math.acosh; // V8 bug https://code.google.com/p/v8/issues/detail?id=3509
  $def($def.S+$def.F*!($acosh&&Math.floor($acosh(Number.MAX_VALUE))==710),'Math',{acosh:function acosh(x){return (x=+x)<1?NaN:x>94906265.62425156?Math.log(x)+Math.LN2:log1p(x-1+sqrt(x-1)*sqrt(x+1));}});},{"19":19,"51":51}],99:[function(_dereq_,module,exports){ // 20.2.2.5 Math.asinh(x)
  var $def=_dereq_(19);function asinh(x){return !isFinite(x=+x)||x==0?x:x<0?-asinh(-x):Math.log(x+Math.sqrt(x*x+1));}$def($def.S,'Math',{asinh:asinh});},{"19":19}],100:[function(_dereq_,module,exports){ // 20.2.2.7 Math.atanh(x)
  var $def=_dereq_(19);$def($def.S,'Math',{atanh:function atanh(x){return (x=+x)==0?x:Math.log((1+x)/(1-x))/2;}});},{"19":19}],101:[function(_dereq_,module,exports){ // 20.2.2.9 Math.cbrt(x)
  var $def=_dereq_(19),sign=_dereq_(52);$def($def.S,'Math',{cbrt:function cbrt(x){return sign(x=+x)*Math.pow(Math.abs(x),1/3);}});},{"19":19,"52":52}],102:[function(_dereq_,module,exports){ // 20.2.2.11 Math.clz32(x)
  var $def=_dereq_(19);$def($def.S,'Math',{clz32:function clz32(x){return (x>>>=0)?31-Math.floor(Math.log(x+0.5)*Math.LOG2E):32;}});},{"19":19}],103:[function(_dereq_,module,exports){ // 20.2.2.12 Math.cosh(x)
  var $def=_dereq_(19),exp=Math.exp;$def($def.S,'Math',{cosh:function cosh(x){return (exp(x=+x)+exp(-x))/2;}});},{"19":19}],104:[function(_dereq_,module,exports){ // 20.2.2.14 Math.expm1(x)
  var $def=_dereq_(19);$def($def.S,'Math',{expm1:_dereq_(50)});},{"19":19,"50":50}],105:[function(_dereq_,module,exports){ // 20.2.2.16 Math.fround(x)
  var $def=_dereq_(19),sign=_dereq_(52),pow=Math.pow,EPSILON=pow(2,-52),EPSILON32=pow(2,-23),MAX32=pow(2,127)*(2-EPSILON32),MIN32=pow(2,-126);var roundTiesToEven=function roundTiesToEven(n){return n+1/EPSILON-1/EPSILON;};$def($def.S,'Math',{fround:function fround(x){var $abs=Math.abs(x),$sign=sign(x),a,result;if($abs<MIN32)return $sign*roundTiesToEven($abs/MIN32/EPSILON32)*MIN32*EPSILON32;a=(1+EPSILON32/EPSILON)*$abs;result=a-(a-$abs);if(result>MAX32||result!=result)return $sign*Infinity;return $sign*result;}});},{"19":19,"52":52}],106:[function(_dereq_,module,exports){ // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
  var $def=_dereq_(19),abs=Math.abs;$def($def.S,'Math',{hypot:function hypot(value1,value2){ // eslint-disable-line no-unused-vars
  var sum=0,i=0,$$=arguments,$$len=$$.length,larg=0,arg,div;while(i<$$len){arg=abs($$[i++]);if(larg<arg){div=larg/arg;sum=sum*div*div+1;larg=arg;}else if(arg>0){div=arg/larg;sum+=div*div;}else sum+=arg;}return larg===Infinity?Infinity:larg*Math.sqrt(sum);}});},{"19":19}],107:[function(_dereq_,module,exports){ // 20.2.2.18 Math.imul(x, y)
  var $def=_dereq_(19),$imul=Math.imul; // some WebKit versions fails with big numbers, some has wrong arity
  $def($def.S+$def.F*_dereq_(25)(function(){return $imul(0xffffffff,5)!=-5||$imul.length!=2;}),'Math',{imul:function imul(x,y){var UINT16=0xffff,xn=+x,yn=+y,xl=UINT16&xn,yl=UINT16&yn;return 0|xl*yl+((UINT16&xn>>>16)*yl+xl*(UINT16&yn>>>16)<<16>>>0);}});},{"19":19,"25":25}],108:[function(_dereq_,module,exports){ // 20.2.2.21 Math.log10(x)
  var $def=_dereq_(19);$def($def.S,'Math',{log10:function log10(x){return Math.log(x)/Math.LN10;}});},{"19":19}],109:[function(_dereq_,module,exports){ // 20.2.2.20 Math.log1p(x)
  var $def=_dereq_(19);$def($def.S,'Math',{log1p:_dereq_(51)});},{"19":19,"51":51}],110:[function(_dereq_,module,exports){ // 20.2.2.22 Math.log2(x)
  var $def=_dereq_(19);$def($def.S,'Math',{log2:function log2(x){return Math.log(x)/Math.LN2;}});},{"19":19}],111:[function(_dereq_,module,exports){ // 20.2.2.28 Math.sign(x)
  var $def=_dereq_(19);$def($def.S,'Math',{sign:_dereq_(52)});},{"19":19,"52":52}],112:[function(_dereq_,module,exports){ // 20.2.2.30 Math.sinh(x)
  var $def=_dereq_(19),expm1=_dereq_(50),exp=Math.exp; // V8 near Chromium 38 has a problem with very small numbers
  $def($def.S+$def.F*_dereq_(25)(function(){return !Math.sinh(-2e-17)!=-2e-17;}),'Math',{sinh:function sinh(x){return Math.abs(x=+x)<1?(expm1(x)-expm1(-x))/2:(exp(x-1)-exp(-x-1))*(Math.E/2);}});},{"19":19,"25":25,"50":50}],113:[function(_dereq_,module,exports){ // 20.2.2.33 Math.tanh(x)
  var $def=_dereq_(19),expm1=_dereq_(50),exp=Math.exp;$def($def.S,'Math',{tanh:function tanh(x){var a=expm1(x=+x),b=expm1(-x);return a==Infinity?1:b==Infinity?-1:(a-b)/(exp(x)+exp(-x));}});},{"19":19,"50":50}],114:[function(_dereq_,module,exports){ // 20.2.2.34 Math.trunc(x)
  var $def=_dereq_(19);$def($def.S,'Math',{trunc:function trunc(it){return (it>0?Math.floor:Math.ceil)(it);}});},{"19":19}],115:[function(_dereq_,module,exports){'use strict';var $=_dereq_(47),global=_dereq_(30),has=_dereq_(31),cof=_dereq_(12),toPrimitive=_dereq_(82),fails=_dereq_(25),$trim=_dereq_(75).trim,NUMBER='Number',$Number=global[NUMBER],Base=$Number,proto=$Number.prototype // Opera ~12 has broken Object#toString
  ,BROKEN_COF=cof($.create(proto))==NUMBER,TRIM='trim' in String.prototype; // 7.1.3 ToNumber(argument)
  var toNumber=function toNumber(argument){var it=toPrimitive(argument,false);if(typeof it=='string'&&it.length>2){it=TRIM?it.trim():$trim(it,3);var first=it.charCodeAt(0),third,radix,maxCode;if(first===43||first===45){third=it.charCodeAt(2);if(third===88||third===120)return NaN; // Number('+0x1') should be NaN, old V8 fix
  }else if(first===48){switch(it.charCodeAt(1)){case 66:case 98:radix=2;maxCode=49;break; // fast equal /^0b[01]+$/i
  case 79:case 111:radix=8;maxCode=55;break; // fast equal /^0o[0-7]+$/i
  default:return +it;}for(var digits=it.slice(2),i=0,l=digits.length,code;i<l;i++){code=digits.charCodeAt(i); // parseInt parses a string to a first unavailable symbol
  // but ToNumber should return NaN if a string contains unavailable symbols
  if(code<48||code>maxCode)return NaN;}return parseInt(digits,radix);}}return +it;};if(!$Number(' 0o1')||!$Number('0b1')||$Number('+0x1')){$Number=function Number(value){var it=arguments.length<1?0:value,that=this;return that instanceof $Number // check on 1..constructor(foo) case
  &&(BROKEN_COF?fails(function(){proto.valueOf.call(that);}):cof(that)!=NUMBER)?new Base(toNumber(it)):toNumber(it);};$.each.call(_dereq_(21)?$.getNames(Base):( // ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,'+ // ES6 (in case, if modules with ES6 Number statics required before):
  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,'+'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','),function(key){if(has(Base,key)&&!has($Number,key)){$.setDesc($Number,key,$.getDesc(Base,key));}});$Number.prototype=proto;proto.constructor=$Number;_dereq_(62)(global,NUMBER,$Number);}},{"12":12,"21":21,"25":25,"30":30,"31":31,"47":47,"62":62,"75":75,"82":82}],116:[function(_dereq_,module,exports){ // 20.1.2.1 Number.EPSILON
  var $def=_dereq_(19);$def($def.S,'Number',{EPSILON:Math.pow(2,-52)});},{"19":19}],117:[function(_dereq_,module,exports){ // 20.1.2.2 Number.isFinite(number)
  var $def=_dereq_(19),_isFinite=_dereq_(30).isFinite;$def($def.S,'Number',{isFinite:function isFinite(it){return typeof it=='number'&&_isFinite(it);}});},{"19":19,"30":30}],118:[function(_dereq_,module,exports){ // 20.1.2.3 Number.isInteger(number)
  var $def=_dereq_(19);$def($def.S,'Number',{isInteger:_dereq_(38)});},{"19":19,"38":38}],119:[function(_dereq_,module,exports){ // 20.1.2.4 Number.isNaN(number)
  var $def=_dereq_(19);$def($def.S,'Number',{isNaN:function isNaN(number){return number!=number;}});},{"19":19}],120:[function(_dereq_,module,exports){ // 20.1.2.5 Number.isSafeInteger(number)
  var $def=_dereq_(19),isInteger=_dereq_(38),abs=Math.abs;$def($def.S,'Number',{isSafeInteger:function isSafeInteger(number){return isInteger(number)&&abs(number)<=0x1fffffffffffff;}});},{"19":19,"38":38}],121:[function(_dereq_,module,exports){ // 20.1.2.6 Number.MAX_SAFE_INTEGER
  var $def=_dereq_(19);$def($def.S,'Number',{MAX_SAFE_INTEGER:0x1fffffffffffff});},{"19":19}],122:[function(_dereq_,module,exports){ // 20.1.2.10 Number.MIN_SAFE_INTEGER
  var $def=_dereq_(19);$def($def.S,'Number',{MIN_SAFE_INTEGER:-0x1fffffffffffff});},{"19":19}],123:[function(_dereq_,module,exports){ // 20.1.2.12 Number.parseFloat(string)
  var $def=_dereq_(19);$def($def.S,'Number',{parseFloat:parseFloat});},{"19":19}],124:[function(_dereq_,module,exports){ // 20.1.2.13 Number.parseInt(string, radix)
  var $def=_dereq_(19);$def($def.S,'Number',{parseInt:parseInt});},{"19":19}],125:[function(_dereq_,module,exports){ // 19.1.3.1 Object.assign(target, source)
  var $def=_dereq_(19);$def($def.S+$def.F,'Object',{assign:_dereq_(55)});},{"19":19,"55":55}],126:[function(_dereq_,module,exports){ // 19.1.2.5 Object.freeze(O)
  var isObject=_dereq_(39);_dereq_(56)('freeze',function($freeze){return function freeze(it){return $freeze&&isObject(it)?$freeze(it):it;};});},{"39":39,"56":56}],127:[function(_dereq_,module,exports){ // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  var toIObject=_dereq_(79);_dereq_(56)('getOwnPropertyDescriptor',function($getOwnPropertyDescriptor){return function getOwnPropertyDescriptor(it,key){return $getOwnPropertyDescriptor(toIObject(it),key);};});},{"56":56,"79":79}],128:[function(_dereq_,module,exports){ // 19.1.2.7 Object.getOwnPropertyNames(O)
  _dereq_(56)('getOwnPropertyNames',function(){return _dereq_(29).get;});},{"29":29,"56":56}],129:[function(_dereq_,module,exports){ // 19.1.2.9 Object.getPrototypeOf(O)
  var toObject=_dereq_(81);_dereq_(56)('getPrototypeOf',function($getPrototypeOf){return function getPrototypeOf(it){return $getPrototypeOf(toObject(it));};});},{"56":56,"81":81}],130:[function(_dereq_,module,exports){ // 19.1.2.11 Object.isExtensible(O)
  var isObject=_dereq_(39);_dereq_(56)('isExtensible',function($isExtensible){return function isExtensible(it){return isObject(it)?$isExtensible?$isExtensible(it):true:false;};});},{"39":39,"56":56}],131:[function(_dereq_,module,exports){ // 19.1.2.12 Object.isFrozen(O)
  var isObject=_dereq_(39);_dereq_(56)('isFrozen',function($isFrozen){return function isFrozen(it){return isObject(it)?$isFrozen?$isFrozen(it):false:true;};});},{"39":39,"56":56}],132:[function(_dereq_,module,exports){ // 19.1.2.13 Object.isSealed(O)
  var isObject=_dereq_(39);_dereq_(56)('isSealed',function($isSealed){return function isSealed(it){return isObject(it)?$isSealed?$isSealed(it):false:true;};});},{"39":39,"56":56}],133:[function(_dereq_,module,exports){ // 19.1.3.10 Object.is(value1, value2)
  var $def=_dereq_(19);$def($def.S,'Object',{is:_dereq_(64)});},{"19":19,"64":64}],134:[function(_dereq_,module,exports){ // 19.1.2.14 Object.keys(O)
  var toObject=_dereq_(81);_dereq_(56)('keys',function($keys){return function keys(it){return $keys(toObject(it));};});},{"56":56,"81":81}],135:[function(_dereq_,module,exports){ // 19.1.2.15 Object.preventExtensions(O)
  var isObject=_dereq_(39);_dereq_(56)('preventExtensions',function($preventExtensions){return function preventExtensions(it){return $preventExtensions&&isObject(it)?$preventExtensions(it):it;};});},{"39":39,"56":56}],136:[function(_dereq_,module,exports){ // 19.1.2.17 Object.seal(O)
  var isObject=_dereq_(39);_dereq_(56)('seal',function($seal){return function seal(it){return $seal&&isObject(it)?$seal(it):it;};});},{"39":39,"56":56}],137:[function(_dereq_,module,exports){ // 19.1.3.19 Object.setPrototypeOf(O, proto)
  var $def=_dereq_(19);$def($def.S,'Object',{setPrototypeOf:_dereq_(65).set});},{"19":19,"65":65}],138:[function(_dereq_,module,exports){'use strict'; // 19.1.3.6 Object.prototype.toString()
  var classof=_dereq_(11),test={};test[_dereq_(84)('toStringTag')]='z';if(test+''!='[object z]'){_dereq_(62)(Object.prototype,'toString',function toString(){return '[object '+classof(this)+']';},true);}},{"11":11,"62":62,"84":84}],139:[function(_dereq_,module,exports){'use strict';var $=_dereq_(47),LIBRARY=_dereq_(49),global=_dereq_(30),ctx=_dereq_(18),classof=_dereq_(11),$def=_dereq_(19),isObject=_dereq_(39),anObject=_dereq_(5),aFunction=_dereq_(3),strictNew=_dereq_(70),forOf=_dereq_(28),setProto=_dereq_(65).set,same=_dereq_(64),SPECIES=_dereq_(84)('species'),speciesConstructor=_dereq_(69),RECORD=_dereq_(83)('record'),asap=_dereq_(53),PROMISE='Promise',process=global.process,isNode=classof(process)=='process',P=global[PROMISE],Wrapper;var testResolve=function testResolve(sub){var test=new P(function(){});if(sub)test.constructor=Object;return P.resolve(test)===test;};var useNative=function(){var works=false;function P2(x){var self=new P(x);setProto(self,P2.prototype);return self;}try{works=P&&P.resolve&&testResolve();setProto(P2,P);P2.prototype=$.create(P.prototype,{constructor:{value:P2}}); // actual Firefox has broken subclass support, test that
  if(!(P2.resolve(5).then(function(){}) instanceof P2)){works=false;} // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
  if(works&&_dereq_(21)){var thenableThenGotten=false;P.resolve($.setDesc({},'then',{get:function get(){thenableThenGotten=true;}}));works=thenableThenGotten;}}catch(e){works=false;}return works;}(); // helpers
  var isPromise=function isPromise(it){return isObject(it)&&(useNative?classof(it)=='Promise':RECORD in it);};var sameConstructor=function sameConstructor(a,b){ // library wrapper special case
  if(LIBRARY&&a===P&&b===Wrapper)return true;return same(a,b);};var getConstructor=function getConstructor(C){var S=anObject(C)[SPECIES];return S!=undefined?S:C;};var isThenable=function isThenable(it){var then;return isObject(it)&&typeof (then=it.then)=='function'?then:false;};var notify=function notify(record,isReject){if(record.n)return;record.n=true;var chain=record.c;asap(function(){var value=record.v,ok=record.s==1,i=0;var run=function run(react){var cb=ok?react.ok:react.fail,ret,then;try{if(cb){if(!ok)record.h=true;ret=cb===true?value:cb(value);if(ret===react.P){react.rej(TypeError('Promise-chain cycle'));}else if(then=isThenable(ret)){then.call(ret,react.res,react.rej);}else react.res(ret);}else react.rej(value);}catch(err){react.rej(err);}};while(chain.length>i){run(chain[i++]);} // variable length - can't use forEach
  chain.length=0;record.n=false;if(isReject)setTimeout(function(){var promise=record.p,handler,console;if(isUnhandled(promise)){if(isNode){process.emit('unhandledRejection',value,promise);}else if(handler=global.onunhandledrejection){handler({promise:promise,reason:value});}else if((console=global.console)&&console.error){console.error('Unhandled promise rejection',value);}}record.a=undefined;},1);});};var isUnhandled=function isUnhandled(promise){var record=promise[RECORD],chain=record.a||record.c,i=0,react;if(record.h)return false;while(chain.length>i){react=chain[i++];if(react.fail||!isUnhandled(react.P))return false;}return true;};var $reject=function $reject(value){var record=this;if(record.d)return;record.d=true;record=record.r||record; // unwrap
  record.v=value;record.s=2;record.a=record.c.slice();notify(record,true);};var $resolve=function $resolve(value){var record=this,then;if(record.d)return;record.d=true;record=record.r||record; // unwrap
  try{if(then=isThenable(value)){asap(function(){var wrapper={r:record,d:false}; // wrap
  try{then.call(value,ctx($resolve,wrapper,1),ctx($reject,wrapper,1));}catch(e){$reject.call(wrapper,e);}});}else {record.v=value;record.s=1;notify(record,false);}}catch(e){$reject.call({r:record,d:false},e); // wrap
  }}; // constructor polyfill
  if(!useNative){ // 25.4.3.1 Promise(executor)
  P=function Promise(executor){aFunction(executor);var record={p:strictNew(this,P,PROMISE), // <- promise
  c:[], // <- awaiting reactions
  a:undefined, // <- checked in isUnhandled reactions
  s:0, // <- state
  d:false, // <- done
  v:undefined, // <- value
  h:false, // <- handled rejection
  n:false // <- notify
  };this[RECORD]=record;try{executor(ctx($resolve,record,1),ctx($reject,record,1));}catch(err){$reject.call(record,err);}};_dereq_(54)(P.prototype,{ // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
  then:function then(onFulfilled,onRejected){var react={ok:typeof onFulfilled=='function'?onFulfilled:true,fail:typeof onRejected=='function'?onRejected:false};var promise=react.P=new (speciesConstructor(this,P))(function(res,rej){react.res=res;react.rej=rej;});aFunction(react.res);aFunction(react.rej);var record=this[RECORD];record.c.push(react);if(record.a)record.a.push(react);if(record.s)notify(record,false);return promise;}, // 25.4.5.1 Promise.prototype.catch(onRejected)
  'catch':function _catch(onRejected){return this.then(undefined,onRejected);}});} // export
  $def($def.G+$def.W+$def.F*!useNative,{Promise:P});_dereq_(67)(P,PROMISE);_dereq_(66)(PROMISE);Wrapper=_dereq_(17)[PROMISE]; // statics
  $def($def.S+$def.F*!useNative,PROMISE,{ // 25.4.4.5 Promise.reject(r)
  reject:function reject(r){return new this(function(res,rej){rej(r);});}});$def($def.S+$def.F*(!useNative||testResolve(true)),PROMISE,{ // 25.4.4.6 Promise.resolve(x)
  resolve:function resolve(x){return isPromise(x)&&sameConstructor(x.constructor,this)?x:new this(function(res){res(x);});}});$def($def.S+$def.F*!(useNative&&_dereq_(44)(function(iter){P.all(iter)['catch'](function(){});})),PROMISE,{ // 25.4.4.1 Promise.all(iterable)
  all:function all(iterable){var C=getConstructor(this),values=[];return new C(function(res,rej){forOf(iterable,false,values.push,values);var remaining=values.length,results=Array(remaining);if(remaining)$.each.call(values,function(promise,index){C.resolve(promise).then(function(value){results[index]=value;--remaining||res(results);},rej);});else res(results);});}, // 25.4.4.4 Promise.race(iterable)
  race:function race(iterable){var C=getConstructor(this);return new C(function(res,rej){forOf(iterable,false,function(promise){C.resolve(promise).then(res,rej);});});}});},{"11":11,"17":17,"18":18,"19":19,"21":21,"28":28,"3":3,"30":30,"39":39,"44":44,"47":47,"49":49,"5":5,"53":53,"54":54,"64":64,"65":65,"66":66,"67":67,"69":69,"70":70,"83":83,"84":84}],140:[function(_dereq_,module,exports){ // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
  var $def=_dereq_(19),_apply=Function.apply;$def($def.S,'Reflect',{apply:function apply(target,thisArgument,argumentsList){return _apply.call(target,thisArgument,argumentsList);}});},{"19":19}],141:[function(_dereq_,module,exports){ // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
  var $=_dereq_(47),$def=_dereq_(19),aFunction=_dereq_(3),anObject=_dereq_(5),isObject=_dereq_(39),bind=Function.bind||_dereq_(17).Function.prototype.bind; // MS Edge supports only 2 arguments
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it
  $def($def.S+$def.F*_dereq_(25)(function(){function F(){}return !(Reflect.construct(function(){},[],F) instanceof F);}),'Reflect',{construct:function construct(Target,args /*, newTarget*/){aFunction(Target);var newTarget=arguments.length<3?Target:aFunction(arguments[2]);if(Target==newTarget){ // w/o altered newTarget, optimization for 0-4 arguments
  if(args!=undefined)switch(anObject(args).length){case 0:return new Target();case 1:return new Target(args[0]);case 2:return new Target(args[0],args[1]);case 3:return new Target(args[0],args[1],args[2]);case 4:return new Target(args[0],args[1],args[2],args[3]);} // w/o altered newTarget, lot of arguments case
  var $args=[null];$args.push.apply($args,args);return new (bind.apply(Target,$args))();} // with altered newTarget, not support built-in constructors
  var proto=newTarget.prototype,instance=$.create(isObject(proto)?proto:Object.prototype),result=Function.apply.call(Target,instance,args);return isObject(result)?result:instance;}});},{"17":17,"19":19,"25":25,"3":3,"39":39,"47":47,"5":5}],142:[function(_dereq_,module,exports){ // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
  var $=_dereq_(47),$def=_dereq_(19),anObject=_dereq_(5); // MS Edge has broken Reflect.defineProperty - throwing instead of returning false
  $def($def.S+$def.F*_dereq_(25)(function(){Reflect.defineProperty($.setDesc({},1,{value:1}),1,{value:2});}),'Reflect',{defineProperty:function defineProperty(target,propertyKey,attributes){anObject(target);try{$.setDesc(target,propertyKey,attributes);return true;}catch(e){return false;}}});},{"19":19,"25":25,"47":47,"5":5}],143:[function(_dereq_,module,exports){ // 26.1.4 Reflect.deleteProperty(target, propertyKey)
  var $def=_dereq_(19),getDesc=_dereq_(47).getDesc,anObject=_dereq_(5);$def($def.S,'Reflect',{deleteProperty:function deleteProperty(target,propertyKey){var desc=getDesc(anObject(target),propertyKey);return desc&&!desc.configurable?false:delete target[propertyKey];}});},{"19":19,"47":47,"5":5}],144:[function(_dereq_,module,exports){'use strict'; // 26.1.5 Reflect.enumerate(target)
  var $def=_dereq_(19),anObject=_dereq_(5);var Enumerate=function Enumerate(iterated){this._t=anObject(iterated); // target
  this._i=0; // next index
  var keys=this._k=[] // keys
  ,key;for(key in iterated){keys.push(key);}};_dereq_(42)(Enumerate,'Object',function(){var that=this,keys=that._k,key;do {if(that._i>=keys.length)return {value:undefined,done:true};}while(!((key=keys[that._i++]) in that._t));return {value:key,done:false};});$def($def.S,'Reflect',{enumerate:function enumerate(target){return new Enumerate(target);}});},{"19":19,"42":42,"5":5}],145:[function(_dereq_,module,exports){ // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
  var $=_dereq_(47),$def=_dereq_(19),anObject=_dereq_(5);$def($def.S,'Reflect',{getOwnPropertyDescriptor:function getOwnPropertyDescriptor(target,propertyKey){return $.getDesc(anObject(target),propertyKey);}});},{"19":19,"47":47,"5":5}],146:[function(_dereq_,module,exports){ // 26.1.8 Reflect.getPrototypeOf(target)
  var $def=_dereq_(19),getProto=_dereq_(47).getProto,anObject=_dereq_(5);$def($def.S,'Reflect',{getPrototypeOf:function getPrototypeOf(target){return getProto(anObject(target));}});},{"19":19,"47":47,"5":5}],147:[function(_dereq_,module,exports){ // 26.1.6 Reflect.get(target, propertyKey [, receiver])
  var $=_dereq_(47),has=_dereq_(31),$def=_dereq_(19),isObject=_dereq_(39),anObject=_dereq_(5);function get(target,propertyKey /*, receiver*/){var receiver=arguments.length<3?target:arguments[2],desc,proto;if(anObject(target)===receiver)return target[propertyKey];if(desc=$.getDesc(target,propertyKey))return has(desc,'value')?desc.value:desc.get!==undefined?desc.get.call(receiver):undefined;if(isObject(proto=$.getProto(target)))return get(proto,propertyKey,receiver);}$def($def.S,'Reflect',{get:get});},{"19":19,"31":31,"39":39,"47":47,"5":5}],148:[function(_dereq_,module,exports){ // 26.1.9 Reflect.has(target, propertyKey)
  var $def=_dereq_(19);$def($def.S,'Reflect',{has:function has(target,propertyKey){return propertyKey in target;}});},{"19":19}],149:[function(_dereq_,module,exports){ // 26.1.10 Reflect.isExtensible(target)
  var $def=_dereq_(19),anObject=_dereq_(5),$isExtensible=Object.isExtensible;$def($def.S,'Reflect',{isExtensible:function isExtensible(target){anObject(target);return $isExtensible?$isExtensible(target):true;}});},{"19":19,"5":5}],150:[function(_dereq_,module,exports){ // 26.1.11 Reflect.ownKeys(target)
  var $def=_dereq_(19);$def($def.S,'Reflect',{ownKeys:_dereq_(58)});},{"19":19,"58":58}],151:[function(_dereq_,module,exports){ // 26.1.12 Reflect.preventExtensions(target)
  var $def=_dereq_(19),anObject=_dereq_(5),$preventExtensions=Object.preventExtensions;$def($def.S,'Reflect',{preventExtensions:function preventExtensions(target){anObject(target);try{if($preventExtensions)$preventExtensions(target);return true;}catch(e){return false;}}});},{"19":19,"5":5}],152:[function(_dereq_,module,exports){ // 26.1.14 Reflect.setPrototypeOf(target, proto)
  var $def=_dereq_(19),setProto=_dereq_(65);if(setProto)$def($def.S,'Reflect',{setPrototypeOf:function setPrototypeOf(target,proto){setProto.check(target,proto);try{setProto.set(target,proto);return true;}catch(e){return false;}}});},{"19":19,"65":65}],153:[function(_dereq_,module,exports){ // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
  var $=_dereq_(47),has=_dereq_(31),$def=_dereq_(19),createDesc=_dereq_(61),anObject=_dereq_(5),isObject=_dereq_(39);function set(target,propertyKey,V /*, receiver*/){var receiver=arguments.length<4?target:arguments[3],ownDesc=$.getDesc(anObject(target),propertyKey),existingDescriptor,proto;if(!ownDesc){if(isObject(proto=$.getProto(target))){return set(proto,propertyKey,V,receiver);}ownDesc=createDesc(0);}if(has(ownDesc,'value')){if(ownDesc.writable===false||!isObject(receiver))return false;existingDescriptor=$.getDesc(receiver,propertyKey)||createDesc(0);existingDescriptor.value=V;$.setDesc(receiver,propertyKey,existingDescriptor);return true;}return ownDesc.set===undefined?false:(ownDesc.set.call(receiver,V),true);}$def($def.S,'Reflect',{set:set});},{"19":19,"31":31,"39":39,"47":47,"5":5,"61":61}],154:[function(_dereq_,module,exports){var $=_dereq_(47),global=_dereq_(30),isRegExp=_dereq_(40),$flags=_dereq_(27),$RegExp=global.RegExp,Base=$RegExp,proto=$RegExp.prototype,re1=/a/g,re2=/a/g // "new" creates a new object, old webkit buggy here
  ,CORRECT_NEW=new $RegExp(re1)!==re1;if(_dereq_(21)&&(!CORRECT_NEW||_dereq_(25)(function(){re2[_dereq_(84)('match')]=false; // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1)!=re1||$RegExp(re2)==re2||$RegExp(re1,'i')!='/a/i';}))){$RegExp=function RegExp(p,f){var piRE=isRegExp(p),fiU=f===undefined;return !(this instanceof $RegExp)&&piRE&&p.constructor===$RegExp&&fiU?p:CORRECT_NEW?new Base(piRE&&!fiU?p.source:p,f):Base((piRE=p instanceof $RegExp)?p.source:p,piRE&&fiU?$flags.call(p):f);};$.each.call($.getNames(Base),function(key){key in $RegExp||$.setDesc($RegExp,key,{configurable:true,get:function get(){return Base[key];},set:function set(it){Base[key]=it;}});});proto.constructor=$RegExp;$RegExp.prototype=proto;_dereq_(62)(global,'RegExp',$RegExp);}_dereq_(66)('RegExp');},{"21":21,"25":25,"27":27,"30":30,"40":40,"47":47,"62":62,"66":66,"84":84}],155:[function(_dereq_,module,exports){ // 21.2.5.3 get RegExp.prototype.flags()
  var $=_dereq_(47);if(_dereq_(21)&&/./g.flags!='g')$.setDesc(RegExp.prototype,'flags',{configurable:true,get:_dereq_(27)});},{"21":21,"27":27,"47":47}],156:[function(_dereq_,module,exports){ // @@match logic
  _dereq_(26)('match',1,function(defined,MATCH){ // 21.1.3.11 String.prototype.match(regexp)
  return function match(regexp){'use strict';var O=defined(this),fn=regexp==undefined?undefined:regexp[MATCH];return fn!==undefined?fn.call(regexp,O):new RegExp(regexp)[MATCH](String(O));};});},{"26":26}],157:[function(_dereq_,module,exports){ // @@replace logic
  _dereq_(26)('replace',2,function(defined,REPLACE,$replace){ // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return function replace(searchValue,replaceValue){'use strict';var O=defined(this),fn=searchValue==undefined?undefined:searchValue[REPLACE];return fn!==undefined?fn.call(searchValue,O,replaceValue):$replace.call(String(O),searchValue,replaceValue);};});},{"26":26}],158:[function(_dereq_,module,exports){ // @@search logic
  _dereq_(26)('search',1,function(defined,SEARCH){ // 21.1.3.15 String.prototype.search(regexp)
  return function search(regexp){'use strict';var O=defined(this),fn=regexp==undefined?undefined:regexp[SEARCH];return fn!==undefined?fn.call(regexp,O):new RegExp(regexp)[SEARCH](String(O));};});},{"26":26}],159:[function(_dereq_,module,exports){ // @@split logic
  _dereq_(26)('split',2,function(defined,SPLIT,$split){ // 21.1.3.17 String.prototype.split(separator, limit)
  return function split(separator,limit){'use strict';var O=defined(this),fn=separator==undefined?undefined:separator[SPLIT];return fn!==undefined?fn.call(separator,O,limit):$split.call(String(O),separator,limit);};});},{"26":26}],160:[function(_dereq_,module,exports){'use strict';var strong=_dereq_(13); // 23.2 Set Objects
  _dereq_(16)('Set',function(get){return function Set(){return get(this,arguments.length>0?arguments[0]:undefined);};},{ // 23.2.3.1 Set.prototype.add(value)
  add:function add(value){return strong.def(this,value=value===0?0:value,value);}},strong);},{"13":13,"16":16}],161:[function(_dereq_,module,exports){'use strict';var $def=_dereq_(19),$at=_dereq_(71)(false);$def($def.P,'String',{ // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt:function codePointAt(pos){return $at(this,pos);}});},{"19":19,"71":71}],162:[function(_dereq_,module,exports){ // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
  'use strict';var $def=_dereq_(19),toLength=_dereq_(80),context=_dereq_(72),ENDS_WITH='endsWith',$endsWith=''[ENDS_WITH];$def($def.P+$def.F*_dereq_(24)(ENDS_WITH),'String',{endsWith:function endsWith(searchString /*, endPosition = @length */){var that=context(this,searchString,ENDS_WITH),$$=arguments,endPosition=$$.length>1?$$[1]:undefined,len=toLength(that.length),end=endPosition===undefined?len:Math.min(toLength(endPosition),len),search=String(searchString);return $endsWith?$endsWith.call(that,search,end):that.slice(end-search.length,end)===search;}});},{"19":19,"24":24,"72":72,"80":80}],163:[function(_dereq_,module,exports){var $def=_dereq_(19),toIndex=_dereq_(77),fromCharCode=String.fromCharCode,$fromCodePoint=String.fromCodePoint; // length should be 1, old FF problem
  $def($def.S+$def.F*(!!$fromCodePoint&&$fromCodePoint.length!=1),'String',{ // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint:function fromCodePoint(x){ // eslint-disable-line no-unused-vars
  var res=[],$$=arguments,$$len=$$.length,i=0,code;while($$len>i){code=+$$[i++];if(toIndex(code,0x10ffff)!==code)throw RangeError(code+' is not a valid code point');res.push(code<0x10000?fromCharCode(code):fromCharCode(((code-=0x10000)>>10)+0xd800,code%0x400+0xdc00));}return res.join('');}});},{"19":19,"77":77}],164:[function(_dereq_,module,exports){ // 21.1.3.7 String.prototype.includes(searchString, position = 0)
  'use strict';var $def=_dereq_(19),context=_dereq_(72),INCLUDES='includes';$def($def.P+$def.F*_dereq_(24)(INCLUDES),'String',{includes:function includes(searchString /*, position = 0 */){return !! ~context(this,searchString,INCLUDES).indexOf(searchString,arguments.length>1?arguments[1]:undefined);}});},{"19":19,"24":24,"72":72}],165:[function(_dereq_,module,exports){'use strict';var $at=_dereq_(71)(true); // 21.1.3.27 String.prototype[@@iterator]()
  _dereq_(43)(String,'String',function(iterated){this._t=String(iterated); // target
  this._i=0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
  },function(){var O=this._t,index=this._i,point;if(index>=O.length)return {value:undefined,done:true};point=$at(O,index);this._i+=point.length;return {value:point,done:false};});},{"43":43,"71":71}],166:[function(_dereq_,module,exports){var $def=_dereq_(19),toIObject=_dereq_(79),toLength=_dereq_(80);$def($def.S,'String',{ // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw:function raw(callSite){var tpl=toIObject(callSite.raw),len=toLength(tpl.length),$$=arguments,$$len=$$.length,res=[],i=0;while(len>i){res.push(String(tpl[i++]));if(i<$$len)res.push(String($$[i]));}return res.join('');}});},{"19":19,"79":79,"80":80}],167:[function(_dereq_,module,exports){var $def=_dereq_(19);$def($def.P,'String',{ // 21.1.3.13 String.prototype.repeat(count)
  repeat:_dereq_(74)});},{"19":19,"74":74}],168:[function(_dereq_,module,exports){ // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
  'use strict';var $def=_dereq_(19),toLength=_dereq_(80),context=_dereq_(72),STARTS_WITH='startsWith',$startsWith=''[STARTS_WITH];$def($def.P+$def.F*_dereq_(24)(STARTS_WITH),'String',{startsWith:function startsWith(searchString /*, position = 0 */){var that=context(this,searchString,STARTS_WITH),$$=arguments,index=toLength(Math.min($$.length>1?$$[1]:undefined,that.length)),search=String(searchString);return $startsWith?$startsWith.call(that,search,index):that.slice(index,index+search.length)===search;}});},{"19":19,"24":24,"72":72,"80":80}],169:[function(_dereq_,module,exports){'use strict'; // 21.1.3.25 String.prototype.trim()
  _dereq_(75)('trim',function($trim){return function trim(){return $trim(this,3);};});},{"75":75}],170:[function(_dereq_,module,exports){'use strict'; // ECMAScript 6 symbols shim
  var $=_dereq_(47),global=_dereq_(30),has=_dereq_(31),DESCRIPTORS=_dereq_(21),$def=_dereq_(19),$redef=_dereq_(62),$fails=_dereq_(25),shared=_dereq_(68),setToStringTag=_dereq_(67),uid=_dereq_(83),wks=_dereq_(84),keyOf=_dereq_(48),$names=_dereq_(29),enumKeys=_dereq_(23),isArray=_dereq_(37),anObject=_dereq_(5),toIObject=_dereq_(79),createDesc=_dereq_(61),getDesc=$.getDesc,setDesc=$.setDesc,_create=$.create,getNames=$names.get,$Symbol=global.Symbol,$JSON=global.JSON,_stringify=$JSON&&$JSON.stringify,setter=false,HIDDEN=wks('_hidden'),isEnum=$.isEnum,SymbolRegistry=shared('symbol-registry'),AllSymbols=shared('symbols'),useNative=typeof $Symbol=='function',ObjectProto=Object.prototype; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDesc=DESCRIPTORS&&$fails(function(){return _create(setDesc({},'a',{get:function get(){return setDesc(this,'a',{value:7}).a;}})).a!=7;})?function(it,key,D){var protoDesc=getDesc(ObjectProto,key);if(protoDesc)delete ObjectProto[key];setDesc(it,key,D);if(protoDesc&&it!==ObjectProto)setDesc(ObjectProto,key,protoDesc);}:setDesc;var wrap=function wrap(tag){var sym=AllSymbols[tag]=_create($Symbol.prototype);sym._k=tag;DESCRIPTORS&&setter&&setSymbolDesc(ObjectProto,tag,{configurable:true,set:function set(value){if(has(this,HIDDEN)&&has(this[HIDDEN],tag))this[HIDDEN][tag]=false;setSymbolDesc(this,tag,createDesc(1,value));}});return sym;};var isSymbol=function isSymbol(it){return (typeof it==="undefined"?"undefined":babelHelpers.typeof(it))=='symbol';};var $defineProperty=function defineProperty(it,key,D){if(D&&has(AllSymbols,key)){if(!D.enumerable){if(!has(it,HIDDEN))setDesc(it,HIDDEN,createDesc(1,{}));it[HIDDEN][key]=true;}else {if(has(it,HIDDEN)&&it[HIDDEN][key])it[HIDDEN][key]=false;D=_create(D,{enumerable:createDesc(0,false)});}return setSymbolDesc(it,key,D);}return setDesc(it,key,D);};var $defineProperties=function defineProperties(it,P){anObject(it);var keys=enumKeys(P=toIObject(P)),i=0,l=keys.length,key;while(l>i){$defineProperty(it,key=keys[i++],P[key]);}return it;};var $create=function create(it,P){return P===undefined?_create(it):$defineProperties(_create(it),P);};var $propertyIsEnumerable=function propertyIsEnumerable(key){var E=isEnum.call(this,key);return E||!has(this,key)||!has(AllSymbols,key)||has(this,HIDDEN)&&this[HIDDEN][key]?E:true;};var $getOwnPropertyDescriptor=function getOwnPropertyDescriptor(it,key){var D=getDesc(it=toIObject(it),key);if(D&&has(AllSymbols,key)&&!(has(it,HIDDEN)&&it[HIDDEN][key]))D.enumerable=true;return D;};var $getOwnPropertyNames=function getOwnPropertyNames(it){var names=getNames(toIObject(it)),result=[],i=0,key;while(names.length>i){if(!has(AllSymbols,key=names[i++])&&key!=HIDDEN)result.push(key);}return result;};var $getOwnPropertySymbols=function getOwnPropertySymbols(it){var names=getNames(toIObject(it)),result=[],i=0,key;while(names.length>i){if(has(AllSymbols,key=names[i++]))result.push(AllSymbols[key]);}return result;};var $stringify=function stringify(it){if(it===undefined||isSymbol(it))return; // IE8 returns string on undefined
  var args=[it],i=1,$$=arguments,replacer,$replacer;while($$.length>i){args.push($$[i++]);}replacer=args[1];if(typeof replacer=='function')$replacer=replacer;if($replacer||!isArray(replacer))replacer=function replacer(key,value){if($replacer)value=$replacer.call(this,key,value);if(!isSymbol(value))return value;};args[1]=replacer;return _stringify.apply($JSON,args);};var buggyJSON=$fails(function(){var S=$Symbol(); // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S])!='[null]'||_stringify({a:S})!='{}'||_stringify(Object(S))!='{}';}); // 19.4.1.1 Symbol([description])
  if(!useNative){$Symbol=function _Symbol2(){if(isSymbol(this))throw TypeError('Symbol is not a constructor');return wrap(uid(arguments.length>0?arguments[0]:undefined));};$redef($Symbol.prototype,'toString',function toString(){return this._k;});isSymbol=function isSymbol(it){return it instanceof $Symbol;};$.create=$create;$.isEnum=$propertyIsEnumerable;$.getDesc=$getOwnPropertyDescriptor;$.setDesc=$defineProperty;$.setDescs=$defineProperties;$.getNames=$names.get=$getOwnPropertyNames;$.getSymbols=$getOwnPropertySymbols;if(DESCRIPTORS&&!_dereq_(49)){$redef(ObjectProto,'propertyIsEnumerable',$propertyIsEnumerable,true);}}var symbolStatics={ // 19.4.2.1 Symbol.for(key)
  'for':function _for(key){return has(SymbolRegistry,key+='')?SymbolRegistry[key]:SymbolRegistry[key]=$Symbol(key);}, // 19.4.2.5 Symbol.keyFor(sym)
  keyFor:function keyFor(key){return keyOf(SymbolRegistry,key);},useSetter:function useSetter(){setter=true;},useSimple:function useSimple(){setter=false;}}; // 19.4.2.2 Symbol.hasInstance
  // 19.4.2.3 Symbol.isConcatSpreadable
  // 19.4.2.4 Symbol.iterator
  // 19.4.2.6 Symbol.match
  // 19.4.2.8 Symbol.replace
  // 19.4.2.9 Symbol.search
  // 19.4.2.10 Symbol.species
  // 19.4.2.11 Symbol.split
  // 19.4.2.12 Symbol.toPrimitive
  // 19.4.2.13 Symbol.toStringTag
  // 19.4.2.14 Symbol.unscopables
  $.each.call(('hasInstance,isConcatSpreadable,iterator,match,replace,search,'+'species,split,toPrimitive,toStringTag,unscopables').split(','),function(it){var sym=wks(it);symbolStatics[it]=useNative?sym:wrap(sym);});setter=true;$def($def.G+$def.W,{Symbol:$Symbol});$def($def.S,'Symbol',symbolStatics);$def($def.S+$def.F*!useNative,'Object',{ // 19.1.2.2 Object.create(O [, Properties])
  create:$create, // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty:$defineProperty, // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties:$defineProperties, // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor:$getOwnPropertyDescriptor, // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames:$getOwnPropertyNames, // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols:$getOwnPropertySymbols}); // 24.3.2 JSON.stringify(value [, replacer [, space]])
  $JSON&&$def($def.S+$def.F*(!useNative||buggyJSON),'JSON',{stringify:$stringify}); // 19.4.3.5 Symbol.prototype[@@toStringTag]
  setToStringTag($Symbol,'Symbol'); // 20.2.1.9 Math[@@toStringTag]
  setToStringTag(Math,'Math',true); // 24.3.3 JSON[@@toStringTag]
  setToStringTag(global.JSON,'JSON',true);},{"19":19,"21":21,"23":23,"25":25,"29":29,"30":30,"31":31,"37":37,"47":47,"48":48,"49":49,"5":5,"61":61,"62":62,"67":67,"68":68,"79":79,"83":83,"84":84}],171:[function(_dereq_,module,exports){'use strict';var $=_dereq_(47),redef=_dereq_(62),weak=_dereq_(15),isObject=_dereq_(39),has=_dereq_(31),frozenStore=weak.frozenStore,WEAK=weak.WEAK,isExtensible=Object.isExtensible||isObject,tmp={}; // 23.3 WeakMap Objects
  var $WeakMap=_dereq_(16)('WeakMap',function(get){return function WeakMap(){return get(this,arguments.length>0?arguments[0]:undefined);};},{ // 23.3.3.3 WeakMap.prototype.get(key)
  get:function get(key){if(isObject(key)){if(!isExtensible(key))return frozenStore(this).get(key);if(has(key,WEAK))return key[WEAK][this._i];}}, // 23.3.3.5 WeakMap.prototype.set(key, value)
  set:function set(key,value){return weak.def(this,key,value);}},weak,true,true); // IE11 WeakMap frozen keys fix
  if(new $WeakMap().set((Object.freeze||Object)(tmp),7).get(tmp)!=7){$.each.call(['delete','has','get','set'],function(key){var proto=$WeakMap.prototype,method=proto[key];redef(proto,key,function(a,b){ // store frozen objects on leaky map
  if(isObject(a)&&!isExtensible(a)){var result=frozenStore(this)[key](a,b);return key=='set'?this:result; // store all the rest on native weakmap
  }return method.call(this,a,b);});});}},{"15":15,"16":16,"31":31,"39":39,"47":47,"62":62}],172:[function(_dereq_,module,exports){'use strict';var weak=_dereq_(15); // 23.4 WeakSet Objects
  _dereq_(16)('WeakSet',function(get){return function WeakSet(){return get(this,arguments.length>0?arguments[0]:undefined);};},{ // 23.4.3.1 WeakSet.prototype.add(value)
  add:function add(value){return weak.def(this,value,true);}},weak,false,true);},{"15":15,"16":16}],173:[function(_dereq_,module,exports){'use strict';var $def=_dereq_(19),$includes=_dereq_(8)(true);$def($def.P,'Array',{ // https://github.com/domenic/Array.prototype.includes
  includes:function includes(el /*, fromIndex = 0 */){return $includes(this,el,arguments.length>1?arguments[1]:undefined);}});_dereq_(4)('includes');},{"19":19,"4":4,"8":8}],174:[function(_dereq_,module,exports){ // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  var $def=_dereq_(19);$def($def.P,'Map',{toJSON:_dereq_(14)('Map')});},{"14":14,"19":19}],175:[function(_dereq_,module,exports){ // http://goo.gl/XkBrjD
  var $def=_dereq_(19),$entries=_dereq_(57)(true);$def($def.S,'Object',{entries:function entries(it){return $entries(it);}});},{"19":19,"57":57}],176:[function(_dereq_,module,exports){ // https://gist.github.com/WebReflection/9353781
  var $=_dereq_(47),$def=_dereq_(19),ownKeys=_dereq_(58),toIObject=_dereq_(79),createDesc=_dereq_(61);$def($def.S,'Object',{getOwnPropertyDescriptors:function getOwnPropertyDescriptors(object){var O=toIObject(object),setDesc=$.setDesc,getDesc=$.getDesc,keys=ownKeys(O),result={},i=0,key,D;while(keys.length>i){D=getDesc(O,key=keys[i++]);if(key in result)setDesc(result,key,createDesc(0,D));else result[key]=D;}return result;}});},{"19":19,"47":47,"58":58,"61":61,"79":79}],177:[function(_dereq_,module,exports){ // http://goo.gl/XkBrjD
  var $def=_dereq_(19),$values=_dereq_(57)(false);$def($def.S,'Object',{values:function values(it){return $values(it);}});},{"19":19,"57":57}],178:[function(_dereq_,module,exports){ // https://github.com/benjamingr/RexExp.escape
  var $def=_dereq_(19),$re=_dereq_(63)(/[\\^$*+?.()|[\]{}]/g,'\\$&');$def($def.S,'RegExp',{escape:function escape(it){return $re(it);}});},{"19":19,"63":63}],179:[function(_dereq_,module,exports){ // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  var $def=_dereq_(19);$def($def.P,'Set',{toJSON:_dereq_(14)('Set')});},{"14":14,"19":19}],180:[function(_dereq_,module,exports){ // https://github.com/mathiasbynens/String.prototype.at
  'use strict';var $def=_dereq_(19),$at=_dereq_(71)(true);$def($def.P,'String',{at:function at(pos){return $at(this,pos);}});},{"19":19,"71":71}],181:[function(_dereq_,module,exports){'use strict';var $def=_dereq_(19),$pad=_dereq_(73);$def($def.P,'String',{padLeft:function padLeft(maxLength /*, fillString = ' ' */){return $pad(this,maxLength,arguments.length>1?arguments[1]:undefined,true);}});},{"19":19,"73":73}],182:[function(_dereq_,module,exports){'use strict';var $def=_dereq_(19),$pad=_dereq_(73);$def($def.P,'String',{padRight:function padRight(maxLength /*, fillString = ' ' */){return $pad(this,maxLength,arguments.length>1?arguments[1]:undefined,false);}});},{"19":19,"73":73}],183:[function(_dereq_,module,exports){'use strict'; // https://github.com/sebmarkbage/ecmascript-string-left-right-trim
  _dereq_(75)('trimLeft',function($trim){return function trimLeft(){return $trim(this,1);};});},{"75":75}],184:[function(_dereq_,module,exports){'use strict'; // https://github.com/sebmarkbage/ecmascript-string-left-right-trim
  _dereq_(75)('trimRight',function($trim){return function trimRight(){return $trim(this,2);};});},{"75":75}],185:[function(_dereq_,module,exports){ // JavaScript 1.6 / Strawman array statics shim
  var $=_dereq_(47),$def=_dereq_(19),$ctx=_dereq_(18),$Array=_dereq_(17).Array||Array,statics={};var setStatics=function setStatics(keys,length){$.each.call(keys.split(','),function(key){if(length==undefined&&key in $Array)statics[key]=$Array[key];else if(key in [])statics[key]=$ctx(Function.call,[][key],length);});};setStatics('pop,reverse,shift,keys,values,entries',1);setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes',3);setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,'+'reduce,reduceRight,copyWithin,fill');$def($def.S,'Array',statics);},{"17":17,"18":18,"19":19,"47":47}],186:[function(_dereq_,module,exports){_dereq_(92);var global=_dereq_(30),hide=_dereq_(32),Iterators=_dereq_(46),ITERATOR=_dereq_(84)('iterator'),NL=global.NodeList,HTC=global.HTMLCollection,NLProto=NL&&NL.prototype,HTCProto=HTC&&HTC.prototype,ArrayValues=Iterators.NodeList=Iterators.HTMLCollection=Iterators.Array;if(NL&&!(ITERATOR in NLProto))hide(NLProto,ITERATOR,ArrayValues);if(HTC&&!(ITERATOR in HTCProto))hide(HTCProto,ITERATOR,ArrayValues);},{"30":30,"32":32,"46":46,"84":84,"92":92}],187:[function(_dereq_,module,exports){var $def=_dereq_(19),$task=_dereq_(76);$def($def.G+$def.B,{setImmediate:$task.set,clearImmediate:$task.clear});},{"19":19,"76":76}],188:[function(_dereq_,module,exports){ // ie9- setTimeout & setInterval additional parameters fix
  var global=_dereq_(30),$def=_dereq_(19),invoke=_dereq_(34),partial=_dereq_(59),navigator=global.navigator,MSIE=!!navigator&&/MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
  var wrap=function wrap(set){return MSIE?function(fn,time /*, ...args */){return set(invoke(partial,[].slice.call(arguments,2),typeof fn=='function'?fn:Function(fn)),time);}:set;};$def($def.G+$def.B+$def.F*MSIE,{setTimeout:wrap(global.setTimeout),setInterval:wrap(global.setInterval)});},{"19":19,"30":30,"34":34,"59":59}],189:[function(_dereq_,module,exports){_dereq_(86);_dereq_(170);_dereq_(125);_dereq_(133);_dereq_(137);_dereq_(138);_dereq_(126);_dereq_(136);_dereq_(135);_dereq_(131);_dereq_(132);_dereq_(130);_dereq_(127);_dereq_(129);_dereq_(134);_dereq_(128);_dereq_(96);_dereq_(95);_dereq_(115);_dereq_(116);_dereq_(117);_dereq_(118);_dereq_(119);_dereq_(120);_dereq_(121);_dereq_(122);_dereq_(123);_dereq_(124);_dereq_(98);_dereq_(99);_dereq_(100);_dereq_(101);_dereq_(102);_dereq_(103);_dereq_(104);_dereq_(105);_dereq_(106);_dereq_(107);_dereq_(108);_dereq_(109);_dereq_(110);_dereq_(111);_dereq_(112);_dereq_(113);_dereq_(114);_dereq_(163);_dereq_(166);_dereq_(169);_dereq_(165);_dereq_(161);_dereq_(162);_dereq_(164);_dereq_(167);_dereq_(168);_dereq_(91);_dereq_(93);_dereq_(92);_dereq_(94);_dereq_(87);_dereq_(88);_dereq_(90);_dereq_(89);_dereq_(154);_dereq_(155);_dereq_(156);_dereq_(157);_dereq_(158);_dereq_(159);_dereq_(139);_dereq_(97);_dereq_(160);_dereq_(171);_dereq_(172);_dereq_(140);_dereq_(141);_dereq_(142);_dereq_(143);_dereq_(144);_dereq_(147);_dereq_(145);_dereq_(146);_dereq_(148);_dereq_(149);_dereq_(150);_dereq_(151);_dereq_(153);_dereq_(152);_dereq_(173);_dereq_(180);_dereq_(181);_dereq_(182);_dereq_(183);_dereq_(184);_dereq_(178);_dereq_(176);_dereq_(177);_dereq_(175);_dereq_(174);_dereq_(179);_dereq_(185);_dereq_(188);_dereq_(187);_dereq_(186);module.exports=_dereq_(17);},{"100":100,"101":101,"102":102,"103":103,"104":104,"105":105,"106":106,"107":107,"108":108,"109":109,"110":110,"111":111,"112":112,"113":113,"114":114,"115":115,"116":116,"117":117,"118":118,"119":119,"120":120,"121":121,"122":122,"123":123,"124":124,"125":125,"126":126,"127":127,"128":128,"129":129,"130":130,"131":131,"132":132,"133":133,"134":134,"135":135,"136":136,"137":137,"138":138,"139":139,"140":140,"141":141,"142":142,"143":143,"144":144,"145":145,"146":146,"147":147,"148":148,"149":149,"150":150,"151":151,"152":152,"153":153,"154":154,"155":155,"156":156,"157":157,"158":158,"159":159,"160":160,"161":161,"162":162,"163":163,"164":164,"165":165,"166":166,"167":167,"168":168,"169":169,"17":17,"170":170,"171":171,"172":172,"173":173,"174":174,"175":175,"176":176,"177":177,"178":178,"179":179,"180":180,"181":181,"182":182,"183":183,"184":184,"185":185,"186":186,"187":187,"188":188,"86":86,"87":87,"88":88,"89":89,"90":90,"91":91,"92":92,"93":93,"94":94,"95":95,"96":96,"97":97,"98":98,"99":99}],190:[function(_dereq_,module,exports){(function(global){ /**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
   * additional grant of patent rights can be found in the PATENTS file in
   * the same directory.
   */!function(global){"use strict";var hasOwn=Object.prototype.hasOwnProperty;var undefined; // More compressible than void 0.
  var iteratorSymbol=typeof Symbol==="function"&&Symbol.iterator||"@@iterator";var inModule=(typeof module==="undefined"?"undefined":babelHelpers.typeof(module))==="object";var runtime=global.regeneratorRuntime;if(runtime){if(inModule){ // If regeneratorRuntime is defined globally and we're in a module,
  // make the exports object identical to regeneratorRuntime.
  module.exports=runtime;} // Don't bother evaluating the rest of this file if the runtime was
  // already defined globally.
  return;} // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime=global.regeneratorRuntime=inModule?module.exports:{};function wrap(innerFn,outerFn,self,tryLocsList){ // If outerFn provided, then outerFn.prototype instanceof Generator.
  var generator=Object.create((outerFn||Generator).prototype);var context=new Context(tryLocsList||[]); // The ._invoke method unifies the implementations of the .next,
  // .throw, and .return methods.
  generator._invoke=makeInvokeMethod(innerFn,self,context);return generator;}runtime.wrap=wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn,obj,arg){try{return {type:"normal",arg:fn.call(obj,arg)};}catch(err){return {type:"throw",arg:err};}}var GenStateSuspendedStart="suspendedStart";var GenStateSuspendedYield="suspendedYield";var GenStateExecuting="executing";var GenStateCompleted="completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel={}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var Gp=GeneratorFunctionPrototype.prototype=Generator.prototype;GeneratorFunction.prototype=Gp.constructor=GeneratorFunctionPrototype;GeneratorFunctionPrototype.constructor=GeneratorFunction;GeneratorFunction.displayName="GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype){["next","throw","return"].forEach(function(method){prototype[method]=function(arg){return this._invoke(method,arg);};});}runtime.isGeneratorFunction=function(genFun){var ctor=typeof genFun==="function"&&genFun.constructor;return ctor?ctor===GeneratorFunction|| // For the native GeneratorFunction constructor, the best we can
  // do is to check its .name property.
  (ctor.displayName||ctor.name)==="GeneratorFunction":false;};runtime.mark=function(genFun){if(Object.setPrototypeOf){Object.setPrototypeOf(genFun,GeneratorFunctionPrototype);}else {genFun.__proto__=GeneratorFunctionPrototype;}genFun.prototype=Object.create(Gp);return genFun;}; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap=function(arg){return new AwaitArgument(arg);};function AwaitArgument(arg){this.arg=arg;}function AsyncIterator(generator){ // This invoke function is written in a style that assumes some
  // calling function (or Promise) will handle exceptions.
  function invoke(method,arg){var result=generator[method](arg);var value=result.value;return value instanceof AwaitArgument?Promise.resolve(value.arg).then(invokeNext,invokeThrow):Promise.resolve(value).then(function(unwrapped){ // When a yielded Promise is resolved, its final value becomes
  // the .value of the Promise<{value,done}> result for the
  // current iteration. If the Promise is rejected, however, the
  // result for this iteration will be rejected with the same
  // reason. Note that rejections of yielded Promises are not
  // thrown back into the generator function, as is the case
  // when an awaited Promise is rejected. This difference in
  // behavior between yield and await is important, because it
  // allows the consumer to decide what to do with the yielded
  // rejection (swallow it and continue, manually .throw it back
  // into the generator, abandon iteration, whatever). With
  // await, by contrast, there is no opportunity to examine the
  // rejection reason outside the generator function, so the
  // only option is to throw it from the await expression, and
  // let the generator function handle the exception.
  result.value=unwrapped;return result;});}if((typeof process==="undefined"?"undefined":babelHelpers.typeof(process))==="object"&&process.domain){invoke=process.domain.bind(invoke);}var invokeNext=invoke.bind(generator,"next");var invokeThrow=invoke.bind(generator,"throw");var invokeReturn=invoke.bind(generator,"return");var previousPromise;function enqueue(method,arg){function callInvokeWithMethodAndArg(){return invoke(method,arg);}return previousPromise= // If enqueue has been called before, then we want to wait until
  // all previous Promises have been resolved before calling invoke,
  // so that results are always delivered in the correct order. If
  // enqueue has not been called before, then it is important to
  // call invoke immediately, without waiting on a callback to fire,
  // so that the async generator function has the opportunity to do
  // any necessary setup in a predictable way. This predictability
  // is why the Promise constructor synchronously invokes its
  // executor callback, and why async functions synchronously
  // execute code before the first await. Since we implement simple
  // async functions in terms of async generators, it is especially
  // important to get this right, even though it requires care.
  previousPromise?previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
  // invocations of the iterator.
  callInvokeWithMethodAndArg):new Promise(function(resolve){resolve(callInvokeWithMethodAndArg());});} // Define the unified helper method that is used to implement .next,
  // .throw, and .return (see defineIteratorMethods).
  this._invoke=enqueue;}defineIteratorMethods(AsyncIterator.prototype); // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async=function(innerFn,outerFn,self,tryLocsList){var iter=new AsyncIterator(wrap(innerFn,outerFn,self,tryLocsList));return runtime.isGeneratorFunction(outerFn)?iter // If outerFn is a generator, return the full iterator.
  :iter.next().then(function(result){return result.done?result.value:iter.next();});};function makeInvokeMethod(innerFn,self,context){var state=GenStateSuspendedStart;return function invoke(method,arg){if(state===GenStateExecuting){throw new Error("Generator is already running");}if(state===GenStateCompleted){if(method==="throw"){throw arg;} // Be forgiving, per 25.3.3.3.3 of the spec:
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
  return doneResult();}while(true){var delegate=context.delegate;if(delegate){if(method==="return"||method==="throw"&&delegate.iterator[method]===undefined){ // A return or throw (when the delegate iterator has no throw
  // method) always terminates the yield* loop.
  context.delegate=null; // If the delegate iterator has a return method, give it a
  // chance to clean up.
  var returnMethod=delegate.iterator["return"];if(returnMethod){var record=tryCatch(returnMethod,delegate.iterator,arg);if(record.type==="throw"){ // If the return method threw an exception, let that
  // exception prevail over the original return or throw.
  method="throw";arg=record.arg;continue;}}if(method==="return"){ // Continue with the outer return, now that the delegate
  // iterator has been terminated.
  continue;}}var record=tryCatch(delegate.iterator[method],delegate.iterator,arg);if(record.type==="throw"){context.delegate=null; // Like returning generator.throw(uncaught), but without the
  // overhead of an extra function call.
  method="throw";arg=record.arg;continue;} // Delegate generator ran and handled its own exceptions so
  // regardless of what the method was, we continue as if it is
  // "next" with an undefined arg.
  method="next";arg=undefined;var info=record.arg;if(info.done){context[delegate.resultName]=info.value;context.next=delegate.nextLoc;}else {state=GenStateSuspendedYield;return info;}context.delegate=null;}if(method==="next"){context._sent=arg;if(state===GenStateSuspendedYield){context.sent=arg;}else {context.sent=undefined;}}else if(method==="throw"){if(state===GenStateSuspendedStart){state=GenStateCompleted;throw arg;}if(context.dispatchException(arg)){ // If the dispatched exception was caught by a catch block,
  // then let that catch block handle the exception normally.
  method="next";arg=undefined;}}else if(method==="return"){context.abrupt("return",arg);}state=GenStateExecuting;var record=tryCatch(innerFn,self,context);if(record.type==="normal"){ // If an exception is thrown from innerFn, we leave state ===
  // GenStateExecuting and loop back for another invocation.
  state=context.done?GenStateCompleted:GenStateSuspendedYield;var info={value:record.arg,done:context.done};if(record.arg===ContinueSentinel){if(context.delegate&&method==="next"){ // Deliberately forget the last sent value so that we don't
  // accidentally pass it on to the delegate.
  arg=undefined;}}else {return info;}}else if(record.type==="throw"){state=GenStateCompleted; // Dispatch the exception by looping back around to the
  // context.dispatchException(arg) call above.
  method="throw";arg=record.arg;}}};} // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);Gp[iteratorSymbol]=function(){return this;};Gp.toString=function(){return "[object Generator]";};function pushTryEntry(locs){var entry={tryLoc:locs[0]};if(1 in locs){entry.catchLoc=locs[1];}if(2 in locs){entry.finallyLoc=locs[2];entry.afterLoc=locs[3];}this.tryEntries.push(entry);}function resetTryEntry(entry){var record=entry.completion||{};record.type="normal";delete record.arg;entry.completion=record;}function Context(tryLocsList){ // The root entry object (effectively a try statement without a catch
  // or a finally block) gives us a place to store values thrown from
  // locations where there is no enclosing try statement.
  this.tryEntries=[{tryLoc:"root"}];tryLocsList.forEach(pushTryEntry,this);this.reset(true);}runtime.keys=function(object){var keys=[];for(var key in object){keys.push(key);}keys.reverse(); // Rather than returning an object with a next method, we keep
  // things simple and return the next function itself.
  return function next(){while(keys.length){var key=keys.pop();if(key in object){next.value=key;next.done=false;return next;}} // To avoid creating an additional object, we just hang the .value
  // and .done properties off the next function object itself. This
  // also ensures that the minifier will not anonymize the function.
  next.done=true;return next;};};function values(iterable){if(iterable){var iteratorMethod=iterable[iteratorSymbol];if(iteratorMethod){return iteratorMethod.call(iterable);}if(typeof iterable.next==="function"){return iterable;}if(!isNaN(iterable.length)){var i=-1,next=function next(){while(++i<iterable.length){if(hasOwn.call(iterable,i)){next.value=iterable[i];next.done=false;return next;}}next.value=undefined;next.done=true;return next;};return next.next=next;}} // Return an iterator with no values.
  return {next:doneResult};}runtime.values=values;function doneResult(){return {value:undefined,done:true};}Context.prototype={constructor:Context,reset:function reset(skipTempReset){this.prev=0;this.next=0;this.sent=undefined;this.done=false;this.delegate=null;this.tryEntries.forEach(resetTryEntry);if(!skipTempReset){for(var name in this){ // Not sure about the optimal order of these conditions:
  if(name.charAt(0)==="t"&&hasOwn.call(this,name)&&!isNaN(+name.slice(1))){this[name]=undefined;}}}},stop:function stop(){this.done=true;var rootEntry=this.tryEntries[0];var rootRecord=rootEntry.completion;if(rootRecord.type==="throw"){throw rootRecord.arg;}return this.rval;},dispatchException:function dispatchException(exception){if(this.done){throw exception;}var context=this;function handle(loc,caught){record.type="throw";record.arg=exception;context.next=loc;return !!caught;}for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];var record=entry.completion;if(entry.tryLoc==="root"){ // Exception thrown outside of any try block that could handle
  // it, so set the completion value of the entire function to
  // throw the exception.
  return handle("end");}if(entry.tryLoc<=this.prev){var hasCatch=hasOwn.call(entry,"catchLoc");var hasFinally=hasOwn.call(entry,"finallyLoc");if(hasCatch&&hasFinally){if(this.prev<entry.catchLoc){return handle(entry.catchLoc,true);}else if(this.prev<entry.finallyLoc){return handle(entry.finallyLoc);}}else if(hasCatch){if(this.prev<entry.catchLoc){return handle(entry.catchLoc,true);}}else if(hasFinally){if(this.prev<entry.finallyLoc){return handle(entry.finallyLoc);}}else {throw new Error("try statement without catch or finally");}}}},abrupt:function abrupt(type,arg){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.tryLoc<=this.prev&&hasOwn.call(entry,"finallyLoc")&&this.prev<entry.finallyLoc){var finallyEntry=entry;break;}}if(finallyEntry&&(type==="break"||type==="continue")&&finallyEntry.tryLoc<=arg&&arg<=finallyEntry.finallyLoc){ // Ignore the finally entry if control is not jumping to a
  // location outside the try/catch block.
  finallyEntry=null;}var record=finallyEntry?finallyEntry.completion:{};record.type=type;record.arg=arg;if(finallyEntry){this.next=finallyEntry.finallyLoc;}else {this.complete(record);}return ContinueSentinel;},complete:function complete(record,afterLoc){if(record.type==="throw"){throw record.arg;}if(record.type==="break"||record.type==="continue"){this.next=record.arg;}else if(record.type==="return"){this.rval=record.arg;this.next="end";}else if(record.type==="normal"&&afterLoc){this.next=afterLoc;}},finish:function finish(finallyLoc){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.finallyLoc===finallyLoc){this.complete(entry.completion,entry.afterLoc);resetTryEntry(entry);return ContinueSentinel;}}},"catch":function _catch(tryLoc){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.tryLoc===tryLoc){var record=entry.completion;if(record.type==="throw"){var thrown=record.arg;resetTryEntry(entry);}return thrown;}} // The context.catch method must only be called with a location
  // argument that corresponds to a known catch block.
  throw new Error("illegal catch attempt");},delegateYield:function delegateYield(iterable,resultName,nextLoc){this.delegate={iterator:values(iterable),resultName:resultName,nextLoc:nextLoc};return ContinueSentinel;}};}( // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  (typeof global==="undefined"?"undefined":babelHelpers.typeof(global))==="object"?global:(typeof window==="undefined"?"undefined":babelHelpers.typeof(window))==="object"?window:(typeof self==="undefined"?"undefined":babelHelpers.typeof(self))==="object"?self:this);}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}]},{},[1]);

  var Util = function () {

    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */

    var transitionEnd = false;
    var _transitionEndSelector = '';

    var TransitionEndEvent = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    function transitionEndTest() {
      if (window.QUnit) {
        return false;
      }

      var el = document.createElement('mdb');

      for (var name in TransitionEndEvent) {
        if (el.style[name] !== undefined) {
          return TransitionEndEvent[name]; // { end: TransitionEndEvent[name] }
        }
      }

      return false;
    }

    function setTransitionEndSupport() {
      transitionEnd = transitionEndTest();

      // generate a concatenated transition end event selector
      for (var name in TransitionEndEvent) {
        _transitionEndSelector += ' ' + TransitionEndEvent[name];
      }
    }

    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */

    var Util = {
      transitionEndSupported: function transitionEndSupported() {
        return transitionEnd;
      },
      transitionEndSelector: function transitionEndSelector() {
        return _transitionEndSelector;
      },
      isChar: function isChar(event) {
        if (typeof event.which === 'undefined') {
          return true;
        } else if (typeof event.which === 'number' && event.which > 0) {
          return !event.ctrlKey && !event.metaKey && !event.altKey && event.which !== 8 // backspace
           && event.which !== 9 // tab
           && event.which !== 13 // enter
           && event.which !== 16 // shift
           && event.which !== 17 // ctrl
           && event.which !== 20 // caps lock
           && event.which !== 27 // escape
          ;
        }
        return false;
      },
      assert: function assert($element, invalidTest, message) {
        if (invalidTest) {
          if (!$element === undefined) {
            $element.css('border', '1px solid red');
          }
          console.error(message, $element); // eslint-disable-line no-console
          throw message;
        }
      },
      describe: function describe($element) {
        if ($element === undefined) {
          return 'undefined';
        } else if ($element.length === 0) {
          return '(no matching elements)';
        }
        return $element[0].outerHTML.split('>')[0] + '>';
      }
    };

    setTransitionEndSupport();
    return Util;
  }(jQuery);

  var Base = function ($) {

    var ClassName = {
      MDB_FORM_GROUP: 'mdb-form-group',
      IS_FILLED: 'is-filled',
      IS_FOCUSED: 'is-focused'
    };

    var Selector = {
      MDB_FORM_GROUP: '.' + ClassName.MDB_FORM_GROUP
    };

    var Default = {};

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Base = function () {

      /**
       *
       * @param element
       * @param config
       * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
       */

      function Base($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        babelHelpers.classCallCheck(this, Base);

        this.$element = $element;
        this.config = $.extend(true, {}, Default, config);

        // set properties for use in the constructor initialization
        for (var key in properties) {
          this[key] = properties[key];
        }
      }

      babelHelpers.createClass(Base, [{
        key: 'dispose',
        value: function dispose(dataKey) {
          $.removeData(this.$element, dataKey);
          this.$element = null;
          this.config = null;
        }

        // ------------------------------------------------------------------------
        // protected

      }, {
        key: 'addFormGroupFocus',
        value: function addFormGroupFocus() {
          if (!this.$element.prop('disabled')) {
            this.$mdbFormGroup.addClass(ClassName.IS_FOCUSED);
          }
        }
      }, {
        key: 'removeFormGroupFocus',
        value: function removeFormGroupFocus() {
          this.$mdbFormGroup.removeClass(ClassName.IS_FOCUSED);
        }
      }, {
        key: 'removeIsFilled',
        value: function removeIsFilled() {
          this.$mdbFormGroup.removeClass(ClassName.IS_FILLED);
        }
      }, {
        key: 'addIsFilled',
        value: function addIsFilled() {
          this.$mdbFormGroup.addClass(ClassName.IS_FILLED);
        }

        // Find mdb-form-group

      }, {
        key: 'findMdbFormGroup',
        value: function findMdbFormGroup() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

          var mfg = this.$element.closest(Selector.MDB_FORM_GROUP);
          if (mfg.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.MDB_FORM_GROUP + ' for ' + Util.describe(this.$element));
          }
          return mfg;
        }

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }]);
      return Base;
    }();

    return Base;
  }(jQuery);

  var BaseInput = function ($) {

    var ClassName = {
      FORM_GROUP: 'form-group',
      MDB_FORM_GROUP: 'mdb-form-group',
      MDB_LABEL: 'mdb-label',
      MDB_LABEL_STATIC: 'mdb-label-static',
      MDB_LABEL_PLACEHOLDER: 'mdb-label-placeholder',
      MDB_LABEL_FLOATING: 'mdb-label-floating',
      HAS_DANGER: 'has-danger',
      IS_FILLED: 'is-filled',
      IS_FOCUSED: 'is-focused'
    };

    var Selector = {
      FORM_GROUP: '.' + ClassName.FORM_GROUP,
      MDB_FORM_GROUP: '.' + ClassName.MDB_FORM_GROUP,
      MDB_LABEL_WILDCARD: 'label[class^=\'' + ClassName.MDB_LABEL + '\'], label[class*=\' ' + ClassName.MDB_LABEL + '\']' // match any label variant if specified
    };

    var Default = {
      validate: false,
      formGroup: {
        required: false
      },
      mdbFormGroup: {
        template: '<span class=\'' + ClassName.MDB_FORM_GROUP + '\'></span>',
        create: true, // create a wrapper if form-group not found
        required: true // not recommended to turn this off, only used for inline components
      },
      label: {
        required: false,

        // Prioritized find order for resolving the label to be used as an mdb-label if not specified in the markup
        //  - a function(thisComponent); or
        //  - a string selector used like $mdbFormGroup.find(selector)
        //
        // Note this only runs if $mdbFormGroup.find(Selector.MDB_LABEL_WILDCARD) fails to find a label (as authored in the markup)
        //
        selectors: ['.form-control-label', // in the case of horizontal or inline forms, this will be marked
        '> label' // usual case for text inputs, first child.  Deeper would find toggle labels so don't do that.
        ],
        className: ClassName.MDB_LABEL_STATIC
      },
      requiredClasses: [],
      invalidComponentMatches: [],
      convertInputSizeVariations: true
    };

    var FormControlSizeMarkers = {
      'form-control-lg': 'mdb-form-group-lg',
      'form-control-sm': 'mdb-form-group-sm'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var BaseInput = function (_Base) {
      babelHelpers.inherits(BaseInput, _Base);

      /**
       *
       * @param element
       * @param config
       * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
       */

      function BaseInput($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        babelHelpers.classCallCheck(this, BaseInput);

        // Enforce no overlap between components to prevent side effects

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BaseInput).call(this, $element, $.extend(true, {}, Default, config), properties));

        _this._rejectInvalidComponentMatches();

        // Enforce expected structure (if any)
        _this.rejectWithoutRequiredStructure();

        // Enforce required classes for a consistent rendering
        _this._rejectWithoutRequiredClasses();

        // Resolve the form-group first, it will be used for mdb-form-group if possible
        //   note: different components have different rules
        _this.$formGroup = _this.findFormGroup(_this.config.formGroup.required);

        // Will add mdb-form-group to form-group or create an mdb-form-group
        //  Performance Note: for those forms that are really performance driven, create the markup with the .mdb-form-group to avoid
        //    rendering changes once added.
        _this.$mdbFormGroup = _this.resolveMdbFormGroup();

        // Resolve and mark the mdbLabel if necessary as defined by the config
        _this.$mdbLabel = _this.resolveMdbLabel();

        // Signal to the mdb-form-group that a form-control-* variation is being used
        _this.resolveMdbFormGroupSizing();

        _this.addFocusListener();
        _this.addChangeListener();
        return _this;
      }

      babelHelpers.createClass(BaseInput, [{
        key: 'dispose',
        value: function dispose(dataKey) {
          babelHelpers.get(Object.getPrototypeOf(BaseInput.prototype), 'dispose', this).call(this, dataKey);
          this.$mdbFormGroup = null;
          this.$formGroup = null;
        }

        // ------------------------------------------------------------------------
        // protected

      }, {
        key: 'rejectWithoutRequiredStructure',
        value: function rejectWithoutRequiredStructure() {
          // implement
        }
      }, {
        key: 'addFocusListener',
        value: function addFocusListener() {
          var _this2 = this;

          this.$element.on('focus', function () {
            _this2.addFormGroupFocus();
          }).on('blur', function () {
            _this2.removeFormGroupFocus();
          });
        }
      }, {
        key: 'addChangeListener',
        value: function addChangeListener() {
          var _this3 = this;

          this.$element.on('keydown paste', function (event) {
            if (Util.isChar(event)) {
              _this3.addIsFilled();
            }
          }).on('keyup change', function () {

            // make sure empty is added back when there is a programmatic value change.
            //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
            if (_this3.isEmpty()) {
              _this3.removeIsFilled();
            } else {
              _this3.addIsFilled();
            }

            if (_this3.config.validate) {
              // Validation events do not bubble, so they must be attached directly to the text: http://jsfiddle.net/PEpRM/1/
              //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
              //  the form-group on change.
              //
              // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
              //        BUT, I've left it here for backwards compatibility.
              var isValid = typeof _this3.$element[0].checkValidity === 'undefined' || _this3.$element[0].checkValidity();
              if (isValid) {
                _this3.removeHasDanger();
              } else {
                _this3.addHasDanger();
              }
            }
          });
        }
      }, {
        key: 'addHasDanger',
        value: function addHasDanger() {
          this.$mdbFormGroup.addClass(ClassName.HAS_DANGER);
        }
      }, {
        key: 'removeHasDanger',
        value: function removeHasDanger() {
          this.$mdbFormGroup.removeClass(ClassName.HAS_DANGER);
        }
      }, {
        key: 'isEmpty',
        value: function isEmpty() {
          return this.$element.val() === null || this.$element.val() === undefined || this.$element.val() === '';
        }

        // Will add mdb-form-group to form-group or create a mdb-form-group if necessary

      }, {
        key: 'resolveMdbFormGroup',
        value: function resolveMdbFormGroup() {
          var mfg = this.findMdbFormGroup(false);
          if (mfg === undefined || mfg.length === 0) {
            if (this.config.mdbFormGroup.create && (this.$formGroup === undefined || this.$formGroup.length === 0)) {
              // If a form-group doesn't exist (not recommended), take a guess and wrap the element (assuming no label).
              //  note: it's possible to make this smarter, but I need to see valid cases before adding any complexity.
              this.outerElement().wrap(this.config.mdbFormGroup.template);
            } else {
              // a form-group does exist, add our marker class to it
              this.$formGroup.addClass(ClassName.MDB_FORM_GROUP);

              // OLD: may want to implement this after all, see how the styling turns out, but using an existing form-group is less manipulation of the dom and therefore preferable
              // A form-group does exist, so add an mdb-form-group wrapping it's internal contents
              //fg.wrapInner(this.config.mdbFormGroup.template)
            }

            mfg = this.findMdbFormGroup(this.config.mdbFormGroup.required);
          }

          return mfg;
        }

        // Demarcation element (e.g. first child of a form-group)
        //  Subclasses such as file inputs may have different structures

      }, {
        key: 'outerElement',
        value: function outerElement() {
          return this.$element;
        }

        // Will add mdb-label to mdb-form-group if not already specified

      }, {
        key: 'resolveMdbLabel',
        value: function resolveMdbLabel() {

          var label = this.$mdbFormGroup.find(Selector.MDB_LABEL_WILDCARD);
          if (label === undefined || label.length === 0) {
            // we need to find it based on the configured selectors
            label = this.findMdbLabel(this.config.label.required);

            if (label === undefined || label.length === 0) {
              // no label found, and finder did not require one
            } else {
                // a candidate label was found, add the configured default class name
                label.addClass(this.config.label.className);
              }
          }

          return label;
        }

        // Find mdb-label variant based on the config selectors

      }, {
        key: 'findMdbLabel',
        value: function findMdbLabel() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

          var label = null;

          // use the specified selector order
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.config.label.selectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var selector = _step.value;

              if ($.isFunction(selector)) {
                label = selector(this);
              } else {
                label = this.$mdbFormGroup.find(selector);
              }

              if (label !== undefined && label.length > 0) {
                break;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (label.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.MDB_LABEL_WILDCARD + ' within form-group for ' + Util.describe(this.$element));
          }
          return label;
        }

        // Find mdb-form-group

      }, {
        key: 'findFormGroup',
        value: function findFormGroup() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

          var fg = this.$element.closest(Selector.FORM_GROUP);
          if (fg.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.FORM_GROUP + ' for ' + Util.describe(this.$element));
          }
          return fg;
        }

        // Due to the interconnected nature of labels/inputs/help-blocks, signal the mdb-form-group-* size variation based on
        //  a found form-control-* size

      }, {
        key: 'resolveMdbFormGroupSizing',
        value: function resolveMdbFormGroupSizing() {
          if (!this.config.convertInputSizeVariations) {
            return;
          }

          // Modification - Change text-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
          for (var inputSize in FormControlSizeMarkers) {
            if (this.$element.hasClass(inputSize)) {
              //this.$element.removeClass(inputSize)
              this.$mdbFormGroup.addClass(FormControlSizeMarkers[inputSize]);
            }
          }
        }

        // ------------------------------------------------------------------------
        // private

      }, {
        key: '_rejectInvalidComponentMatches',
        value: function _rejectInvalidComponentMatches() {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.config.invalidComponentMatches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var otherComponent = _step2.value;

              otherComponent.rejectMatch(this.constructor.name, this.$element);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }, {
        key: '_rejectWithoutRequiredClasses',
        value: function _rejectWithoutRequiredClasses() {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = this.config.requiredClasses[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var requiredClass = _step3.value;

              var found = false;
              // allow one of several classes to be passed in x||y
              if (requiredClass.indexOf('||') !== -1) {
                var oneOf = requiredClass.split('||');
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                  for (var _iterator4 = oneOf[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _requiredClass = _step4.value;

                    if (this.$element.hasClass(_requiredClass)) {
                      found = true;
                      break;
                    }
                  }
                } catch (err) {
                  _didIteratorError4 = true;
                  _iteratorError4 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                      _iterator4.return();
                    }
                  } finally {
                    if (_didIteratorError4) {
                      throw _iteratorError4;
                    }
                  }
                }
              } else if (this.$element.hasClass(requiredClass)) {
                found = true;
              }

              // error if not found
              if (!found) {
                $.error(this.constructor.name + ' element: ' + Util.describe(this.$element) + ' requires class: ' + requiredClass);
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }

        // ------------------------------------------------------------------------
        // static

      }]);
      return BaseInput;
    }(Base);

    return BaseInput;
  }(jQuery);

  var BaseSelection = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var Default = {
      label: {
        required: false

        // Prioritized find order for resolving the label to be used as an mdb-label if not specified in the markup
        //  - a function(thisComponent); or
        //  - a string selector used like $mdbFormGroup.find(selector)
        //
        // Note this only runs if $mdbFormGroup.find(Selector.MDB_LABEL_WILDCARD) fails to find a label (as authored in the markup)
        //
        //selectors: [
        //  `.form-control-label`, // in the case of horizontal or inline forms, this will be marked
        //  `> label` // usual case for text inputs
        //]
      }
    };

    var Selector = {
      LABEL: 'label'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var BaseSelection = function (_BaseInput) {
      babelHelpers.inherits(BaseSelection, _BaseInput);

      function BaseSelection($element, config, properties) {
        babelHelpers.classCallCheck(this, BaseSelection);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BaseSelection).call(this, $element, $.extend(true, {}, Default, config), properties));
        // properties = {inputType: checkbox, outerClass: checkbox-inline}
        // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
        // '.${this.outerClass} > label > input[type=${this.inputType}]'

        _this.decorateMarkup();
        return _this;
      }

      // ------------------------------------------------------------------------
      // protected

      babelHelpers.createClass(BaseSelection, [{
        key: 'decorateMarkup',
        value: function decorateMarkup() {
          this.$element.after(this.config.template);
        }

        // Demarcation element (e.g. first child of a form-group)

      }, {
        key: 'outerElement',
        value: function outerElement() {
          // .checkbox|switch|radio > label > input[type=checkbox|radio]
          // label.checkbox-inline > input[type=checkbox|radio]
          // .${this.outerClass} > label > input[type=${this.inputType}]
          return this.$element.parent().closest('.' + this.outerClass);
        }
      }, {
        key: 'rejectWithoutRequiredStructure',
        value: function rejectWithoutRequiredStructure() {
          // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
          // '.${this.outerClass} > label > input[type=${this.inputType}]'
          Util.assert(this.$element, !this.$element.parent().prop('tagName') === 'label', this.constructor.name + '\'s ' + Util.describe(this.$element) + ' parent element should be <label>.');
          Util.assert(this.$element, !this.outerElement().hasClass(this.outerClass), this.constructor.name + '\'s ' + Util.describe(this.$element) + ' outer element should have class ' + this.outerClass + '.');
        }
      }, {
        key: 'addFocusListener',
        value: function addFocusListener() {
          var _this2 = this;

          // checkboxes didn't appear to bubble to the document, so we'll bind these directly
          this.$element.closest(Selector.LABEL).hover(function () {
            _this2.addFormGroupFocus();
          }, function () {
            _this2.removeFormGroupFocus();
          });
        }
      }, {
        key: 'addChangeListener',
        value: function addChangeListener() {
          var _this3 = this;

          this.$element.change(function () {
            _this3.$element.blur();
          });
        }

        // ------------------------------------------------------------------------
        // private

      }]);
      return BaseSelection;
    }(BaseInput);

    return BaseSelection;
  }(jQuery);

  var Checkbox = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'checkbox';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      template: '<span class=\'checkbox-decorator\'><span class=\'check\'></span></span>'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Checkbox = function (_BaseSelection) {
      babelHelpers.inherits(Checkbox, _BaseSelection);

      function Checkbox($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: NAME, outerClass: NAME } : arguments[2];
        babelHelpers.classCallCheck(this, Checkbox);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [File, Radio, Text, Textarea, Select]},
        Default, config), properties));
      }

      babelHelpers.createClass(Checkbox, [{
        key: 'dispose',
        value: function dispose() {
          var dataKey = arguments.length <= 0 || arguments[0] === undefined ? DATA_KEY : arguments[0];

          babelHelpers.get(Object.getPrototypeOf(Checkbox.prototype), 'dispose', this).call(this, dataKey);
        }
      }], [{
        key: 'matches',
        value: function matches($element) {
          // '.checkbox > label > input[type=checkbox]'
          if ($element.attr('type') === 'checkbox') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'checkbox\'.');
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Checkbox($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Checkbox;
    }(BaseSelection);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[JQUERY_NAME] = Checkbox._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Checkbox;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Checkbox._jQueryInterface;
    };

    return Checkbox;
  }(jQuery);

  var CheckboxInline = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'checkboxInline';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      mdbFormGroup: {
        create: false, // no mdb-form-group creation if form-group not present. It messes with the layout.
        required: false
      }
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var CheckboxInline = function (_Checkbox) {
      babelHelpers.inherits(CheckboxInline, _Checkbox);

      function CheckboxInline($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: 'checkbox', outerClass: 'checkbox-inline' } : arguments[2];
        babelHelpers.classCallCheck(this, CheckboxInline);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(CheckboxInline).call(this, $element, $.extend(true, {}, Default, config), properties));
      }

      babelHelpers.createClass(CheckboxInline, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(CheckboxInline.prototype), 'dispose', this).call(this, DATA_KEY);
        }

        //static matches($element) {
        //  // '.checkbox-inline > input[type=checkbox]'
        //  if ($element.attr('type') === 'checkbox') {
        //    return true
        //  }
        //  return false
        //}
        //
        //static rejectMatch(component, $element) {
        //  Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for type='checkbox'.`)
        //}

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new CheckboxInline($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return CheckboxInline;
    }(Checkbox);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[JQUERY_NAME] = CheckboxInline._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = CheckboxInline;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return CheckboxInline._jQueryInterface;
    };

    return CheckboxInline;
  }(jQuery);

  var CollapseInline = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapseInline';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Selector = {
      ANY_INPUT: 'input, select, textarea'
    };

    var ClassName = {
      IN: 'in',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed',
      WIDTH: 'width'
    };
    var Default = {};

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var CollapseInline = function (_Base) {
      babelHelpers.inherits(CollapseInline, _Base);

      // $element is expected to be the trigger
      //  i.e. <button class="btn mdb-btn-icon" for="search" data-toggle="collapse" data-target="#search-field" aria-expanded="false" aria-controls="search-field">

      function CollapseInline($element, config) {
        babelHelpers.classCallCheck(this, CollapseInline);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(CollapseInline).call(this, $element, $.extend(true, {}, Default, config)));

        _this.$mdbFormGroup = _this.findMdbFormGroup(true);

        var collapseSelector = $element.data('target');
        _this.$collapse = $(collapseSelector);

        Util.assert($element, _this.$collapse.length === 0, 'Cannot find collapse target for ' + Util.describe($element));
        Util.assert(_this.$collapse, !_this.$collapse.hasClass(ClassName.COLLAPSE), Util.describe(_this.$collapse) + ' is expected to have the \'' + ClassName.COLLAPSE + '\' class.  It is being targeted by ' + Util.describe($element));

        // find the first input for focusing
        var $inputs = _this.$mdbFormGroup.find(Selector.ANY_INPUT);
        if ($inputs.length > 0) {
          _this.$input = $inputs.first();
        }

        // automatically add the marker class to collapse width instead of height - nice convenience because it is easily forgotten
        if (!_this.$collapse.hasClass(ClassName.WIDTH)) {
          _this.$collapse.addClass(ClassName.WIDTH);
        }

        if (_this.$input) {
          // add a listener to set focus
          _this.$collapse.on('shown.bs.collapse', function () {
            _this.$input.focus();
          });

          // add a listener to collapse field
          _this.$input.blur(function () {
            _this.$collapse.collapse('hide');
          });
        }
        return _this;
      }

      babelHelpers.createClass(CollapseInline, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(CollapseInline.prototype), 'dispose', this).call(this, DATA_KEY);
          this.$mdbFormGroup = null;
          this.$collapse = null;
          this.$input = null;
        }

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new CollapseInline($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return CollapseInline;
    }(Base);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[JQUERY_NAME] = CollapseInline._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = CollapseInline;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return CollapseInline._jQueryInterface;
    };

    return CollapseInline;
  }(jQuery);

  var File = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'file';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {};

    var ClassName = {
      FILE: NAME,
      IS_FILE: 'is-file'
    };

    var Selector = {
      FILENAMES: 'input.form-control[readonly]'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var File = function (_BaseInput) {
      babelHelpers.inherits(File, _BaseInput);

      function File($element, config) {
        babelHelpers.classCallCheck(this, File);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(File).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, Radio, Text, Textarea, Select, Switch]},
        Default, config)));

        _this.$mdbFormGroup.addClass(ClassName.IS_FILE);
        return _this;
      }

      babelHelpers.createClass(File, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(File.prototype), 'dispose', this).call(this, DATA_KEY);
        }
      }, {
        key: 'outerElement',

        // ------------------------------------------------------------------------
        // protected

        // Demarcation element (e.g. first child of a form-group)
        value: function outerElement() {
          // label.file > input[type=file]
          return this.$element.parent().closest('.' + ClassName.FILE);
        }
      }, {
        key: 'rejectWithoutRequiredStructure',
        value: function rejectWithoutRequiredStructure() {
          // label.file > input[type=file]
          Util.assert(this.$element, !this.outerElement().prop('tagName') === 'label', this.constructor.name + '\'s ' + Util.describe(this.$element) + ' parent element ' + Util.describe(this.outerElement()) + ' should be <label>.');
          Util.assert(this.$element, !this.outerElement().hasClass(ClassName.FILE), this.constructor.name + '\'s ' + Util.describe(this.$element) + ' parent element ' + Util.describe(this.outerElement()) + ' should have class .' + ClassName.FILE + '.');
        }
      }, {
        key: 'addFocusListener',
        value: function addFocusListener() {
          var _this2 = this;

          this.$mdbFormGroup.on('focus', function () {
            _this2.addFormGroupFocus();
          }).on('blur', function () {
            _this2.removeFormGroupFocus();
          });
        }
      }, {
        key: 'addChangeListener',
        value: function addChangeListener() {
          var _this3 = this;

          // set the fileinput readonly field with the name of the file
          this.$element.on('change', function () {
            var value = '';
            $.each(_this3.$element.files, function (i, file) {
              value += file.name + '  , ';
            });
            value = value.substring(0, value.length - 2);
            if (value) {
              _this3.addIsFilled();
            } else {
              _this3.removeIsFilled();
            }
            _this3.$mdbFormGroup.find(Selector.FILENAMES).val(value);
          });
        }

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: 'matches',
        value: function matches($element) {
          if ($element.attr('type') === 'file') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'file\'.');
        }
      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new File($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return File;
    }(BaseInput);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[JQUERY_NAME] = File._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = File;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return File._jQueryInterface;
    };

    return File;
  }(jQuery);

  var Radio = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'radio';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      template: '<span class=\'mdb-radio-outer-circle\'></span><span class=\'mdb-radio-inner-circle\'></span>'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Radio = function (_BaseSelection) {
      babelHelpers.inherits(Radio, _BaseSelection);

      function Radio($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: NAME, outerClass: NAME } : arguments[2];
        babelHelpers.classCallCheck(this, Radio);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Radio).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, File, Switch, Text]},
        Default, config), properties));
      }

      babelHelpers.createClass(Radio, [{
        key: 'dispose',
        value: function dispose() {
          var dataKey = arguments.length <= 0 || arguments[0] === undefined ? DATA_KEY : arguments[0];

          babelHelpers.get(Object.getPrototypeOf(Radio.prototype), 'dispose', this).call(this, dataKey);
        }
      }], [{
        key: 'matches',
        value: function matches($element) {
          // '.radio > label > input[type=radio]'
          if ($element.attr('type') === 'radio') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'radio\'.');
        }

        // ------------------------------------------------------------------------
        // protected

        //decorateMarkup() {
        //  this.$element.after(this.config.template)
        //}

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Radio($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Radio;
    }(BaseSelection);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[JQUERY_NAME] = Radio._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Radio;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Radio._jQueryInterface;
    };

    return Radio;
  }(jQuery);

  var RadioInline = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'radioInline';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      mdbFormGroup: {
        create: false, // no mdb-form-group creation if form-group not present. It messes with the layout.
        required: false
      }
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var RadioInline = function (_Radio) {
      babelHelpers.inherits(RadioInline, _Radio);

      function RadioInline($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: 'radio', outerClass: 'radio-inline' } : arguments[2];
        babelHelpers.classCallCheck(this, RadioInline);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(RadioInline).call(this, $element, $.extend(true, {}, Default, config), properties));
      }

      babelHelpers.createClass(RadioInline, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(RadioInline.prototype), 'dispose', this).call(this, DATA_KEY);
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new RadioInline($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return RadioInline;
    }(Radio);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[JQUERY_NAME] = RadioInline._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = RadioInline;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return RadioInline._jQueryInterface;
    };

    return RadioInline;
  }(jQuery);

  var BaseFormControl = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var Default = {
      decorator: {
        template: '<span class=\'mdb-form-control-decorator\'></span>'
      },
      requiredClasses: ['form-control']
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var BaseFormControl = function (_BaseInput) {
      babelHelpers.inherits(BaseFormControl, _BaseInput);

      function BaseFormControl($element, config) {
        babelHelpers.classCallCheck(this, BaseFormControl);

        // Initially mark as empty

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BaseFormControl).call(this, $element, $.extend(true, Default, config)));

        if (_this.isEmpty()) {
          _this.removeIsFilled();
        }

        // Add marker div the end of the form-group
        _this.$element.after(_this.config.decorator.template);
        return _this;
      }

      return BaseFormControl;
    }(BaseInput);

    return BaseFormControl;
  }(jQuery);

  var Select = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'select';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      requiredClasses: ['form-control||c-select']
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Select = function (_BaseFormControl) {
      babelHelpers.inherits(Select, _BaseFormControl);

      function Select($element, config) {
        babelHelpers.classCallCheck(this, Select);

        // floating labels will cover the options, so trigger them to be above (if used)

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Select).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Text, Textarea]},
        Default, config)));

        _this.addIsFilled();
        return _this;
      }

      babelHelpers.createClass(Select, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(Select.prototype), 'dispose', this).call(this, DATA_KEY);
        }
      }], [{
        key: 'matches',
        value: function matches($element) {
          if ($element.prop('tagName') === 'select') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for <select>.');
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Select($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Select;
    }(BaseFormControl);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[JQUERY_NAME] = Select._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Select;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Select._jQueryInterface;
    };

    return Select;
  }(jQuery);

  var Switch = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'switch';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      template: '<span class=\'mdb-switch-track\'></span>'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Switch = function (_Checkbox) {
      babelHelpers.inherits(Switch, _Checkbox);

      function Switch($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: 'checkbox', outerClass: 'switch' } : arguments[2];
        babelHelpers.classCallCheck(this, Switch);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Switch).call(this, $element, $.extend(true, {}, Default, config), properties));
        // selector: '.switch > label > input[type=checkbox]'
      }

      babelHelpers.createClass(Switch, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(Switch.prototype), 'dispose', this).call(this, DATA_KEY);
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Switch($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Switch;
    }(Checkbox);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[JQUERY_NAME] = Switch._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Switch;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Switch._jQueryInterface;
    };

    return Switch;
  }(jQuery);

  var Text = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'text';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {};

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Text = function (_BaseFormControl) {
      babelHelpers.inherits(Text, _BaseFormControl);

      function Text($element, config) {
        babelHelpers.classCallCheck(this, Text);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Text).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Select, Textarea]},
        Default, config)));
      }

      babelHelpers.createClass(Text, [{
        key: 'dispose',
        value: function dispose() {
          var dataKey = arguments.length <= 0 || arguments[0] === undefined ? DATA_KEY : arguments[0];

          babelHelpers.get(Object.getPrototypeOf(Text.prototype), 'dispose', this).call(this, dataKey);
        }
      }], [{
        key: 'matches',
        value: function matches($element) {
          if ($element.attr('type') === 'text') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'text\'.');
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Text($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Text;
    }(BaseFormControl);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[JQUERY_NAME] = Text._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Text;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Text._jQueryInterface;
    };

    return Text;
  }(jQuery);

  var Textarea = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'textarea';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {};

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Textarea = function (_BaseFormControl) {
      babelHelpers.inherits(Textarea, _BaseFormControl);

      function Textarea($element, config) {
        babelHelpers.classCallCheck(this, Textarea);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Textarea).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, File, Radio, Text, Select, Switch]},
        Default, config)));
      }

      babelHelpers.createClass(Textarea, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(Textarea.prototype), 'dispose', this).call(this, DATA_KEY);
        }
      }], [{
        key: 'matches',
        value: function matches($element) {
          if ($element.prop('tagName') === 'textarea') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for <textarea>.');
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Textarea($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Textarea;
    }(BaseFormControl);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[JQUERY_NAME] = Textarea._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Textarea;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Textarea._jQueryInterface;
    };

    return Textarea;
  }(jQuery);

  var BaseLayout = function ($) {

    var ClassName = {
      CANVAS: 'mdb-layout-canvas',
      CONTAINER: 'mdb-layout-container',
      BACKDROP: 'mdb-layout-backdrop'
    };

    var Selector = {
      CANVAS: '.' + ClassName.CANVAS,
      CONTAINER: '.' + ClassName.CONTAINER,
      BACKDROP: '.' + ClassName.BACKDROP
    };

    var Default = {
      canvas: {
        create: true,
        required: true,
        template: '<div class="' + ClassName.CANVAS + '"></div>'
      },
      backdrop: {
        create: true,
        required: true,
        template: '<div class="' + ClassName.BACKDROP + '"></div>'
      }
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var BaseLayout = function (_Base) {
      babelHelpers.inherits(BaseLayout, _Base);

      function BaseLayout($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        babelHelpers.classCallCheck(this, BaseLayout);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BaseLayout).call(this, $element, $.extend(true, {}, Default, config), properties));

        _this.$container = _this.findContainer(true);
        _this.$backdrop = _this.resolveBackdrop();
        _this.resolveCanvas();
        return _this;
      }

      babelHelpers.createClass(BaseLayout, [{
        key: 'dispose',
        value: function dispose(dataKey) {
          babelHelpers.get(Object.getPrototypeOf(BaseLayout.prototype), 'dispose', this).call(this, dataKey);
          this.$container = null;
          this.$backdrop = null;
        }

        // ------------------------------------------------------------------------
        // protected

        // Will wrap container in mdb-layout-canvas if necessary

      }, {
        key: 'resolveCanvas',
        value: function resolveCanvas() {
          var bd = this.findCanvas(false);
          if (bd === undefined || bd.length === 0) {
            if (this.config.canvas.create) {
              this.$container.wrap(this.config.canvas.template);
            }

            bd = this.findCanvas(this.config.canvas.required);
          }

          return bd;
        }

        // Find closest mdb-layout-container based on the given context

      }, {
        key: 'findCanvas',
        value: function findCanvas() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
          var context = arguments.length <= 1 || arguments[1] === undefined ? this.$container : arguments[1];

          var canvas = context.closest(Selector.CANVAS);
          if (canvas.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.CANVAS + ' for ' + Util.describe(context));
          }
          return canvas;
        }

        // Will add mdb-layout-backdrop to mdb-layout-container if necessary

      }, {
        key: 'resolveBackdrop',
        value: function resolveBackdrop() {
          var bd = this.findBackdrop(false);
          if (bd === undefined || bd.length === 0) {
            if (this.config.backdrop.create) {
              this.$container.append(this.config.backdrop.template);
            }

            bd = this.findBackdrop(this.config.backdrop.required);
          }

          return bd;
        }

        // Find closest mdb-layout-container based on the given context

      }, {
        key: 'findBackdrop',
        value: function findBackdrop() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
          var context = arguments.length <= 1 || arguments[1] === undefined ? this.$container : arguments[1];

          var backdrop = context.find('> ' + Selector.BACKDROP);
          if (backdrop.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.BACKDROP + ' for ' + Util.describe(context));
          }
          return backdrop;
        }

        // Find closest mdb-layout-container based on the given context

      }, {
        key: 'findContainer',
        value: function findContainer() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
          var context = arguments.length <= 1 || arguments[1] === undefined ? this.$element : arguments[1];

          var container = context.closest(Selector.CONTAINER);
          if (container.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.CONTAINER + ' for ' + Util.describe(context));
          }
          return container;
        }

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }]);
      return BaseLayout;
    }(Base);

    return BaseLayout;
  }(jQuery);

  var Drawer = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'drawer';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Keycodes = {
      ESCAPE: 27
      //ENTER: 13,
      //SPACE: 32
    };

    var ClassName = {
      IN: 'in',
      DRAWER_IN: 'mdb-drawer-in',
      DRAWER_OUT: 'mdb-drawer-out',
      DRAWER: 'mdb-layout-drawer',
      CONTAINER: 'mdb-layout-container'
    };

    var Default = {
      focusSelector: 'a, button, input'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Drawer = function (_BaseLayout) {
      babelHelpers.inherits(Drawer, _BaseLayout);

      // $element is expected to be the trigger
      //  i.e. <button class="btn mdb-btn-icon" for="search" data-toggle="drawer" data-target="#my-side-nav-drawer" aria-expanded="false" aria-controls="my-side-nav-drawer">

      function Drawer($element, config) {
        babelHelpers.classCallCheck(this, Drawer);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Drawer).call(this, $element, $.extend(true, {}, Default, config)));

        _this.$toggles = $('[data-toggle="drawer"][href="#' + _this.$element[0].id + '"], [data-toggle="drawer"][data-target="#' + _this.$element[0].id + '"]');

        _this._addAria();

        // click or escape on the backdrop closes the drawer
        _this.$backdrop.keydown(function (ev) {
          if (ev.which === Keycodes.ESCAPE) {
            _this.hide();
          }
        }).click(function () {
          _this.hide();
        });

        // escape on the drawer closes it
        _this.$element.keydown(function (ev) {
          if (ev.which === Keycodes.ESCAPE) {
            _this.hide();
          }
        });

        // any toggle button clicks
        _this.$toggles.click(function () {
          _this.toggle();
        });
        return _this;
      }

      babelHelpers.createClass(Drawer, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(Drawer.prototype), 'dispose', this).call(this, DATA_KEY);
          this.$toggles = null;
        }
      }, {
        key: 'toggle',
        value: function toggle() {
          if (this._isOpen()) {
            this.hide();
          } else {
            this.show();
          }
        }
      }, {
        key: 'show',
        value: function show() {
          if (this._isForcedClosed() || this._isOpen()) {
            return;
          }

          this.$toggles.attr('aria-expanded', true);
          this.$element.attr('aria-expanded', true);
          this.$element.attr('aria-hidden', false);

          // focus on the first focusable item
          var $focusOn = this.$element.find(this.config.focusSelector);
          if ($focusOn.length > 0) {
            $focusOn.first().focus();
          }

          this.$container.addClass(ClassName.DRAWER_IN);
          // backdrop is responsively styled based on mdb-drawer-overlay, therefore style is none of our concern, simply add the marker class and let the scss determine if it should be displayed or not.
          this.$backdrop.addClass(ClassName.IN);
        }
      }, {
        key: 'hide',
        value: function hide() {
          if (!this._isOpen()) {
            return;
          }

          this.$toggles.attr('aria-expanded', false);
          this.$element.attr('aria-expanded', false);
          this.$element.attr('aria-hidden', true);

          this.$container.removeClass(ClassName.DRAWER_IN);
          this.$backdrop.removeClass(ClassName.IN);
        }

        // ------------------------------------------------------------------------
        // private

      }, {
        key: '_isOpen',
        value: function _isOpen() {
          return this.$container.hasClass(ClassName.DRAWER_IN);
        }
      }, {
        key: '_isForcedClosed',
        value: function _isForcedClosed() {
          return this.$container.hasClass(ClassName.DRAWER_OUT);
        }
      }, {
        key: '_addAria',
        value: function _addAria() {
          var isOpen = this._isOpen();
          this.$element.attr('aria-expanded', isOpen);
          this.$element.attr('aria-hidden', isOpen);

          if (this.$toggles.length) {
            this.$toggles.attr('aria-expanded', isOpen);
          }
        }

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Drawer($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Drawer;
    }(BaseLayout);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[JQUERY_NAME] = Drawer._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Drawer;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Drawer._jQueryInterface;
    };

    return Drawer;
  }(jQuery);

  var Ripples = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'ripples';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var ClassName = {
      CONTAINER: 'ripple-container',
      DECORATOR: 'ripple-decorator'
    };

    var Selector = {
      CONTAINER: '.' + ClassName.CONTAINER,
      DECORATOR: '.' + ClassName.DECORATOR //,
    };

    var Default = {
      container: {
        template: '<div class=\'' + ClassName.CONTAINER + '\'></div>'
      },
      decorator: {
        template: '<div class=\'' + ClassName.DECORATOR + '\'></div>'
      },
      trigger: {
        start: 'mousedown touchstart',
        end: 'mouseup mouseleave touchend'
      },
      touchUserAgentRegex: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
      duration: 500
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Ripples = function () {
      function Ripples($element, config) {
        var _this = this;

        babelHelpers.classCallCheck(this, Ripples);

        this.$element = $element;

        //console.log(`Adding ripples to ${Util.describe(this.$element)}`)  // eslint-disable-line no-console
        this.config = $.extend(true, {}, Default, config);

        // attach initial listener
        this.$element.on(this.config.trigger.start, function (event) {
          _this._onStartRipple(event);
        });
      }

      babelHelpers.createClass(Ripples, [{
        key: 'dispose',
        value: function dispose() {
          $.removeData(this.$element, DATA_KEY);
          this.$element = null;
          this.$container = null;
          this.$decorator = null;
          this.config = null;
        }

        // ------------------------------------------------------------------------
        // private

      }, {
        key: '_onStartRipple',
        value: function _onStartRipple(event) {
          var _this2 = this;

          // Verify if the user is just touching on a device and return if so
          if (this._isTouch() && event.type === 'mousedown') {
            return;
          }

          // Find or create the ripple container element
          this._findOrCreateContainer();

          // Get relY and relX positions of the container element
          var relY = this._getRelY(event);
          var relX = this._getRelX(event);

          // If relY and/or relX are false, return the event
          if (!relY && !relX) {
            return;
          }

          // set the location and color each time (even if element is cached)
          this.$decorator.css({
            left: relX,
            top: relY,
            'background-color': this._getRipplesColor()
          });

          // Make sure the ripple has the styles applied (ugly hack but it works)
          this._forceStyleApplication();

          // Turn on the ripple animation
          this.rippleOn();

          // Call the rippleEnd function when the transition 'on' ends
          setTimeout(function () {
            _this2.rippleEnd();
          }, this.config.duration);

          // Detect when the user leaves the element to cleanup if not already done?
          this.$element.on(this.config.trigger.end, function () {
            if (_this2.$decorator) {
              // guard against race condition/mouse attack
              _this2.$decorator.data('mousedown', 'off');

              if (_this2.$decorator.data('animating') === 'off') {
                _this2.rippleOut();
              }
            }
          });
        }
      }, {
        key: '_findOrCreateContainer',
        value: function _findOrCreateContainer() {
          if (!this.$container || !this.$container.length > 0) {
            this.$element.append(this.config.container.template);
            this.$container = this.$element.find(Selector.CONTAINER);
          }

          // always add the rippleElement, it is always removed
          this.$container.append(this.config.decorator.template);
          this.$decorator = this.$container.find(Selector.DECORATOR);
        }

        // Make sure the ripple has the styles applied (ugly hack but it works)

      }, {
        key: '_forceStyleApplication',
        value: function _forceStyleApplication() {
          return window.getComputedStyle(this.$decorator[0]).opacity;
        }

        /**
         * Get the relX
         */

      }, {
        key: '_getRelX',
        value: function _getRelX(event) {
          var wrapperOffset = this.$container.offset();

          var result = null;
          if (!this._isTouch()) {
            // Get the mouse position relative to the ripple wrapper
            result = event.pageX - wrapperOffset.left;
          } else {
            // Make sure the user is using only one finger and then get the touch
            //  position relative to the ripple wrapper
            event = event.originalEvent;

            if (event.touches.length === 1) {
              result = event.touches[0].pageX - wrapperOffset.left;
            } else {
              result = false;
            }
          }

          return result;
        }

        /**
         * Get the relY
         */

      }, {
        key: '_getRelY',
        value: function _getRelY(event) {
          var containerOffset = this.$container.offset();
          var result = null;

          if (!this._isTouch()) {
            /**
             * Get the mouse position relative to the ripple wrapper
             */
            result = event.pageY - containerOffset.top;
          } else {
            /**
             * Make sure the user is using only one finger and then get the touch
             * position relative to the ripple wrapper
             */
            event = event.originalEvent;

            if (event.touches.length === 1) {
              result = event.touches[0].pageY - containerOffset.top;
            } else {
              result = false;
            }
          }

          return result;
        }

        /**
         * Get the ripple color
         */

      }, {
        key: '_getRipplesColor',
        value: function _getRipplesColor() {
          var color = this.$element.data('ripple-color') ? this.$element.data('ripple-color') : window.getComputedStyle(this.$element[0]).color;
          return color;
        }

        /**
         * Verify if the client is using a mobile device
         */

      }, {
        key: '_isTouch',
        value: function _isTouch() {
          return this.config.touchUserAgentRegex.test(navigator.userAgent);
        }

        /**
         * End the animation of the ripple
         */

      }, {
        key: 'rippleEnd',
        value: function rippleEnd() {
          if (this.$decorator) {
            // guard against race condition/mouse attack
            this.$decorator.data('animating', 'off');

            if (this.$decorator.data('mousedown') === 'off') {
              this.rippleOut(this.$decorator);
            }
          }
        }

        /**
         * Turn off the ripple effect
         */

      }, {
        key: 'rippleOut',
        value: function rippleOut() {
          var _this3 = this;

          this.$decorator.off();

          if (Util.transitionEndSupported()) {
            this.$decorator.addClass('ripple-out');
          } else {
            this.$decorator.animate({ opacity: 0 }, 100, function () {
              _this3.$decorator.trigger('transitionend');
            });
          }

          this.$decorator.on(Util.transitionEndSelector(), function () {
            if (_this3.$decorator) {
              _this3.$decorator.remove();
              _this3.$decorator = null;
            }
          });
        }

        /**
         * Turn on the ripple effect
         */

      }, {
        key: 'rippleOn',
        value: function rippleOn() {
          var _this4 = this;

          var size = this._getNewSize();

          if (Util.transitionEndSupported()) {
            this.$decorator.css({
              '-ms-transform': 'scale(' + size + ')',
              '-moz-transform': 'scale(' + size + ')',
              '-webkit-transform': 'scale(' + size + ')',
              transform: 'scale(' + size + ')'
            }).addClass('ripple-on').data('animating', 'on').data('mousedown', 'on');
          } else {
            this.$decorator.animate({
              width: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
              height: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
              'margin-left': Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * -1,
              'margin-top': Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * -1,
              opacity: 0.2
            }, this.config.duration, function () {
              _this4.$decorator.trigger('transitionend');
            });
          }
        }

        /**
         * Get the new size based on the element height/width and the ripple width
         */

      }, {
        key: '_getNewSize',
        value: function _getNewSize() {
          return Math.max(this.$element.outerWidth(), this.$element.outerHeight()) / this.$decorator.outerWidth() * 2.5;
        }

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Ripples($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Ripples;
    }();

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[JQUERY_NAME] = Ripples._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Ripples;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Ripples._jQueryInterface;
    };

    return Ripples;
  }(jQuery);

  var Autofill = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'autofill';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = 'mdb' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {};

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Autofill = function (_Base) {
      babelHelpers.inherits(Autofill, _Base);

      function Autofill($element, config) {
        babelHelpers.classCallCheck(this, Autofill);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Autofill).call(this, $element, $.extend(true, {}, Default, config)));

        _this._watchLoading();
        _this._attachEventHandlers();
        return _this;
      }

      babelHelpers.createClass(Autofill, [{
        key: 'dispose',
        value: function dispose() {
          babelHelpers.get(Object.getPrototypeOf(Autofill.prototype), 'dispose', this).call(this, DATA_KEY);
        }

        // ------------------------------------------------------------------------
        // private

      }, {
        key: '_watchLoading',
        value: function _watchLoading() {
          var _this2 = this;

          // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
          setTimeout(function () {
            clearInterval(_this2._onLoading);
          }, 10000);
        }

        // This part of code will detect autofill when the page is loading (username and password inputs for example)

      }, {
        key: '_onLoading',
        value: function _onLoading() {
          setInterval(function () {
            $('input[type!=checkbox]').each(function (index, element) {
              var $element = $(element);
              if ($element.val() && $element.val() !== $element.attr('value')) {
                $element.trigger('change');
              }
            });
          }, 100);
        }
      }, {
        key: '_attachEventHandlers',
        value: function _attachEventHandlers() {
          // Listen on inputs of the focused form
          //  (because user can select from the autofill dropdown only when the input has focus)
          var focused = null;
          $(document).on('focus', 'input', function (event) {
            var $inputs = $(event.currentTarget).closest('form').find('input').not('[type=file]');
            focused = setInterval(function () {
              $inputs.each(function (index, element) {
                var $element = $(element);
                if ($element.val() !== $element.attr('value')) {
                  $element.trigger('change');
                }
              });
            }, 100);
          }).on('blur', '.form-group input', function () {
            clearInterval(focused);
          });
        }

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Autofill($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Autofill;
    }(Base);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[JQUERY_NAME] = Autofill._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Autofill;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Autofill._jQueryInterface;
    };

    return Autofill;
  }(jQuery);

  //import 'babel-polyfill' // necessary for firefox

  /**
   * $.bootstrapMaterialDesign(config) is a macro class to configure the components generally
   *  used in Material Design for Bootstrap.  You may pass overrides to the configurations
   *  which will be passed into each component, or you may omit use of this class and
   *  configure each component separately.
   */
  var BootstrapMaterialDesign = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'bootstrapMaterialDesign';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NAME = NAME; // retain this full name since it is long enough not to conflict
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    /**
     * Global configuration:
     *  The global configuration hash will be mixed in to each components' config.
     *    e.g. calling $.bootstrapMaterialDesign({global: { validate: true } }) would pass `validate:true` to every component
     *
     *
     * Component configuration:
     *  - selector: may be a string or an array.  Any array will be joined with a comma to generate the selector
     *  - disable any component by defining it as false with an override. e.g. $.bootstrapMaterialDesign({ autofill: false })
     *
     *  @see each individual component for more configuration settings.
     */
    var Default = {
      global: {
        validate: false,
        label: {
          className: 'mdb-label-static' // default style of label to be used if not specified in the html markup
        }
      },
      autofill: {
        selector: 'body'
      },
      checkbox: {
        selector: '.checkbox > label > input[type=checkbox]'
      },
      checkboxInline: {
        selector: 'label.checkbox-inline > input[type=checkbox]'
      },
      collapseInline: {
        selector: '.mdb-collapse-inline [data-toggle="collapse"]'
      },
      drawer: {
        selector: '.mdb-layout-drawer'
      },
      file: {
        selector: 'input[type=file]'
      },
      radio: {
        selector: '.radio > label > input[type=radio]'
      },
      radioInline: {
        selector: 'label.radio-inline > input[type=radio]'
      },
      ripples: {
        //selector: ['.btn:not(.btn-link):not(.ripple-none)'] // testing only
        selector: ['.btn:not(.btn-link):not(.ripple-none)', '.card-image:not(.ripple-none)', '.navbar a:not(.ripple-none)', '.dropdown-menu a:not(.ripple-none)', '.nav-tabs a:not(.ripple-none)', '.pagination li:not(.active):not(.disabled) a:not(.ripple-none)', '.ripple' // generic marker class to add ripple to elements
        ]
      },
      select: {
        selector: ['select']
      },
      switch: {
        selector: '.switch > label > input[type=checkbox]'
      },
      text: {
        // omit inputs we have specialized components to handle - we need to match text, email, etc.  The easiest way to do this appears to be just omit the ones we don't want to match and let the rest fall through to this.
        selector: ['input[type!=\'hidden\'][type!=\'checkbox\'][type!=\'radio\'][type!=\'file\'][type!=\'button\'][type!=\'submit\'][type!=\'reset\']']
      },
      textarea: {
        selector: ['textarea']
      },
      arrive: true,
      // create an ordered component list for instantiation
      instantiation: ['ripples', 'checkbox', 'checkboxInline', 'collapseInline', 'drawer', 'file', 'radio', 'radioInline', 'switch', 'text', 'textarea', 'select', 'autofill']
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var BootstrapMaterialDesign = function () {
      function BootstrapMaterialDesign($element, config) {
        var _this = this;

        babelHelpers.classCallCheck(this, BootstrapMaterialDesign);

        this.$element = $element;
        this.config = $.extend(true, {}, Default, config);
        var $document = $(document);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          var _loop = function _loop() {
            var component = _step.value;

            // the component's config fragment is passed in directly, allowing users to override
            var componentConfig = _this.config[component];

            // check to make sure component config is enabled (not `false`)
            if (componentConfig) {
              (function () {

                // assemble the selector as it may be an array
                var selector = _this._resolveSelector(componentConfig);

                // mix in global options
                componentConfig = $.extend(true, {}, _this.config.global, componentConfig);

                // create the jquery fn name e.g. 'mdbText' for 'text'
                var componentName = '' + (component.charAt(0).toUpperCase() + component.slice(1));
                var jqueryFn = 'mdb' + componentName;

                try {
                  // safely instantiate component on selector elements with config, report errors and move on.
                  // console.debug(`instantiating: $('${selector}')[${jqueryFn}](${componentConfig})`) // eslint-disable-line no-console
                  $(selector)[jqueryFn](componentConfig);

                  // add to arrive if present and enabled
                  if (document.arrive && _this.config.arrive) {
                    $document.arrive(selector, function (element) {
                      // eslint-disable-line no-loop-func
                      $(element)[jqueryFn](componentConfig);
                    });
                  }
                } catch (e) {
                  var message = 'Failed to instantiate component: $(\'' + selector + '\')[' + jqueryFn + '](' + componentConfig + ')';
                  console.error(message, e, '\nSelected elements: ', $(selector)); // eslint-disable-line no-console
                  throw e;
                }
              })();
            }
          };

          for (var _iterator = this.config.instantiation[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      babelHelpers.createClass(BootstrapMaterialDesign, [{
        key: 'dispose',
        value: function dispose() {
          $.removeData(this.$element, DATA_KEY);
          this.$element = null;
          this.config = null;
        }

        // ------------------------------------------------------------------------
        // private

      }, {
        key: '_resolveSelector',
        value: function _resolveSelector(componentConfig) {
          var selector = componentConfig.selector;
          if (Array.isArray(selector)) {
            selector = selector.join(', ');
          }

          return selector;
        }

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new BootstrapMaterialDesign($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return BootstrapMaterialDesign;
    }();

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[JQUERY_NAME] = BootstrapMaterialDesign._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = BootstrapMaterialDesign;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return BootstrapMaterialDesign._jQueryInterface;
    };

    return BootstrapMaterialDesign;
  }(jQuery);

}());
//# sourceMappingURL=bootstrap-material-design.iife.js.map
