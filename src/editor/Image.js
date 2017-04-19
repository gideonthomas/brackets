define(function (require, exports, module) {
    "use strict";

    var Caman           = require("caman");
    var FilerFileSystem = require("fileSystemImpl");
    var FileSystemCache = require("filesystem/impls/filer/FileSystemCache");
    var Path            = require("filesystem/impls/filer/BracketsFiler").Path;
    var mimeFromExt     = require("filesystem/impls/filer/lib/content").mimeFromExt;

    function initializeFilterButtons(image, imagePath) {
        var imageMimeType = mimeFromExt(Path.extname(imagePath));
        var imageDataRegex = /base64,(.+)/;

        $("#resetbtn").click(function() {
            image.reset();
        });

        $("#savebtn").click(function() {
            var imageBase64Data = image.canvas.toDataURL(imageMimeType);
            var data = FilerFileSystem.base64ToBuffer(imageDataRegex.exec(imageBase64Data)[1]);

            FilerFileSystem.writeFile(imagePath, data, {encoding: null}, function(err) {
                if(err) {
                    console.error("[Bramble] Image with filters failed to save with: ", err);
                    return;
                }

                FileSystemCache.refresh(function(err) {
                    if(err) {
                        console.error("[Bramble] Failed to refresh filesystem cache when applying image filters with: ", err);
                    }
                });
            });
        });

        /* Filters */
        $("#pinholebtn").click(function() {
            image.reset();
            image.pinhole();
            image.render();
        });
        $("#contrastbtn").click(function() {
            image.reset();
            image.contrast(10);
            image.render();
        });
        $("#sepiabtn").click(function() {
            image.reset();
            image.sepia(20)
            image.render();
        });
        $("#vintagebtn").click(function() {
            image.reset();
            image.vintage();
            image.render();
        });
        $("#embossbtn").click(function() {
            image.reset();
            image.emboss();
            image.render();
        });
        $("#sunrisebtn").click(function() {
            image.reset();
            image.sunrise();
            image.render();
        });
        $("#glowingsunbtn").click(function() {
            image.reset();
            image.glowingSun();
            image.render();
        });
    }

    exports.load = function(imageElement, imagePath) {
        var image = Caman(imageElement);
        initializeFilterButtons(image, imagePath);
    };
});
