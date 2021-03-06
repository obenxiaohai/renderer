import SamplerBase					= require("awayjs-core/lib/data/SamplerBase");

import ContextGLTextureFormat		= require("awayjs-stagegl/lib/base/ContextGLTextureFormat");
import Stage						= require("awayjs-stagegl/lib/base/Stage");

import ShaderRegisterElement		= require("awayjs-renderergl/lib/shaders/ShaderRegisterElement");


/**
 *
 * @class away.pool.SamplerVOBase
 */
class SamplerVOBase
{
	public _stage:Stage;

	public samplerReg:ShaderRegisterElement;

	public samplerIndex:number;

	constructor(stage:Stage)
	{
		this._stage = stage;
	}

	public dispose()
	{
		this._stage = null;
	}

	/**
	 * Generates a texture format string for the sample instruction.
	 * @param texture The texture for which to get the format string.
	 * @return
	 *
	 * @protected
	 */
	public getFormatString(bitmap:SamplerBase):string
	{
		switch (bitmap.format) {
			case ContextGLTextureFormat.COMPRESSED:
				return "dxt1,";
				break;
			case ContextGLTextureFormat.COMPRESSED_ALPHA:
				return "dxt5,";
				break;
			default:
				return "";
		}
	}
}

export = SamplerVOBase;