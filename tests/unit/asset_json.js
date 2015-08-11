describe('asset json', function() {

    var assetManager;
    var interval;
    var descritor;

    beforeEach(function () {
        descritor = new WOZLLA.asset.JsonDescriptor(testTool.RES_BASE + "tests/res/common.tt.json");
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
        var loader = new WOZLLA.asset.JsonLoader();
        loader.loadAsync(descritor, function(err, asset) {
            expect(!!err).toBeFalsy();
            expect(asset instanceof WOZLLA.asset.JsonAsset).toBeTruthy();
            expect(asset.getPlainText()).toBeDefined();
            done();
        });
    });

    it('load with AssetManager', function(done) {
        assetManager.load(descritor, function(err, asset) {
            expect(!!err).toBeFalsy();
            expect(asset instanceof WOZLLA.asset.JsonAsset).toBeTruthy();
            expect(asset.getPlainText()).toBeDefined();
            done();
        });
    });

    it('unload with AssetManager', function(done) {
        assetManager.load(descritor, function(err, asset) {
            assetManager.unload(descritor);
            expect(assetManager.contains(descritor)).toBeFalsy();
            done();
        });
    });

    it('clear with AssetManager', function(done) {
        assetManager.load(descritor, function(err, asset) {
            assetManager.clear();
            expect(assetManager.contains(descritor)).toBeFalsy();
            done();
        });
    });

    it('load group without AssetManager', function(done) {
        var group = new WOZLLA.asset.AssetGroup();
        var imageDesc1 = new WOZLLA.asset.ImageDescriptor(testTool.RES_BASE + "tests/res/panda.png");
        var imageDesc2 = new WOZLLA.asset.ImageDescriptor(testTool.RES_BASE + "tests/res/panda2.png");
        var loader1 = new WOZLLA.asset.ImageLoader();
        var loader2 = new WOZLLA.asset.ImageLoader();
        var loader3 = new WOZLLA.asset.JsonLoader();
        group.put(imageDesc1, loader1);
        group.put(imageDesc2, loader2);
        group.put(descritor, loader3);

        var callback = {
            onLoadOne: function(error, asset) {},
            onFinish: function() {}
        };

        spyOn(callback, 'onLoadOne');
        spyOn(callback, 'onFinish');

        group.loadAsync(callback);
        setTimeout(function() {
            expect(callback.onLoadOne.calls.count()).toBe(3);
            expect(callback.onFinish.calls.count()).toBe(1);
            done();
        }, 1000);
    });

    it('load group with AssetManager', function(done) {
        var group = new WOZLLA.asset.AssetGroup();
        var imageDesc1 = new WOZLLA.asset.ImageDescriptor(testTool.RES_BASE + "tests/res/panda.png");
        var imageDesc2 = new WOZLLA.asset.ImageDescriptor(testTool.RES_BASE + "tests/res/panda2.png");
        group.put(imageDesc1);
        group.put(descritor);
        group.put(imageDesc2);
        var callback = {
            onLoadOne: function(error, asset) {},
            onFinish: function() {}
        };
        spyOn(callback, 'onLoadOne');
        spyOn(callback, 'onFinish');
        assetManager.loadGroup(group, callback);
        setTimeout(function() {
            expect(callback.onLoadOne.calls.count()).toBe(3);
            expect(callback.onFinish.calls.count()).toBe(1);
            done();
        }, 1000);

    });

});