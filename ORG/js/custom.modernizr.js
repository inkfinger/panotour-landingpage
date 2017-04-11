/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-canvas-webgl !*/
!function(e,n,t){function o(e,n){return typeof e===n}function a(){var e,n,t,a,s,i,u;for(var f in r)if(r.hasOwnProperty(f)){if(e=[],n=r[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(a=o(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],u=i.split("."),1===u.length?Modernizr[u[0]]=a:(!Modernizr[u[0]]||Modernizr[u[0]]instanceof Boolean||(Modernizr[u[0]]=new Boolean(Modernizr[u[0]])),Modernizr[u[0]][u[1]]=a),l.push((a?"":"no-")+u.join("-"))}}function s(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):f?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}var r=[],i={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){r.push({name:e,fn:n,options:t})},addAsyncTest:function(e){r.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=i,Modernizr=new Modernizr;var l=[],u=n.documentElement,f="svg"===u.nodeName.toLowerCase();Modernizr.addTest("canvas",function(){var e=s("canvas");return!(!e.getContext||!e.getContext("2d"))}),Modernizr.addTest("webgl",function(){var n=s("canvas"),t="probablySupportsContext"in n?"probablySupportsContext":"supportsContext";return t in n?n[t]("webgl")||n[t]("experimental-webgl"):"WebGLRenderingContext"in e}),a(),delete i.addTest,delete i.addAsyncTest;for(var c=0;c<Modernizr._q.length;c++)Modernizr._q[c]();e.Modernizr=Modernizr}(window,document);