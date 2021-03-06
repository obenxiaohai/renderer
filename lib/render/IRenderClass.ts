import IRenderOwner					= require("awayjs-display/lib/base/IRenderOwner");

import Stage						= require("awayjs-stagegl/lib/base/Stage");

import IRenderableClass				= require("awayjs-renderergl/lib/renderables/IRenderableClass");
import RenderBase					= require("awayjs-renderergl/lib/render/RenderBase");
import RenderPool					= require("awayjs-renderergl/lib/render/RenderPool");

/**
 * IRenderClass is an interface for the constructable class definition RenderBase that is used to
 * create render objects in the rendering pipeline to render the contents of a partition
 *
 * @class away.render.RenderBase
 */
interface IRenderClass
{
	/**
	 *
	 */
	new(pool:RenderPool, renderOwner:IRenderOwner, renderableClass:IRenderableClass, stage:Stage):RenderBase;
}

export = IRenderClass;