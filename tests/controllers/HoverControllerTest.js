var RequestAnimationFrame = require("awayjs-core/lib/utils/RequestAnimationFrame");
var View = require("awayjs-display/lib/containers/View");
var HoverController = require("awayjs-display/lib/controllers/HoverController");
var PrimitiveCubePrefab = require("awayjs-display/lib/prefabs/PrimitiveCubePrefab");
var DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
var HoverControllerTest = (function () {
    function HoverControllerTest() {
        var _this = this;
        this._move = false;
        this._view = new View(new DefaultRenderer());
        this._view.backgroundColor = 0x222222;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL0hvdmVyQ29udHJvbGxlclRlc3QudHMiXSwibmFtZXMiOlsiSG92ZXJDb250cm9sbGVyVGVzdCIsIkhvdmVyQ29udHJvbGxlclRlc3QuY29uc3RydWN0b3IiLCJIb3ZlckNvbnRyb2xsZXJUZXN0Lm9uUmVzaXplIiwiSG92ZXJDb250cm9sbGVyVGVzdC5yZW5kZXIiLCJIb3ZlckNvbnRyb2xsZXJUZXN0Lm9uTW91c2VVcCIsIkhvdmVyQ29udHJvbGxlclRlc3Qub25Nb3VzZU1vdmUiLCJIb3ZlckNvbnRyb2xsZXJUZXN0Lm9uTW91c2VEb3duIl0sIm1hcHBpbmdzIjoiQUFDQSxJQUFPLHFCQUFxQixXQUFZLDZDQUE2QyxDQUFDLENBQUM7QUFHdkYsSUFBTyxJQUFJLFdBQWlCLG9DQUFvQyxDQUFDLENBQUM7QUFDbEUsSUFBTyxlQUFlLFdBQWMsZ0RBQWdELENBQUMsQ0FBQztBQUV0RixJQUFPLG1CQUFtQixXQUFhLGdEQUFnRCxDQUFDLENBQUM7QUFFekYsSUFBTyxlQUFlLFdBQWMsdUNBQXVDLENBQUMsQ0FBQztBQUU3RSxJQUFNLG1CQUFtQjtJQWV4QkEsU0FmS0EsbUJBQW1CQTtRQUF6QkMsaUJBMEVDQTtRQW5FUUEsVUFBS0EsR0FBV0EsS0FBS0EsQ0FBQ0E7UUFVN0JBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLElBQUlBLGVBQWVBLEVBQUVBLENBQUNBLENBQUNBO1FBQzdDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxlQUFlQSxHQUFHQSxRQUFRQSxDQUFDQTtRQUV0Q0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsbUJBQW1CQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNwREEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsWUFBWUEsR0FBR0EsaUJBQWlCQSxDQUFDQTtRQUM1Q0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBVUEsSUFBSUEs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SUFFT0wseUNBQVdBLEdBQW5CQSxVQUFvQkEsS0FBZ0JBO1FBRW5DTSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUNqREEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDbkRBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBO1FBQ2pDQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNqQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDbkJBLENBQUNBO0lBQ0ZOLDBCQUFDQTtBQUFEQSxDQTFFQSxBQTBFQ0EsSUFBQSIsImZpbGUiOiJjb250cm9sbGVycy9Ib3ZlckNvbnRyb2xsZXJUZXN0LmpzIiwic291cmNlUm9vdCI6Ii4vdGVzdHMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL1JlcXVlc3RBbmltYXRpb25GcmFtZVwiKTtcbmltcG9ydCBMb2FkZXJFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0xvYWRlckV2ZW50XCIpO1xuXG5pbXBvcnQgVmlld1x0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvVmlld1wiKTtcbmltcG9ydCBIb3ZlckNvbnRyb2xsZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250cm9sbGVycy9Ib3ZlckNvbnRyb2xsZXJcIik7XG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL01lc2hcIik7XG5pbXBvcnQgUHJpbWl0aXZlQ3ViZVByZWZhYlx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByaW1pdGl2ZUN1YmVQcmVmYWJcIik7XG5cbmltcG9ydCBEZWZhdWx0UmVuZGVyZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9EZWZhdWx0UmVuZGVyZXJcIik7XG5cbmNsYXNzIEhvdmVyQ29udHJvbGxlclRlc3RcbntcblxuXHRwcml2YXRlIF92aWV3OlZpZXc7XG5cdHByaXZhdGUgX3RpbWVyOlJlcXVlc3RBbmltYXRpb25GcmFtZTtcblx0cHJpdmF0ZSBfaG92ZXJDb250cm9sOkhvdmVyQ29udHJvbGxlcjtcblxuXHRwcml2YXRlIF9tb3ZlOmJvb2xlYW4gPSBmYWxzZTtcblx0cHJpdmF0ZSBfbGFzdFBhbkFuZ2xlOm51bWJlcjtcblx0cHJpdmF0ZSBfbGFzdFRpbHRBbmdsZTpudW1iZXI7XG5cdHByaXZhdGUgX2xhc3RNb3VzZVg6bnVtYmVyO1xuXHRwcml2YXRlIF9sYXN0TW91c2VZOm51bWJlcjtcblx0cHJpdmF0ZSBfY3ViZTpQcmltaXRpdmVDdWJlUHJlZmFiO1xuXHRwcml2YXRlIF9tZXNoOk1lc2g7XG5cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0dGhpcy5fdmlldyA9IG5ldyBWaWV3KG5ldyBEZWZhdWx0UmVuZGVyZXIoKSk7XG5cdFx0dGhpcy5fdmlldy5iYWNrZ3JvdW5kQ29sb3IgPSAweDIyMjIyMjtcblxuXHRcdHRoaXMuX2N1YmUgPSBuZXcgUHJpbWl0aXZlQ3ViZVByZWZhYig0MDAsIDQwMCwgNDAwKTtcblx0XHR0aGlzLl9jdWJlLmdlb21ldHJ5VHlwZSA9IFwibGluZVN1Ykdlb21ldHJ5XCI7XG5cdFx0dGhpcy5fbWVzaCA9IDxNZXNoPiB0aGlzLl9jdWJlLmdldE5ld09iamVjdCgpO1xuXHRcdHRoaXMuX3ZpZXcuc2NlbmUuYWRkQ2hpbGQodGhpcy5fbWVzaCk7XG5cblx0XHR0aGlzLl9ob3ZlckNvbnRyb2wgPSBuZXcgSG92ZXJDb250cm9sbGVyKHRoaXMuX3ZpZXcuY2FtZXJhLCB0aGlzLl9tZXNoLCAxNTAsIDEwKTtcblxuXHRcdHdpbmRvdy5vbnJlc2l6ZSAgPSAoZXZlbnQ6VUlFdmVudCkgPT4gdGhpcy5vblJlc2l6ZShldmVudCk7XG5cblx0XHRkb2N1bWVudC5vbm1vdXNlZG93biA9IChldmVudDpNb3VzZUV2ZW50KSA9PiB0aGlzLm9uTW91c2VEb3duKGV2ZW50KTtcblx0XHRkb2N1bWVudC5vbm1vdXNldXAgPSAoZXZlbnQ6TW91c2VFdmVudCkgPT4gdGhpcy5vbk1vdXNlVXAoZXZlbnQpO1xuXHRcdGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gKGV2ZW50Ok1vdXNlRXZlbnQpID0+IHRoaXMub25Nb3VzZU1vdmUoZXZlbnQpO1xuXG5cblx0XHR0aGlzLm9uUmVzaXplKCk7XG5cblx0XHR0aGlzLl90aW1lciA9IG5ldyBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXIgLCB0aGlzKTtcblx0XHR0aGlzLl90aW1lci5zdGFydCgpO1xuXHR9XG5cblx0cHJpdmF0ZSBvblJlc2l6ZShldmVudDpVSUV2ZW50ID0gbnVsbClcblx0e1xuXHRcdHRoaXMuX3ZpZXcueSA9IDA7XG5cdFx0dGhpcy5fdmlldy54ID0gMDtcblx0XHR0aGlzLl92aWV3LndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy5fdmlldy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdH1cblxuXHRwcml2YXRlIHJlbmRlcihkdDpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl92aWV3LnJlbmRlcigpO1xuXHR9XG5cblx0cHJpdmF0ZSBvbk1vdXNlVXAoZXZlbnQ6TW91c2VFdmVudClcblx0e1xuXHRcdHRoaXMuX21vdmUgPSBmYWxzZTtcblx0fVxuXG5cdHByaXZhdGUgb25Nb3VzZU1vdmUoZXZlbnQ6TW91c2VFdmVudClcblx0e1xuXHRcdGlmICh0aGlzLl9tb3ZlKSB7XG5cdFx0XHR0aGlzLl9ob3ZlckNvbnRyb2wucGFuQW5nbGUgPSAwLjMqKGV2ZW50LmNsaWVudFggLSB0aGlzLl9sYXN0TW91c2VYKSArIHRoaXMuX2xhc3RQYW5BbmdsZTtcblx0XHRcdHRoaXMuX2hvdmVyQ29udHJvbC50aWx0QW5nbGUgPSAwLjMqKGV2ZW50LmNsaWVudFkgLSB0aGlzLl9sYXN0TW91c2VZKSArIHRoaXMuX2xhc3RUaWx0QW5nbGU7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBvbk1vdXNlRG93bihldmVudDpNb3VzZUV2ZW50KVxuXHR7XG5cdFx0dGhpcy5fbGFzdFBhbkFuZ2xlID0gdGhpcy5faG92ZXJDb250cm9sLnBhbkFuZ2xlO1xuXHRcdHRoaXMuX2xhc3RUaWx0QW5nbGUgPSB0aGlzLl9ob3ZlckNvbnRyb2wudGlsdEFuZ2xlO1xuXHRcdHRoaXMuX2xhc3RNb3VzZVggPSBldmVudC5jbGllbnRYO1xuXHRcdHRoaXMuX2xhc3RNb3VzZVkgPSBldmVudC5jbGllbnRZO1xuXHRcdHRoaXMuX21vdmUgPSB0cnVlO1xuXHR9XG59Il19