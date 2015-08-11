describe('## integrate test ##', function(){

    var canvas;
    var director;

    beforeEach(function(done) {
        canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        director = new WOZLLA.Director(canvas);
        director.start();
        done();
    });

    it('load image asset to render', function(done) {
        var desc = new WOZLLA.asset.ImageDescriptor(testTool.RES_BASE + "tests/res/panda.png");
        director.assetManager.load(desc, function(err, asset) {
            var quadCmd = director.renderContext.createQuadCommand();
            quadCmd.renderLayer = WOZLLA.rendering.RenderContext.DEFAULT_LAYER;
            quadCmd.renderOrder = 0;
            quadCmd.texture = asset;
            quadCmd.textureRegion.width = asset.getWidth();
            quadCmd.textureRegion.height = asset.getHeight();
            quadCmd.textureOffset.x = 0;
            quadCmd.textureOffset.y = 0;
            quadCmd.matrix = new WOZLLA.math.Matrix3x3();
            director.renderContext.addCommand(quadCmd);
            director.renderContext.render();

            expect(PixelMatcher.compareRegion(canvas, {
                x: 0,
                y: 0,
                width: quadCmd.textureRegion.width,
                height: quadCmd.textureRegion.height
            }, asset.getSourceImage(), {
                x: quadCmd.textureRegion.x,
                y: quadCmd.textureRegion.y,
                width: quadCmd.textureRegion.width,
                height: quadCmd.textureRegion.height
            }, PixelMatcher.alphaZero)).toBe(true);
            done();
        });

    });

    it('load sprite atlas to render', function(done){
        var desc = new WOZLLA.asset.SpriteAtlasDescriptor(testTool.RES_BASE + "tests/res/common.tt.json");
        director.assetManager.load(desc, function(err, asset) {

            var sprite = asset.getSprite('arrow.png');

            var quadCmd = director.renderContext.createQuadCommand();
            quadCmd.renderLayer = WOZLLA.rendering.RenderContext.DEFAULT_LAYER;
            quadCmd.renderOrder = 0;
            quadCmd.texture = asset.getTexture();
            quadCmd.textureRegion.x = sprite.x;
            quadCmd.textureRegion.y = sprite.y;
            quadCmd.textureRegion.width = sprite.width;
            quadCmd.textureRegion.height = sprite.height;
            quadCmd.textureOffset.x = 0;
            quadCmd.textureOffset.y = 0;
            quadCmd.matrix = new WOZLLA.math.Matrix3x3();
            director.renderContext.addCommand(quadCmd);
            director.renderContext.render();

            expect(PixelMatcher.compareRegion(canvas, {
                x: 0,
                y: 0,
                width: quadCmd.textureRegion.width,
                height: quadCmd.textureRegion.height
            }, asset.getSourceImage(), {
                x: quadCmd.textureRegion.x,
                y: quadCmd.textureRegion.y,
                width: quadCmd.textureRegion.width,
                height: quadCmd.textureRegion.height
            }, PixelMatcher.alphaZero)).toBe(true);
            done();
        });

    });

});