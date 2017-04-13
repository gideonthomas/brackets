define("text",["module"],function(t){"use strict";var e,n,i,a,o,r=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],s=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,l=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,p="undefined"!=typeof location&&location.href,u=p&&location.protocol&&location.protocol.replace(/\:/,""),b=p&&location.hostname,c=p&&(location.port||void 0),d={},g=t.config&&t.config()||{};return e={version:"2.0.10",strip:function(t){if(t){t=t.replace(s,"");var e=t.match(l);e&&(t=e[1])}else t="";return t},jsEscape:function(t){return t.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:g.createXhr||function(){var t,e,n;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(e=0;3>e;e+=1){n=r[e];try{t=new ActiveXObject(n)}catch(i){}if(t){r=[n];break}}return t},parseName:function(t){var e,n,i,a=!1,o=t.indexOf("."),r=0===t.indexOf("./")||0===t.indexOf("../");return-1!==o&&(!r||o>1)?(e=t.substring(0,o),n=t.substring(o+1,t.length)):e=t,i=n||e,o=i.indexOf("!"),-1!==o&&(a="strip"===i.substring(o+1),i=i.substring(0,o),n?n=i:e=i),{moduleName:e,ext:n,strip:a}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(t,n,i,a){var o,r,s,l=e.xdRegExp.exec(t);return l?(o=l[2],r=l[3],r=r.split(":"),s=r[1],r=r[0],!(o&&o!==n||r&&r.toLowerCase()!==i.toLowerCase()||(s||r)&&s!==a)):!0},finishLoad:function(t,n,i,a){i=n?e.strip(i):i,g.isBuild&&(d[t]=i),a(i)},load:function(t,n,i,a){if(a.isBuild&&!a.inlineText)return void i();g.isBuild=a.isBuild;var o=e.parseName(t),r=o.moduleName+(o.ext?"."+o.ext:""),s=n.toUrl(r),l=g.useXhr||e.useXhr;return 0===s.indexOf("empty:")?void i():void(!p||l(s,u,b,c)?e.get(s,function(n){e.finishLoad(t,o.strip,n,i)},function(t){i.error&&i.error(t)}):n([r],function(t){e.finishLoad(o.moduleName+"."+o.ext,o.strip,t,i)}))},write:function(t,n,i,a){if(d.hasOwnProperty(n)){var o=e.jsEscape(d[n]);i.asModule(t+"!"+n,"define(function () { return '"+o+"';});\n")}},writeFile:function(t,n,i,a,o){var r=e.parseName(n),s=r.ext?"."+r.ext:"",l=r.moduleName+s,p=i.toUrl(r.moduleName+s)+".js";e.load(l,i,function(n){var i=function(t){return a(p,t)};i.asModule=function(t,e){return a.asModule(t,p,e)},e.write(t,l,i,o)},o)}},"node"===g.env||!g.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(n=require.nodeRequire("fs"),e.get=function(t,e,i){try{var a=n.readFileSync(t,"utf8");0===a.indexOf("\ufeff")&&(a=a.substring(1)),e(a)}catch(o){i(o)}}):"xhr"===g.env||!g.env&&e.createXhr()?e.get=function(t,n,i,a){var o,r=e.createXhr();if(r.open("GET",t,!0),a)for(o in a)a.hasOwnProperty(o)&&r.setRequestHeader(o.toLowerCase(),a[o]);g.onXhr&&g.onXhr(r,t),r.onreadystatechange=function(e){var a,o;4===r.readyState&&(a=r.status,a>399&&600>a?(o=new Error(t+" HTTP status: "+a),o.xhr=r,i(o)):n(r.responseText),g.onXhrComplete&&g.onXhrComplete(r,t))},r.send(null)}:"rhino"===g.env||!g.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?e.get=function(t,e){var n,i,a="utf-8",o=new java.io.File(t),r=java.lang.System.getProperty("line.separator"),s=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o),a)),l="";try{for(n=new java.lang.StringBuffer,i=s.readLine(),i&&i.length()&&65279===i.charAt(0)&&(i=i.substring(1)),null!==i&&n.append(i);null!==(i=s.readLine());)n.append(r),n.append(i);l=String(n.toString())}finally{s.close()}e(l)}:("xpconnect"===g.env||!g.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(i=Components.classes,a=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),o="@mozilla.org/windows-registry-key;1"in i,e.get=function(t,e){var n,r,s,l={};o&&(t=t.replace(/\//g,"\\")),s=new FileUtils.File(t);try{n=i["@mozilla.org/network/file-input-stream;1"].createInstance(a.nsIFileInputStream),n.init(s,1,0,!1),r=i["@mozilla.org/intl/converter-input-stream;1"].createInstance(a.nsIConverterInputStream),r.init(n,"utf-8",n.available(),a.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),r.readString(n.available(),l),r.close(),n.close(),e(l.value)}catch(p){throw new Error((s&&s.path||"")+": "+p)}}),e}),define("text!HtmlTags.json",[],function(){return'{     \n    "a":          { "attributes": ["href", "hreflang", "media", "rel", "target", "type"] },\n    "abbr":       { "attributes": [] },\n    "address":    { "attributes": [] },\n    "area":       { "attributes": ["alt", "coords", "href", "hreflang", "media", "rel", "shape", "target", "type"] },\n    "article":    { "attributes": [] },\n    "aside":      { "attributes": [] },\n    "audio":      { "attributes": ["autoplay", "controls", "loop", "mediagroup", "muted", "preload", "src"] },\n    "b":          { "attributes": [] },\n    "base":       { "attributes": ["href", "target"] },\n    "bdi":        { "attributes": [] },\n    "bdo":        { "attributes": [] },\n    "big":        { "attributes": [] },\n    "blockquote": { "attributes": ["cite"] },\n    "body":       { "attributes": ["onafterprint", "onbeforeprint", "onbeforeunload", "onhashchange", "onmessage", "onoffline", "ononline",\n                                   "onpagehide", "onpageshow", "onpopstate", "onredo", "onresize", "onstorage", "onundo", "onunload"] },\n    "br":         { "attributes": [] },\n    "button":     { "attributes": ["autofocus", "disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", \n                                   "name", "type", "value"] },\n    "canvas":     { "attributes": ["height", "width"] },\n    "caption":    { "attributes": [] },\n    "cite":       { "attributes": [] },\n    "code":       { "attributes": [] },\n    "col":        { "attributes": ["span"] },\n    "colgroup":   { "attributes": ["span"] },\n    "command":    { "attributes": ["checked", "disabled", "icon", "label", "radiogroup", "type"] },\n    "datalist":   { "attributes": [] },\n    "dd":         { "attributes": [] },\n    "del":        { "attributes": ["cite", "datetime"] },\n    "details":    { "attributes": ["open"] },\n    "dfn":        { "attributes": [] },\n    "dialog":     { "attributes": ["open"] },\n    "div":        { "attributes": [] },\n    "dl":         { "attributes": [] },\n    "dt":         { "attributes": [] },\n    "em":         { "attributes": [] },\n    "embed":      { "attributes": ["height", "src", "type", "width"] },\n    "fieldset":   { "attributes": ["disabled", "form", "name"] },\n    "figcaption": { "attributes": [] },\n    "figure":     { "attributes": [] },\n    "footer":     { "attributes": [] },\n    "form":       { "attributes": ["accept-charset", "action", "autocomplete", "enctype", "method", "name", "novalidate", "target"] },\n    "h1":         { "attributes": [] },\n    "h2":         { "attributes": [] },\n    "h3":         { "attributes": [] },\n    "h4":         { "attributes": [] },\n    "h5":         { "attributes": [] },\n    "h6":         { "attributes": [] },\n    "head":       { "attributes": [] },\n    "header":     { "attributes": [] },\n    "hgroup":     { "attributes": [] },\n    "hr":         { "attributes": [] },\n    "html":       { "attributes": ["manifest", "xml:lang", "xmlns"] },\n    "i":          { "attributes": [] },\n    "iframe":     { "attributes": ["height", "name", "sandbox", "seamless", "src", "srcdoc", "width"] },\n    "ilayer":     { "attributes": [] },\n    "img":        { "attributes": ["alt", "height", "ismap", "longdesc", "src", "usemap", "width"] },\n    "input":      { "attributes": ["accept", "alt", "autocomplete", "autofocus", "checked", "dirname", "disabled", "form", "formaction", "formenctype", "formmethod", \n                                   "formnovalidate", "formtarget", "height", "list", "max", "maxlength", "min", "multiple", "name", "pattern", "placeholder", "readonly", \n                                   "required", "size", "src", "step", "type", "value", "width"] },\n    "ins":        { "attributes": ["cite", "datetime"] },\n    "kbd":        { "attributes": [] },\n    "keygen":     { "attributes": ["autofocus", "challenge", "disabled", "form", "keytype", "name"] },\n    "label":      { "attributes": ["for", "form"] },\n    "legend":     { "attributes": [] },\n    "li":         { "attributes": ["value"] },\n    "link":       { "attributes": ["disabled", "href", "hreflang", "media", "rel", "sizes", "type"] },\n    "main":       { "attributes": [] },\n    "map":        { "attributes": ["name"] },\n    "mark":       { "attributes": [] },\n    "marquee":    { "attributes": ["align", "behavior", "bgcolor", "direction", "height", "hspace", "loop", "scrollamount", "scrolldelay", "truespeed", "vspace", "width"] },\n    "menu":       { "attributes": ["label", "type"] },\n    "meta":       { "attributes": ["charset", "content", "http-equiv", "name"] },\n    "meter":      { "attributes": ["form", "high", "low", "max", "min", "optimum", "value"] },\n    "nav":        { "attributes": [] },\n    "noscript":   { "attributes": [] },\n    "object":     { "attributes": ["archive", "codebase", "codetype", "data", "declare", "form", "height", "name", "standby", "type", "usemap", "width"] },\n    "ol":         { "attributes": ["reversed", "start", "type"] },\n    "optgroup":   { "attributes": ["disabled", "label"] },\n    "option":     { "attributes": ["disabled", "label", "selected", "value"] },\n    "output":     { "attributes": ["for", "form", "name"] },\n    "p":          { "attributes": [] },\n    "param":      { "attributes": ["name", "value"] },\n    "pre":        { "attributes": [] },\n    "progress":   { "attributes": ["form", "max", "value"] },\n    "q":          { "attributes": ["cite"] },\n    "rp":         { "attributes": [] },\n    "rt":         { "attributes": [] },\n    "ruby":       { "attributes": [] },\n    "samp":       { "attributes": [] },\n    "script":     { "attributes": ["async", "charset", "defer", "src", "type"] },\n    "section":    { "attributes": [] },\n    "select":     { "attributes": ["autofocus", "disabled", "form", "multiple", "name", "required", "size"] },\n    "small":      { "attributes": [] },\n    "source":     { "attributes": ["media", "src", "type"] },\n    "span":       { "attributes": [] },\n    "strong":     { "attributes": [] },\n    "style":      { "attributes": ["disabled", "media", "scoped", "type"] },\n    "sub":        { "attributes": [] },\n    "summary":    { "attributes": [] },\n    "sup":        { "attributes": [] },\n    "table":      { "attributes": ["border"] },\n    "tbody":      { "attributes": [] },\n    "td":         { "attributes": ["colspan", "headers", "rowspan"] },\n    "template":   { "attributes": ["content"] },\n    "textarea":   { "attributes": ["autofocus", "cols", "dirname", "disabled", "form", "label", "maxlength", "name", "placeholder", "readonly", "required", "rows", "wrap"] },\n    "tfoot":      { "attributes": [] },\n    "th":         { "attributes": ["colspan", "headers", "rowspan", "scope"] },\n    "thead":      { "attributes": [] },\n    "time":       { "attributes": ["datetime", "pubdate"] },\n    "title":      { "attributes": [] },\n    "tr":         { "attributes": [] },\n    "track":      { "attributes": ["default", "kind", "label", "src", "srclang"] },\n    "tt":         { "attributes": [] },\n    "ul":         { "attributes": [] },\n    "var":        { "attributes": [] },\n    "video":      { "attributes": ["autoplay", "controls", "height", "loop", "mediagroup", "muted", "poster", "preload", "src", "width"] },\n    "wbr":        { "attributes": [] }\n}\n'}),define("text!HtmlAttributes.json",[],function(){return'{\n    "accesskey":          { "attribOption": [], "global": "true" },\n    "class":              { "attribOption": [], "global": "true", "type": "cssStyle" },\n    "contenteditable":    { "attribOption": [], "global": "true", "type": "boolean" },\n    "contextmenu":        { "attribOption": [], "global": "true" },\n    "dir":                { "attribOption": ["ltr", "rtl"], "global": "true"},\n    "draggable":          { "attribOption": ["auto", "false", "true"], "global": "true" },\n    "dropzone":           { "attribOption": ["copy", "move", "link"], "global": "true" },\n    "hidden":             { "attribOption": ["hidden"], "global": "true" },\n    "id":                 { "attribOption": [], "global": "true", "type": "cssId" },\n    "lang":               { "attribOption": ["ab", "aa", "af", "sq", "am", "ar", "an", "hy", "as", "ay", "az", "ba", "eu", "bn", "dz", "bh", "bi", "br",\n                                             "bg", "my", "be", "km", "ca", "zh", "co", "hr", "cs", "da", "nl", "en", "eo", "et", "fo", "fa", "fi", "fr",\n                                             "fy", "gl", "gd", "gv", "ka", "de", "el", "kl", "gn", "gu", "ht", "ha", "he", "hi", "hu", "is", "io", "id",\n                                             "ia", "ie", "iu", "ik", "ga", "it", "ja", "jv", "kn", "ks", "kk", "rw", "ky", "rn", "ko", "ku", "lo", "la",\n                                             "lv", "li", "ln", "lt", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mo", "mn", "na", "ne", "no", "oc", "or",\n                                             "om", "ps", "pl", "pt", "pa", "qu", "rm", "ro", "ru", "sz", "sm", "sg", "sa", "sr", "sh", "st", "tn", "sn",\n                                             "ii", "sd", "si", "ss", "sk", "sl", "so", "es", "su", "sw", "sv", "tl", "tg", "ta", "tt", "te", "th", "bo",\n                                             "ti", "to", "ts", "tr", "tk", "tw", "ug", "uk", "ur", "uz", "vi", "vo", "wa", "cy", "wo", "xh", "yi", "yo",\n                                             "zu"],\n                            "global": "true" },\n    "role":               { "attribOption": ["alert", "alertdialog", "article", "application", "banner", "button", "checkbox", "columnheader", "combobox",\n                                             "complementary", "contentinfo", "definition", "directory", "dialog", "document", "form", "grid", "gridcell",\n                                             "group", "heading", "img", "link", "list", "listbox", "listitem", "log", "main", "marquee", "math", "menu",\n                                             "menubar", "menuitem", "menuitemcheckbox", "menuitemradio", "navigation", "note", "option", "presentation",\n                                             "progressbar", "radio", "radiogroup", "region", "row", "rowgroup", "rowheader", "scrollbar", "search",\n                                             "separator", "slider", "spinbutton", "status", "tab", "tablist", "tabpanel", "textbox", "timer", "toolbar",\n                                             "tooltip", "tree", "treegrid", "treeitem"],\n                            "global": "true" },\n    "spellcheck":         { "attribOption": [], "global": "true", "type": "boolean" },\n    "style":              { "attribOption": [], "global": "true", "type": "style" },\n    "tabindex":           { "attribOption": [], "global": "true" },\n    "title":              { "attribOption": [], "global": "true" },\n\n    "onabort":            { "attribOption": [], "global": "true" },\n    "onblur":             { "attribOption": [], "global": "true" },\n    "oncanplay":          { "attribOption": [], "global": "true" },\n    "oncanplaythrough":   { "attribOption": [], "global": "true" },\n    "onchange":           { "attribOption": [], "global": "true" },\n    "onclick":            { "attribOption": [], "global": "true" },\n    "oncontextmenu":      { "attribOption": [], "global": "true" },\n    "oncuechange":        { "attribOption": [], "global": "true" },\n    "ondblclick":         { "attribOption": [], "global": "true" },\n    "ondrag":             { "attribOption": [], "global": "true" },\n    "ondragend":          { "attribOption": [], "global": "true" },\n    "ondragenter":        { "attribOption": [], "global": "true" },\n    "ondragleave":        { "attribOption": [], "global": "true" },\n    "ondragover":         { "attribOption": [], "global": "true" },\n    "ondragstart":        { "attribOption": [], "global": "true" },\n    "ondrop":             { "attribOption": [], "global": "true" },\n    "ondurationchange":   { "attribOption": [], "global": "true" },\n    "onemptied":          { "attribOption": [], "global": "true" },\n    "onended":            { "attribOption": [], "global": "true" },\n    "onerror":            { "attribOption": [], "global": "true" },\n    "onfocus":            { "attribOption": [], "global": "true" },\n    "oninput":            { "attribOption": [], "global": "true" },\n    "oninvalid":          { "attribOption": [], "global": "true" },\n    "onkeydown":          { "attribOption": [], "global": "true" },\n    "onkeypress":         { "attribOption": [], "global": "true" },\n    "onkeyup":            { "attribOption": [], "global": "true" },\n    "onload":             { "attribOption": [], "global": "true" },\n    "onloadeddata":       { "attribOption": [], "global": "true" },\n    "onloadedmetadata":   { "attribOption": [], "global": "true" },\n    "onloadstart":        { "attribOption": [], "global": "true" },\n    "onmousedown":        { "attribOption": [], "global": "true" },\n    "onmousemove":        { "attribOption": [], "global": "true" },\n    "onmouseout":         { "attribOption": [], "global": "true" },\n    "onmouseover":        { "attribOption": [], "global": "true" },\n    "onmouseup":          { "attribOption": [], "global": "true" },\n    "onmousewheel":       { "attribOption": [], "global": "true" },\n    "onpause":            { "attribOption": [], "global": "true" },\n    "onplay":             { "attribOption": [], "global": "true" },\n    "onplaying":          { "attribOption": [], "global": "true" },\n    "onprogress":         { "attribOption": [], "global": "true" },\n    "onratechange":       { "attribOption": [], "global": "true" },\n    "onreadystatechange": { "attribOption": [], "global": "true" },\n    "onreset":            { "attribOption": [], "global": "true" },\n    "onscroll":           { "attribOption": [], "global": "true" },\n    "onseeked":           { "attribOption": [], "global": "true" },\n    "onseeking":          { "attribOption": [], "global": "true" },\n    "onselect":           { "attribOption": [], "global": "true" },\n    "onshow":             { "attribOption": [], "global": "true" },\n    "onstalled":          { "attribOption": [], "global": "true" },\n    "onsubmit":           { "attribOption": [], "global": "true" },\n    "onsuspend":          { "attribOption": [], "global": "true" },\n    "ontimeupdate":       { "attribOption": [], "global": "true" },\n    "onvolumechange":     { "attribOption": [], "global": "true" },\n    "onwaiting":          { "attribOption": [], "global": "true" },\n\n    "aria-autocomplete":        { "attribOption": ["inline", "list", "both", "none"] },\n    "aria-activedescendant":    { "attribOption": [], "global": "true" },\n    "aria-atomic":              { "attribOption": ["true", "false"], "global": "true", "type": "boolean" },\n    "aria-busy":                { "attribOption": [], "global": "true", "type": "boolean" },\n    "aria-checked":             { "attribOption": ["true", "false", "mixed", "undefined"] },\n    "aria-controls":            { "attribOption": [], "global": "true" },\n    "aria-describedby":         { "attribOption": [], "global": "true" },\n    "aria-disabled":            { "attribOption": ["true", "false"], "global": "true" },\n    "aria-dropeffect":          { "attribOption": ["copy", "move", "link", "execute", "popup", "none"], "global": "true" },\n    "aria-expanded":            { "attribOption": ["true", "false", "undefined"] },\n    "aria-flowto":              { "attribOption": [], "global": "true" },\n    "aria-grabbed":             { "attribOption": ["true", "false", "undefined"], "global": "true" },\n    "aria-haspopup":            { "attribOption": ["true", "false"], "global": "true", "type": "boolean" },\n    "aria-hidden":              { "attribOption": ["true", "false"], "global": "true", "type": "boolean" },\n    "aria-invalid":             { "attribOption": ["grammar", "false", "spelling", "true"], "global": "true" },\n    "aria-label":               { "attribOption": [], "global": "true" },\n    "aria-labelledby":          { "attribOption": [], "global": "true" },\n    "aria-level":               { "attribOption": [] },\n    "aria-live":                { "attribOption": ["off", "polite", "assertive"], "global": "true" },\n    "aria-multiline":           { "attribOption": ["true", "false"], "type": "boolean" },\n    "aria-multiselectable":     { "attribOption": ["true", "false"], "type": "boolean" },\n    "aria-orientation":         { "attribOption": ["vertical", "horizontal"] },\n    "aria-owns":                { "attribOption": [], "global": "true" },\n    "aria-posinset":            { "attribOption": [] },\n    "aria-pressed":             { "attribOption": ["true", "false", "mixed", "undefined"] },\n    "aria-readonly":            { "attribOption": ["true", "false"] },\n    "aria-relevant":            { "attribOption": ["additions", "removals", "text", "all", "additions text"], "global": "true" },\n    "aria-required":            { "attribOption": ["true", "false"], "type": "boolean" },\n    "aria-selected":            { "attribOption": ["true", "false", "undefined"] },\n    "aria-setsize":             { "attribOption": [] },\n    "aria-sort":                { "attribOption": ["ascending", "descending", "none", "other"] },\n    "aria-valuemax":            { "attribOption": [] },\n    "aria-valuemin":            { "attribOption": [] },\n    "aria-valuenow":            { "attribOption": [] },\n    "aria-valuetext": { "attribOption": [] },\n    "accept":             { "attribOption": ["text/html", "text/plain", "application/msword", "application/msexcel", "application/postscript",\n                                             "application/x-zip-compressed", "application/pdf", "application/rtf", "video/x-msvideo", "video/quicktime",\n                                             "video/x-mpeg2", "audio/x-pn/realaudio", "audio/x-mpeg", "audio/x-waw", "audio/x-aiff", "audio/basic",\n                                             "image/tiff", "image/jpeg", "image/gif", "image/x-png", "image/x-photo-cd", "image/x-MS-bmp", "image/x-rgb",\n                                             "image/x-portable-pixmap", "image/x-portable-greymap", "image/x-portablebitmap"] },\n    "accept-charset":     { "attribOption": [] },\n    "action":             { "attribOption": [] },\n    "align":              { "attribOption": [] },\n    "alt":                { "attribOption": [] },\n    "archive":            { "attribOption": [] },\n    "async":              { "attribOption": [], "type": "flag" },\n    "autocomplete":       { "attribOption": ["additional-name", "address-level1", "address-level2", "address-level3", "address-level4", "address-line1",\n                                             "address-line2", "address-line3", "bday", "bday-year", "bday-day", "bday-month", "billing",\n                                             "cc-additional-name", "cc-csc", "cc-exp", "cc-exp-month", "cc-exp-year", "cc-family-name", "cc-given-name",\n                                             "cc-name", "cc-number", "cc-type", "country", "country-name", "current-password", "email", "family-name",\n                                             "fax", "given-name", "home", "honorific-prefix", "honorific-suffix", "impp", "language", "mobile", "name",\n                                             "new-password", "nickname", "off", "on", "organization", "organization-title", "pager", "photo", "postal-code", "sex",\n                                             "shipping", "street-address", "tel-area-code", "tel", "tel-country-code", "tel-extension",\n                                             "tel-local", "tel-local-prefix", "tel-local-suffix", "tel-national", "transaction-amount",\n                                             "transaction-currency", "url", "username", "work"] },\n    "autofocus":          { "attribOption": [], "type": "flag" },\n    "autoplay":           { "attribOption": [], "type": "flag" },\n    "behavior":           { "attribOption": ["scroll", "slide", "alternate"] },\n    "bgcolor":            { "attribOption": [], "type": "color" },\n    "border":             { "attribOption": [] },\n    "challenge":          { "attribOption": [] },\n    "charset":            { "attribOption": ["iso-8859-1", "utf-8", "shift_jis", "euc-jp", "big5", "gb2312", "euc-kr", "din_66003-kr", "ns_4551-1-kr",\n                                             "sen_850200_b", "csISO2022jp", "hz-gb-2312", "ibm852", "ibm866", "irv", "iso-2022-kr", "iso-8859-2",\n                                             "iso-8859-3", "iso-8859-4", "iso-8859-5", "iso-8859-6", "iso-8859-7", "iso-8859-8", "iso-8859-9", "koi8-r",\n                                             "ks_c_5601", "windows-1250", "windows-1251", "windows-1252", "windows-1253", "windows-1254", "windows-1255",\n                                             "windows-1256", "windows-1257", "windows-1258", "windows-874", "x-euc", "asmo-708", "dos-720", "dos-862",\n                                             "dos-874", "cp866", "cp1256"] },\n    "checked":            { "attribOption": [], "type": "flag" },\n    "cite":               { "attribOption": [] },\n    "codebase":           { "attribOption": [] },\n    "codetype":           { "attribOption": [] },\n    "cols":               { "attribOption": [] },\n    "colspan":            { "attribOption": [] },\n    "content":            { "attribOption": [] },\n    "controls":           { "attribOption": [], "type": "flag" },\n    "coords":             { "attribOption": [] },\n    "data":               { "attribOption": [] },\n    "datetime":           { "attribOption": [] },\n    "declare":            { "attribOption": [], "type": "flag" },\n    "default":            { "attribOption": [], "type": "flag" },\n    "defer":              { "attribOption": [], "type": "flag" },\n    "direction":          { "attribOption": ["left", "right", "up", "down"] },\n    "dirname":            { "attribOption": [] },\n    "disabled":           { "attribOption": [], "type": "flag" },\n    "enctype":            { "attribOption": ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"] },\n    "for":                { "attribOption": [] },\n    "form":               { "attribOption": [] },\n    "formaction":         { "attribOption": [] },\n    "formenctype":        { "attribOption": ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"] },\n    "formmethod":         { "attribOption": ["get", "post"] },\n    "formnovalidate":     { "attribOption": [], "type": "flag" },\n    "formtarget":         { "attribOption": ["_blank", "_parent", "_self", "_top"] },\n    "headers":            { "attribOption": [] },\n    "height":             { "attribOption": [] },\n    "high":               { "attribOption": [] },\n    "href":               { "attribOption": [] },\n    "hreflang":           { "attribOption": [] },\n    "hspace":             { "attribOption": [] },\n    "http-equiv":         { "attribOption": ["content-type", "default-style", "refresh"] },\n    "icon":               { "attribOption": [] },\n    "ismap":              { "attribOption": [], "type": "flag" },\n    "keytype":            { "attribOption": ["dsa", "ec", "rsa"] },\n    "kind":               { "attribOption": ["captions", "chapters", "descriptions", "metadata", "subtitles"] },\n    "label":              { "attribOption": [] },\n    "list":               { "attribOption": [] },\n    "longdesc":           { "attribOption": [] },\n    "loop":               { "attribOption": [], "type": "flag" },\n    "low":                { "attribOption": [] },\n    "manifest":           { "attribOption": [] },\n    "max":                { "attribOption": [] },\n    "maxlength":          { "attribOption": [] },\n    "media":              { "attribOption": ["screen", "tty", "tv", "projection", "handheld", "print", "aural", "braille", "embossed", "speech", "all", "width",\n                                             "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width",\n                                             "device-height", "min-device-height", "max-device-height", "orientation", "aspect-ratio", "min-aspect-ratio",\n                                             "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color",\n                                             "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome",\n                                             "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid"],\n                            "allowMultipleValues": "true" },\n    "mediagroup":         { "attribOption": [] },\n    "method":             { "attribOption": ["get", "post"] },\n    "min":                { "attribOption": [] },\n    "multiple":           { "attribOption": [], "type": "flag" },\n    "muted":              { "attribOption": [], "type": "flag" },\n    "name":               { "attribOption": [] },\n    "meta/name":          { "attribOption": ["application-name", "author", "description", "generator", "keywords"] },\n    "novalidate":         { "attribOption": [], "type": "flag" },\n    "open":               { "attribOption": [], "type": "flag" },\n    "optimum":            { "attribOption": [] },\n    "pattern":            { "attribOption": [] },\n    "placeholder":        { "attribOption": [] },\n    "poster":             { "attribOption": [] },\n    "preload":            { "attribOption": ["auto", "metadata", "none"] },\n    "pubdate":            { "attribOption": [] },\n    "radiogroup":         { "attribOption": [] },\n    "rel":                { "attribOption": ["alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch",\n                                             "prev", "search", "sidebar", "tag", "external"] },\n    "link/rel":           { "attribOption": ["alternate", "author", "help", "icon", "license", "next", "pingback", "prefetch", "prev", "search",\n                                             "sidebar", "stylesheet", "tag"] },\n    "readonly":           { "attribOption": [], "type": "flag" },\n    "required":           { "attribOption": [], "type": "flag" },\n    "reversed":           { "attribOption": [], "type": "flag" },\n    "rows":               { "attribOption": [] },\n    "rowspan":            { "attribOption": [] },\n    "sandbox":            { "attribOption": ["allow-forms", "allow-same-origin", "allow-scripts", "allow-top-navigation"] },\n    "seamless":           { "attribOption": [], "type": "flag" },\n    "selected":           { "attribOption": [], "type": "flag" },\n    "scope":              { "attribOption": ["col", "colgroup", "row", "rowgroup"] },\n    "scoped":             { "attribOption": [], "type": "boolean" },\n    "scrollamount":       { "attribOption": [] },\n    "scrolldelay":        { "attribOption": [] },\n    "shape":              { "attribOption": ["circle", "default", "poly","rect"] },\n    "size":               { "attribOption": [] },\n    "sizes":              { "attribOption": ["any"] },\n    "span":               { "attribOption": [] },\n    "src":                { "attribOption": [] },\n    "srcdoc":             { "attribOption": [] },\n    "srclang":            { "attribOption": [] },\n    "standby":            { "attribOption": [] },\n    "start":              { "attribOption": [] },\n    "step":               { "attribOption": [] },\n    "target":             { "attribOption": ["_blank", "_parent", "_self", "_top"] },\n    "truespeed":          { "attribOption": [], "type": "flag" },\n    "type":               { "attribOption": [] },\n    "button/type":        { "attribOption": ["button", "reset", "submit"] },\n    "command/type":       { "attribOption": ["command", "checkbox", "radio"] },\n    "link/type":          { "attribOption": ["text/css"] },\n    "menu/type":          { "attribOption": ["context", "list", "toolbar"] },\n    "ol/type":            { "attribOption": ["1", "a", "A", "i", "I"] },\n    "script/type":        { "attribOption": ["text/javascript", "text/ecmascript", "text/jscript", "text/livescript", "text/tcl", "text/x-javascript", "text/x-ecmascript",\n                                             "application/x-javascript", "application/x-ecmascript", "application/javascript", "application/ecmascript",\n                                             "text/babel", "text/jsx"] },\n    "style/type":         { "attribOption": ["text/css"] },\n    "input/type":         { "attribOption": ["button", "checkbox", "color", "date", "datetime", "datetime-local", "email", "file", "hidden", "image", "month",\n                                             "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"] },\n    "usemap":             { "attribOption": [] },\n    "value":              { "attribOption": [] },\n    "vspace":             { "attribOption": [] },\n    "width":              { "attribOption": [] },\n    "wrap":               { "attribOption": ["hard", "soft"] },\n    "xml:lang":           { "attribOption": [] },\n    "xmlns":              { "attribOption": [] }\n}';
}),define("main",["require","exports","module","text!HtmlTags.json","text!HtmlAttributes.json"],function(t,e,n){"use strict";function i(){this.exclusion=null}function a(){this.globalAttributes=this.readGlobalAttrHints(),this.cachedHints=null,this.exclusion=""}var o,r,s=brackets.getModule("utils/AppInit"),l=brackets.getModule("editor/CodeHintManager"),p=brackets.getModule("language/HTMLUtils"),u=brackets.getModule("preferences/PreferencesManager"),b=brackets.getModule("strings"),c=t("text!HtmlTags.json"),d=t("text!HtmlAttributes.json");u.definePreference("codehint.TagHints","boolean",!0,{description:b.DESCRIPTION_HTML_TAG_HINTS}),u.definePreference("codehint.AttrHints","boolean",!0,{description:b.DESCRIPTION_ATTR_HINTS}),i.prototype.updateExclusion=function(){var t;this.exclusion&&this.tagInfo&&(t=this.tagInfo.tagName.substr(this.tagInfo.position.offset),l.hasValidExclusion(this.exclusion,t)||(this.exclusion=null))},i.prototype.hasHints=function(t,e){var n=t.getCursorPos();return this.tagInfo=p.getTagInfo(t,n),this.editor=t,null===e?this.tagInfo.position.tokenType===p.TAG_NAME&&this.tagInfo.position.offset>=0?(0===this.tagInfo.position.offset?this.exclusion=this.tagInfo.tagName:this.updateExclusion(),!0):!1:"<"===e?(this.exclusion=this.tagInfo.tagName,!0):!1},i.prototype.getHints=function(t){var e,n;return this.tagInfo=p.getTagInfo(this.editor,this.editor.getCursorPos()),this.tagInfo.position.tokenType===p.TAG_NAME&&this.tagInfo.position.offset>=0?(this.updateExclusion(),e=this.tagInfo.tagName.slice(0,this.tagInfo.position.offset),n=$.map(o,function(t,n){return 0===n.indexOf(e)?n:void 0}).sort(),{hints:n,match:e,selectInitial:!0,handleWideResults:!1}):null},i.prototype.insertHint=function(t){var e={line:-1,ch:-1},n={line:-1,ch:-1},i=this.editor.getCursorPos(),a=0;if(this.tagInfo.position.tokenType===p.TAG_NAME){var o=this.tagInfo.tagName.substr(this.tagInfo.position.offset);a=l.hasValidExclusion(this.exclusion,o)?this.tagInfo.position.offset:this.tagInfo.tagName.length}return n.line=e.line=i.line,e.ch=i.ch-this.tagInfo.position.offset,n.ch=e.ch+a,(this.exclusion||t!==this.tagInfo.tagName)&&(e.ch!==n.ch?this.editor.document.replaceRange(t,e,n):this.editor.document.replaceRange(t,e),this.exclusion=null),!1},a.prototype.readGlobalAttrHints=function(){return $.map(r,function(t,e){return"true"===t.global?e:void 0})},a.prototype._getValueHintsForAttr=function(t,e,n){var i=[],a=e+"/"+n,o=r[a]||r[n];return o&&("boolean"===o.type?i=["false","true"]:o.attribOption&&(i=o.attribOption)),i},a.prototype.updateExclusion=function(t){if(this.exclusion&&this.tagInfo){var e,n=this.tagInfo.position.tokenType,i=this.tagInfo.position.offset;n===p.ATTR_NAME?e=this.tagInfo.attr.name.substr(i):t||n!==p.ATTR_VALUE||(e=this.tagInfo.attr.value.substr(i)),l.hasValidExclusion(this.exclusion,e)||(this.exclusion=null)}},a.prototype.hasHints=function(t,e){var n,i,a,o=t.getCursorPos();if(this.editor=t,this.tagInfo=p.getTagInfo(t,o),n=this.tagInfo.position.tokenType,i=this.tagInfo.position.offset,null===e){if(a=null,n===p.ATTR_NAME)i>=0&&(a=this.tagInfo.attr.name.slice(0,i));else if(n===p.ATTR_VALUE&&(a=this.tagInfo.position.offset>=0?this.tagInfo.attr.value.slice(0,i):"",this.tagInfo.attr.name)){var r=this._getValueHintsForAttr({queryStr:a},this.tagInfo.tagName,this.tagInfo.attr.name);if(r instanceof Array){var s,l=!1;for(s=0;s<r.length;s++)if(0===r[s].indexOf(a)){l=!0;break}l||(a=null)}}return i>=0&&(n===p.ATTR_NAME&&0===i?this.exclusion=this.tagInfo.attr.name:this.updateExclusion(!1)),null!==a}return" "===e||"'"===e||'"'===e||"="===e?(n===p.ATTR_NAME&&(this.exclusion=this.tagInfo.attr.name),!0):!1},a.prototype.getHints=function(t){var e,n,i=this.editor.getCursorPos(),a={queryStr:null},r=[];if(this.tagInfo=p.getTagInfo(this.editor,i),e=this.tagInfo.position.tokenType,n=this.tagInfo.position.offset,(e===p.ATTR_NAME||e===p.ATTR_VALUE)&&(a.tag=this.tagInfo.tagName,n>=0?(e===p.ATTR_NAME?a.queryStr=this.tagInfo.attr.name.slice(0,n):(a.queryStr=this.tagInfo.attr.value.slice(0,n),a.attrName=this.tagInfo.attr.name),this.updateExclusion(!1)):e===p.ATTR_VALUE&&(a.queryStr="",a.attrName=this.tagInfo.attr.name),a.usedAttr=p.getTagAttributes(this.editor,i)),a.tag&&null!==a.queryStr){var s,l=a.tag,u=a.attrName,b=a.queryStr,c=[];if(u?s=this._getValueHintsForAttr(a,l,u):o&&o[l]&&o[l].attributes&&(c=o[l].attributes.concat(this.globalAttributes),s=$.grep(c,function(t,e){return $.inArray(t,a.usedAttr)<0})),s instanceof Array&&s.length)return console.assert(!r.length),r=$.map(s,function(t){return 0===t.indexOf(b)?t:void 0}).sort(),{hints:r,match:a.queryStr,selectInitial:!0,handleWideResults:!1};if(s instanceof Object&&s.hasOwnProperty("done")){var d=$.Deferred();return s.done(function(t){d.resolveWith(this,[{hints:t,match:a.queryStr,selectInitial:!0,handleWideResults:!1}])}),d}return null}},a.prototype.insertHint=function(t){var e,n=this.editor.getCursorPos(),i={line:-1,ch:-1},a={line:-1,ch:-1},o=this.tagInfo.position.tokenType,s=this.tagInfo.position.offset,u=0,b=!1,c=this.tagInfo.attr.valueAssigned,d="",g=!0;return o===p.ATTR_NAME?(e=this.tagInfo.attr.name.substr(s),l.hasValidExclusion(this.exclusion,e)?(u=s,c=!1):u=this.tagInfo.attr.name.length,!c&&r&&r[t]&&"flag"!==r[t].type?(t+='=""',b=!0):t===this.tagInfo.attr.name&&(g=!1)):o===p.ATTR_VALUE&&(e=this.tagInfo.attr.value.substr(s),l.hasValidExclusion(this.exclusion,e)?(u=s,this.exclusion=null):u=this.tagInfo.attr.value.length,this.tagInfo.attr.hasEndQuote?t===this.tagInfo.attr.value&&(g=!1):(d=this.tagInfo.attr.quoteChar,d?t+=d:0===s&&(t='"'+t+'"'))),a.line=i.line=n.line,i.ch=n.ch-s,a.ch=i.ch+u,g&&(i.ch!==a.ch?this.editor.document.replaceRange(t,i,a):this.editor.document.replaceRange(t,i)),b?(this.editor.setCursorPos(i.line,i.ch+t.length-1),!0):(o===p.ATTR_VALUE&&this.tagInfo.attr.hasEndQuote&&this.editor.setCursorPos(i.line,i.ch+t.length+1),!1)},s.appReady(function(){o=JSON.parse(c),r=JSON.parse(d);var t=new i,n=new a;l.registerHintProvider(t,["html"],0),l.registerHintProvider(n,["html"],0),e.tagHintProvider=t,e.attrHintProvider=n})});