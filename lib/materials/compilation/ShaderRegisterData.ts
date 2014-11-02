import ShaderRegisterElement		= require("awayjs-renderergl/lib/materials/compilation/ShaderRegisterElement");

/**
 * ShaderRegisterData contains the "named" registers, generated by the compiler and to be passed on to the methods.
 */
class ShaderRegisterData
{
	public normalVarying:ShaderRegisterElement;
	public tangentVarying:ShaderRegisterElement;
	public bitangentVarying:ShaderRegisterElement;
	public uvVarying:ShaderRegisterElement;
	public secondaryUVVarying:ShaderRegisterElement;
	public viewDirVarying:ShaderRegisterElement;
	public shadowTarget:ShaderRegisterElement;
	public shadedTarget:ShaderRegisterElement;
	public globalPositionVertex:ShaderRegisterElement;
	public globalPositionVarying:ShaderRegisterElement;
	public localPosition:ShaderRegisterElement;
	public normalInput:ShaderRegisterElement;
	public tangentInput:ShaderRegisterElement;
	public animatedNormal:ShaderRegisterElement;
	public animatedTangent:ShaderRegisterElement;
	public commons:ShaderRegisterElement;
	public projectionFragment:ShaderRegisterElement;
	public normalFragment:ShaderRegisterElement;
	public viewDirFragment:ShaderRegisterElement;
	public bitangent:ShaderRegisterElement;

	constructor()
	{

	}
}

export = ShaderRegisterData;