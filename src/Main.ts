
module WOZLLA.component {

  export class MyRenderer extends CanvasRenderer{

            get radius():Property<number> {
                return this._radius;
            }

            

            private _radius:Property<number> = new Property<number>(100);
            private _center:IPoint;

            protected measureCanvasSize(helpContext, sizeOut:ISize) {
                var style = this.canvasStyle;
                sizeOut.width = Math.ceil(this._radius.get()*2 + (style.stroke ? style.strokeWidth : 0));
                sizeOut.height = Math.ceil(this._radius.get()*2 + (style.stroke ? style.strokeWidth : 0));
                this._center = {
                    x: sizeOut.width/2,
                    y: sizeOut.height/2
                };
            }

            protected isGraphicsDirty():boolean {
                return true;
            }

            protected clearGraphicsDirty() {
                this._radius.clearDirty();
            }

            protected draw(context,canvas) {
                var style = this.canvasStyle;
                context.beginPath();
                context.arc(this._center.x, this._center.y, this._radius.get(), 0, 2 * Math.PI);



                context.fillStyle="#FFFFFF";
                context.fillRect(0,0,150,75);



                var grd=context.createLinearGradient(0,0,175,50);
                grd.addColorStop(0,"#FF0000");
                grd.addColorStop(1,"#00FF00");
                context.fillStyle=grd;
                context.fillRect(0,0,175,50);

                document.body.appendChild(canvas);
            }
  }
}


var director = new WOZLLA.Director(document.getElementById('main'));
director.start();
var gameObject = director.createGameObject();
var myRenderer = new WOZLLA.component.MyRenderer();

 myRenderer.canvasStyle.fill = true;
 myRenderer.canvasStyle.fillColor = 'blue';
 myRenderer.canvasStyle.stroke = true;
 myRenderer.canvasStyle.strokeWidth = 3;
 myRenderer.canvasStyle.strokeColor = '#FFFFFF';
 myRenderer.radius.set(50);
gameObject.addComponent(myRenderer);
gameObject.transform.setPosition(200,200);
gameObject.loadAssets(function() {
    gameObject.init();
    director.stage.addChild(gameObject);
});
