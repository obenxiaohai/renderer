import BitmapImage2D				= require("awayjs-core/lib/data/BitmapImage2D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");
import AssetLibrary					= require("awayjs-core/lib/library/AssetLibrary");
import URLLoader					= require("awayjs-core/lib/net/URLLoader");
import URLRequest					= require("awayjs-core/lib/net/URLRequest");
import LoaderEvent					= require("awayjs-core/lib/events/LoaderEvent");
import CoordinateSystem				= require("awayjs-core/lib/projections/CoordinateSystem");
import PerspectiveProjection		= require("awayjs-core/lib/projections/PerspectiveProjection");
import RequestAnimationFrame		= require("awayjs-core/lib/utils/RequestAnimationFrame");

import View							= require("awayjs-display/lib/containers/View");
import HoverController				= require("awayjs-display/lib/controllers/HoverController");
import Billboard					= require("awayjs-display/lib/entities/Billboard");
import Mesh							= require("awayjs-display/lib/entities/Mesh");
import AwayMouseEvent				= require("awayjs-display/lib/events/MouseEvent");
import BasicMaterial				= require("awayjs-display/lib/materials/BasicMaterial");
import Single2DTexture				= require("awayjs-display/lib/textures/Single2DTexture");

import DefaultRenderer				= require("awayjs-renderergl/lib/DefaultRenderer");

class LayoutTest
{
	private _view:View;
	private _projection:PerspectiveProjection;
	private _timer:RequestAnimationFrame;
	private _hoverControl:HoverController;

	private _move:boolean = false;
	private _lastPanAngle:number;
	private _lastTiltAngle:number;
	private _lastMouseX:number;
	private _lastMouseY:number;

	private _texture:Single2DTexture;
	private _bitmapMaterial:BasicMaterial;
	private _billboards:Array<Billboard> = new Array<Billboard>();

	constructor()
	{
		//listen for a resource complete event
		AssetLibrary.addEventListener(LoaderEvent.RESOURCE_COMPLETE , (event:LoaderEvent) => this.onResourceComplete(event));

		//load an image
		AssetLibrary.load(new URLRequest('assets/256x256.png') );
	}

	/**
	 * Listener for resource complete event
	 *
	 * @param event
	 */
	private onResourceComplete(event:LoaderEvent)
	{
		//get the texture
		this._texture = new Single2DTexture(<BitmapImage2D> event.assets[0]);

		//create the view
		this._view = new View(new DefaultRenderer());

		this._projection = <PerspectiveProjection> this._view.camera.projection;


		this._projection.coordinateSystem = CoordinateSystem.RIGHT_HANDED;
		this._projection.focalLength = 1000;
		this._projection.preserveFocalLength = true;
		this._projection.originX = 0;
		this._projection.originY = 0;

		//create a bitmap material
		this._bitmapMaterial = new BasicMaterial(this._texture);

		var billboard:Billboard;
		var numHBillboards:number = 2;
		var numVBillboards:number = 2;
		for (var i:number = 0; i < numHBillboards; i++) {
			for (var j:number = 0; j < numVBillboards; j++) {
				billboard = new Billboard(this._bitmapMaterial);
				//billboard.width = 50;
				//billboard.height = 50;
				//billboard.pivot = new Vector3D(billboard.billboardWidth/2, billboard.billboardHeight/2, 0);
				billboard.x = j*300;
				billboard.y = i*300;
				billboard.z = 0;
				billboard.addEventListener(AwayMouseEvent.MOUSE_MOVE, this.onMouseEvent)
				//billboard.orientationMode = away.base.OrientationMode.CAMERA_PLANE;
				//billboard.alignmentMode = away.base.AlignmentMode.PIVOT_POINT;
				this._billboards.push(billboard);
				//add billboard to the scene
				this._view.scene.addChild(billboard);
			}
		}

		this._hoverControl = new HoverController(this._view.camera, null, 180, 0, 1000);

		document.onmousedown = (event:MouseEvent) => this.onMouseDownHandler(event);
		document.onmouseup = (event:MouseEvent) => this.onMouseUpHandler(event);
		document.onmousemove = (event:MouseEvent) => this.onMouseMove(event);

		window.onresize  = (event:UIEvent) => this.onResize(event);

		//trigger an initial resize for the view
		this.onResize(null);

		//setup the RAF for a render listener
		this._timer = new RequestAnimationFrame(this.render, this);
		this._timer.start();
	}

	private onMouseEvent(event:AwayMouseEvent)
	{
		console.log(event);
	}

	private onResize(event:UIEvent)
	{
		this._view.x = 0;
		this._view.y = 0;
		this._view.width = window.innerWidth;
		this._view.height = window.innerHeight;
	}

	private render(dt:number)
	{
		for (var i:number = 0; i < this._billboards.length; i++) {
			//this._billboards[i].rotationZ +=2;
		}

		this._view.render();

	}

	private onMouseUpHandler(event:MouseEvent)
	{
		this._move = false;
	}

	private onMouseMove(event:MouseEvent)
	{
		if (this._move) {
			this._hoverControl.panAngle = 0.3*(event.clientX - this._lastMouseX) + this._lastPanAngle;
			this._hoverControl.tiltAngle = -0.3*(event.clientY - this._lastMouseY) + this._lastTiltAngle;
		}
	}

	private onMouseDownHandler(event:MouseEvent)
	{
		this._lastPanAngle = this._hoverControl.panAngle;
		this._lastTiltAngle = this._hoverControl.tiltAngle;
		this._lastMouseX = event.clientX;
		this._lastMouseY = event.clientY;
		this._move = true;
	}
}