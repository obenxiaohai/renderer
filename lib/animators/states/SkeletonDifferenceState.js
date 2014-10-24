var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Quaternion = require("awayjs-core/lib/geom/Quaternion");
var JointPose = require("awayjs-renderergl/lib/animators/data/JointPose");
var SkeletonPose = require("awayjs-renderergl/lib/animators/data/SkeletonPose");
var AnimationStateBase = require("awayjs-renderergl/lib/animators/states/AnimationStateBase");
/**
 *
 */
var SkeletonDifferenceState = (function (_super) {
    __extends(SkeletonDifferenceState, _super);
    function SkeletonDifferenceState(animator, skeletonAnimationNode) {
        _super.call(this, animator, skeletonAnimationNode);
        this._blendWeight = 0;
        this._skeletonPose = new SkeletonPose();
        this._skeletonPoseDirty = true;
        this._skeletonAnimationNode = skeletonAnimationNode;
        this._baseInput = animator.getAnimationState(this._skeletonAnimationNode.baseInput);
        this._differenceInput = animator.getAnimationState(this._skeletonAnimationNode.differenceInput);
    }
    Object.defineProperty(SkeletonDifferenceState.prototype, "blendWeight", {
        /**
         * Defines a fractional value between 0 and 1 representing the blending ratio between the base input (0) and difference input (1),
         * used to produce the skeleton pose output.
         *
         * @see #baseInput
         * @see #differenceInput
         */
        get: function () {
            return this._blendWeight;
        },
        set: function (value) {
            this._blendWeight = value;
            this._pPositionDeltaDirty = true;
            this._skeletonPoseDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    SkeletonDifferenceState.prototype.phase = function (value) {
        this._skeletonPoseDirty = true;
        this._pPositionDeltaDirty = true;
        this._baseInput.phase(value);
        this._baseInput.phase(value);
    };
    /**
     * @inheritDoc
     */
    SkeletonDifferenceState.prototype._pUpdateTime = function (time /*int*/) {
        this._skeletonPoseDirty = true;
        this._baseInput.update(time);
        this._differenceInput.update(time);
        _super.prototype._pUpdateTime.call(this, time);
    };
    /**
     * Returns the current skeleton pose of the animation in the clip based on the internal playhead position.
     */
    SkeletonDifferenceState.prototype.getSkeletonPose = function (skeleton) {
        if (this._skeletonPoseDirty)
            this.updateSkeletonPose(skeleton);
        return this._skeletonPose;
    };
    /**
     * @inheritDoc
     */
    SkeletonDifferenceState.prototype._pUpdatePositionDelta = function () {
        this._pPositionDeltaDirty = false;
        var deltA = this._baseInput.positionDelta;
        var deltB = this._differenceInput.positionDelta;
        this.positionDelta.x = deltA.x + this._blendWeight * deltB.x;
        this.positionDelta.y = deltA.y + this._blendWeight * deltB.y;
        this.positionDelta.z = deltA.z + this._blendWeight * deltB.z;
    };
    /**
     * Updates the output skeleton pose of the node based on the blendWeight value between base input and difference input nodes.
     *
     * @param skeleton The skeleton used by the animator requesting the ouput pose.
     */
    SkeletonDifferenceState.prototype.updateSkeletonPose = function (skeleton) {
        this._skeletonPoseDirty = false;
        var endPose;
        var endPoses = this._skeletonPose.jointPoses;
        var basePoses = this._baseInput.getSkeletonPose(skeleton).jointPoses;
        var diffPoses = this._differenceInput.getSkeletonPose(skeleton).jointPoses;
        var base, diff;
        var basePos, diffPos;
        var tr;
        var numJoints = skeleton.numJoints;
        // :s
        if (endPoses.length != numJoints)
            endPoses.length = numJoints;
        for (var i = 0; i < numJoints; ++i) {
            endPose = endPoses[i];
            if (endPose == null)
                endPose = endPoses[i] = new JointPose();
            base = basePoses[i];
            diff = diffPoses[i];
            basePos = base.translation;
            diffPos = diff.translation;
            SkeletonDifferenceState._tempQuat.multiply(diff.orientation, base.orientation);
            endPose.orientation.lerp(base.orientation, SkeletonDifferenceState._tempQuat, this._blendWeight);
            tr = endPose.translation;
            tr.x = basePos.x + this._blendWeight * diffPos.x;
            tr.y = basePos.y + this._blendWeight * diffPos.y;
            tr.z = basePos.z + this._blendWeight * diffPos.z;
        }
    };
    SkeletonDifferenceState._tempQuat = new Quaternion();
    return SkeletonDifferenceState;
})(AnimationStateBase);
module.exports = SkeletonDifferenceState;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9hbmltYXRvcnMvc3RhdGVzL3NrZWxldG9uZGlmZmVyZW5jZXN0YXRlLnRzIl0sIm5hbWVzIjpbIlNrZWxldG9uRGlmZmVyZW5jZVN0YXRlIiwiU2tlbGV0b25EaWZmZXJlbmNlU3RhdGUuY29uc3RydWN0b3IiLCJTa2VsZXRvbkRpZmZlcmVuY2VTdGF0ZS5ibGVuZFdlaWdodCIsIlNrZWxldG9uRGlmZmVyZW5jZVN0YXRlLnBoYXNlIiwiU2tlbGV0b25EaWZmZXJlbmNlU3RhdGUuX3BVcGRhdGVUaW1lIiwiU2tlbGV0b25EaWZmZXJlbmNlU3RhdGUuZ2V0U2tlbGV0b25Qb3NlIiwiU2tlbGV0b25EaWZmZXJlbmNlU3RhdGUuX3BVcGRhdGVQb3NpdGlvbkRlbHRhIiwiU2tlbGV0b25EaWZmZXJlbmNlU3RhdGUudXBkYXRlU2tlbGV0b25Qb3NlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLFVBQVUsV0FBZ0IsaUNBQWlDLENBQUMsQ0FBQztBQUtwRSxJQUFPLFNBQVMsV0FBZ0IsZ0RBQWdELENBQUMsQ0FBQztBQUVsRixJQUFPLFlBQVksV0FBZ0IsbURBQW1ELENBQUMsQ0FBQztBQUV4RixJQUFPLGtCQUFrQixXQUFjLDJEQUEyRCxDQUFDLENBQUM7QUFHcEcsQUFHQTs7R0FERztJQUNHLHVCQUF1QjtJQUFTQSxVQUFoQ0EsdUJBQXVCQSxVQUEyQkE7SUE4QnZEQSxTQTlCS0EsdUJBQXVCQSxDQThCaEJBLFFBQXFCQSxFQUFFQSxxQkFBNENBO1FBRTlFQyxrQkFBTUEsUUFBUUEsRUFBRUEscUJBQXFCQSxDQUFDQSxDQUFDQTtRQTlCaENBLGlCQUFZQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUd4QkEsa0JBQWFBLEdBQWdCQSxJQUFJQSxZQUFZQSxFQUFFQSxDQUFDQTtRQUNoREEsdUJBQWtCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQTRCekNBLElBQUlBLENBQUNBLHNCQUFzQkEsR0FBR0EscUJBQXFCQSxDQUFDQTtR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QUFzSUNBLEVBdElxQyxrQkFBa0IsRUFzSXZEO0FBRUQsQUFBaUMsaUJBQXhCLHVCQUF1QixDQUFDIiwiZmlsZSI6ImFuaW1hdG9ycy9zdGF0ZXMvU2tlbGV0b25EaWZmZXJlbmNlU3RhdGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFF1YXRlcm5pb25cdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9RdWF0ZXJuaW9uXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcblxuaW1wb3J0IEFuaW1hdG9yQmFzZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1zdGFnZWdsL2xpYi9hbmltYXRvcnMvQW5pbWF0b3JCYXNlXCIpO1xuXG5pbXBvcnQgSm9pbnRQb3NlXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLXJlbmRlcmVyZ2wvbGliL2FuaW1hdG9ycy9kYXRhL0pvaW50UG9zZVwiKTtcbmltcG9ydCBTa2VsZXRvblx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLXJlbmRlcmVyZ2wvbGliL2FuaW1hdG9ycy9kYXRhL1NrZWxldG9uXCIpO1xuaW1wb3J0IFNrZWxldG9uUG9zZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9hbmltYXRvcnMvZGF0YS9Ta2VsZXRvblBvc2VcIik7XG5pbXBvcnQgU2tlbGV0b25EaWZmZXJlbmNlTm9kZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9hbmltYXRvcnMvbm9kZXMvU2tlbGV0b25EaWZmZXJlbmNlTm9kZVwiKTtcbmltcG9ydCBBbmltYXRpb25TdGF0ZUJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9hbmltYXRvcnMvc3RhdGVzL0FuaW1hdGlvblN0YXRlQmFzZVwiKTtcbmltcG9ydCBJU2tlbGV0b25BbmltYXRpb25TdGF0ZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1yZW5kZXJlcmdsL2xpYi9hbmltYXRvcnMvc3RhdGVzL0lTa2VsZXRvbkFuaW1hdGlvblN0YXRlXCIpO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIFNrZWxldG9uRGlmZmVyZW5jZVN0YXRlIGV4dGVuZHMgQW5pbWF0aW9uU3RhdGVCYXNlIGltcGxlbWVudHMgSVNrZWxldG9uQW5pbWF0aW9uU3RhdGVcbntcblx0cHJpdmF0ZSBfYmxlbmRXZWlnaHQ6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBzdGF0aWMgX3RlbXBRdWF0OlF1YXRlcm5pb24gPSBuZXcgUXVhdGVybmlvbigpO1xuXHRwcml2YXRlIF9za2VsZXRvbkFuaW1hdGlvbk5vZGU6U2tlbGV0b25EaWZmZXJlbmNlTm9kZTtcblx0cHJpdmF0ZSBfc2tlbGV0b25Qb3NlOlNrZWxldG9uUG9zZSA9IG5ldyBTa2VsZXRvblBvc2UoKTtcblx0cHJpdmF0ZSBfc2tlbGV0b25Qb3NlRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2Jhc2VJbnB1dDpJU2tlbGV0b25BbmltYXRpb25TdGF0ZTtcblx0cHJpdmF0ZSBfZGlmZmVyZW5jZUlucHV0OklTa2VsZXRvbkFuaW1hdGlvblN0YXRlO1xuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIGEgZnJhY3Rpb25hbCB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEgcmVwcmVzZW50aW5nIHRoZSBibGVuZGluZyByYXRpbyBiZXR3ZWVuIHRoZSBiYXNlIGlucHV0ICgwKSBhbmQgZGlmZmVyZW5jZSBpbnB1dCAoMSksXG5cdCAqIHVzZWQgdG8gcHJvZHVjZSB0aGUgc2tlbGV0b24gcG9zZSBvdXRwdXQuXG5cdCAqXG5cdCAqIEBzZWUgI2Jhc2VJbnB1dFxuXHQgKiBAc2VlICNkaWZmZXJlbmNlSW5wdXRcblx0ICovXG5cdHB1YmxpYyBnZXQgYmxlbmRXZWlnaHQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9ibGVuZFdlaWdodDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYmxlbmRXZWlnaHQodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fYmxlbmRXZWlnaHQgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BQb3NpdGlvbkRlbHRhRGlydHkgPSB0cnVlO1xuXHRcdHRoaXMuX3NrZWxldG9uUG9zZURpcnR5ID0gdHJ1ZTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGFuaW1hdG9yOkFuaW1hdG9yQmFzZSwgc2tlbGV0b25BbmltYXRpb25Ob2RlOlNrZWxldG9uRGlmZmVyZW5jZU5vZGUpXG5cdHtcblx0XHRzdXBlcihhbmltYXRvciwgc2tlbGV0b25BbmltYXRpb25Ob2RlKTtcblxuXHRcdHRoaXMuX3NrZWxldG9uQW5pbWF0aW9uTm9kZSA9IHNrZWxldG9uQW5pbWF0aW9uTm9kZTtcblxuXHRcdHRoaXMuX2Jhc2VJbnB1dCA9IDxJU2tlbGV0b25BbmltYXRpb25TdGF0ZT4gYW5pbWF0b3IuZ2V0QW5pbWF0aW9uU3RhdGUodGhpcy5fc2tlbGV0b25BbmltYXRpb25Ob2RlLmJhc2VJbnB1dCk7XG5cdFx0dGhpcy5fZGlmZmVyZW5jZUlucHV0ID0gPElTa2VsZXRvbkFuaW1hdGlvblN0YXRlPiBhbmltYXRvci5nZXRBbmltYXRpb25TdGF0ZSh0aGlzLl9za2VsZXRvbkFuaW1hdGlvbk5vZGUuZGlmZmVyZW5jZUlucHV0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIHBoYXNlKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX3NrZWxldG9uUG9zZURpcnR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMuX3BQb3NpdGlvbkRlbHRhRGlydHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5fYmFzZUlucHV0LnBoYXNlKHZhbHVlKTtcblx0XHR0aGlzLl9iYXNlSW5wdXQucGhhc2UodmFsdWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgX3BVcGRhdGVUaW1lKHRpbWU6bnVtYmVyIC8qaW50Ki8pXG5cdHtcblx0XHR0aGlzLl9za2VsZXRvblBvc2VEaXJ0eSA9IHRydWU7XG5cblx0XHR0aGlzLl9iYXNlSW5wdXQudXBkYXRlKHRpbWUpO1xuXHRcdHRoaXMuX2RpZmZlcmVuY2VJbnB1dC51cGRhdGUodGltZSk7XG5cblx0XHRzdXBlci5fcFVwZGF0ZVRpbWUodGltZSk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgY3VycmVudCBza2VsZXRvbiBwb3NlIG9mIHRoZSBhbmltYXRpb24gaW4gdGhlIGNsaXAgYmFzZWQgb24gdGhlIGludGVybmFsIHBsYXloZWFkIHBvc2l0aW9uLlxuXHQgKi9cblx0cHVibGljIGdldFNrZWxldG9uUG9zZShza2VsZXRvbjpTa2VsZXRvbik6U2tlbGV0b25Qb3NlXG5cdHtcblx0XHRpZiAodGhpcy5fc2tlbGV0b25Qb3NlRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVNrZWxldG9uUG9zZShza2VsZXRvbik7XG5cblx0XHRyZXR1cm4gdGhpcy5fc2tlbGV0b25Qb3NlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgX3BVcGRhdGVQb3NpdGlvbkRlbHRhKClcblx0e1xuXHRcdHRoaXMuX3BQb3NpdGlvbkRlbHRhRGlydHkgPSBmYWxzZTtcblxuXHRcdHZhciBkZWx0QTpWZWN0b3IzRCA9IHRoaXMuX2Jhc2VJbnB1dC5wb3NpdGlvbkRlbHRhO1xuXHRcdHZhciBkZWx0QjpWZWN0b3IzRCA9IHRoaXMuX2RpZmZlcmVuY2VJbnB1dC5wb3NpdGlvbkRlbHRhO1xuXG5cdFx0dGhpcy5wb3NpdGlvbkRlbHRhLnggPSBkZWx0QS54ICsgdGhpcy5fYmxlbmRXZWlnaHQqZGVsdEIueDtcblx0XHR0aGlzLnBvc2l0aW9uRGVsdGEueSA9IGRlbHRBLnkgKyB0aGlzLl9ibGVuZFdlaWdodCpkZWx0Qi55O1xuXHRcdHRoaXMucG9zaXRpb25EZWx0YS56ID0gZGVsdEEueiArIHRoaXMuX2JsZW5kV2VpZ2h0KmRlbHRCLno7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgb3V0cHV0IHNrZWxldG9uIHBvc2Ugb2YgdGhlIG5vZGUgYmFzZWQgb24gdGhlIGJsZW5kV2VpZ2h0IHZhbHVlIGJldHdlZW4gYmFzZSBpbnB1dCBhbmQgZGlmZmVyZW5jZSBpbnB1dCBub2Rlcy5cblx0ICpcblx0ICogQHBhcmFtIHNrZWxldG9uIFRoZSBza2VsZXRvbiB1c2VkIGJ5IHRoZSBhbmltYXRvciByZXF1ZXN0aW5nIHRoZSBvdXB1dCBwb3NlLlxuXHQgKi9cblx0cHJpdmF0ZSB1cGRhdGVTa2VsZXRvblBvc2Uoc2tlbGV0b246U2tlbGV0b24pXG5cdHtcblx0XHR0aGlzLl9za2VsZXRvblBvc2VEaXJ0eSA9IGZhbHNlO1xuXG5cdFx0dmFyIGVuZFBvc2U6Sm9pbnRQb3NlO1xuXHRcdHZhciBlbmRQb3NlczpBcnJheTxKb2ludFBvc2U+ID0gdGhpcy5fc2tlbGV0b25Qb3NlLmpvaW50UG9zZXM7XG5cdFx0dmFyIGJhc2VQb3NlczpBcnJheTxKb2ludFBvc2U+ID0gdGhpcy5fYmFzZUlucHV0LmdldFNrZWxldG9uUG9zZShza2VsZXRvbikuam9pbnRQb3Nlcztcblx0XHR2YXIgZGlmZlBvc2VzOkFycmF5PEpvaW50UG9zZT4gPSB0aGlzLl9kaWZmZXJlbmNlSW5wdXQuZ2V0U2tlbGV0b25Qb3NlKHNrZWxldG9uKS5qb2ludFBvc2VzO1xuXHRcdHZhciBiYXNlOkpvaW50UG9zZSwgZGlmZjpKb2ludFBvc2U7XG5cdFx0dmFyIGJhc2VQb3M6VmVjdG9yM0QsIGRpZmZQb3M6VmVjdG9yM0Q7XG5cdFx0dmFyIHRyOlZlY3RvcjNEO1xuXHRcdHZhciBudW1Kb2ludHM6bnVtYmVyIC8qdWludCovID0gc2tlbGV0b24ubnVtSm9pbnRzO1xuXG5cdFx0Ly8gOnNcblx0XHRpZiAoZW5kUG9zZXMubGVuZ3RoICE9IG51bUpvaW50cylcblx0XHRcdGVuZFBvc2VzLmxlbmd0aCA9IG51bUpvaW50cztcblxuXHRcdGZvciAodmFyIGk6bnVtYmVyIC8qdWludCovID0gMDsgaSA8IG51bUpvaW50czsgKytpKSB7XG5cdFx0XHRlbmRQb3NlID0gZW5kUG9zZXNbaV07XG5cblx0XHRcdGlmIChlbmRQb3NlID09IG51bGwpXG5cdFx0XHRcdGVuZFBvc2UgPSBlbmRQb3Nlc1tpXSA9IG5ldyBKb2ludFBvc2UoKTtcblxuXHRcdFx0YmFzZSA9IGJhc2VQb3Nlc1tpXTtcblx0XHRcdGRpZmYgPSBkaWZmUG9zZXNbaV07XG5cdFx0XHRiYXNlUG9zID0gYmFzZS50cmFuc2xhdGlvbjtcblx0XHRcdGRpZmZQb3MgPSBkaWZmLnRyYW5zbGF0aW9uO1xuXG5cdFx0XHRTa2VsZXRvbkRpZmZlcmVuY2VTdGF0ZS5fdGVtcFF1YXQubXVsdGlwbHkoZGlmZi5vcmllbnRhdGlvbiwgYmFzZS5vcmllbnRhdGlvbik7XG5cdFx0XHRlbmRQb3NlLm9yaWVudGF0aW9uLmxlcnAoYmFzZS5vcmllbnRhdGlvbiwgU2tlbGV0b25EaWZmZXJlbmNlU3RhdGUuX3RlbXBRdWF0LCB0aGlzLl9ibGVuZFdlaWdodCk7XG5cblx0XHRcdHRyID0gZW5kUG9zZS50cmFuc2xhdGlvbjtcblx0XHRcdHRyLnggPSBiYXNlUG9zLnggKyB0aGlzLl9ibGVuZFdlaWdodCpkaWZmUG9zLng7XG5cdFx0XHR0ci55ID0gYmFzZVBvcy55ICsgdGhpcy5fYmxlbmRXZWlnaHQqZGlmZlBvcy55O1xuXHRcdFx0dHIueiA9IGJhc2VQb3MueiArIHRoaXMuX2JsZW5kV2VpZ2h0KmRpZmZQb3Muejtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0ID0gU2tlbGV0b25EaWZmZXJlbmNlU3RhdGU7Il19