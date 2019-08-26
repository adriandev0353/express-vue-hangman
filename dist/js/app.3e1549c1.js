(function(e){function t(t){for(var s,o,i=t[0],l=t[1],u=t[2],d=0,p=[];d<i.length;d++)o=i[d],r[o]&&p.push(r[o][0]),r[o]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);c&&c(t);while(p.length)p.shift()();return n.push.apply(n,u||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],s=!0,i=1;i<a.length;i++){var l=a[i];0!==r[l]&&(s=!1)}s&&(n.splice(t--,1),e=o(o.s=a[0]))}return e}var s={},r={app:0},n=[];function o(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=s,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(a,s,function(t){return e[t]}.bind(null,s));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var c=l;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var s=a("64a9"),r=a.n(s);r.a},"0c7d":function(e,t,a){e.exports=a.p+"img/hangman-game.efb7e914.svg"},"10c9":function(e,t,a){},"312d":function(e,t,a){},"3bd7":function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var s=a("2b0e"),r=a("8c4f"),n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"play"},[s("b-container",[s("div",[s("img",{attrs:{src:a("cf05"),alt:""}}),s("p",[e._v("Enter a word length:")]),s("b-button-group",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.length,expression:"length"}],staticClass:"lengthInput",attrs:{type:"number",placeholder:"Enter a word-length",disabled:e.play},domProps:{value:e.length},on:{input:function(t){t.target.composing||(e.length=t.target.value)}}}),e.play?e._e():s("b-button",{attrs:{variant:"outline-primary"},on:{click:e.activatePlay}},[e._v("Submit")]),e.play?s("b-button",{attrs:{variant:"outline-primary",disabled:""},on:{click:e.activatePlay}},[e._v("Submit")]):e._e()],1)],1),e.play?s("div",[!e.win&&e.guessesLeft>0?s("div",[s("h1",[s("span",{staticClass:"guess"},[e._v(e._s(e.guessesLeft))]),e._v(" Guesses left\n        ")]),e._l(e.wordGuessed,function(t,a){return s("span",{key:a},[e._v(e._s(t)+" ")])})],2):e.win?s("div",[s("h1",[e._v("Congratulations!")]),s("h3",[e._v("\n          The word was\n          "),s("span",{staticClass:"word"},[e._v(e._s(e.word.word))])]),s("h4",[e._v("\n          You won\n          "),s("span",{staticClass:"points"},[e._v(e._s(e.length))]),e._v(" points!\n        ")]),s("b-button",{on:{click:e.resetGame}},[e._v("New Game")])],1):0===e.guessesLeft?s("div",[s("h1",{staticClass:"guess"},[e._v("Game Over!")]),s("h3",[e._v("\n          The word was\n          "),s("span",{staticClass:"word"},[e._v(e._s(e.word.word))])]),s("b-button",{on:{click:e.resetGame}},[e._v("New Game")])],1):e._e(),!e.win&&e.guessesLeft>0?s("b-row",[s("hr"),s("b-col",{attrs:{sm:""}}),s("b-col",{attrs:{sm:""}},[s("div",e._l(e.alphabet,function(t,a){return s("b-button",{key:a,staticClass:"letter",attrs:{variant:"light",disabled:e.isDisabled(a)},on:{click:function(a){return e.letterCheck(t.letter)}}},[e._v(e._s(t.letter))])}),1)]),s("b-col",{attrs:{sm:""}})],1):e._e()],1):e._e()])],1)},o=[],i=(a("ac4d"),a("8a81"),a("ac6a"),a("bc3a")),l=a.n(i),u={name:"play",data:function(){return{user:"",length:0,play:!1,guessesLeft:4,wordGuessed:[],win:!1,word:{},lettersGuessed:[],alphabet:[{letter:"A",disable:!1},{letter:"B",disable:!1},{letter:"C",disable:!1},{letter:"D",disable:!1},{letter:"E",disable:!1},{letter:"F",disable:!1},{letter:"G",disable:!1},{letter:"H",disable:!1},{letter:"I",disable:!1},{letter:"J",disable:!1},{letter:"K",disable:!1},{letter:"L",disable:!1},{letter:"M",disable:!1},{letter:"N",disable:!1},{letter:"O",disable:!1},{letter:"P",disable:!1},{letter:"Q",disable:!1},{letter:"R",disable:!1},{letter:"S",disable:!1},{letter:"T",disable:!1},{letter:"U",disable:!1},{letter:"V",disable:!1},{letter:"W",disable:!1},{letter:"X",disable:!1},{letter:"Y",disable:!1},{letter:"Z",disable:!1}]}},beforeMount:function(){var e=this,t=localStorage["token"];l.a.post("https://hangman-webapp.herokuapp.com/api/token/check",t).then(function(t){var a=t.data,s=(a.message,a.success);e.user=a.user,s||e.$router.push({name:"login"})})},methods:{activatePlay:function(){var e=this;this.wordGuessed=[],l.a.get("https://hangman-webapp.herokuapp.com/api/list/size/"+this.length).then(function(t){var a=t.data,s=a.words,r=s.length,n=Math.floor(Math.random()*r)+1;e.word=s[n],e.$forceUpdate()}).then(function(){var t=e.word.word;console.log(t);for(var a=0;a<t.length;a++)"-"===t[a]?e.wordGuessed.push("-"):e.wordGuessed.push("_")}),this.play=!0},letterCheck:function(e){this.lettersGuessed.push(e);var t=!1,a=this.word.word;a=a.toLowerCase();var s=e.toLowerCase(),r=!0,n=!1,o=void 0;try{for(var i,u=this.alphabet[Symbol.iterator]();!(r=(i=u.next()).done);r=!0){var c=i.value;c.letter===e&&(c.disable=!0)}}catch(w){n=!0,o=w}finally{try{r||null==u.return||u.return()}finally{if(n)throw o}}for(var d=0;d<a.length;d++)s===a[d]&&(this.wordGuessed[d]=s,this.$forceUpdate(),t=!0);var p="",h=!0,f=!1,v=void 0;try{for(var b,m=this.wordGuessed[Symbol.iterator]();!(h=(b=m.next()).done);h=!0){var g=b.value;p+=g}}catch(w){f=!0,v=w}finally{try{h||null==m.return||m.return()}finally{if(f)throw v}}p===a&&(this.win=!0,l.a.post("https://hangman-webapp.herokuapp.com/api/add/to/user",{username:this.user,word:this.word}).then(function(e){})),t||this.guessesLeft--},isDisabled:function(e){return this.alphabet[e].disable},resetGame:function(){this.play=!1;var e=!0,t=!1,a=void 0;try{for(var s,r=this.alphabet[Symbol.iterator]();!(e=(s=r.next()).done);e=!0){var n=s.value;n.disable=!1}}catch(o){t=!0,a=o}finally{try{e||null==r.return||r.return()}finally{if(t)throw a}}this.guessesLeft=4,this.length=0,this.wordGuessed=[],this.win=!1,this.word={},this.lettersGuessed=[]}}},c=u,d=(a("dc09"),a("2877")),p=Object(d["a"])(c,n,o,!1,null,"04cc5b9c",null),h=p.exports,f=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},v=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"leaderboard"},[a("h1",[e._v("Leaderboard coming soon..")])])}],b={beforeMount:function(){var e=this,t=localStorage["token"];l.a.post("https://hangman-webapp.herokuapp.com/api/token/check",t).then(function(t){var a=t.data,s=(a.message,a.success);s||e.$router.push({name:"login"})})}},m=b,g=Object(d["a"])(m,f,v,!1,null,null,null),w=g.exports,_=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},y=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"new"},[a("h1",[e._v("Add new word here..")])])}],k={beforeMount:function(){var e=this,t=localStorage["token"];l.a.post("https://hangman-webapp.herokuapp.com/api/token/check",t).then(function(t){var a=t.data,s=(a.message,a.success);s||e.$router.push({name:"login"})})}},C=k,x=Object(d["a"])(C,_,y,!1,null,null,null),G=x.exports,$=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"login"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm"}),a("div",{staticClass:"col-sm"},[a("h1",[e._v("Login")]),a("table",[a("tr",[a("td",[e._v("username")]),a("td",[a("b-form-input",{attrs:{placeholder:"username"},model:{value:e.user,callback:function(t){e.user=t},expression:"user"}})],1)]),a("tr",[a("td",[e._v("Password")]),a("td",[a("b-form-input",{attrs:{type:"password",placeholder:"password"},model:{value:e.pass,callback:function(t){e.pass=t},expression:"pass"}})],1)])]),a("h5",{staticClass:"error"},[e._v(e._s(e.message))]),a("b-button",{staticClass:"login",on:{click:e.submitUser}},[e._v("Login")]),a("b-button",{staticClass:"login",on:{click:e.registerUser}},[e._v("Sign up")])],1),a("div",{staticClass:"col-sm"})])])])},O=[],S={name:"login",data:function(){return{user:"",pass:"",message:""}},methods:{submitUser:function(){var e=this.user,t=this.pass;l.a.post("https://hangman-webapp.herokuapp.com/api/login/check",{username:e,password:t}).then(function(e){var t=e.data,a=t.auth,s=t.token;a&&(localStorage["token"]=s)})},registerUser:function(){this.$router.push({name:"register"}),l.a.get()}}},L=S,P=(a("e99c"),Object(d["a"])(L,$,O,!1,null,"75aae018",null)),j=P.exports,E=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"login"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm"}),a("div",{staticClass:"col-sm"},[a("h1",[e._v("Register")]),a("table",[a("tr",[a("td",[e._v("username")]),a("td",[a("b-form-input",{attrs:{placeholder:"username"},model:{value:e.user,callback:function(t){e.user=t},expression:"user"}})],1)]),a("tr",[a("td",[e._v("Password")]),a("td",[a("b-form-input",{attrs:{type:"password",placeholder:"password"},model:{value:e.pass,callback:function(t){e.pass=t},expression:"pass"}})],1)]),a("tr",[a("td",[e._v("Confirm password")]),a("td",[a("b-form-input",{attrs:{type:"password",placeholder:"password"},model:{value:e.passConfirm,callback:function(t){e.passConfirm=t},expression:"passConfirm"}})],1)])]),a("h5",{staticClass:"error"},[e._v(e._s(e.message))]),a("b-button",{staticClass:"login",on:{click:e.submitUser}},[e._v("Sign up")])],1),a("div",{staticClass:"col-sm"})])])])},A=[],M={name:"Register",data:function(){return{user:"",pass:"",passConfirm:"",message:"",accountAvailability:!1}},methods:{submitUser:function(){var e,t=this;this.pass===this.passConfirm&&this.pass.length>0&&l.a.get("https://hangman-webapp.herokuapp.com/api/check/user/"+this.user).then(function(a){var s=a.data;e=s.message,"already exists"===e?t.message="This account already exists":t.accountAvailability=!0,t.$forceUpdate(),t.accountAvailability&&l.a.post("https://hangman-webapp.herokuapp.com/api/add/user/",{username:t.user,password:t.pass}).then(function(e){t.$router.push({name:"login"})})})}}},U=M,T=(a("5c8b"),Object(d["a"])(U,E,A,!1,null,"c674c728",null)),N=T.exports;s["default"].use(r["a"]);var q=new r["a"]({routes:[{path:"/",name:"login",component:j},{path:"/register",name:"register",component:N},{path:"/leader",name:"Leaderboard",component:w,meta:{requiresAuth:!0}},{path:"/new/word",name:"Add new word",component:G,meta:{requiresAuth:!0}},{path:"/play",name:"Play",component:h,meta:{requiresAuth:!0}}]}),D=a("5f5b"),H=(a("f9e3"),a("2dd8"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("Header"),a("router-view")],1)}),J=[],R=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("header",{staticClass:"header"},[s("div",[s("b-navbar",{attrs:{type:"primary",variant:"primary"}},[s("b-navbar-brand",{attrs:{href:"#"}},[s("img",{staticClass:"d-inline-block align-top",attrs:{src:a("0c7d"),alt:"logo"}})]),s("b-navbar-nav",[s("b-nav-item",[s("router-link",{attrs:{to:"/Play"}},[e._v("Play")])],1),s("b-nav-item",[s("router-link",{attrs:{to:"/leader"}},[e._v("Leaderboard")])],1),s("b-nav-item",[s("router-link",{attrs:{to:"/new/word"}},[e._v("Add new word")])],1)],1),s("b-navbar-nav",{staticClass:"ml-auto"},[s("b-nav-item",[s("a",{attrs:{href:"#"},on:{click:e.logout}},[e._v("Logout")])])],1)],1)],1)])},I=[],Y={methods:{logout:function(){localStorage.clear(),this.$router.push({name:"login"})}}},z=Y,B=(a("862b"),Object(d["a"])(z,R,I,!1,null,"d3b6c2ca",null)),F=B.exports,K={name:"app",components:{Header:F}},Q=K,V=(a("034f"),Object(d["a"])(Q,H,J,!1,null,null,null)),W=V.exports;s["default"].use(D["a"]),s["default"].config.productionTip=!1,new s["default"]({router:q,render:function(e){return e(W)}}).$mount("#app")},"5c8b":function(e,t,a){"use strict";var s=a("10c9"),r=a.n(s);r.a},"64a9":function(e,t,a){},"862b":function(e,t,a){"use strict";var s=a("3bd7"),r=a.n(s);r.a},cf05:function(e,t,a){e.exports=a.p+"img/logo.e455e4e7.png"},dc09:function(e,t,a){"use strict";var s=a("e692"),r=a.n(s);r.a},e692:function(e,t,a){},e99c:function(e,t,a){"use strict";var s=a("312d"),r=a.n(s);r.a}});
//# sourceMappingURL=app.3e1549c1.js.map