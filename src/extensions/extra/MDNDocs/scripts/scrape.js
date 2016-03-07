/*jshint strict:false */
/*globals process */

var Promise = require("bluebird");
var Nunjucks = require("nunjucks");
var request = require("request-promise");
var fs = Promise.promisifyAll(require("fs"));
var mkdirp = Promise.promisify(require("mkdirp"));
var path = require("path");
var jsdom = require("jsdom").jsdom;

var EN_US = "en-US";
var URL = {
    mdn: "https://developer.mozilla.org",
    docs: "/docs/Web",
    htmlElement: "/HTML/Element"
};
var CONCURRENCY = { concurrency: 3 };

var HTMLElements = {};
var root = process.cwd();
var destRoot = path.join(root, "src/extensions/extra/MDNDocs/nls");
var templates = new Nunjucks.Environment(new Nunjucks.FileSystemLoader(path.join(root, "templates")));

function getEnglishAttributes(element, elementUrl) {
    return request(elementUrl + "?raw&macros&section=Attributes")
    .then(function(html) {
        var attributes = {};
        var document = jsdom(html).defaultView.document;
        var attrNameElements = Array.prototype.slice.call(document.getElementsByTagName("dt"));
        var attrSummaryElements = Array.prototype.slice.call(document.getElementsByTagName("dd"));

        attrNameElements.forEach(function(attrNameElement, index) {
            var attrNameContainer = attrNameElement.getElementsByTagName("code")[0];
            var attrSummaryElement = attrSummaryElements[index];

            if(!attrNameContainer || !attrSummaryElement) {
                return;
            }

            var attrName = attrNameContainer.innerHTML.replace(/<[^>]+>/g, "").trim();
            var attrSummary = attrSummaryElement.innerHTML.trim().replace(/href="\//g, "href=\"" + URL.mdn + "/");
            attributes[attrName] = attrSummary;
        });

        return attributes;
    });
}

function getLocalizedDocs(element) {
    var summaries = URL.mdn + "/" + EN_US + HTMLElements[element] + "$json";

    function writeElementFile(data, locale) {
        var localeDir = path.join(destRoot, locale);
        var elementFile = path.join(localeDir, element + ".json");

        return mkdirp(localeDir)
        .then(function() {
            return fs.writeFileAsync(elementFile, JSON.stringify(data));
        });
    }

    return request({
        uri: summaries,
        json: true
    })
    .then(function(elementData) {
        var data = {};

        return getEnglishAttributes(element, URL.mdn + elementData.url)
        .then(function(attributes) {
            if(Object.keys(attributes).length > 0) {
                data.attributes = attributes;
            }
            data.summary = elementData.summary;
            data.url = elementData.url;

            // return writeElementFile(data, "root");
            HTMLElements[element] = data;
            return Promise.resolve();
        });
    });
}

function getListOfHTMLElements() {
    var docs = URL.mdn + "/" + EN_US + URL.docs + URL.htmlElement + "?raw&macros";

    return request(docs)
    .then(function(html) {
        var document = jsdom(html).defaultView.document;
        var elementCategories = Array.prototype.slice.call(document.getElementsByTagName("tbody"));

        elementCategories.forEach(function(elementCategory) {
            var elements = Array.prototype.slice.call(elementCategory.getElementsByTagName("tr"));

            elements.forEach(function(elementRow) {
                var element = elementRow.getElementsByTagName("td")[0].getElementsByTagName("a")[0];
                var elementName = element.getElementsByTagName("code")[0].innerHTML.slice(4, -4);

                HTMLElements[elementName] = element.getAttribute("href").replace("/" + EN_US, "");
            });
        });

        return Promise.resolve();
    })
    .catch(function(err) {
        console.error("Failed to request resource: ", docs, " with: ", err);
        return Promise.reject(err);
    });
}

function getHTMLDocs() {
    return getListOfHTMLElements()
    .then(function() {
        return Promise.map(Object.keys(HTMLElements), getLocalizedDocs, CONCURRENCY);
    });
}

function checkSetup() {
    return fs.statAsync(destRoot)
    .then(function() {
        return Promise.resolve();
    })
    .catch(function(err) {
        console.error("Encountered error when trying to access the nls/ file for MDNDocs. Check to make sure that the path `", destRoot, "` is accessible.");
        return Promise.reject(err);
    });
}

checkSetup()
.then(getHTMLDocs)
.then(function() {
    return fs.writeFileAsync(path.join(root, "debug-mdn.json"), JSON.stringify(HTMLElements, null, " "));
})
.catch(function(err) {
    console.error("Failed to scrape MDNDocs");
    if(err) {
        console.error(" with: ", err);
    }
});
