describe('rendering webgl', function() {

    var canvas;
    var image;
    var renderer;
    var texture;

    beforeEach(function(done) {
        image = new Image();
        image.src = testTool.RES_BASE + 'tests/res/panda.png';
        image.onload = function() {
            canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            renderer = new WOZLLA.rendering.WebGLRenderContext(canvas);

            texture = {
                image: image,
                sourceTexture: renderer.createTexture(image),
                getSourceTexture: function() {
                    return this.sourceTexture;
                },
                getWidth: function() {
                    return this.image.width;
                },
                getHeight: function() {
                    return this.image.height;
                }
            };

            done();
        };
    });

    it('quad command normal', function() {
        var quadCmd = renderer.createQuadCommand();
        quadCmd.renderLayer = WOZLLA.rendering.RenderContext.DEFAULT_LAYER;
        quadCmd.renderOrder = 0;
        quadCmd.texture = texture;
        quadCmd.textureRegion.width = texture.getWidth();
        quadCmd.textureRegion.height = texture.getHeight();
        quadCmd.textureOffset.x = 0;
        quadCmd.textureOffset.y = 0;
        quadCmd.matrix = new WOZLLA.math.Matrix3x3();
        renderer.addCommand(quadCmd);
        renderer.render();

        expect(PixelMatcher.compare(canvas, image, PixelMatcher.alphaZero)).toBe(true);
    });

    it('quad command texture region', function() {
        var quadCmd = renderer.createQuadCommand();
        quadCmd.renderLayer = WOZLLA.rendering.RenderContext.DEFAULT_LAYER;
        quadCmd.renderOrder = 0;
        quadCmd.texture = texture;
        quadCmd.textureRegion.x = 10;
        quadCmd.textureRegion.y = 20;
        quadCmd.textureRegion.width = 30;
        quadCmd.textureRegion.height = 40;
        quadCmd.textureOffset.x = 0;
        quadCmd.textureOffset.y = 0;
        quadCmd.matrix = new WOZLLA.math.Matrix3x3();
        renderer.addCommand(quadCmd);
        renderer.render();

        expect(PixelMatcher.compareRegion(canvas, {
            x: 0,
            y: 0,
            width: quadCmd.textureRegion.width,
            height: quadCmd.textureRegion.height
        }, image, {
            x: quadCmd.textureRegion.x,
            y: quadCmd.textureRegion.y,
            width: quadCmd.textureRegion.width,
            height: quadCmd.textureRegion.height
        }, PixelMatcher.alphaZero)).toBe(true);
    });

    it('quad command texture offset', function() {
        var quadCmd = renderer.createQuadCommand();
        quadCmd.renderLayer = WOZLLA.rendering.RenderContext.DEFAULT_LAYER;
        quadCmd.renderOrder = 0;
        quadCmd.texture = texture;
        quadCmd.textureRegion.width = texture.getWidth();
        quadCmd.textureRegion.height = texture.getHeight();
        quadCmd.textureOffset.x = 0.5;
        quadCmd.textureOffset.y = 0.5;
        quadCmd.matrix = new WOZLLA.math.Matrix3x3();
        renderer.addCommand(quadCmd);
        renderer.render();

        expect(PixelMatcher.compareRegion(canvas, {
            x: 0,
            y: 0,
            width: ~~image.width/2,
            height: ~~image.height/2
        }, image, {
            x: ~~image.width/2,
            y: ~~image.height/2,
            width: ~~image.width/2,
            height:~~image.height/2
        }, PixelMatcher.alphaZero)).toBe(true);
    });

    it('quad command position', function() {
        var quadCmd = renderer.createQuadCommand();
        quadCmd.renderLayer = WOZLLA.rendering.RenderContext.DEFAULT_LAYER;
        quadCmd.renderOrder = 0;
        quadCmd.texture = texture;
        quadCmd.textureRegion.width = texture.getWidth();
        quadCmd.textureRegion.height = texture.getHeight();
        quadCmd.textureOffset.x = 0;
        quadCmd.textureOffset.y = 0;
        quadCmd.matrix = new WOZLLA.math.Matrix3x3();
        quadCmd.matrix.appendTransform(-image.width/2, -image.height/2, 1, 1, 0, 0, 0, 0, 0);
        renderer.addCommand(quadCmd);
        renderer.render();

        expect(PixelMatcher.compareRegion(canvas, {
            x: 0,
            y: 0,
            width: ~~image.width/2,
            height: ~~image.height/2
        }, image, {
            x: ~~image.width/2,
            y: ~~image.height/2,
            width: ~~image.width/2,
            height:~~image.height/2
        }, PixelMatcher.alphaZero)).toBe(true);
    });

    it('quad command rotation', function() {
        var quadCmd = renderer.createQuadCommand();
        quadCmd.renderLayer = WOZLLA.rendering.RenderContext.DEFAULT_LAYER;
        quadCmd.renderOrder = 0;
        quadCmd.texture = texture;
        quadCmd.textureRegion.width = texture.getWidth();
        quadCmd.textureRegion.height = texture.getHeight();
        quadCmd.textureOffset.x = 0.5;
        quadCmd.textureOffset.y = 0.5;
        quadCmd.matrix = new WOZLLA.math.Matrix3x3();
        quadCmd.matrix.appendTransform(0, 0, 1, 1, 30, 0, 0, 0, 0);
        renderer.addCommand(quadCmd);
        renderer.render();

        var rotateResult = document.createElement('canvas');
        rotateResult.width = image.width;
        rotateResult.height = image.height;
        var context = rotateResult.getContext('2d');

        var m = quadCmd.matrix;
        context.setTransform(m.a, m.c, m.b, m.d, m.tx, m.ty);
        context.drawImage(image, -image.width*quadCmd.textureOffset.x, -image.height*quadCmd.textureOffset.y);
        expect(PixelMatcher.compare(canvas, rotateResult, PixelMatcher.alphaZero)).toBe(true);
    });

    it('quad command scale', function() {
        var quadCmd = renderer.createQuadCommand();
        quadCmd.renderLayer = WOZLLA.rendering.RenderContext.DEFAULT_LAYER;
        quadCmd.renderOrder = 0;
        quadCmd.texture = texture;
        quadCmd.textureRegion.width = texture.getWidth();
        quadCmd.textureRegion.height = texture.getHeight();
        quadCmd.textureOffset.x = 0.5;
        quadCmd.textureOffset.y = 0.5;
        quadCmd.matrix = new WOZLLA.math.Matrix3x3();
        quadCmd.matrix.appendTransform(0, 0, 2, 1.2, 0, 0, 0, 0, 0);
        renderer.addCommand(quadCmd);
        renderer.render();

        var rotateResult = document.createElement('canvas');
        rotateResult.width = image.width;
        rotateResult.height = image.height;
        var context = rotateResult.getContext('2d');

        var m = quadCmd.matrix;
        context.setTransform(m.a, m.c, m.b, m.d, m.tx, m.ty);
        context.drawImage(image, -image.width*quadCmd.textureOffset.x, -image.height*quadCmd.textureOffset.y);
        expect(PixelMatcher.compare(canvas, rotateResult, PixelMatcher.alphaZero)).toBe(true);
    });

    it('quad command skew', function() {
        var quadCmd = renderer.createQuadCommand();
        quadCmd.renderLayer = WOZLLA.rendering.RenderContext.DEFAULT_LAYER;
        quadCmd.renderOrder = 0;
        quadCmd.texture = texture;
        quadCmd.textureRegion.width = texture.getWidth();
        quadCmd.textureRegion.height = texture.getHeight();
        quadCmd.textureOffset.x = 0.5;
        quadCmd.textureOffset.y = 0.5;
        quadCmd.matrix = new WOZLLA.math.Matrix3x3();
        quadCmd.matrix.appendTransform(0, 0, 1, 1, 0, 30, 45, 0, 0);
        renderer.addCommand(quadCmd);
        renderer.render();

        var rotateResult = document.createElement('canvas');
        rotateResult.width = image.width;
        rotateResult.height = image.height;
        var context = rotateResult.getContext('2d');

        var m = quadCmd.matrix;
        context.setTransform(m.a, m.c, m.b, m.d, m.tx, m.ty);
        context.drawImage(image, -image.width*quadCmd.textureOffset.x, -image.height*quadCmd.textureOffset.y);
        expect(PixelMatcher.compare(canvas, rotateResult, PixelMatcher.alphaZero)).toBe(true);
    });

    it('quad command transform', function() {
        var quadCmd = renderer.createQuadCommand();
        quadCmd.renderLayer = WOZLLA.rendering.RenderContext.DEFAULT_LAYER;
        quadCmd.renderOrder = 0;
        quadCmd.texture = texture;
        quadCmd.textureRegion.width = texture.getWidth();
        quadCmd.textureRegion.height = texture.getHeight();
        quadCmd.textureOffset.x = 0.5;
        quadCmd.textureOffset.y = 0.5;
        quadCmd.matrix = new WOZLLA.math.Matrix3x3();
        quadCmd.matrix.appendTransform(20, 30, 3, 2.4, 50, 66, 17, 0, 0);
        renderer.addCommand(quadCmd);
        renderer.render();

        var rotateResult = document.createElement('canvas');
        rotateResult.width = image.width;
        rotateResult.height = image.height;
        var context = rotateResult.getContext('2d');

        var m = quadCmd.matrix;
        context.setTransform(m.a, m.c, m.b, m.d, m.tx, m.ty);
        context.drawImage(image, -image.width*quadCmd.textureOffset.x, -image.height*quadCmd.textureOffset.y);
        expect(PixelMatcher.compare(canvas, rotateResult, PixelMatcher.alphaZero)).toBe(true);
    });

});