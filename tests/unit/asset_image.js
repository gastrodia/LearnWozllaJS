describe('asset image', function() {

    var assetManager;
    var interval;
    var imageDesc;

    beforeEach(function () {
        imageDesc = new WOZLLA.asset.ImageDescriptor(testTool.RES_BASE + "tests/res/panda.png");
        assetManager = new WOZLLA.asset.AssetManager();
        interval = setInterval(function() {
            assetManager.update();
        }, 1000/30);
    });

    afterEach(function () {
        assetManager.clear();
        clearInterval(interval);
    });

    it('load without AssetManager', function (done) {
        var loader = new WOZLLA.asset.ImageLoader();
        loader.loadAsync(imageDesc, function(err, asset) {
            expect(!!err).toBeFalsy();
            expect(asset instanceof WOZLLA.asset.ImageAsset).toBeTruthy();
            expect(asset.getSourceTexture()).toBeDefined();
            done();
        });
    });

    it('load with AssetManager', function(done) {
        assetManager.load(imageDesc, function(err, asset) {
            expect(!!err).toBeFalsy();
            expect(asset instanceof WOZLLA.asset.ImageAsset).toBeTruthy();
            expect(asset.getSourceTexture()).toBeDefined();
            done();
        });
    });

    it('unload with AssetManager', function(done) {
        assetManager.load(imageDesc, function(err, asset) {
            assetManager.unload(imageDesc);
            expect(assetManager.contains(imageDesc)).toBeFalsy();
            done();
        });
    });

    it('clear with AssetManager', function(done) {
        assetManager.load(imageDesc, function(err, asset) {
            assetManager.clear();
            expect(assetManager.contains(imageDesc)).toBeFalsy();
            done();
        });
    });

    it('load group without AssetManager', function(done) {
        var group = new WOZLLA.asset.AssetGroup();
        var imageDesc1 = new WOZLLA.asset.ImageDescriptor(testTool.RES_BASE + "tests/res/panda.png");
        var imageDesc2 = new WOZLLA.asset.ImageDescriptor(testTool.RES_BASE + "tests/res/panda2.png");
        var loader1 = new WOZLLA.asset.ImageLoader();
        var loader2 = new WOZLLA.asset.ImageLoader();
        group.put(imageDesc1, loader1);
        group.put(imageDesc2, loader2);

        var callback = {
            onLoadOne: function(error, asset) {},
            onFinish: function() {}
        };

        spyOn(callback, 'onLoadOne');
        spyOn(callback, 'onFinish');

        group.loadAsync(callback);
        setTimeout(function() {
            expect(callback.onLoadOne.calls.count()).toBe(2);
            expect(callback.onFinish.calls.count()).toBe(1);
            done();
        }, 1000);
    });

    it('load group with AssetManager', function(done) {
        var group = new WOZLLA.asset.AssetGroup();
        var imageDesc1 = new WOZLLA.asset.ImageDescriptor(testTool.RES_BASE + "tests/res/panda.png");
        var imageDesc2 = new WOZLLA.asset.ImageDescriptor(testTool.RES_BASE + "tests/res/panda2.png");
        group.put(imageDesc1);
        group.put(imageDesc2);
        var callback = {
            onLoadOne: function(error, asset) {},
            onFinish: function() {}
        };
        spyOn(callback, 'onLoadOne');
        spyOn(callback, 'onFinish');
        assetManager.loadGroup(group, callback);
        setTimeout(function() {
            expect(callback.onLoadOne.calls.count()).toBe(2);
            expect(callback.onFinish.calls.count()).toBe(1);
            done();
        }, 1000);

    });

});