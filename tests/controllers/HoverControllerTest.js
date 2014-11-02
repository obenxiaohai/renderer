var RequestAnimationFrame = require("awayjs-core/lib/utils/RequestAnimationFrame");
var View = require("awayjs-display/lib/containers/View");
var HoverController = require("awayjs-display/lib/controllers/HoverController");
var PrimitiveCubePrefab = require("awayjs-display/lib/prefabs/PrimitiveCubePrefab");
var DefaultRenderer = require("awayjs-renderergl/lib/render/DefaultRenderer");
var HoverControllerTest = (function () {
    function HoverControllerTest() {
        var _this = this;
        this._move = false;
        this._view = new View(new DefaultRenderer());
        this._cube = new PrimitiveCubePrefab(400, 400, 400);
        this._cube.geometryType = "lineSubGeometry";
        this._mesh = this._cube.getNewObject();
        this._view.scene.addChild(this._mesh);
        this._hoverControl = new HoverController(this._view.camera, this._mesh, 150, 10);
        window.onresize = function (event) { return _this.onResize(event); };
        document.onmousedown = function (event) { return _this.onMouseDown(event); };
        document.onmouseup = function (event) { return _this.onMouseUp(event); };
        document.onmousemove = function (event) { return _this.onMouseMove(event); };
        this.onResize();
        this._timer = new RequestAnimationFrame(this.render, this);
        this._timer.start();
    }
    HoverControllerTest.prototype.onResize = function (event) {
        if (event === void 0) { event = null; }
        this._view.y = 0;
        this._view.x = 0;
        this._view.width = window.innerWidth;
        this._view.height = window.innerHeight;
    };
    HoverControllerTest.prototype.render = function (dt) {
        this._view.render();
    };
    HoverControllerTest.prototype.onMouseUp = function (event) {
        this._move = false;
    };
    HoverControllerTest.prototype.onMouseMove = function (event) {
        if (this._move) {
            this._hoverControl.panAngle = 0.3 * (event.clientX - this._lastMouseX) + this._lastPanAngle;
            this._hoverControl.tiltAngle = 0.3 * (event.clientY - this._lastMouseY) + this._lastTiltAngle;
        }
    };
    HoverControllerTest.prototype.onMouseDown = function (event) {
        this._lastPanAngle = this._hoverControl.panAngle;
        this._lastTiltAngle = this._hoverControl.tiltAngle;
        this._lastMouseX = event.clientX;
        this._lastMouseY = event.clientY;
        this._move = true;
    };
    return HoverControllerTest;
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2hvdmVyY29udHJvbGxlcnRlc3QudHMiXSwibmFtZXMiOlsiSG92ZXJDb250cm9sbGVyVGVzdCIsIkhvdmVyQ29udHJvbGxlclRlc3QuY29uc3RydWN0b3IiLCJIb3ZlckNvbnRyb2xsZXJUZXN0Lm9uUmVzaXplIiwiSG92ZXJDb250cm9sbGVyVGVzdC5yZW5kZXIiLCJIb3ZlckNvbnRyb2xsZXJUZXN0Lm9uTW91c2VVcCIsIkhvdmVyQ29udHJvbGxlclRlc3Qub25Nb3VzZU1vdmUiLCJIb3ZlckNvbnRyb2xsZXJUZXN0Lm9uTW91c2VEb3duIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLHFCQUFxQixXQUFZLDZDQUE2QyxDQUFDLENBQUM7QUFHdkYsSUFBTyxJQUFJLFdBQWlCLG9DQUFvQyxDQUFDLENBQUM7QUFDbEUsSUFBTyxlQUFlLFdBQWMsZ0RBQWdELENBQUMsQ0FBQztBQUV0RixJQUFPLG1CQUFtQixXQUFhLGdEQUFnRCxDQUFDLENBQUM7QUFFekYsSUFBTyxlQUFlLFdBQWMsOENBQThDLENBQUMsQ0FBQztBQUVwRixJQUFNLG1CQUFtQjtJQWV4QkEsU0FmS0EsbUJBQW1CQTtRQUF6QkMsaUJBeUVDQTtRQWxFUUEsVUFBS0EsR0FBV0EsS0FBS0EsQ0FBQ0E7UUFVN0JBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLElBQUlBLGVBQWVBLEVBQUVBLENBQUNBLENBQUNBO1FBRTdDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxtQkFBbUJBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO1FBQ3BEQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxZQUFZQSxHQUFHQSxpQkFBaUJBLENBQUNBO1FBQzVDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFVQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxZQUFZQSxFQUFFQSxDQUFDQTtRQUM5Q0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFFdENBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLElBQUlBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBO1FBRWpGQSxNQUFNQSxDQUFDQSxRQUFRQSxHQUFJQSxVQUFDQSxLQUFhQSxJQUFLQSxPQUFBQSxLQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFwQkEsQ0FBb0JBLENBQUNBO1FBRTNEQSxRQUFRQSxDQUFDQSxXQUFXQSxHQUFHQSxVQUFDQSxLQUFnQkEsSUFBS0EsT0FBQUEsS0FBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBdkJBLENBQXVCQSxDQUFDQTtRQUNyRUEsUUFBUUEsQ0FBQ0EsU0FBU0EsR0FBR0EsVUFBQ0EsS0FBZ0JBLElBQUtBLE9BQUFBLEtBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLEVBQXJCQSxDQUFxQkEsQ0FBQ0E7UUFDakVBLFFBQVFBLENBQUNBLFdBQVdBLEdBQUdBLFVBQUNBLEtBQWdCQSxJQUFLQSxPQUFBQSxLQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUF2QkEsQ0FBdUJBLENBQUNBO1FBR3JFQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtRQUVoQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEscUJBQXFCQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFHQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUM1REEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7SUFDckJBLENBQUNBO0lBRU9ELHNDQUFRQSxHQUFoQkEsVUFBaUJBLEtBQW9CQTtRQUFwQkUscUJBQW9CQSxHQUFwQkEsWUFBb0JBO1FBRXBDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNqQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEdBQUdBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBO1FBQ3JDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQTtJQUN4Q0EsQ0FBQ0E7SUFFT0Ysb0NBQU1BLEdBQWRBLFVBQWVBLEVBQVNBO1FBRXZCRyxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtJQUNyQkEsQ0FBQ0E7SUFFT0gsdUNBQVNBLEdBQWpCQSxVQUFrQkEsS0FBZ0JBO1FBRWpDSSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxLQUFLQSxDQUFDQTtJQUNwQkEsQ0FBQ0E7SUFFT0oseUNBQVdBLEdBQW5CQSxVQUFvQkEsS0FBZ0JBO1FBRW5DSyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNoQkEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsR0FBR0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7WUFDMUZBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUNBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBO1FBQzdGQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUVPTCx5Q0FBV0EsR0FBbkJBLFVBQW9CQSxLQUFnQkE7UUFFbkNNLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBO1FBQ2pEQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUNuREEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDakNBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBO1FBQ2pDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQTtJQUNuQkEsQ0FBQ0E7SUFDRk4sMEJBQUNBO0FBQURBLENBekVBLEFBeUVDQSxJQUFBIiwiZmlsZSI6ImNvbnRyb2xsZXJzL0hvdmVyQ29udHJvbGxlclRlc3QuanMiLCJzb3VyY2VSb290IjoiLi90ZXN0cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL1JlcXVlc3RBbmltYXRpb25GcmFtZVwiKTtcbmltcG9ydCBMb2FkZXJFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0xvYWRlckV2ZW50XCIpO1xuXG5pbXBvcnQgVmlld1x0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvVmlld1wiKTtcbmltcG9ydCBIb3ZlckNvbnRyb2xsZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250cm9sbGVycy9Ib3ZlckNvbnRyb2xsZXJcIik7XG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL01lc2hcIik7XG5pbXBvcnQgUHJpbWl0aXZlQ3ViZVByZWZhYlx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByaW1pdGl2ZUN1YmVQcmVmYWJcIik7XG5cbmltcG9ydCBEZWZhdWx0UmVuZGVyZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9yZW5kZXIvRGVmYXVsdFJlbmRlcmVyXCIpO1xuXG5jbGFzcyBIb3ZlckNvbnRyb2xsZXJUZXN0XG57XG5cblx0cHJpdmF0ZSBfdmlldzpWaWV3O1xuXHRwcml2YXRlIF90aW1lcjpSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cdHByaXZhdGUgX2hvdmVyQ29udHJvbDpIb3ZlckNvbnRyb2xsZXI7XG5cblx0cHJpdmF0ZSBfbW92ZTpib29sZWFuID0gZmFsc2U7XG5cdHByaXZhdGUgX2xhc3RQYW5BbmdsZTpudW1iZXI7XG5cdHByaXZhdGUgX2xhc3RUaWx0QW5nbGU6bnVtYmVyO1xuXHRwcml2YXRlIF9sYXN0TW91c2VYOm51bWJlcjtcblx0cHJpdmF0ZSBfbGFzdE1vdXNlWTpudW1iZXI7XG5cdHByaXZhdGUgX2N1YmU6UHJpbWl0aXZlQ3ViZVByZWZhYjtcblx0cHJpdmF0ZSBfbWVzaDpNZXNoO1xuXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHRoaXMuX3ZpZXcgPSBuZXcgVmlldyhuZXcgRGVmYXVsdFJlbmRlcmVyKCkpO1xuXG5cdFx0dGhpcy5fY3ViZSA9IG5ldyBQcmltaXRpdmVDdWJlUHJlZmFiKDQwMCwgNDAwLCA0MDApO1xuXHRcdHRoaXMuX2N1YmUuZ2VvbWV0cnlUeXBlID0gXCJsaW5lU3ViR2VvbWV0cnlcIjtcblx0XHR0aGlzLl9tZXNoID0gPE1lc2g+IHRoaXMuX2N1YmUuZ2V0TmV3T2JqZWN0KCk7XG5cdFx0dGhpcy5fdmlldy5zY2VuZS5hZGRDaGlsZCh0aGlzLl9tZXNoKTtcblxuXHRcdHRoaXMuX2hvdmVyQ29udHJvbCA9IG5ldyBIb3ZlckNvbnRyb2xsZXIodGhpcy5fdmlldy5jYW1lcmEsIHRoaXMuX21lc2gsIDE1MCwgMTApO1xuXG5cdFx0d2luZG93Lm9ucmVzaXplICA9IChldmVudDpVSUV2ZW50KSA9PiB0aGlzLm9uUmVzaXplKGV2ZW50KTtcblxuXHRcdGRvY3VtZW50Lm9ubW91c2Vkb3duID0gKGV2ZW50Ok1vdXNlRXZlbnQpID0+IHRoaXMub25Nb3VzZURvd24oZXZlbnQpO1xuXHRcdGRvY3VtZW50Lm9ubW91c2V1cCA9IChldmVudDpNb3VzZUV2ZW50KSA9PiB0aGlzLm9uTW91c2VVcChldmVudCk7XG5cdFx0ZG9jdW1lbnQub25tb3VzZW1vdmUgPSAoZXZlbnQ6TW91c2VFdmVudCkgPT4gdGhpcy5vbk1vdXNlTW92ZShldmVudCk7XG5cblxuXHRcdHRoaXMub25SZXNpemUoKTtcblxuXHRcdHRoaXMuX3RpbWVyID0gbmV3IFJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlbmRlciAsIHRoaXMpO1xuXHRcdHRoaXMuX3RpbWVyLnN0YXJ0KCk7XG5cdH1cblxuXHRwcml2YXRlIG9uUmVzaXplKGV2ZW50OlVJRXZlbnQgPSBudWxsKVxuXHR7XG5cdFx0dGhpcy5fdmlldy55ID0gMDtcblx0XHR0aGlzLl92aWV3LnggPSAwO1xuXHRcdHRoaXMuX3ZpZXcud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHR0aGlzLl92aWV3LmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0fVxuXG5cdHByaXZhdGUgcmVuZGVyKGR0Om51bWJlcilcblx0e1xuXHRcdHRoaXMuX3ZpZXcucmVuZGVyKCk7XG5cdH1cblxuXHRwcml2YXRlIG9uTW91c2VVcChldmVudDpNb3VzZUV2ZW50KVxuXHR7XG5cdFx0dGhpcy5fbW92ZSA9IGZhbHNlO1xuXHR9XG5cblx0cHJpdmF0ZSBvbk1vdXNlTW92ZShldmVudDpNb3VzZUV2ZW50KVxuXHR7XG5cdFx0aWYgKHRoaXMuX21vdmUpIHtcblx0XHRcdHRoaXMuX2hvdmVyQ29udHJvbC5wYW5BbmdsZSA9IDAuMyooZXZlbnQuY2xpZW50WCAtIHRoaXMuX2xhc3RNb3VzZVgpICsgdGhpcy5fbGFzdFBhbkFuZ2xlO1xuXHRcdFx0dGhpcy5faG92ZXJDb250cm9sLnRpbHRBbmdsZSA9IDAuMyooZXZlbnQuY2xpZW50WSAtIHRoaXMuX2xhc3RNb3VzZVkpICsgdGhpcy5fbGFzdFRpbHRBbmdsZTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIG9uTW91c2VEb3duKGV2ZW50Ok1vdXNlRXZlbnQpXG5cdHtcblx0XHR0aGlzLl9sYXN0UGFuQW5nbGUgPSB0aGlzLl9ob3ZlckNvbnRyb2wucGFuQW5nbGU7XG5cdFx0dGhpcy5fbGFzdFRpbHRBbmdsZSA9IHRoaXMuX2hvdmVyQ29udHJvbC50aWx0QW5nbGU7XG5cdFx0dGhpcy5fbGFzdE1vdXNlWCA9IGV2ZW50LmNsaWVudFg7XG5cdFx0dGhpcy5fbGFzdE1vdXNlWSA9IGV2ZW50LmNsaWVudFk7XG5cdFx0dGhpcy5fbW92ZSA9IHRydWU7XG5cdH1cbn0iXX0=