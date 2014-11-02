var BitmapData = require("awayjs-core/lib/base/BitmapData");
var AssetLibrary = require("awayjs-core/lib/library/AssetLibrary");
var AssetType = require("awayjs-core/lib/library/AssetType");
var URLRequest = require("awayjs-core/lib/net/URLRequest");
var LoaderEvent = require("awayjs-core/lib/events/LoaderEvent");
var BitmapTexture = require("awayjs-core/lib/textures/BitmapTexture");
var RequestAnimationFrame = require("awayjs-core/lib/utils/RequestAnimationFrame");
var View = require("awayjs-display/lib/containers/View");
var PrimitivePlanePrefab = require("awayjs-display/lib/prefabs/PrimitivePlanePrefab");
var DefaultRenderer = require("awayjs-renderergl/lib/render/DefaultRenderer");
var TriangleMethodMaterial = require("awayjs-renderergl/lib/materials/TriangleMethodMaterial");
var BitmapDataReflectionTest = (function () {
    function BitmapDataReflectionTest() {
        var _this = this;
        this.view = new View(new DefaultRenderer());
        this.raf = new RequestAnimationFrame(this.render, this);
        var token = AssetLibrary.load(new URLRequest('assets/dots.png'));
        token.addEventListener(LoaderEvent.RESOURCE_COMPLETE, function (event) { return _this.onResourceComplete(event); });
        window.onresize = function (event) { return _this.onResize(event); };
    }
    BitmapDataReflectionTest.prototype.onResourceComplete = function (event) {
        var loader = event.target;
        var l = loader.baseDependency.assets.length;
        for (var c = 0; c < l; c++) {
            var asset = loader.baseDependency.assets[c];
            switch (asset.assetType) {
                case AssetType.TEXTURE:
                    var prefab = new PrimitivePlanePrefab(500, 500, 1, 1, false);
                    var tx = asset;
                    var bitmap = new BitmapData(1024, 1024, true, 0x00000000);
                    bitmap.context.translate(0, 1024);
                    bitmap.context.scale(1, -1);
                    bitmap.context.drawImage(tx.htmlImageElement, 0, 0, 1024, 1024);
                    var gradient = bitmap.context.createLinearGradient(0, 0, 0, 1024);
                    gradient.addColorStop(0.8, "rgba(255, 255, 255, 1.0)");
                    gradient.addColorStop(1, "rgba(255, 255, 255, 0.5)");
                    bitmap.context.fillStyle = gradient;
                    bitmap.context.rect(0, 0, 1024, 1024);
                    bitmap.context.globalCompositeOperation = "destination-out";
                    bitmap.context.fill();
                    var bitmapClone = new BitmapData(1024, 1024, true, 0x00000000);
                    bitmapClone.copyPixels(bitmap, bitmapClone.rect, bitmapClone.rect);
                    document.body.appendChild(bitmap.canvas);
                    var bmpTX = new BitmapTexture(bitmapClone, false);
                    var material = new TriangleMethodMaterial(bmpTX);
                    material.bothSides = true;
                    material.alphaBlending = true;
                    var material2 = new TriangleMethodMaterial(tx);
                    material2.bothSides = true;
                    material2.alphaBlending = true;
                    this.reflectionMesh = prefab.getNewObject();
                    this.reflectionMesh.material = material;
                    this.view.scene.addChild(this.reflectionMesh);
                    this.fullmesh = prefab.getNewObject();
                    this.fullmesh.material = material2;
                    this.fullmesh.rotationY = 90;
                    this.view.scene.addChild(this.fullmesh);
                    break;
            }
        }
        this.raf.start();
        this.onResize();
    };
    BitmapDataReflectionTest.prototype.onResize = function (event) {
        if (event === void 0) { event = null; }
        this.view.x = window.innerWidth / 2;
        this.view.width = window.innerWidth / 2;
        this.view.height = window.innerHeight;
    };
    BitmapDataReflectionTest.prototype.render = function () {
        this.fullmesh.rotationY += .5;
        this.reflectionMesh.rotationY += .5;
        this.view.render();
    };
    return BitmapDataReflectionTest;
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXkvYml0bWFwZGF0YXJlZmxlY3Rpb250ZXN0LnRzIl0sIm5hbWVzIjpbIkJpdG1hcERhdGFSZWZsZWN0aW9uVGVzdCIsIkJpdG1hcERhdGFSZWZsZWN0aW9uVGVzdC5jb25zdHJ1Y3RvciIsIkJpdG1hcERhdGFSZWZsZWN0aW9uVGVzdC5vblJlc291cmNlQ29tcGxldGUiLCJCaXRtYXBEYXRhUmVmbGVjdGlvblRlc3Qub25SZXNpemUiLCJCaXRtYXBEYXRhUmVmbGVjdGlvblRlc3QucmVuZGVyIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLFVBQVUsV0FBZSxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ25FLElBQU8sWUFBWSxXQUFlLHNDQUFzQyxDQUFDLENBQUM7QUFHMUUsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUVwRSxJQUFPLFVBQVUsV0FBZSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQ2xFLElBQU8sV0FBVyxXQUFlLG9DQUFvQyxDQUFDLENBQUM7QUFDdkUsSUFBTyxhQUFhLFdBQWMsd0NBQXdDLENBQUMsQ0FBQztBQUU1RSxJQUFPLHFCQUFxQixXQUFZLDZDQUE2QyxDQUFDLENBQUM7QUFFdkYsSUFBTyxJQUFJLFdBQWlCLG9DQUFvQyxDQUFDLENBQUM7QUFFbEUsSUFBTyxvQkFBb0IsV0FBYSxpREFBaUQsQ0FBQyxDQUFDO0FBRTNGLElBQU8sZUFBZSxXQUFjLDhDQUE4QyxDQUFDLENBQUM7QUFDcEYsSUFBTyxzQkFBc0IsV0FBWSx3REFBd0QsQ0FBQyxDQUFDO0FBRW5HLElBQU0sd0JBQXdCO0lBTzdCQSxTQVBLQSx3QkFBd0JBO1FBQTlCQyxpQkE2RkNBO1FBcEZDQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxJQUFJQSxlQUFlQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUM1Q0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEscUJBQXFCQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxJ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QSxDQUFDQTtJQUNGSiwrQkFBQ0E7QUFBREEsQ0E3RkEsQUE2RkNBLElBQUEiLCJmaWxlIjoiZGlzcGxheS9CaXRtYXBEYXRhUmVmbGVjdGlvblRlc3QuanMiLCJzb3VyY2VSb290IjoiLi90ZXN0cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCaXRtYXBEYXRhXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9iYXNlL0JpdG1hcERhdGFcIik7XG5pbXBvcnQgQXNzZXRMaWJyYXJ5XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TGlicmFyeVwiKTtcbmltcG9ydCBBc3NldExvYWRlclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldExvYWRlclwiKTtcbmltcG9ydCBBc3NldExvYWRlclRva2VuXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldExvYWRlclRva2VuXCIpO1xuaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IFVSTFJlcXVlc3RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxSZXF1ZXN0XCIpO1xuaW1wb3J0IExvYWRlckV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvTG9hZGVyRXZlbnRcIik7XG5pbXBvcnQgQml0bWFwVGV4dHVyZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL0JpdG1hcFRleHR1cmVcIik7XG5pbXBvcnQgSW1hZ2VUZXh0dXJlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9JbWFnZVRleHR1cmVcIik7XG5pbXBvcnQgUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi91dGlscy9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIik7XG5cbmltcG9ydCBWaWV3XHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9WaWV3XCIpO1xuaW1wb3J0IE1lc2hcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoXCIpO1xuaW1wb3J0IFByaW1pdGl2ZVBsYW5lUHJlZmFiXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3ByZWZhYnMvUHJpbWl0aXZlUGxhbmVQcmVmYWJcIik7XG5cbmltcG9ydCBEZWZhdWx0UmVuZGVyZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9yZW5kZXIvRGVmYXVsdFJlbmRlcmVyXCIpO1xuaW1wb3J0IFRyaWFuZ2xlTWV0aG9kTWF0ZXJpYWxcdFx0PSByZXF1aXJlKFwiYXdheWpzLXJlbmRlcmVyZ2wvbGliL21hdGVyaWFscy9UcmlhbmdsZU1ldGhvZE1hdGVyaWFsXCIpO1xuXG5jbGFzcyBCaXRtYXBEYXRhUmVmbGVjdGlvblRlc3Rcbntcblx0cHJpdmF0ZSB2aWV3OlZpZXc7XG5cdHByaXZhdGUgcmFmOlJlcXVlc3RBbmltYXRpb25GcmFtZTtcblx0cHJpdmF0ZSByZWZsZWN0aW9uTWVzaDpNZXNoO1xuXHRwcml2YXRlIGZ1bGxtZXNoOk1lc2g7XG5cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0dGhpcy52aWV3ID0gbmV3IFZpZXcobmV3IERlZmF1bHRSZW5kZXJlcigpKTtcblx0XHR0aGlzLnJhZiA9IG5ldyBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXIsIHRoaXMpO1xuXG5cdFx0dmFyIHRva2VuOkFzc2V0TG9hZGVyVG9rZW4gPSBBc3NldExpYnJhcnkubG9hZCggbmV3IFVSTFJlcXVlc3QoJ2Fzc2V0cy9kb3RzLnBuZycpKTtcblx0XHR0b2tlbi5hZGRFdmVudExpc3RlbmVyKExvYWRlckV2ZW50LlJFU09VUkNFX0NPTVBMRVRFLCAoZXZlbnQ6TG9hZGVyRXZlbnQpID0+IHRoaXMub25SZXNvdXJjZUNvbXBsZXRlKGV2ZW50KSk7XG5cblx0XHR3aW5kb3cub25yZXNpemUgPSAoZXZlbnQ6VUlFdmVudCkgPT4gdGhpcy5vblJlc2l6ZShldmVudCk7XG5cdH1cblxuXHRwcml2YXRlIG9uUmVzb3VyY2VDb21wbGV0ZShldmVudDpMb2FkZXJFdmVudClcblx0e1xuXHRcdHZhciBsb2FkZXI6QXNzZXRMb2FkZXIgICA9IDxBc3NldExvYWRlcj4gZXZlbnQudGFyZ2V0O1xuXHRcdHZhciBsOm51bWJlciA9IGxvYWRlci5iYXNlRGVwZW5kZW5jeS5hc3NldHMubGVuZ3RoO1xuXG5cdFx0Zm9yICh2YXIgYzpudW1iZXIgPSAwOyBjIDwgbDsgYysrKSB7XG5cblx0XHRcdHZhciBhc3NldDpJQXNzZXQgPSBsb2FkZXIuYmFzZURlcGVuZGVuY3kuYXNzZXRzW2NdO1xuXG5cdFx0XHRzd2l0Y2ggKGFzc2V0LmFzc2V0VHlwZSkge1xuXHRcdFx0XHRjYXNlIEFzc2V0VHlwZS5URVhUVVJFOlxuXG5cdFx0XHRcdFx0dmFyIHByZWZhYjpQcmltaXRpdmVQbGFuZVByZWZhYiA9IG5ldyBQcmltaXRpdmVQbGFuZVByZWZhYig1MDAgLCA1MDAsIDEsIDEsIGZhbHNlKTtcblx0XHRcdFx0XHR2YXIgdHg6SW1hZ2VUZXh0dXJlID0gPEltYWdlVGV4dHVyZT4gYXNzZXQ7XG5cdFx0XHRcdFx0dmFyIGJpdG1hcDpCaXRtYXBEYXRhID0gbmV3IEJpdG1hcERhdGEoMTAyNCwgMTAyNCwgdHJ1ZSwgMHgwMDAwMDAwMCk7XG5cblx0XHRcdFx0XHRiaXRtYXAuY29udGV4dC50cmFuc2xhdGUoMCwgMTAyNCk7XG5cdFx0XHRcdFx0Yml0bWFwLmNvbnRleHQuc2NhbGUoMSwgLTEpO1xuXHRcdFx0XHRcdGJpdG1hcC5jb250ZXh0LmRyYXdJbWFnZSh0eC5odG1sSW1hZ2VFbGVtZW50LCAwLCAwLCAxMDI0LCAxMDI0KTtcblxuXHRcdFx0XHRcdHZhciBncmFkaWVudCA9IGJpdG1hcC5jb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDAsIDEwMjQpO1xuXHRcdFx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjgsIFwicmdiYSgyNTUsIDI1NSwgMjU1LCAxLjApXCIpO1xuXHRcdFx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KVwiKTtcblxuXHRcdFx0XHRcdGJpdG1hcC5jb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuXHRcdFx0XHRcdGJpdG1hcC5jb250ZXh0LnJlY3QoMCwgMCwgMTAyNCwgMTAyNCk7XG5cdFx0XHRcdFx0Yml0bWFwLmNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1vdXRcIjtcblx0XHRcdFx0XHRiaXRtYXAuY29udGV4dC5maWxsKCk7XG5cblx0XHRcdFx0XHR2YXIgYml0bWFwQ2xvbmU6Qml0bWFwRGF0YSA9IG5ldyBCaXRtYXBEYXRhKDEwMjQsIDEwMjQsIHRydWUsIDB4MDAwMDAwMDApO1xuXHRcdFx0XHRcdGJpdG1hcENsb25lLmNvcHlQaXhlbHMoYml0bWFwLCBiaXRtYXBDbG9uZS5yZWN0LCBiaXRtYXBDbG9uZS5yZWN0KTtcblxuXHRcdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYml0bWFwLmNhbnZhcyk7XG5cblx0XHRcdFx0XHR2YXIgYm1wVFg6Qml0bWFwVGV4dHVyZSA9IG5ldyBCaXRtYXBUZXh0dXJlKGJpdG1hcENsb25lLCBmYWxzZSk7XG5cblx0XHRcdFx0XHR2YXIgbWF0ZXJpYWw6VHJpYW5nbGVNZXRob2RNYXRlcmlhbCA9IG5ldyBUcmlhbmdsZU1ldGhvZE1hdGVyaWFsKGJtcFRYKTtcblx0XHRcdFx0XHRtYXRlcmlhbC5ib3RoU2lkZXMgPSB0cnVlO1xuXHRcdFx0XHRcdG1hdGVyaWFsLmFscGhhQmxlbmRpbmcgPSB0cnVlO1xuXG5cdFx0XHRcdFx0dmFyIG1hdGVyaWFsMjpUcmlhbmdsZU1ldGhvZE1hdGVyaWFsID0gbmV3IFRyaWFuZ2xlTWV0aG9kTWF0ZXJpYWwodHgpO1xuXHRcdFx0XHRcdG1hdGVyaWFsMi5ib3RoU2lkZXMgPSB0cnVlO1xuXHRcdFx0XHRcdG1hdGVyaWFsMi5hbHBoYUJsZW5kaW5nID0gdHJ1ZTtcblxuXHRcdFx0XHRcdHRoaXMucmVmbGVjdGlvbk1lc2ggPSA8TWVzaD4gcHJlZmFiLmdldE5ld09iamVjdCgpO1xuXHRcdFx0XHRcdHRoaXMucmVmbGVjdGlvbk1lc2gubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblx0XHRcdFx0XHR0aGlzLnZpZXcuc2NlbmUuYWRkQ2hpbGQodGhpcy5yZWZsZWN0aW9uTWVzaCk7XG5cblx0XHRcdFx0XHR0aGlzLmZ1bGxtZXNoID0gPE1lc2g+IHByZWZhYi5nZXROZXdPYmplY3QoKTtcblx0XHRcdFx0XHR0aGlzLmZ1bGxtZXNoLm1hdGVyaWFsID0gbWF0ZXJpYWwyO1xuXHRcdFx0XHRcdHRoaXMuZnVsbG1lc2gucm90YXRpb25ZID0gOTA7XG5cdFx0XHRcdFx0dGhpcy52aWV3LnNjZW5lLmFkZENoaWxkKHRoaXMuZnVsbG1lc2gpO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5yYWYuc3RhcnQoKTtcblx0XHR0aGlzLm9uUmVzaXplKCk7XG5cdH1cblxuXHRwcml2YXRlIG9uUmVzaXplKGV2ZW50OlVJRXZlbnQgPSBudWxsKVxuXHR7XG5cdFx0dGhpcy52aWV3LnggPSB3aW5kb3cuaW5uZXJXaWR0aC8yO1xuXHRcdHRoaXMudmlldy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLzI7XG5cdFx0dGhpcy52aWV3LmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0fVxuXG5cdHByaXZhdGUgcmVuZGVyKClcblx0e1xuXHRcdHRoaXMuZnVsbG1lc2gucm90YXRpb25ZICs9LjU7XG5cdFx0dGhpcy5yZWZsZWN0aW9uTWVzaC5yb3RhdGlvblkgKz0uNTtcblxuXHRcdHRoaXMudmlldy5yZW5kZXIoKTtcblx0fVxufSJdfQ==