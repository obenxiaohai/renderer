var AssetLibrary = require("awayjs-core/lib/library/AssetLibrary");
var URLRequest = require("awayjs-core/lib/net/URLRequest");
var LoaderEvent = require("awayjs-core/lib/events/LoaderEvent");
var CoordinateSystem = require("awayjs-core/lib/projections/CoordinateSystem");
var RequestAnimationFrame = require("awayjs-core/lib/utils/RequestAnimationFrame");
var View = require("awayjs-display/lib/containers/View");
var HoverController = require("awayjs-display/lib/controllers/HoverController");
var Billboard = require("awayjs-display/lib/entities/Billboard");
var AwayMouseEvent = require("awayjs-display/lib/events/MouseEvent");
var BasicMaterial = require("awayjs-display/lib/materials/BasicMaterial");
var DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
var LayoutTest = (function () {
    function LayoutTest() {
        var _this = this;
        this._move = false;
        this._billboards = new Array();
        //listen for a resource complete event
        AssetLibrary.addEventListener(LoaderEvent.RESOURCE_COMPLETE, function (event) { return _this.onResourceComplete(event); });
        //load an image
        AssetLibrary.load(new URLRequest('assets/256x256.png'));
    }
    /**
     * Listener for resource complete event
     *
     * @param event
     */
    LayoutTest.prototype.onResourceComplete = function (event) {
        var _this = this;
        //get the image texture
        this._imageTexture = event.assets[0];
        //create the view
        this._view = new View(new DefaultRenderer());
        this._projection = this._view.camera.projection;
        this._projection.coordinateSystem = CoordinateSystem.RIGHT_HANDED;
        this._projection.focalLength = 1000;
        this._projection.preserveFocalLength = true;
        this._projection.originX = 0;
        this._projection.originY = 0;
        //create a bitmap material
        this._bitmapMaterial = new BasicMaterial(this._imageTexture);
        var billboard;
        var numHBillboards = 2;
        var numVBillboards = 2;
        for (var i = 0; i < numHBillboards; i++) {
            for (var j = 0; j < numVBillboards; j++) {
                billboard = new Billboard(this._bitmapMaterial);
                //billboard.width = 50;
                //billboard.height = 50;
                //billboard.pivot = new Vector3D(billboard.billboardWidth/2, billboard.billboardHeight/2, 0);
                billboard.x = j * 300;
                billboard.y = i * 300;
                billboard.z = 0;
                billboard.addEventListener(AwayMouseEvent.MOUSE_MOVE, this.onMouseEvent);
                //billboard.orientationMode = away.base.OrientationMode.CAMERA_PLANE;
                //billboard.alignmentMode = away.base.AlignmentMode.PIVOT_POINT;
                this._billboards.push(billboard);
                //add billboard to the scene
                this._view.scene.addChild(billboard);
            }
        }
        this._hoverControl = new HoverController(this._view.camera, null, 180, 0, 1000);
        document.onmousedown = function (event) { return _this.onMouseDownHandler(event); };
        document.onmouseup = function (event) { return _this.onMouseUpHandler(event); };
        document.onmousemove = function (event) { return _this.onMouseMove(event); };
        window.onresize = function (event) { return _this.onResize(event); };
        //trigger an initial resize for the view
        this.onResize(null);
        //setup the RAF for a render listener
        this._timer = new RequestAnimationFrame(this.render, this);
        this._timer.start();
    };
    LayoutTest.prototype.onMouseEvent = function (event) {
        console.log(event);
    };
    LayoutTest.prototype.onResize = function (event) {
        this._view.x = 0;
        this._view.y = 0;
        this._view.width = window.innerWidth;
        this._view.height = window.innerHeight;
    };
    LayoutTest.prototype.render = function (dt) {
        for (var i = 0; i < this._billboards.length; i++) {
        }
        this._view.render();
    };
    LayoutTest.prototype.onMouseUpHandler = function (event) {
        this._move = false;
    };
    LayoutTest.prototype.onMouseMove = function (event) {
        if (this._move) {
            this._hoverControl.panAngle = 0.3 * (event.clientX - this._lastMouseX) + this._lastPanAngle;
            this._hoverControl.tiltAngle = -0.3 * (event.clientY - this._lastMouseY) + this._lastTiltAngle;
        }
    };
    LayoutTest.prototype.onMouseDownHandler = function (event) {
        this._lastPanAngle = this._hoverControl.panAngle;
        this._lastTiltAngle = this._hoverControl.tiltAngle;
        this._lastMouseX = event.clientX;
        this._lastMouseY = event.clientY;
        this._move = true;
    };
    return LayoutTest;
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL0xheW91dFRlc3QudHMiXSwibmFtZXMiOlsiTGF5b3V0VGVzdCIsIkxheW91dFRlc3QuY29uc3RydWN0b3IiLCJMYXlvdXRUZXN0Lm9uUmVzb3VyY2VDb21wbGV0ZSIsIkxheW91dFRlc3Qub25Nb3VzZUV2ZW50IiwiTGF5b3V0VGVzdC5vblJlc2l6ZSIsIkxheW91dFRlc3QucmVuZGVyIiwiTGF5b3V0VGVzdC5vbk1vdXNlVXBIYW5kbGVyIiwiTGF5b3V0VGVzdC5vbk1vdXNlTW92ZSIsIkxheW91dFRlc3Qub25Nb3VzZURvd25IYW5kbGVyIl0sIm1hcHBpbmdzIjoiQUFDQSxJQUFPLFlBQVksV0FBZSxzQ0FBc0MsQ0FBQyxDQUFDO0FBRTFFLElBQU8sVUFBVSxXQUFlLGdDQUFnQyxDQUFDLENBQUM7QUFDbEUsSUFBTyxXQUFXLFdBQWUsb0NBQW9DLENBQUMsQ0FBQztBQUN2RSxJQUFPLGdCQUFnQixXQUFjLDhDQUE4QyxDQUFDLENBQUM7QUFHckYsSUFBTyxxQkFBcUIsV0FBWSw2Q0FBNkMsQ0FBQyxDQUFDO0FBRXZGLElBQU8sSUFBSSxXQUFpQixvQ0FBb0MsQ0FBQyxDQUFDO0FBQ2xFLElBQU8sZUFBZSxXQUFjLGdEQUFnRCxDQUFDLENBQUM7QUFDdEYsSUFBTyxTQUFTLFdBQWUsdUNBQXVDLENBQUMsQ0FBQztBQUV4RSxJQUFPLGNBQWMsV0FBYyxzQ0FBc0MsQ0FBQyxDQUFDO0FBQzNFLElBQU8sYUFBYSxXQUFjLDRDQUE0QyxDQUFDLENBQUM7QUFFaEYsSUFBTyxlQUFlLFdBQWMsdUNBQXVDLENBQUMsQ0FBQztBQUU3RSxJQUFNLFVBQVU7SUFpQmZBLFNBakJLQSxVQUFVQTtRQUFoQkMsaUJBb0lDQTtRQTdIUUEsVUFBS0EsR0FBV0EsS0FBS0EsQ0FBQ0E7UUFRdEJBLGdCQUFXQSxHQUFvQkEsSUFBSUEsS0FBS0EsRUFBYUEsQ0FBQ0E7UUFJN0RBLEFBQ0FBLHNDQURzQ0E7UUFDdENBLFlBQVlBLENBQUNBLGdCQUFnQkEsQ0FBQ0Es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LFdBQVdBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBO1lBQzFGQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxTQUFTQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtRQUM5RkEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFFT1AsdUNBQWtCQSxHQUExQkEsVUFBMkJBLEtBQWdCQTtRQUUxQ1EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDakRBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFNBQVNBLENBQUNBO1FBQ25EQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNqQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDakNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBO0lBQ25CQSxDQUFDQTtJQUNGUixpQkFBQ0E7QUFBREEsQ0FwSUEsQUFvSUNBLElBQUEiLCJmaWxlIjoiZW50aXRpZXMvTGF5b3V0VGVzdC5qcyIsInNvdXJjZVJvb3QiOiIuL3Rlc3RzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgQXNzZXRMaWJyYXJ5XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TGlicmFyeVwiKTtcbmltcG9ydCBVUkxMb2FkZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxMb2FkZXJcIik7XG5pbXBvcnQgVVJMUmVxdWVzdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbmV0L1VSTFJlcXVlc3RcIik7XG5pbXBvcnQgTG9hZGVyRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9Mb2FkZXJFdmVudFwiKTtcbmltcG9ydCBDb29yZGluYXRlU3lzdGVtXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcHJvamVjdGlvbnMvQ29vcmRpbmF0ZVN5c3RlbVwiKTtcbmltcG9ydCBQZXJzcGVjdGl2ZVByb2plY3Rpb25cdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3Byb2plY3Rpb25zL1BlcnNwZWN0aXZlUHJvamVjdGlvblwiKTtcbmltcG9ydCBJbWFnZVRleHR1cmVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL0ltYWdlVGV4dHVyZVwiKTtcbmltcG9ydCBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL1JlcXVlc3RBbmltYXRpb25GcmFtZVwiKTtcblxuaW1wb3J0IFZpZXdcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1ZpZXdcIik7XG5pbXBvcnQgSG92ZXJDb250cm9sbGVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udHJvbGxlcnMvSG92ZXJDb250cm9sbGVyXCIpO1xuaW1wb3J0IEJpbGxib2FyZFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQmlsbGJvYXJkXCIpO1xuaW1wb3J0IE1lc2hcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoXCIpO1xuaW1wb3J0IEF3YXlNb3VzZUV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL01vdXNlRXZlbnRcIik7XG5pbXBvcnQgQmFzaWNNYXRlcmlhbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9CYXNpY01hdGVyaWFsXCIpO1xuXG5pbXBvcnQgRGVmYXVsdFJlbmRlcmVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtcmVuZGVyZXJnbC9saWIvRGVmYXVsdFJlbmRlcmVyXCIpO1xuXG5jbGFzcyBMYXlvdXRUZXN0XG57XG5cdHByaXZhdGUgX3ZpZXc6Vmlldztcblx0cHJpdmF0ZSBfcHJvamVjdGlvbjpQZXJzcGVjdGl2ZVByb2plY3Rpb247XG5cdHByaXZhdGUgX3RpbWVyOlJlcXVlc3RBbmltYXRpb25GcmFtZTtcblx0cHJpdmF0ZSBfaG92ZXJDb250cm9sOkhvdmVyQ29udHJvbGxlcjtcblxuXHRwcml2YXRlIF9tb3ZlOmJvb2xlYW4gPSBmYWxzZTtcblx0cHJpdmF0ZSBfbGFzdFBhbkFuZ2xlOm51bWJlcjtcblx0cHJpdmF0ZSBfbGFzdFRpbHRBbmdsZTpudW1iZXI7XG5cdHByaXZhdGUgX2xhc3RNb3VzZVg6bnVtYmVyO1xuXHRwcml2YXRlIF9sYXN0TW91c2VZOm51bWJlcjtcblxuXHRwcml2YXRlIF9pbWFnZVRleHR1cmU6SW1hZ2VUZXh0dXJlO1xuXHRwcml2YXRlIF9iaXRtYXBNYXRlcmlhbDpCYXNpY01hdGVyaWFsO1xuXHRwcml2YXRlIF9iaWxsYm9hcmRzOkFycmF5PEJpbGxib2FyZD4gPSBuZXcgQXJyYXk8QmlsbGJvYXJkPigpO1xuXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdC8vbGlzdGVuIGZvciBhIHJlc291cmNlIGNvbXBsZXRlIGV2ZW50XG5cdFx0QXNzZXRMaWJyYXJ5LmFkZEV2ZW50TGlzdGVuZXIoTG9hZGVyRXZlbnQuUkVTT1VSQ0VfQ09NUExFVEUgLCAoZXZlbnQ6TG9hZGVyRXZlbnQpID0+IHRoaXMub25SZXNvdXJjZUNvbXBsZXRlKGV2ZW50KSk7XG5cblx0XHQvL2xvYWQgYW4gaW1hZ2Vcblx0XHRBc3NldExpYnJhcnkubG9hZChuZXcgVVJMUmVxdWVzdCgnYXNzZXRzLzI1NngyNTYucG5nJykgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBMaXN0ZW5lciBmb3IgcmVzb3VyY2UgY29tcGxldGUgZXZlbnRcblx0ICpcblx0ICogQHBhcmFtIGV2ZW50XG5cdCAqL1xuXHRwcml2YXRlIG9uUmVzb3VyY2VDb21wbGV0ZShldmVudDpMb2FkZXJFdmVudClcblx0e1xuXHRcdC8vZ2V0IHRoZSBpbWFnZSB0ZXh0dXJlXG5cdFx0dGhpcy5faW1hZ2VUZXh0dXJlID0gPEltYWdlVGV4dHVyZT4gZXZlbnQuYXNzZXRzWzBdO1xuXG5cdFx0Ly9jcmVhdGUgdGhlIHZpZXdcblx0XHR0aGlzLl92aWV3ID0gbmV3IFZpZXcobmV3IERlZmF1bHRSZW5kZXJlcigpKTtcblxuXHRcdHRoaXMuX3Byb2plY3Rpb24gPSA8UGVyc3BlY3RpdmVQcm9qZWN0aW9uPiB0aGlzLl92aWV3LmNhbWVyYS5wcm9qZWN0aW9uO1xuXG5cblx0XHR0aGlzLl9wcm9qZWN0aW9uLmNvb3JkaW5hdGVTeXN0ZW0gPSBDb29yZGluYXRlU3lzdGVtLlJJR0hUX0hBTkRFRDtcblx0XHR0aGlzLl9wcm9qZWN0aW9uLmZvY2FsTGVuZ3RoID0gMTAwMDtcblx0XHR0aGlzLl9wcm9qZWN0aW9uLnByZXNlcnZlRm9jYWxMZW5ndGggPSB0cnVlO1xuXHRcdHRoaXMuX3Byb2plY3Rpb24ub3JpZ2luWCA9IDA7XG5cdFx0dGhpcy5fcHJvamVjdGlvbi5vcmlnaW5ZID0gMDtcblxuXHRcdC8vY3JlYXRlIGEgYml0bWFwIG1hdGVyaWFsXG5cdFx0dGhpcy5fYml0bWFwTWF0ZXJpYWwgPSBuZXcgQmFzaWNNYXRlcmlhbCh0aGlzLl9pbWFnZVRleHR1cmUpO1xuXG5cdFx0dmFyIGJpbGxib2FyZDpCaWxsYm9hcmQ7XG5cdFx0dmFyIG51bUhCaWxsYm9hcmRzOm51bWJlciA9IDI7XG5cdFx0dmFyIG51bVZCaWxsYm9hcmRzOm51bWJlciA9IDI7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbnVtSEJpbGxib2FyZHM7IGkrKykge1xuXHRcdFx0Zm9yICh2YXIgajpudW1iZXIgPSAwOyBqIDwgbnVtVkJpbGxib2FyZHM7IGorKykge1xuXHRcdFx0XHRiaWxsYm9hcmQgPSBuZXcgQmlsbGJvYXJkKHRoaXMuX2JpdG1hcE1hdGVyaWFsKTtcblx0XHRcdFx0Ly9iaWxsYm9hcmQud2lkdGggPSA1MDtcblx0XHRcdFx0Ly9iaWxsYm9hcmQuaGVpZ2h0ID0gNTA7XG5cdFx0XHRcdC8vYmlsbGJvYXJkLnBpdm90ID0gbmV3IFZlY3RvcjNEKGJpbGxib2FyZC5iaWxsYm9hcmRXaWR0aC8yLCBiaWxsYm9hcmQuYmlsbGJvYXJkSGVpZ2h0LzIsIDApO1xuXHRcdFx0XHRiaWxsYm9hcmQueCA9IGoqMzAwO1xuXHRcdFx0XHRiaWxsYm9hcmQueSA9IGkqMzAwO1xuXHRcdFx0XHRiaWxsYm9hcmQueiA9IDA7XG5cdFx0XHRcdGJpbGxib2FyZC5hZGRFdmVudExpc3RlbmVyKEF3YXlNb3VzZUV2ZW50Lk1PVVNFX01PVkUsIHRoaXMub25Nb3VzZUV2ZW50KVxuXHRcdFx0XHQvL2JpbGxib2FyZC5vcmllbnRhdGlvbk1vZGUgPSBhd2F5LmJhc2UuT3JpZW50YXRpb25Nb2RlLkNBTUVSQV9QTEFORTtcblx0XHRcdFx0Ly9iaWxsYm9hcmQuYWxpZ25tZW50TW9kZSA9IGF3YXkuYmFzZS5BbGlnbm1lbnRNb2RlLlBJVk9UX1BPSU5UO1xuXHRcdFx0XHR0aGlzLl9iaWxsYm9hcmRzLnB1c2goYmlsbGJvYXJkKTtcblx0XHRcdFx0Ly9hZGQgYmlsbGJvYXJkIHRvIHRoZSBzY2VuZVxuXHRcdFx0XHR0aGlzLl92aWV3LnNjZW5lLmFkZENoaWxkKGJpbGxib2FyZCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5faG92ZXJDb250cm9sID0gbmV3IEhvdmVyQ29udHJvbGxlcih0aGlzLl92aWV3LmNhbWVyYSwgbnVsbCwgMTgwLCAwLCAxMDAwKTtcblxuXHRcdGRvY3VtZW50Lm9ubW91c2Vkb3duID0gKGV2ZW50Ok1vdXNlRXZlbnQpID0+IHRoaXMub25Nb3VzZURvd25IYW5kbGVyKGV2ZW50KTtcblx0XHRkb2N1bWVudC5vbm1vdXNldXAgPSAoZXZlbnQ6TW91c2VFdmVudCkgPT4gdGhpcy5vbk1vdXNlVXBIYW5kbGVyKGV2ZW50KTtcblx0XHRkb2N1bWVudC5vbm1vdXNlbW92ZSA9IChldmVudDpNb3VzZUV2ZW50KSA9PiB0aGlzLm9uTW91c2VNb3ZlKGV2ZW50KTtcblxuXHRcdHdpbmRvdy5vbnJlc2l6ZSAgPSAoZXZlbnQ6VUlFdmVudCkgPT4gdGhpcy5vblJlc2l6ZShldmVudCk7XG5cblx0XHQvL3RyaWdnZXIgYW4gaW5pdGlhbCByZXNpemUgZm9yIHRoZSB2aWV3XG5cdFx0dGhpcy5vblJlc2l6ZShudWxsKTtcblxuXHRcdC8vc2V0dXAgdGhlIFJBRiBmb3IgYSByZW5kZXIgbGlzdGVuZXJcblx0XHR0aGlzLl90aW1lciA9IG5ldyBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXIsIHRoaXMpO1xuXHRcdHRoaXMuX3RpbWVyLnN0YXJ0KCk7XG5cdH1cblxuXHRwcml2YXRlIG9uTW91c2VFdmVudChldmVudDpBd2F5TW91c2VFdmVudClcblx0e1xuXHRcdGNvbnNvbGUubG9nKGV2ZW50KTtcblx0fVxuXG5cdHByaXZhdGUgb25SZXNpemUoZXZlbnQ6VUlFdmVudClcblx0e1xuXHRcdHRoaXMuX3ZpZXcueCA9IDA7XG5cdFx0dGhpcy5fdmlldy55ID0gMDtcblx0XHR0aGlzLl92aWV3LndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy5fdmlldy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdH1cblxuXHRwcml2YXRlIHJlbmRlcihkdDpudW1iZXIpXG5cdHtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCB0aGlzLl9iaWxsYm9hcmRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHQvL3RoaXMuX2JpbGxib2FyZHNbaV0ucm90YXRpb25aICs9Mjtcblx0XHR9XG5cblx0XHR0aGlzLl92aWV3LnJlbmRlcigpO1xuXG5cdH1cblxuXHRwcml2YXRlIG9uTW91c2VVcEhhbmRsZXIoZXZlbnQ6TW91c2VFdmVudClcblx0e1xuXHRcdHRoaXMuX21vdmUgPSBmYWxzZTtcblx0fVxuXG5cdHByaXZhdGUgb25Nb3VzZU1vdmUoZXZlbnQ6TW91c2VFdmVudClcblx0e1xuXHRcdGlmICh0aGlzLl9tb3ZlKSB7XG5cdFx0XHR0aGlzLl9ob3ZlckNvbnRyb2wucGFuQW5nbGUgPSAwLjMqKGV2ZW50LmNsaWVudFggLSB0aGlzLl9sYXN0TW91c2VYKSArIHRoaXMuX2xhc3RQYW5BbmdsZTtcblx0XHRcdHRoaXMuX2hvdmVyQ29udHJvbC50aWx0QW5nbGUgPSAtMC4zKihldmVudC5jbGllbnRZIC0gdGhpcy5fbGFzdE1vdXNlWSkgKyB0aGlzLl9sYXN0VGlsdEFuZ2xlO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgb25Nb3VzZURvd25IYW5kbGVyKGV2ZW50Ok1vdXNlRXZlbnQpXG5cdHtcblx0XHR0aGlzLl9sYXN0UGFuQW5nbGUgPSB0aGlzLl9ob3ZlckNvbnRyb2wucGFuQW5nbGU7XG5cdFx0dGhpcy5fbGFzdFRpbHRBbmdsZSA9IHRoaXMuX2hvdmVyQ29udHJvbC50aWx0QW5nbGU7XG5cdFx0dGhpcy5fbGFzdE1vdXNlWCA9IGV2ZW50LmNsaWVudFg7XG5cdFx0dGhpcy5fbGFzdE1vdXNlWSA9IGV2ZW50LmNsaWVudFk7XG5cdFx0dGhpcy5fbW92ZSA9IHRydWU7XG5cdH1cbn0iXX0=