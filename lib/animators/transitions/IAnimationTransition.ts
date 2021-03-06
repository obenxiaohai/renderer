import AnimationNodeBase				= require("awayjs-display/lib/animators/nodes/AnimationNodeBase");

import AnimatorBase						= require("awayjs-renderergl/lib/animators/AnimatorBase");

/**
 *
 */
interface IAnimationTransition
{
	getAnimationNode(animator:AnimatorBase, startNode:AnimationNodeBase, endNode:AnimationNodeBase, startTime:number /*int*/):AnimationNodeBase
}

export = IAnimationTransition;