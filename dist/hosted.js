(function(){"use strict";require.config({baseUrl:"./"});var forceFiles=window.location.search.indexOf("forceFiles=1")>-1;var projectRoot="/7/projects/30";var index="<html>\n"+"  <head>\n"+"    <title>Bramble</title>\n"+"  </head>\n"+"  <body>\n"+"    <p>This is the main page.</p>\n"+"  </body>\n"+"</html>";var tutorial="<html>\n"+"  <head>\n"+"    <title>Tutorial</title>\n"+"  </head>\n"+"  <body>\n"+"    <p>This is the tutorial.</p>\n"+"  </body>\n"+"</html>";var css="p {\n"+"  color: purple;\n"+"}";var script="function add(a, b) {\n"+"  return a|0 + b|0;\n"+"}";function installDefaultFiles(Bramble,callback){var fs=Bramble.getFileSystem();var sh=new fs.Shell;var Path=Bramble.Filer.Path;sh.mkdirp(projectRoot,function(err){if(err&&err.code!=="EEXIST"){throw err}function writeProjectFile(path,data,callback){path=Path.join(projectRoot,path);fs.writeFile(path,data,function(err){if(err){throw err}callback()})}writeProjectFile("script.js",script,function(){writeProjectFile("style.css",css,function(){writeProjectFile("index.html",index,function(){writeProjectFile("tutorial.html",tutorial,function(){callback()})})})})})}function ensureFiles(Bramble,callback){var fs=Bramble.getFileSystem();fs.exists(projectRoot,function(exists){if(!exists||forceFiles){return installDefaultFiles(Bramble,callback)}callback()})}function load(Bramble){Bramble.load("#bramble",{url:"index.html",useLocationSearch:true});Bramble.on("ready",function(bramble){console.log("Bramble ready");window.bramble=bramble});Bramble.once("error",function(err){console.error("Bramble error",err);window.alert("Fatal Error: "+err.message+". If you're in Private Browsing mode, data can't be written.")});Bramble.on("readyStateChange",function(previous,current){console.log("Bramble readyStateChange",previous,current)});Bramble.on("offlineReady",function(){console.log("Bramble available for offline use.")});Bramble.on("updatesAvailable",function(){console.log("Bramble offline content updated, please refresh to use.")});ensureFiles(Bramble,function(){Bramble.mount(projectRoot)})}require(["bramble/client/main"],function(Bramble){load(Bramble)},function(err){console.log("Unable to load Bramble from src/, trying from dist/");require(["bramble"],function(Bramble){load(Bramble)})})})();