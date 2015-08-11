//describe('Rendering', function(){
//
//    it('webgl add command', function(){
//
//        var renderContext = new WOZLLA.rendering.WebGLRenderContext(canvas);
//
//        var quadCmd = renderContext.createQuadCommand();
//        quadCmd.matrix = new WOZLLA.math.Matrix3x3();
//        quadCmd.texture = texture//...
//        quadCmd.renderLayer = WOZLLA.rendering.RenderContext.DEFAULT_LAYER;
//        quadCmd.renderOrder = 10;
//
//        quadCmd.textureRegion.x = 0;
//        quadCmd.textureRegion.y = 0;
//        quadCmd.textureRegion.width = 100;
//        quadCmd.textureRegion.height = 100;
//
//        renderContext.addCommand(quadCmd);
//        // ... addCommand
//
//
//        renderContext.render();
//
//        expect(canvas).equals(image);
//
//    });
//
//});