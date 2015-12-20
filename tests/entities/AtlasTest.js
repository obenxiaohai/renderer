var BitmapImage2D = require("awayjs-core/lib/image/BitmapImage2D");
var Sampler2D = require("awayjs-core/lib/image/Sampler2D");
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var AssetLibrary = require("awayjs-core/lib/library/AssetLibrary");
var URLRequest = require("awayjs-core/lib/net/URLRequest");
var LoaderEvent = require("awayjs-core/lib/events/LoaderEvent");
var RequestAnimationFrame = require("awayjs-core/lib/utils/RequestAnimationFrame");
var View = require("awayjs-display/lib/containers/View");
var HoverController = require("awayjs-display/lib/controllers/HoverController");
var AlignmentMode = require("awayjs-display/lib/base/AlignmentMode");
var OrientationMode = require("awayjs-display/lib/base/OrientationMode");
var Billboard = require("awayjs-display/lib/entities/Billboard");
var BasicMaterial = require("awayjs-display/lib/materials/BasicMaterial");
var Single2DTexture = require("awayjs-display/lib/textures/Single2DTexture");
var DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
var AtlasTest = (function () {
    /**
     * Constructor
     */
    function AtlasTest() {
        this._samplers = new Array();
        this._time = 0;
        this._move = false;
        this.init();
    }
    /**
     * Global initialise function
     */
    AtlasTest.prototype.init = function () {
        this.initEngine();
        this.initListeners();
        this.loadTexture();
    };
    /**
     * Initialise the engine
     */
    AtlasTest.prototype.initEngine = function () {
        this._view = new View(new DefaultRenderer());
        //setup the camera for optimal shadow rendering
        this._view.camera.projection.far = 2100;
        //setup controller to be used on the camera
        this._cameraController = new HoverController(this._view.camera, null, 45, 20, 1000, 10);
    };
    /**
     * Initialise the listeners
     */
    AtlasTest.prototype.initListeners = function () {
        var _this = this;
        document.onmousedown = function (event) { return _this.onMouseDown(event); };
        document.onmouseup = function (event) { return _this.onMouseUp(event); };
        document.onmousemove = function (event) { return _this.onMouseMove(event); };
        window.onresize = function (event) { return _this.onResize(event); };
        this.onResize();
        this._timer = new RequestAnimationFrame(this.onEnterFrame, this);
        this._timer.start();
    };
    /**
     * start loading our texture
     */
    AtlasTest.prototype.loadTexture = function () {
        var _this = this;
        AssetLibrary.addEventListener(LoaderEvent.LOAD_COMPLETE, function (event) { return _this.onLoadComplete(event); });
        AssetLibrary.load(new URLRequest("assets/atlas.xml"));
    };
    /**
     * Navigation and render loop
     */
    AtlasTest.prototype.onEnterFrame = function (dt) {
        this._time += dt;
        this._view.render();
    };
    /**
     * Listener function for load complete event on asset library
     */
    AtlasTest.prototype.onLoadComplete = function (event) {
        var assets = event.assets;
        var length = assets.length;
        for (var c = 0; c < length; c++) {
            var asset = assets[c];
            switch (event.url) {
                case "assets/atlas.xml":
                    if (asset.isAsset(BitmapImage2D)) {
                        this._material = new BasicMaterial(new Single2DTexture(asset));
                        this._material.alphaBlending = true;
                        this._material.imageRect = true;
                    }
                    else if (asset.isAsset(Sampler2D)) {
                        this._samplers.push(asset);
                    }
            }
        }
        var len = this._samplers.length;
        for (var i = 0; i < len; i++) {
            //var size:number = this.getRandom(50 , 500);
            var s = new Billboard(this._material);
            s.addSamplerAt(this._samplers[i], 0);
            s.pivot = new Vector3D(s.width / 2, s.height / 2, 0);
            //s.width = size;
            //s.height = size;
            s.orientationMode = OrientationMode.CAMERA_PLANE;
            s.alignmentMode = AlignmentMode.PIVOT_POINT;
            s.x = this.getRandom(-400, 400);
            s.y = this.getRandom(-400, 400);
            s.z = this.getRandom(-400, 400);
            this._view.scene.addChild(s);
        }
        this._timer.start();
    };
    /**
     * Mouse down listener for navigation
     */
    AtlasTest.prototype.onMouseDown = function (event) {
        this._lastPanAngle = this._cameraController.panAngle;
        this._lastTiltAngle = this._cameraController.tiltAngle;
        this._lastMouseX = event.clientX;
        this._lastMouseY = event.clientY;
        this._move = true;
    };
    /**
     * Mouse up listener for navigation
     */
    AtlasTest.prototype.onMouseUp = function (event) {
        this._move = false;
    };
    /**
     *
     * @param event
     */
    AtlasTest.prototype.onMouseMove = function (event) {
        if (this._move) {
            this._cameraController.panAngle = 0.3 * (event.clientX - this._lastMouseX) + this._lastPanAngle;
            this._cameraController.tiltAngle = 0.3 * (event.clientY - this._lastMouseY) + this._lastTiltAngle;
        }
    };
    /**
     * stage listener for resize events
     */
    AtlasTest.prototype.onResize = function (event) {
        if (event === void 0) { event = null; }
        this._view.y = 0;
        this._view.x = 0;
        this._view.width = window.innerWidth;
        this._view.height = window.innerHeight;
    };
    /**
     * Util function - getRandom Number
     */
    AtlasTest.prototype.getRandom = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    return AtlasTest;
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL0F0bGFzVGVzdC50cyJdLCJuYW1lcyI6WyJBdGxhc1Rlc3QiLCJBdGxhc1Rlc3QuY29uc3RydWN0b3IiLCJBdGxhc1Rlc3QuaW5pdCIsIkF0bGFzVGVzdC5pbml0RW5naW5lIiwiQXRsYXNUZXN0LmluaXRMaXN0ZW5lcnMiLCJBdGxhc1Rlc3QubG9hZFRleHR1cmUiLCJBdGxhc1Rlc3Qub25FbnRlckZyYW1lIiwiQXRsYXNUZXN0Lm9uTG9hZENvbXBsZXRlIiwiQXRsYXNUZXN0Lm9uTW91c2VEb3duIiwiQXRsYXNUZXN0Lm9uTW91c2VVcCIsIkF0bGFzVGVzdC5vbk1vdXNlTW92ZSIsIkF0bGFzVGVzdC5vblJlc2l6ZSIsIkF0bGFzVGVzdC5nZXRSYW5kb20iXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sYUFBYSxXQUFjLHFDQUFxQyxDQUFDLENBQUM7QUFDekUsSUFBTyxTQUFTLFdBQWUsaUNBQWlDLENBQUMsQ0FBQztBQUNsRSxJQUFPLFFBQVEsV0FBZ0IsK0JBQStCLENBQUMsQ0FBQztBQUNoRSxJQUFPLFlBQVksV0FBZSxzQ0FBc0MsQ0FBQyxDQUFDO0FBRzFFLElBQU8sVUFBVSxXQUFlLGdDQUFnQyxDQUFDLENBQUM7QUFDbEUsSUFBTyxXQUFXLFdBQWUsb0NBQW9DLENBQUMsQ0FBQztBQUN2RSxJQUFPLHFCQUFxQixXQUFZLDZDQUE2QyxDQUFDLENBQUM7QUFFdkYsSUFBTyxJQUFJLFdBQWlCLG9DQUFvQyxDQUFDLENBQUM7QUFDbEUsSUFBTyxlQUFlLFdBQWMsZ0RBQWdELENBQUMsQ0FBQztBQUN0RixJQUFPLGFBQWEsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBQzNFLElBQU8sZUFBZSxXQUFjLHlDQUF5QyxDQUFDLENBQUM7QUFDL0UsSUFBTyxTQUFTLFdBQWUsdUNBQXVDLENBQUMsQ0FBQztBQUV4RSxJQUFPLGFBQWEsV0FBYyw0Q0FBNEMsQ0FBQyxDQUFDO0FBQ2hGLElBQU8sZUFBZSxXQUFjLDZDQUE2QyxDQUFDLENBQUM7QUFF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QSxXQUFXQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtZQUM5RkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxTQUFTQSxHQUFHQSxHQUFHQSxHQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtRQUNqR0EsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFFRFY7O09BRUdBO0lBQ0tBLDRCQUFRQSxHQUFoQkEsVUFBaUJBLEtBQW9CQTtRQUFwQlcscUJBQW9CQSxHQUFwQkEsWUFBb0JBO1FBRXBDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNqQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEdBQUdBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBO1FBQ3JDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQTtJQUN4Q0EsQ0FBQ0E7SUFFRFg7O09BRUdBO0lBQ0tBLDZCQUFTQSxHQUFqQkEsVUFBa0JBLEdBQVVBLEVBQUVBLEdBQVVBO1FBRXZDWSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxHQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtJQUN4Q0EsQ0FBQ0E7SUFDRlosZ0JBQUNBO0FBQURBLENBckxBLEFBcUxDQSxJQUFBIiwiZmlsZSI6ImVudGl0aWVzL0F0bGFzVGVzdC5qcyIsInNvdXJjZVJvb3QiOiIuL3Rlc3RzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJpdG1hcEltYWdlMkRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9pbWFnZS9CaXRtYXBJbWFnZTJEXCIpO1xuaW1wb3J0IFNhbXBsZXIyRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvaW1hZ2UvU2FtcGxlcjJEXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgQXNzZXRMaWJyYXJ5XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TGlicmFyeVwiKTtcbmltcG9ydCBJQXNzZXRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRcIik7XG5pbXBvcnQgVVJMTG9hZGVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9uZXQvVVJMTG9hZGVyXCIpO1xuaW1wb3J0IFVSTFJlcXVlc3RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxSZXF1ZXN0XCIpO1xuaW1wb3J0IExvYWRlckV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvTG9hZGVyRXZlbnRcIik7XG5pbXBvcnQgUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi91dGlscy9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIik7XG5cbmltcG9ydCBWaWV3XHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9WaWV3XCIpO1xuaW1wb3J0IEhvdmVyQ29udHJvbGxlclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRyb2xsZXJzL0hvdmVyQ29udHJvbGxlclwiKTtcbmltcG9ydCBBbGlnbm1lbnRNb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9BbGlnbm1lbnRNb2RlXCIpO1xuaW1wb3J0IE9yaWVudGF0aW9uTW9kZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvT3JpZW50YXRpb25Nb2RlXCIpO1xuaW1wb3J0IEJpbGxib2FyZFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQmlsbGJvYXJkXCIpO1xuaW1wb3J0IE1lc2hcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoXCIpO1xuaW1wb3J0IEJhc2ljTWF0ZXJpYWxcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvQmFzaWNNYXRlcmlhbFwiKTtcbmltcG9ydCBTaW5nbGUyRFRleHR1cmVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0dXJlcy9TaW5nbGUyRFRleHR1cmVcIik7XG5cbmltcG9ydCBEZWZhdWx0UmVuZGVyZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9EZWZhdWx0UmVuZGVyZXJcIik7XG5cbmNsYXNzIEF0bGFzVGVzdFxue1xuXHQvL2VuZ2luZSB2YXJpYWJsZXNcblx0cHJpdmF0ZSBfdmlldzpWaWV3O1xuXHRwcml2YXRlIF9jYW1lcmFDb250cm9sbGVyOkhvdmVyQ29udHJvbGxlcjtcblxuXHQvL3NjZW5lIHZhcmlhYmxlc1xuXHRwcml2YXRlIF9tYXRlcmlhbDpCYXNpY01hdGVyaWFsO1xuXHRwcml2YXRlIF9zYW1wbGVyczpBcnJheTxTYW1wbGVyMkQ+ID0gbmV3IEFycmF5PFNhbXBsZXIyRD4oKTtcblxuXHQvL25hdmlnYXRpb24gdmFyaWFibGVzXG5cdHByaXZhdGUgX3RpbWVyOlJlcXVlc3RBbmltYXRpb25GcmFtZTtcblx0cHJpdmF0ZSBfdGltZTpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9tb3ZlOmJvb2xlYW4gPSBmYWxzZTtcblx0cHJpdmF0ZSBfbGFzdFBhbkFuZ2xlOm51bWJlcjtcblx0cHJpdmF0ZSBfbGFzdFRpbHRBbmdsZTpudW1iZXI7XG5cdHByaXZhdGUgX2xhc3RNb3VzZVg6bnVtYmVyO1xuXHRwcml2YXRlIF9sYXN0TW91c2VZOm51bWJlcjtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdsb2JhbCBpbml0aWFsaXNlIGZ1bmN0aW9uXG5cdCAqL1xuXHRwcml2YXRlIGluaXQoKTp2b2lkXG5cdHtcblx0XHR0aGlzLmluaXRFbmdpbmUoKTtcblx0XHR0aGlzLmluaXRMaXN0ZW5lcnMoKTtcblx0XHR0aGlzLmxvYWRUZXh0dXJlKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGlzZSB0aGUgZW5naW5lXG5cdCAqL1xuXHRwcml2YXRlIGluaXRFbmdpbmUoKTp2b2lkXG5cdHtcblx0XHR0aGlzLl92aWV3ID0gbmV3IFZpZXcobmV3IERlZmF1bHRSZW5kZXJlcigpKTtcblxuXHRcdC8vc2V0dXAgdGhlIGNhbWVyYSBmb3Igb3B0aW1hbCBzaGFkb3cgcmVuZGVyaW5nXG5cdFx0dGhpcy5fdmlldy5jYW1lcmEucHJvamVjdGlvbi5mYXIgPSAyMTAwO1xuXG5cdFx0Ly9zZXR1cCBjb250cm9sbGVyIHRvIGJlIHVzZWQgb24gdGhlIGNhbWVyYVxuXHRcdHRoaXMuX2NhbWVyYUNvbnRyb2xsZXIgPSBuZXcgSG92ZXJDb250cm9sbGVyKHRoaXMuX3ZpZXcuY2FtZXJhLCBudWxsLCA0NSwgMjAsIDEwMDAsIDEwKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIHRoZSBsaXN0ZW5lcnNcblx0ICovXG5cdHByaXZhdGUgaW5pdExpc3RlbmVycygpOnZvaWRcblx0e1xuXHRcdGRvY3VtZW50Lm9ubW91c2Vkb3duID0gKGV2ZW50Ok1vdXNlRXZlbnQpID0+IHRoaXMub25Nb3VzZURvd24oZXZlbnQpO1xuXHRcdGRvY3VtZW50Lm9ubW91c2V1cCA9IChldmVudDpNb3VzZUV2ZW50KSA9PiB0aGlzLm9uTW91c2VVcChldmVudCk7XG5cdFx0ZG9jdW1lbnQub25tb3VzZW1vdmUgPSAoZXZlbnQ6TW91c2VFdmVudCkgPT4gdGhpcy5vbk1vdXNlTW92ZShldmVudCk7XG5cblx0XHR3aW5kb3cub25yZXNpemUgID0gKGV2ZW50OlVJRXZlbnQpID0+IHRoaXMub25SZXNpemUoZXZlbnQpO1xuXG5cdFx0dGhpcy5vblJlc2l6ZSgpO1xuXG5cdFx0dGhpcy5fdGltZXIgPSBuZXcgUmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMub25FbnRlckZyYW1lLCB0aGlzKTtcblx0XHR0aGlzLl90aW1lci5zdGFydCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIHN0YXJ0IGxvYWRpbmcgb3VyIHRleHR1cmVcblx0ICovXG5cdHByaXZhdGUgbG9hZFRleHR1cmUoKTp2b2lkXG5cdHtcblx0XHRBc3NldExpYnJhcnkuYWRkRXZlbnRMaXN0ZW5lcihMb2FkZXJFdmVudC5MT0FEX0NPTVBMRVRFLCAoZXZlbnQ6TG9hZGVyRXZlbnQpID0+IHRoaXMub25Mb2FkQ29tcGxldGUoZXZlbnQpKTtcblx0XHRBc3NldExpYnJhcnkubG9hZChuZXcgVVJMUmVxdWVzdChcImFzc2V0cy9hdGxhcy54bWxcIikpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE5hdmlnYXRpb24gYW5kIHJlbmRlciBsb29wXG5cdCAqL1xuXHRwcml2YXRlIG9uRW50ZXJGcmFtZShkdDpudW1iZXIpOnZvaWRcblx0e1xuXHRcdHRoaXMuX3RpbWUgKz0gZHQ7XG5cblx0XHR0aGlzLl92aWV3LnJlbmRlcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIExpc3RlbmVyIGZ1bmN0aW9uIGZvciBsb2FkIGNvbXBsZXRlIGV2ZW50IG9uIGFzc2V0IGxpYnJhcnlcblx0ICovXG5cdHByaXZhdGUgb25Mb2FkQ29tcGxldGUoZXZlbnQ6TG9hZGVyRXZlbnQpXG5cdHtcblx0XHR2YXIgYXNzZXRzOkFycmF5PElBc3NldD4gPSBldmVudC5hc3NldHM7XG5cdFx0dmFyIGxlbmd0aDpudW1iZXIgPSBhc3NldHMubGVuZ3RoO1xuXG5cdFx0Zm9yICh2YXIgYzpudW1iZXIgPSAwOyBjIDwgbGVuZ3RoOyBjICsrKSB7XG5cdFx0XHR2YXIgYXNzZXQ6SUFzc2V0ID0gYXNzZXRzW2NdO1xuXG5cdFx0XHRzd2l0Y2goZXZlbnQudXJsKSB7XG5cblx0XHRcdFx0Y2FzZSBcImFzc2V0cy9hdGxhcy54bWxcIjpcblxuXHRcdFx0XHRcdGlmIChhc3NldC5pc0Fzc2V0KEJpdG1hcEltYWdlMkQpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9tYXRlcmlhbCA9IG5ldyBCYXNpY01hdGVyaWFsKG5ldyBTaW5nbGUyRFRleHR1cmUoPEJpdG1hcEltYWdlMkQ+IGFzc2V0KSk7XG5cdFx0XHRcdFx0XHR0aGlzLl9tYXRlcmlhbC5hbHBoYUJsZW5kaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHRoaXMuX21hdGVyaWFsLmltYWdlUmVjdCA9IHRydWU7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChhc3NldC5pc0Fzc2V0KFNhbXBsZXIyRCkpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3NhbXBsZXJzLnB1c2goPFNhbXBsZXIyRD4gYXNzZXQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3NhbXBsZXJzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0Ly92YXIgc2l6ZTpudW1iZXIgPSB0aGlzLmdldFJhbmRvbSg1MCAsIDUwMCk7XG5cdFx0XHR2YXIgczpCaWxsYm9hcmQgPSBuZXcgQmlsbGJvYXJkKHRoaXMuX21hdGVyaWFsKTtcblx0XHRcdHMuYWRkU2FtcGxlckF0KHRoaXMuX3NhbXBsZXJzW2ldLCAwKTtcblx0XHRcdHMucGl2b3QgPSBuZXcgVmVjdG9yM0Qocy53aWR0aC8yLCBzLmhlaWdodC8yLCAwKTtcblx0XHRcdC8vcy53aWR0aCA9IHNpemU7XG5cdFx0XHQvL3MuaGVpZ2h0ID0gc2l6ZTtcblx0XHRcdHMub3JpZW50YXRpb25Nb2RlID0gT3JpZW50YXRpb25Nb2RlLkNBTUVSQV9QTEFORTtcblx0XHRcdHMuYWxpZ25tZW50TW9kZSA9IEFsaWdubWVudE1vZGUuUElWT1RfUE9JTlQ7XG5cdFx0XHRzLnggPSAgdGhpcy5nZXRSYW5kb20oLTQwMCAsIDQwMCk7XG5cdFx0XHRzLnkgPSAgdGhpcy5nZXRSYW5kb20oLTQwMCAsIDQwMCk7XG5cdFx0XHRzLnogPSAgdGhpcy5nZXRSYW5kb20oLTQwMCAsIDQwMCk7XG5cdFx0XHR0aGlzLl92aWV3LnNjZW5lLmFkZENoaWxkKHMpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3RpbWVyLnN0YXJ0KCk7XG5cdH1cblxuXHQvKipcblx0ICogTW91c2UgZG93biBsaXN0ZW5lciBmb3IgbmF2aWdhdGlvblxuXHQgKi9cblx0cHJpdmF0ZSBvbk1vdXNlRG93bihldmVudDpNb3VzZUV2ZW50KTp2b2lkXG5cdHtcblx0XHR0aGlzLl9sYXN0UGFuQW5nbGUgPSB0aGlzLl9jYW1lcmFDb250cm9sbGVyLnBhbkFuZ2xlO1xuXHRcdHRoaXMuX2xhc3RUaWx0QW5nbGUgPSB0aGlzLl9jYW1lcmFDb250cm9sbGVyLnRpbHRBbmdsZTtcblx0XHR0aGlzLl9sYXN0TW91c2VYID0gZXZlbnQuY2xpZW50WDtcblx0XHR0aGlzLl9sYXN0TW91c2VZID0gZXZlbnQuY2xpZW50WTtcblx0XHR0aGlzLl9tb3ZlID0gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3VzZSB1cCBsaXN0ZW5lciBmb3IgbmF2aWdhdGlvblxuXHQgKi9cblx0cHJpdmF0ZSBvbk1vdXNlVXAoZXZlbnQ6TW91c2VFdmVudCk6dm9pZFxuXHR7XG5cdFx0dGhpcy5fbW92ZSA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBldmVudFxuXHQgKi9cblx0cHJpdmF0ZSBvbk1vdXNlTW92ZShldmVudDpNb3VzZUV2ZW50KVxuXHR7XG5cdFx0aWYgKHRoaXMuX21vdmUpIHtcblx0XHRcdHRoaXMuX2NhbWVyYUNvbnRyb2xsZXIucGFuQW5nbGUgPSAwLjMqKGV2ZW50LmNsaWVudFggLSB0aGlzLl9sYXN0TW91c2VYKSArIHRoaXMuX2xhc3RQYW5BbmdsZTtcblx0XHRcdHRoaXMuX2NhbWVyYUNvbnRyb2xsZXIudGlsdEFuZ2xlID0gMC4zKihldmVudC5jbGllbnRZIC0gdGhpcy5fbGFzdE1vdXNlWSkgKyB0aGlzLl9sYXN0VGlsdEFuZ2xlO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBzdGFnZSBsaXN0ZW5lciBmb3IgcmVzaXplIGV2ZW50c1xuXHQgKi9cblx0cHJpdmF0ZSBvblJlc2l6ZShldmVudDpVSUV2ZW50ID0gbnVsbCk6dm9pZFxuXHR7XG5cdFx0dGhpcy5fdmlldy55ID0gMDtcblx0XHR0aGlzLl92aWV3LnggPSAwO1xuXHRcdHRoaXMuX3ZpZXcud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHR0aGlzLl92aWV3LmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0fVxuXG5cdC8qKlxuXHQgKiBVdGlsIGZ1bmN0aW9uIC0gZ2V0UmFuZG9tIE51bWJlclxuXHQgKi9cblx0cHJpdmF0ZSBnZXRSYW5kb20obWluOm51bWJlciwgbWF4Om51bWJlcik6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gTWF0aC5yYW5kb20oKSoobWF4IC0gbWluKSArIG1pbjtcblx0fVxufSJdfQ==