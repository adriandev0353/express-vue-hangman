(function(t){function e(e){for(var r,o,i=e[0],l=e[1],u=e[2],d=0,p=[];d<i.length;d++)o=i[d],s[o]&&p.push(s[o][0]),s[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);c&&c(e);while(p.length)p.shift()();return n.push.apply(n,u||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],r=!0,i=1;i<a.length;i++){var l=a[i];0!==s[l]&&(r=!1)}r&&(n.splice(e--,1),t=o(o.s=a[0]))}return t}var r={},s={app:0},n=[];function o(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=r,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(a,r,function(e){return t[e]}.bind(null,r));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var u=0;u<i.length;u++)e(i[u]);var c=l;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var r=a("64a9"),s=a.n(r);s.a},"05d1":function(t,e,a){},"0c7d":function(t,e,a){t.exports=a.p+"img/hangman-game.efb7e914.svg"},4616:function(t,e,a){"use strict";var r=a("9759"),s=a.n(r);s.a},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var r=a("2b0e"),s=a("8c4f"),n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"play"},[r("b-container",[r("div",[r("img",{attrs:{src:a("cf05"),alt:""}}),r("p",[t._v("Enter a word length:")]),r("b-button-group",[r("input",{directives:[{name:"model",rawName:"v-model",value:t.length,expression:"length"}],staticClass:"lengthInput",attrs:{type:"number",placeholder:"Enter a word-length",disabled:t.play},domProps:{value:t.length},on:{input:function(e){e.target.composing||(t.length=e.target.value)}}}),t.play?t._e():r("b-button",{attrs:{variant:"outline-primary"},on:{click:t.activatePlay}},[t._v("Submit")]),t.play?r("b-button",{attrs:{variant:"outline-primary",disabled:""},on:{click:t.activatePlay}},[t._v("Submit")]):t._e()],1)],1),t.play?r("div",[!t.win&&t.guessesLeft>0?r("div",[r("h1",[r("span",{staticClass:"guess"},[t._v(t._s(t.guessesLeft))]),t._v(" Guesses left\n        ")]),t._l(t.wordGuessed,function(e,a){return r("span",{key:a},[t._v(t._s(e)+" ")])})],2):t.win?r("div",[r("h1",[t._v("Congratulations!")]),r("h3",[t._v("\n          The word was\n          "),r("span",{staticClass:"word"},[t._v(t._s(t.word.word))])]),r("h4",[t._v("\n          You won\n          "),r("span",{staticClass:"points"},[t._v(t._s(t.length))]),t._v(" points!\n        ")]),r("b-button",{on:{click:t.resetGame}},[t._v("New Game")])],1):0===t.guessesLeft?r("div",[r("h1",{staticClass:"guess"},[t._v("Game Over!")]),r("h3",[t._v("\n          The word was\n          "),r("span",{staticClass:"word"},[t._v(t._s(t.word.word))])]),r("h4",[t._v("\n          You lost\n          "),r("span",{staticClass:"points"},[t._v(t._s(t.lost))]),t._v(" points!\n        ")]),r("b-button",{on:{click:t.resetGame}},[t._v("New Game")])],1):t._e(),!t.win&&t.guessesLeft>0?r("b-row",[r("hr"),r("b-col",{attrs:{sm:""}}),r("b-col",{attrs:{sm:""}},[r("div",t._l(t.alphabet,function(e,a){return r("b-button",{key:a,staticClass:"letter",attrs:{variant:"light",disabled:t.isDisabled(a)},on:{click:function(a){return t.letterCheck(e.letter)}}},[t._v(t._s(e.letter))])}),1)]),r("b-col",{attrs:{sm:""}})],1):t._e()],1):t._e()])],1)},o=[],i=(a("ac4d"),a("8a81"),a("ac6a"),a("bc3a")),l=a.n(i),u={name:"play",data:function(){return{lost:0,length:0,play:!1,guessesLeft:5,wordGuessed:[],win:!1,word:{},lettersGuessed:[],alphabet:[{letter:"A",disable:!1},{letter:"B",disable:!1},{letter:"C",disable:!1},{letter:"D",disable:!1},{letter:"E",disable:!1},{letter:"F",disable:!1},{letter:"G",disable:!1},{letter:"H",disable:!1},{letter:"I",disable:!1},{letter:"J",disable:!1},{letter:"K",disable:!1},{letter:"L",disable:!1},{letter:"M",disable:!1},{letter:"N",disable:!1},{letter:"O",disable:!1},{letter:"P",disable:!1},{letter:"Q",disable:!1},{letter:"R",disable:!1},{letter:"S",disable:!1},{letter:"T",disable:!1},{letter:"U",disable:!1},{letter:"V",disable:!1},{letter:"W",disable:!1},{letter:"X",disable:!1},{letter:"Y",disable:!1},{letter:"Z",disable:!1}]}},methods:{activatePlay:function(){var t=this;this.wordGuessed=[],l.a.get("https://hangman-webapp.herokuapp.com/api/list/size/"+this.length).then(function(e){var a=e.data,r=a.words,s=r.length,n=Math.ceil(Math.random()*s)+1;t.word=r[n],t.$forceUpdate()}).then(function(){var e=t.word.word;console.log(e);for(var a=0;a<e.length;a++)"-"===e[a]?t.wordGuessed.push("-"):t.wordGuessed.push("_")}),this.play=!0},letterCheck:function(t){this.lettersGuessed.push(t);var e=!1,a=this.word.word;a=a.toLowerCase();var r=t.toLowerCase(),s=!0,n=!1,o=void 0;try{for(var i,u=this.alphabet[Symbol.iterator]();!(s=(i=u.next()).done);s=!0){var c=i.value;c.letter===t&&(c.disable=!0)}}catch(g){n=!0,o=g}finally{try{s||null==u.return||u.return()}finally{if(n)throw o}}for(var d=0;d<a.length;d++)r===a[d]&&(this.wordGuessed[d]=r,this.$forceUpdate(),e=!0);var p="",h=!0,m=!1,v=void 0;try{for(var f,b=this.wordGuessed[Symbol.iterator]();!(h=(f=b.next()).done);h=!0){var w=f.value;p+=w}}catch(g){m=!0,v=g}finally{try{h||null==b.return||b.return()}finally{if(m)throw v}}p===a&&(this.win=!0,l.a.post("https://hangman-webapp.herokuapp.com/api/add/to/user",{username:localStorage["user"],word:this.word.word,state:"won"}).then(function(t){})),e||(this.guessesLeft--,0===this.guessesLeft&&(this.lost=Math.ceil(this.length/2),l.a.post("https://hangman-webapp.herokuapp.com/api/add/to/user",{username:localStorage["user"],word:this.word.word,state:"lost"}).then(function(t){})))},isDisabled:function(t){return this.alphabet[t].disable},resetGame:function(){this.play=!1;var t=!0,e=!1,a=void 0;try{for(var r,s=this.alphabet[Symbol.iterator]();!(t=(r=s.next()).done);t=!0){var n=r.value;n.disable=!1}}catch(o){e=!0,a=o}finally{try{t||null==s.return||s.return()}finally{if(e)throw a}}this.guessesLeft=5,this.length=0,this.wordGuessed=[],this.win=!1,this.word={},this.lettersGuessed=[]}}},c=u,d=(a("4616"),a("2877")),p=Object(d["a"])(c,n,o,!1,null,"13417120",null),h=p.exports,m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"leaderboard"},[a("b-container",[a("b-row",[a("b-col",{staticStyle:{"margin-top":"30px"}},[a("h3",[a("u",[t._v("Most words won")])]),t._v("\n        "+t._s(t.topUser)+" - "+t._s(t.mostWords)+"\n        "),a("hr"),a("h3",[a("u",[t._v("Longest word")])]),t._v("\n        "+t._s(t.longestUser)+" - "+t._s(t.longestWord)+"\n      ")]),a("b-col",{staticStyle:{"margin-top":"30px"},attrs:{cols:"6"}},[a("h1",[t._v("The Hangman Leaderboards")]),a("b-table",{attrs:{info:"",items:t.items,fields:t.fields,"tbody-tr-class":t.rowClass}})],1),a("b-col")],1)],1)],1)},v=[],f={beforeCreate:function(){var t=this;l.a.get("https://hangman-webapp.herokuapp.com/api/all/users").then(function(e){for(var a=[],r=e.data,s=r.words,n=0;n<s.length;n++){var o={Ranking:n+1,Username:s[n].username,Points:s[n].points};a.push(o),t.items=a}}).then(function(){l.a.get("https://hangman-webapp.herokuapp.com/api/link/data").then(function(e){var a=e.data,r=a.items,s={};t.longestWord=r[0].word,t.longestUser=r[0].username;var n=!0,o=!1,i=void 0;try{for(var l,u=r[Symbol.iterator]();!(n=(l=u.next()).done);n=!0){var c=l.value;"won"===c.complete_state&&(void 0===s[c.username]?s[c.username]=1:s[c.username]++)}}catch(m){o=!0,i=m}finally{try{n||null==u.return||u.return()}finally{if(o)throw i}}var d="",p=0;for(var h in s)s[h]>p&&(d=h,p=s[h]);t.topUser=d,t.mostWords=p})})},data:function(){return{fields:["Ranking","Username","Points"],items:[],mostWords:0,topUser:"",longestWord:"",longestUser:""}},methods:{rowClass:function(t,e){if(t)return 1===t.Ranking?"table-warning":void 0}}},b=f,w=Object(d["a"])(b,m,v,!1,null,null,null),g=w.exports,_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"new"},[a("b-container",[a("b-row",[a("b-col",[a("h4",{staticStyle:{"margin-top":"15px"}},[a("u",[t._v("How does this work?")])]),a("p",[t._v("On this page you can add new words to the current repository of words. These added words will be used in games that other players play. When you click submit, the word is sent in to be confirmed/verified. Once verified, you will recieve 3 points for every new word you add.")])]),a("b-col",{attrs:{cols:"6"}},[a("h1",[t._v("Add new word here..")]),a("b-input-group",{staticClass:"mt-3 mx-auto",staticStyle:{"margin-bottom":"10px",width:"200px"}},[a("b-form-input",{attrs:{placeholder:"eg. hangman"},model:{value:t.word,callback:function(e){t.word=e},expression:"word"}}),a("b-input-group-append",[a("b-button",{attrs:{variant:"outline-dark"},on:{click:t.submitWord}},[t._v("Submit")])],1)],1)],1),a("b-col")],1)],1)],1)},y=[],k={data:function(){return{word:""}},methods:{submitWord:function(){var t=this,e="";l.a.get("https://hangman-webapp.herokuapp.com/api/check/word/"+this.word).then(function(t){var a=t.data;e=a.check}).then(function(){"new"===e&&l.a.post("https://hangman-webapp.herokuapp.com/api/store/new/word",{word:t.word,user:localStorage["user"]}).then(function(t){var e=t.data;console.log(e.status)})})}}},C=k,P=Object(d["a"])(C,_,y,!1,null,null,null),x=P.exports,S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm"}),a("div",{staticClass:"col-sm"},[a("h1",[t._v("Login")]),a("table",[a("tr",[a("td",[t._v("username")]),a("td",[a("b-form-input",{attrs:{placeholder:"username"},model:{value:t.user,callback:function(e){t.user=e},expression:"user"}})],1)]),a("tr",[a("td",[t._v("Password")]),a("td",[a("b-form-input",{attrs:{type:"password",placeholder:"password"},model:{value:t.pass,callback:function(e){t.pass=e},expression:"pass"}})],1)])]),t.error?a("b-alert",{staticStyle:{margin:"5px"},attrs:{show:"",variant:"danger"}},[t._v(t._s(t.message))]):a("b-alert",{attrs:{hide:"",variant:"danger"}},[t._v(t._s(t.message))]),a("b-button",{staticClass:"login",on:{click:t.submitUser}},[t._v("Login")]),a("b-button",{staticClass:"login",on:{click:t.registerUser}},[t._v("Sign up")])],1),a("div",{staticClass:"col-sm"})])])])},U=[],W=new r["default"],T={name:"login",data:function(){return{user:"",pass:"",error:!1,message:""}},methods:{submitUser:function(){var t=this,e=this.user;e=e.toLowerCase();var a=this.pass;e&&a?l.a.post("https://hangman-webapp.herokuapp.com/api/login/check",{username:e,password:a}).then(function(a){var r=a.data,s=r.auth,n=r.token;s?(localStorage["token"]=n,localStorage["user"]=e,W.$emit("userData",t.user),t.$router.push({name:"Play"})):(t.error=!0,t.message="Your username or password are incorrect")}):(this.error=!0,this.message="Please enter a username and a password")},registerUser:function(){this.$router.push({name:"register"})}}},$=T,O=(a("b170"),Object(d["a"])($,S,U,!1,null,"73aa3d8b",null)),G=O.exports,L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm"}),a("div",{staticClass:"col-sm"},[a("h1",[t._v("Register")]),a("table",[a("tr",[a("td",[t._v("username")]),a("td",[a("b-form-input",{attrs:{placeholder:"username"},model:{value:t.user,callback:function(e){t.user=e},expression:"user"}})],1)]),a("tr",[a("td",[t._v("Password")]),a("td",[a("b-form-input",{attrs:{type:"password",placeholder:"password"},model:{value:t.pass,callback:function(e){t.pass=e},expression:"pass"}})],1)]),a("tr",[a("td",[t._v("Confirm password")]),a("td",[a("b-form-input",{attrs:{type:"password",placeholder:"password"},model:{value:t.passConfirm,callback:function(e){t.passConfirm=e},expression:"passConfirm"}})],1)])]),t.error?a("b-alert",{staticStyle:{margin:"5px"},attrs:{show:"",variant:"danger"}},[t._v(t._s(t.message))]):a("b-alert",{attrs:{hide:"",variant:"danger"}},[t._v(t._s(t.message))]),a("b-button",{staticClass:"login",on:{click:t.submitUser}},[t._v("Sign up")]),a("b-button",{staticClass:"login",on:{click:t.back}},[t._v("Back")])],1),a("div",{staticClass:"col-sm"})])])])},j=[],R={name:"Register",data:function(){return{user:"",pass:"",passConfirm:"",message:"",error:!1,accountAvailability:!1}},methods:{submitUser:function(){var t,e=this;this.user&&this.pass?this.pass===this.passConfirm?l.a.get("https://hangman-webapp.herokuapp.com/api/check/user/"+this.user).then(function(a){var r=a.data;t=r.message,"already exists"===t?(e.error=!0,e.message="This username already exists"):e.accountAvailability=!0,e.$forceUpdate(),e.accountAvailability&&l.a.post("https://hangman-webapp.herokuapp.com/api/add/user/",{username:e.user,password:e.pass}).then(function(t){e.$router.push({name:"login"})})}):(this.error=!0,this.message="The passwords you have entered do not match"):(this.error=!0,this.message="Please enter a username and a password")},back:function(){this.$router.push({name:"login"})}}},A=R,D=(a("dc07"),Object(d["a"])(A,L,j,!1,null,"0cef9e80",null)),E=D.exports,I=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"Profile"},[a("b-container",[a("b-row",[a("b-col",{staticStyle:{"margin-top":"50px"}},[a("h1",[t._v(t._s(t.user))]),a("h2",[t._v("\n          Points:\n          "),a("span",{staticClass:"points"},[t._v(t._s(t.points))])]),a("h2",[t._v("Ranking: "+t._s(t.ranking))]),a("hr"),a("h5",[t._v("filter:")]),a("b-form-select",{staticClass:"mb-3",on:{change:function(e){return t.onChange(e)}},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[a("option",{domProps:{value:null}},[t._v("Game history")]),a("option",{attrs:{value:"won"}},[t._v("Words won")]),a("option",{attrs:{value:"lost"}},[t._v("Words lost")])]),a("hr"),a("h2",[t._v("\n          Win Rate:\n          "),t.winPercentage>50?a("span",{staticClass:"winRate"},[t._v(t._s(t.winPercentage)+"%")]):a("span",{staticClass:"loseRate"},[t._v(t._s(t.winPercentage)+"%")])])],1),a("b-col",{attrs:{cols:"7"}},[a("b-table",{attrs:{info:"",items:t.items,fields:t.fields,"tbody-tr-class":t.rowClass}})],1),a("b-col")],1)],1)],1)},M=[],q={beforeCreate:function(){var t=this;this.points=0,l.a.get("https://hangman-webapp.herokuapp.com/api/get/user/data/"+localStorage["user"]).then(function(e){for(var a=e.data,r=a.data,s=[],n=0;n<r.length;n++){t.points+=r[n].points,t.points<0&&(t.points=0);var o={Total_points:t.points,Word:r[n].word,Result:r[n].complete_state,Points:r[n].points};s.push(o)}var i=0,u=0,c=!0,d=!1,p=void 0;try{for(var h,m=r[Symbol.iterator]();!(c=(h=m.next()).done);c=!0){var v=h.value;i++,"won"===v.complete_state&&u++}}catch(f){d=!0,p=f}finally{try{c||null==m.return||m.return()}finally{if(d)throw p}}t.winPercentage=(u/i*100).toFixed(2),t.items=s,l.a.get("https://hangman-webapp.herokuapp.com/api/all/users").then(function(e){for(var a=e.data,r=a.words,s=0;s<r.length;s++)r[s].username===localStorage["user"]&&(t.ranking=s+1)})})},data:function(){return{user:localStorage["user"],fields:["Total_points","Word","Result","Points"],winPercentage:0,items:[],totalPoints:0,points:0,ranking:0,selected:null}},methods:{rowClass:function(t,e){if(t)return"won"===t.Result?"table-success":"table-danger"},onChange:function(t){var e=this;this.totalPoints=0,this.selected?l.a.get("https://hangman-webapp.herokuapp.com/api/get/user/data/user/"+localStorage["user"]+"/choice/"+this.selected).then(function(t){for(var a=t.data,r=a.data,s=[],n=0;n<r.length;n++){e.totalPoints+=r[n].points;var o={Total_points:e.totalPoints,Word:r[n].word,Result:r[n].complete_state,Points:r[n].points};s.push(o)}e.items=s,e.$forceUpdate()}):l.a.get("https://hangman-webapp.herokuapp.com/api/get/user/data/"+localStorage["user"]).then(function(t){for(var a=t.data,r=a.data,s=[],n=0;n<r.length;n++){e.totalPoints+=r[n].points,e.totalPoints<0&&(e.totalPoints=0);var o={Total_points:e.totalPoints,Word:r[n].word,Result:r[n].complete_state,Points:r[n].points};s.push(o)}e.items=s})}}},H=q,N=(a("aee2"),Object(d["a"])(H,I,M,!1,null,"100e146b",null)),Y=N.exports,J=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"admin"},[a("b-container",[a("h1",[t._v("Admin page")]),a("b-card",{attrs:{"no-body":""}},[a("b-tabs",{attrs:{pills:"",card:"",vertical:""}},[a("b-tab",{attrs:{title:"Users",active:""}},[a("b-card-text",[a("label",[t._v("\n              Search user:\n              "),a("b-input-group",{staticClass:"mt-3",staticStyle:{"margin-bottom":"10px",width:"200px"}},[a("b-form-input",{model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),a("b-input-group-append",[a("b-button",{attrs:{variant:"outline-dark"},on:{click:t.searchUser}},[t._v("Search")])],1)],1)],1),a("b-table",{attrs:{dark:"",striped:"",items:t.items,fields:t.fields},scopedSlots:t._u([t._l(t.fields,function(e,r){return{key:e.key,fn:function(s){return["button"===e.colType?a("div",{key:r},[a("b-button",{attrs:{variant:"danger"},on:{click:function(e){return t.deleteUser(s.item.ID)}}},[t._v("Remove")])],1):"id"===e.colType?a("div",{key:r},[a("h5",[t._v(t._s(s.item.ID))])]):"Username"===e.colType?a("div",{key:r},[a("h5",[t._v(t._s(s.item.Username))])]):"Points"===e.colType?a("div",{key:r},[a("h5",[t._v(t._s(s.item.Points))])]):t._e()]}}})],null,!0)})],1)],1),a("b-tab",[a("template",{slot:"title"},[a("span",[t._v("\n              New Words\n              "),a("b-badge",{attrs:{variant:"primary"}},[t._v(t._s(t.newWords))])],1)]),a("h1",[t._v("Verify new words")]),a("b-table",{attrs:{dark:"",striped:"",items:t.words,fields:t.columns},scopedSlots:t._u([t._l(t.columns,function(e,r){return{key:e.key,fn:function(s){return["status"===e.colType?a("div",{key:r},[a("b-button",{staticStyle:{margin:"5px"},attrs:{variant:"success"},on:{click:function(e){return t.confirmWord(s.item.word,s.item.username)}}},[t._v("+")]),a("b-button",{staticStyle:{margin:"5px"},attrs:{variant:"danger"},on:{click:function(e){return t.denyWord(s.item.word)}}},[t._v("-")])],1):"user"===e.colType?a("div",{key:r},[a("h5",[t._v(t._s(s.item.username))])]):"word"===e.colType?a("div",{key:r},[a("h5",[t._v(t._s(s.item.word))])]):t._e()]}}})],null,!0)})],2)],1)],1)],1)],1)},B=[],F=(a("386d"),{beforeCreate:function(){var t=this;l.a.get("https://hangman-webapp.herokuapp.com/api/all/users").then(function(e){for(var a=[],r=e.data,s=r.words,n=0;n<s.length;n++){var o={ID:s[n].id,Username:s[n].username,Points:s[n].points};a.push(o),t.items=a}}).then(function(){l.a.get("https://hangman-webapp.herokuapp.com/api/all/new/words").then(function(e){var a=e.data,r=a.words,s=[];t.newWords=0;var n=!0,o=!1,i=void 0;try{for(var l,u=r[Symbol.iterator]();!(n=(l=u.next()).done);n=!0){var c=l.value;if("pending"===c.status){var d={username:c.username,word:c.word};s.push(d),t.newWords++,t.$forceUpdate()}}}catch(p){o=!0,i=p}finally{try{n||null==u.return||u.return()}finally{if(o)throw i}}t.words=s})})},data:function(){return{fields:[{key:"ID",label:"ID",colType:"id"},{key:"Username",label:"Username",colType:"user"},{key:"Points",label:"Points",colType:"points"},{key:"Remove",label:"",colType:"button"}],items:[],columns:[{key:"username",label:"Username",colType:"user"},{key:"word",label:"Word",colType:"word"},{key:"status",label:"Confirm/Deny",colType:"status"}],words:[],search:"",newWords:0}},methods:{searchUser:function(){var t=this,e=this.search;""!=e?l.a.get("https://hangman-webapp.herokuapp.com/api/find/user/"+this.search).then(function(e){var a=e.data,r=a.user,s={ID:r.id,Username:r.username,Points:r.points};t.items=[s]}):l.a.get("https://hangman-webapp.herokuapp.com/api/all/users").then(function(e){for(var a=[],r=e.data,s=r.words,n=0;n<s.length;n++){var o={ID:s[n].id,Username:s[n].username,Points:s[n].points};a.push(o),t.items=a}})},deleteUser:function(t){var e=this;if(confirm("Are you sure you want to delete this users' account?")){var a=[];l.a.post("https://hangman-webapp.herokuapp.com/api/delete/user",{id:t}).then(function(t){for(var r=t.data,s=r.users,n=0;n<s.length;n++){var o={ID:s[n].id,Username:s[n].username,Points:s[n].points};a.push(o),e.items=a}})}},confirmWord:function(t,e){var a=this;l.a.post("https://hangman-webapp.herokuapp.com/api/add/word/from/user/",{word:t,user:e}).then(function(e){l.a.post("https://hangman-webapp.herokuapp.com/api/set/new/word/status",{word:t,status:"confirmed"}).then(function(t){l.a.get("https://hangman-webapp.herokuapp.com/api/all/new/words").then(function(t){var e=t.data,r=e.words;a.newWords=0;var s=[],n=!0,o=!1,i=void 0;try{for(var l,u=r[Symbol.iterator]();!(n=(l=u.next()).done);n=!0){var c=l.value;if("pending"===c.status){var d={username:c.username,word:c.word};s.push(d),a.newWords++,a.$forceUpdate()}}}catch(p){o=!0,i=p}finally{try{n||null==u.return||u.return()}finally{if(o)throw i}}a.words=s})})})},denyWord:function(t){var e=this;l.a.post("https://hangman-webapp.herokuapp.com/api/set/new/word/status",{word:t,status:"denied"}).then(function(t){l.a.get("https://hangman-webapp.herokuapp.com/api/all/new/words").then(function(t){var a=t.data,r=a.words;e.newWords=0;var s=[],n=!0,o=!1,i=void 0;try{for(var l,u=r[Symbol.iterator]();!(n=(l=u.next()).done);n=!0){var c=l.value;if("pending"===c.status){var d={username:c.username,word:c.word};s.push(d),e.newWords++,e.$forceUpdate()}}}catch(p){o=!0,i=p}finally{try{n||null==u.return||u.return()}finally{if(o)throw i}}e.words=s})})}}}),V=F,z=Object(d["a"])(V,J,B,!1,null,null,null),K=z.exports;r["default"].use(s["a"]);var Q=new s["a"]({routes:[{path:"/",name:"login",component:G},{path:"/admin",name:"admin",component:K},{path:"/register",name:"register",component:E},{path:"/leader",name:"Leaderboard",component:g,meta:{requiresAuth:!0}},{path:"/new/word",name:"Add new word",component:x,meta:{requiresAuth:!0}},{path:"/play",name:"Play",component:h,meta:{requiresAuth:!0}},{path:"/profile",name:"Profile",component:Y,meta:{requiresAuth:!0}}]});Q.beforeEach(function(t,e,a){if(t.matched.some(function(t){return t.meta.requiresAuth})){var r=localStorage["token"];l.a.post("https://hangman-webapp.herokuapp.com/api/token/check",r).then(function(e){var r=e.data,s=r.success;s?a():a({path:"/",query:{redirect:t.fullPath}})})}else a()});var X=Q,Z=a("5f5b"),tt=(a("f9e3"),a("2dd8"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("Header"),a("router-view")],1)}),et=[],at=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("header",{staticClass:"header"},[r("div",[r("b-navbar",{attrs:{type:"dark",variant:"dark"}},[r("b-navbar-brand",{attrs:{href:"#"}},[r("img",{staticClass:"d-inline-block align-top",attrs:{src:a("0c7d"),alt:"logo"}})]),r("b-navbar-nav",[r("b-nav-item",[r("router-link",{attrs:{to:"/Play"}},[t._v("Play")])],1),r("b-nav-item",[r("router-link",{attrs:{to:"/leader"}},[t._v("Leaderboard")])],1),r("b-nav-item",[r("router-link",{attrs:{to:"/new/word"}},[t._v("Add new word")])],1)],1),r("b-navbar-nav",{staticClass:"ml-auto"},[r("b-nav-item-dropdown",{attrs:{text:"Other",right:""}},[r("b-dropdown-item",[r("router-link",{attrs:{to:"/profile"}},[t._v("Profile")])],1),"admin"===t.user?r("b-dropdown-item",[r("router-link",{attrs:{to:"/admin"}},[t._v("Admin Page")])],1):t._e(),r("b-dropdown-divider"),r("b-dropdown-item",[r("a",{staticClass:"dropdown",attrs:{href:"#"},on:{click:t.logout}},[t._v("Logout")])])],1)],1)],1)],1)])},rt=[],st={data:function(){return{user:""}},mounted:function(){var t=this;W.$on("userData",function(e){t.user=e})},methods:{logout:function(){localStorage.clear(),this.user="",this.$router.push({name:"login"})},setUser:function(t){this.user=t}}},nt=st,ot=(a("c7b0"),Object(d["a"])(nt,at,rt,!1,null,"7e8c2702",null)),it=ot.exports,lt={name:"app",components:{Header:it}},ut=lt,ct=(a("034f"),Object(d["a"])(ut,tt,et,!1,null,null,null)),dt=ct.exports;r["default"].use(Z["a"]),r["default"].config.productionTip=!1,new r["default"]({router:X,render:function(t){return t(dt)}}).$mount("#app")},"64a9":function(t,e,a){},6646:function(t,e,a){},9759:function(t,e,a){},aee2:function(t,e,a){"use strict";var r=a("e9c8"),s=a.n(r);s.a},b170:function(t,e,a){"use strict";var r=a("cd86"),s=a.n(r);s.a},c7b0:function(t,e,a){"use strict";var r=a("6646"),s=a.n(r);s.a},cd86:function(t,e,a){},cf05:function(t,e,a){t.exports=a.p+"img/logo.e455e4e7.png"},dc07:function(t,e,a){"use strict";var r=a("05d1"),s=a.n(r);s.a},e9c8:function(t,e,a){}});
//# sourceMappingURL=app.e9c7ca85.js.map