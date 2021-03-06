import Vector3D							= require("awayjs-core/lib/geom/Vector3D");

import AnimatorBase						= require("awayjs-renderergl/lib/animators/AnimatorBase");
import AnimationRegisterCache			= require("awayjs-renderergl/lib/animators/data/AnimationRegisterCache");
import ShaderBase						= require("awayjs-renderergl/lib/shaders/ShaderBase");
import ShaderRegisterElement			= require("awayjs-renderergl/lib/shaders/ShaderRegisterElement");

import ParticleProperties				= require("awayjs-renderergl/lib/animators/data/ParticleProperties");
import ParticlePropertiesMode			= require("awayjs-renderergl/lib/animators/data/ParticlePropertiesMode");
import ParticleNodeBase					= require("awayjs-renderergl/lib/animators/nodes/ParticleNodeBase");
import ParticleScaleState				= require("awayjs-renderergl/lib/animators/states/ParticleScaleState");

/**
 * A particle animation node used to control the scale variation of a particle over time.
 */
class ParticleScaleNode extends ParticleNodeBase
{
	/** @private */
	public _iUsesCycle:boolean;

	/** @private */
	public _iUsesPhase:boolean;

	/** @private */
	public _iMinScale:number;
	/** @private */
	public _iMaxScale:number;
	/** @private */
	public _iCycleDuration:number;
	/** @private */
	public _iCyclePhase:number;

	/**
	 * Reference for scale node properties on a single particle (when in local property mode).
	 * Expects a <code>Vector3D</code> representing the min scale (x), max scale(y), optional cycle speed (z) and phase offset (w) applied to the particle.
	 */
	public static SCALE_VECTOR3D:string = "ScaleVector3D";

	/**
	 * Creates a new <code>ParticleScaleNode</code>
	 *
	 * @param               mode            Defines whether the mode of operation acts on local properties of a particle or global properties of the node.
	 * @param    [optional] usesCycle       Defines whether the node uses the <code>cycleDuration</code> property in the shader to calculate the period of animation independent of particle duration. Defaults to false.
	 * @param    [optional] usesPhase       Defines whether the node uses the <code>cyclePhase</code> property in the shader to calculate a starting offset to the animation cycle. Defaults to false.
	 * @param    [optional] minScale        Defines the default min scale transform of the node, when in global mode. Defaults to 1.
	 * @param    [optional] maxScale        Defines the default max color transform of the node, when in global mode. Defaults to 1.
	 * @param    [optional] cycleDuration   Defines the default duration of the animation in seconds, used as a period independent of particle duration when in global mode. Defaults to 1.
	 * @param    [optional] cyclePhase      Defines the default phase of the cycle in degrees, used as the starting offset of the cycle when in global mode. Defaults to 0.
	 */
	constructor(mode:number /*uint*/, usesCycle:boolean, usesPhase:boolean, minScale:number = 1, maxScale:number = 1, cycleDuration:number = 1, cyclePhase:number = 0)
	{
		super("ParticleScale", mode, (usesCycle && usesPhase)? 4 : ((usesCycle || usesPhase)? 3 : 2), 3);

		this._pStateClass = ParticleScaleState;

		this._iUsesCycle = usesCycle;
		this._iUsesPhase = usesPhase;

		this._iMinScale = minScale;
		this._iMaxScale = maxScale;
		this._iCycleDuration = cycleDuration;
		this._iCyclePhase = cyclePhase;
	}

	/**
	 * @inheritDoc
	 */
	public getAGALVertexCode(shader:ShaderBase, animationRegisterCache:AnimationRegisterCache):string
	{
		var code:string = "";
		var temp:ShaderRegisterElement = animationRegisterCache.getFreeVertexSingleTemp();

		var scaleRegister:ShaderRegisterElement = (this._pMode == ParticlePropertiesMode.GLOBAL)? animationRegisterCache.getFreeVertexConstant() : animationRegisterCache.getFreeVertexAttribute();
		animationRegisterCache.setRegisterIndex(this, ParticleScaleState.SCALE_INDEX, scaleRegister.index);

		if (this._iUsesCycle) {
			code += "mul " + temp + "," + animationRegisterCache.vertexTime + "," + scaleRegister + ".z\n";

			if (this._iUsesPhase)
				code += "add " + temp + "," + temp + "," + scaleRegister + ".w\n";

			code += "sin " + temp + "," + temp + "\n";
		}

		code += "mul " + temp + "," + scaleRegister + ".y," + ((this._iUsesCycle)? temp : animationRegisterCache.vertexLife) + "\n";
		code += "add " + temp + "," + scaleRegister + ".x," + temp + "\n";
		code += "mul " + animationRegisterCache.scaleAndRotateTarget + ".xyz," + animationRegisterCache.scaleAndRotateTarget + ".xyz," + temp + "\n";

		return code;
	}

	/**
	 * @inheritDoc
	 */
	public getAnimationState(animator:AnimatorBase):ParticleScaleState
	{
		return <ParticleScaleState> animator.getAnimationState(this);
	}

	/**
	 * @inheritDoc
	 */
	public _iGeneratePropertyOfOneParticle(param:ParticleProperties)
	{
		var scale:Vector3D = param[ParticleScaleNode.SCALE_VECTOR3D];
		if (!scale)
			throw(new Error("there is no " + ParticleScaleNode.SCALE_VECTOR3D + " in param!"));

		if (this._iUsesCycle) {
			this._pOneData[0] = (scale.x + scale.y)/2;
			this._pOneData[1] = Math.abs(scale.x - scale.y)/2;
			if (scale.z <= 0)
				throw(new Error("the cycle duration must be greater than zero"));
			this._pOneData[2] = Math.PI*2/scale.z;
			if (this._iUsesPhase)
				this._pOneData[3] = scale.w*Math.PI/180;
		} else {
			this._pOneData[0] = scale.x;
			this._pOneData[1] = scale.y - scale.x;
		}
	}
}

export = ParticleScaleNode;