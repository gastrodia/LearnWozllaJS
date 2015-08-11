/**
 *
 *  PixelMatcher.compare(aImage, bImage, PixelMatcher.perfect);
 *  PixelMatcher.compare(aImage, bImage, PixelMatcher.alphaZero);
 *
 *  PixelMatcher.compareRegion(canvas, {
        x: 0,
        y: 0,
        width: image.width/2,
        height:image.height/2
    }, image, {
        x: image.width/2,
        y: image.height/2,
        width: image.width/2,
        height:image.height/2
    });
 *
 */
var PixelMatcher = (function() {

    function getMaxRegion(image) {
        return {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height
        };
    }

    var Matcher = function() {};

    Matcher.debug = false;

    Matcher.compare = function(aImage, bImage, strategy) {
        var matcher = new Matcher();
        matcher.compare(aImage, bImage);
        matcher.region(getMaxRegion(aImage), getMaxRegion(bImage));
        return matcher.run(strategy);
    };

    Matcher.compareRegion = function(aImage, aRegion, bImage, bRegion, strategy) {
        var matcher = new Matcher();
        matcher.compare(aImage, bImage);
        matcher.region(aRegion, bRegion);
        return matcher.run(strategy);
    };

    Matcher.perfect = function(aPixelData, bPixelData) {
        for(var i=0,len=aPixelData.data.length; i<len; i++) {
            var aPixel = aPixelData.data[i];
            var bPixel = bPixelData.data[i];
            if(aPixel !== bPixel) {
                return false;
            }
        }
        return true;
    };

    Matcher.alphaZero = function(aPixelData, bPixelData) {
        var matchCount = 0;
        for(var i= 3,len=aPixelData.data.length; i<len; i+=4) {
            var aPixel = aPixelData.data[i];
            var bPixel = bPixelData.data[i];
            if(aPixel === bPixel || (aPixel > 0 && bPixel > 0)) {
                matchCount ++;
            }
        }
        return matchCount/aPixelData.data.length*4 > 0.98;
    };

    Matcher.prototype.compare = function(aImage, bImage) {
        this.aImage = aImage;
        this.bImage = bImage;
    };

    Matcher.prototype.region = function(aRegion, bRegion) {
        this.aRegion = aRegion;
        this.bRegion = bRegion;
    };

    Matcher.prototype.run = function(strategy) {
        var aData = this._getImageData(this.aImage, this.aRegion);
        var bData = this._getImageData(this.bImage, this.bRegion);
        return strategy ? strategy(aData, bData) : Matcher.perfect(aData, bData);
    };

    Matcher.prototype._getImageData = function(image, region) {
        var bCanvas = document.createElement('canvas');
        bCanvas.width = region.width;
        bCanvas.height = region.height;
        var bContext = bCanvas.getContext('2d');
        bContext.drawImage(image, region.x, region.y, region.width, region.height, 0, 0, region.width, region.height);
        if(Matcher.debug) {
            document.body.appendChild(bCanvas);
        }
        return bContext.getImageData(0, 0, region.width, region.height);
    };

    return Matcher;
})();
