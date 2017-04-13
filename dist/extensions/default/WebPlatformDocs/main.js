define("text",["module"],function(e){"use strict";var t,n,r,o,i,s=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],a=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,l=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,c="undefined"!=typeof location&&location.href,d=c&&location.protocol&&location.protocol.replace(/\:/,""),u=c&&location.hostname,p=c&&(location.port||void 0),f={},h=e.config&&e.config()||{};return t={version:"2.0.10",strip:function(e){if(e){e=e.replace(a,"");var t=e.match(l);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:h.createXhr||function(){var e,t,n;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(t=0;3>t;t+=1){n=s[t];try{e=new ActiveXObject(n)}catch(r){}if(e){s=[n];break}}return e},parseName:function(e){var t,n,r,o=!1,i=e.indexOf("."),s=0===e.indexOf("./")||0===e.indexOf("../");return-1!==i&&(!s||i>1)?(t=e.substring(0,i),n=e.substring(i+1,e.length)):t=e,r=n||t,i=r.indexOf("!"),-1!==i&&(o="strip"===r.substring(i+1),r=r.substring(0,i),n?n=r:t=r),{moduleName:t,ext:n,strip:o}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,r,o){var i,s,a,l=t.xdRegExp.exec(e);return l?(i=l[2],s=l[3],s=s.split(":"),a=s[1],s=s[0],!(i&&i!==n||s&&s.toLowerCase()!==r.toLowerCase()||(a||s)&&a!==o)):!0},finishLoad:function(e,n,r,o){r=n?t.strip(r):r,h.isBuild&&(f[e]=r),o(r)},load:function(e,n,r,o){if(o.isBuild&&!o.inlineText)return void r();h.isBuild=o.isBuild;var i=t.parseName(e),s=i.moduleName+(i.ext?"."+i.ext:""),a=n.toUrl(s),l=h.useXhr||t.useXhr;return 0===a.indexOf("empty:")?void r():void(!c||l(a,d,u,p)?t.get(a,function(n){t.finishLoad(e,i.strip,n,r)},function(e){r.error&&r.error(e)}):n([s],function(e){t.finishLoad(i.moduleName+"."+i.ext,i.strip,e,r)}))},write:function(e,n,r,o){if(f.hasOwnProperty(n)){var i=t.jsEscape(f[n]);r.asModule(e+"!"+n,"define(function () { return '"+i+"';});\n")}},writeFile:function(e,n,r,o,i){var s=t.parseName(n),a=s.ext?"."+s.ext:"",l=s.moduleName+a,c=r.toUrl(s.moduleName+a)+".js";t.load(l,r,function(n){var r=function(e){return o(c,e)};r.asModule=function(e,t){return o.asModule(e,c,t)},t.write(e,l,r,i)},i)}},"node"===h.env||!h.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(n=require.nodeRequire("fs"),t.get=function(e,t,r){try{var o=n.readFileSync(e,"utf8");0===o.indexOf("\ufeff")&&(o=o.substring(1)),t(o)}catch(i){r(i)}}):"xhr"===h.env||!h.env&&t.createXhr()?t.get=function(e,n,r,o){var i,s=t.createXhr();if(s.open("GET",e,!0),o)for(i in o)o.hasOwnProperty(i)&&s.setRequestHeader(i.toLowerCase(),o[i]);h.onXhr&&h.onXhr(s,e),s.onreadystatechange=function(t){var o,i;4===s.readyState&&(o=s.status,o>399&&600>o?(i=new Error(e+" HTTP status: "+o),i.xhr=s,r(i)):n(s.responseText),h.onXhrComplete&&h.onXhrComplete(s,e))},s.send(null)}:"rhino"===h.env||!h.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?t.get=function(e,t){var n,r,o="utf-8",i=new java.io.File(e),s=java.lang.System.getProperty("line.separator"),a=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(i),o)),l="";try{for(n=new java.lang.StringBuffer,r=a.readLine(),r&&r.length()&&65279===r.charAt(0)&&(r=r.substring(1)),null!==r&&n.append(r);null!==(r=a.readLine());)n.append(s),n.append(r);l=String(n.toString())}finally{a.close()}t(l)}:("xpconnect"===h.env||!h.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(r=Components.classes,o=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),i="@mozilla.org/windows-registry-key;1"in r,t.get=function(e,t){var n,s,a,l={};i&&(e=e.replace(/\//g,"\\")),a=new FileUtils.File(e);try{n=r["@mozilla.org/network/file-input-stream;1"].createInstance(o.nsIFileInputStream),n.init(a,1,0,!1),s=r["@mozilla.org/intl/converter-input-stream;1"].createInstance(o.nsIConverterInputStream),s.init(n,"utf-8",n.available(),o.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),s.readString(n.available(),l),s.close(),n.close(),t(l.value)}catch(c){throw new Error((a&&a.path||"")+": "+c)}}),t}),define("text!InlineDocsViewer.html",[],function(){return'<div class="css-prop-defn {{#fullscreenSummary}}fullscreen-summary{{/fullscreenSummary}}" tabIndex="0"> <!-- tabIndex needed: otherwise click focuses CodeMirror scroller and Esc won\'t work -->\n    <div class="css-prop-summary">\n        <h1>{{propName}}</h1>\n        <div>{{{summary}}}</div>\n    </div>\n    <div class="divider-holder no-focus">\n        <div class="divider"></div>\n    </div>\n    <div class="css-prop-values quiet-scrollbars">\n        <div class="scroller" tabIndex="0"> <!-- tabIndex needed: otherwise can\'t be focused on open or via click -->\n            <dl>\n                {{#propValues}}\n                <dt>{{{value}}}</dt>\n                <dd>{{{description}}}</dd>\n                {{/propValues}}\n            </dl>\n        </div>\n    </div>\n    <div class="content-bottom"></div>\n    <a class="more-info" href="{{url}}" title="{{url}}">{{Strings.DOCS_MORE_LINK}}</a>\n</div>'}),define("InlineDocsViewer",["require","exports","module","text!InlineDocsViewer.html"],function(e,t,n){"use strict";function r(e,t){s.call(this);var n={propName:e,summary:t.SUMMARY,fullscreenSummary:!(t.VALUES&&t.VALUES.length),propValues:t.VALUES||[],url:t.URL,Strings:l},r=c.render(d,n);this.$wrapperDiv=$(r),this.$htmlContent.append(this.$wrapperDiv),o.addLinkTooltips(this.$wrapperDiv),this._sizeEditorToContent=this._sizeEditorToContent.bind(this),this._handleWheelScroll=this._handleWheelScroll.bind(this),this.$scroller=this.$wrapperDiv.find(".scroller"),this.$scroller.on("mousewheel",this._handleWheelScroll),this._onKeydown=this._onKeydown.bind(this)}var o=brackets.getModule("widgets/Dialogs"),i=brackets.getModule("utils/ExtensionUtils"),s=brackets.getModule("editor/InlineWidget").InlineWidget,a=brackets.getModule("utils/KeyEvent"),l=brackets.getModule("strings"),c=brackets.getModule("thirdparty/mustache/mustache"),d=e("text!InlineDocsViewer.html"),u=40;i.loadStyleSheet(n,"WebPlatformDocs.css"),r.prototype=Object.create(s.prototype),r.prototype.constructor=r,r.prototype.parentClass=s.prototype,r.prototype.$wrapperDiv=null,r.prototype.$scroller=null,r.prototype._handleScrolling=function(e,t,n){return e.stopPropagation(),t&&0===n.scrollTop?(e.preventDefault(),!0):!t&&n.scrollTop+n.clientHeight>=n.scrollHeight?(e.preventDefault(),!0):!1},r.prototype._handleWheelScroll=function(e){var t=e.originalEvent.wheelDeltaY>0,n=e.currentTarget;n.clientHeight>=n.scrollHeight||this._handleScrolling(e,t,n)},r.prototype._onKeydown=function(e){var t,n=e.keyCode,r=this.$scroller[0];if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)return!1;switch(t=r.scrollTop,n){case a.DOM_VK_UP:t=Math.max(0,t-u);break;case a.DOM_VK_PAGE_UP:t=Math.max(0,t-r.clientHeight);break;case a.DOM_VK_DOWN:t=Math.min(r.scrollHeight-r.clientHeight,t+u);break;case a.DOM_VK_PAGE_DOWN:t=Math.min(r.scrollHeight-r.clientHeight,t+r.clientHeight);break;default:return!1}return r.scrollTop=t,e.stopPropagation(),e.preventDefault(),!0},r.prototype.onAdded=function(){r.prototype.parentClass.onAdded.apply(this,arguments),this._sizeEditorToContent(),$(window).on("resize",this._sizeEditorToContent),this.$scroller[0].focus(),this.$wrapperDiv[0].addEventListener("keydown",this._onKeydown,!0)},r.prototype.onClosed=function(){r.prototype.parentClass.onClosed.apply(this,arguments),$(window).off("resize",this._sizeEditorToContent),this.$wrapperDiv[0].removeEventListener("keydown",this._onKeydown,!0)},r.prototype._sizeEditorToContent=function(){this.hostEditor.setInlineWidgetHeight(this,this.$wrapperDiv.height()+20,!0)},n.exports=r}),define("main",["require","exports","module","InlineDocsViewer"],function(e,t,n){"use strict";function r(e){if(!u[e]){var t=new $.Deferred;$.ajax({url:c.getModulePath(n,e),dataType:"json"}).done(function(e,n,r){t.resolve(e)}).fail(function(e,n,r){console.error("Unable to load documentation database: ",r),t.reject()}),u[e]=t.promise()}return u[e]}function o(e,t){var n,o,s=[],c=e.getLanguageForSelection().getId(),u=["css","scss","less","html"],p=c?u.indexOf(c):-1;if(0>p)return null;var f=e.getSelection();if(f.start.line!==f.end.line)return null;if(2>=p?(n="css.json",o=a.getInfoAtPos(e,f.start),o.name&&(s.push("css/properties/"+o.name),s.push("css/properties/"+o.name.replace(/^-(?:webkit|moz|ms|o)-/,"")))):(n="html.json",o=l.getTagInfo(e,f.start),o.position.tokenType===l.ATTR_NAME&&o.attr&&o.attr.name&&s.push("html/attributes/"+o.attr.name.toLowerCase()),o.tagName&&(o=o.tagName.toLowerCase(),/^h[1-6]$/.test(o)&&(o="hn"),s.push("html/elements/"+o))),s.length){var h=new $.Deferred;return r(n).done(function(t){t=t.PROPERTIES;var n,r,o=i.find(s,function(e){return t.hasOwnProperty(e)});if(o){var a=o.substr(0,o.lastIndexOf("/"));r=t[o],n=o.substr(o.lastIndexOf("/")+1),"html/elements"===a&&(n="<"+n+">")}if(r){var l=new d(n,r);l.load(e),h.resolve(l)}else h.reject()}).fail(function(){h.reject()}),h.promise()}return null}var i=brackets.getModule("thirdparty/lodash"),s=brackets.getModule("editor/EditorManager"),a=brackets.getModule("language/CSSUtils"),l=brackets.getModule("language/HTMLUtils"),c=brackets.getModule("utils/ExtensionUtils"),d=e("InlineDocsViewer"),u={};s.registerInlineDocsProvider(o),t._getDocs=r,t._inlineProvider=o});