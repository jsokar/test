(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
var rect; // used to reference frame bounds
lib.ssMetadata = [
		{name:"test_atlas_1", frames: [[0,2569,1874,252],[0,0,1379,2567]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Bitmap2 = function() {
	this.initialize(ss["test_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap3 = function() {
	this.initialize(ss["test_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap3();
	this.instance.setTransform(-122.85,-228.65,0.1782,0.1782);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-122.8,-228.6,245.7,457.4);
p.frameBounds = [rect];


(lib.Tween5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap3();
	this.instance.setTransform(-122.85,-228.65,0.1782,0.1782);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-122.8,-228.6,245.7,457.4);
p.frameBounds = [rect];


(lib.Title = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap2();
	this.instance.setTransform(0,0,0.4104,0.4104);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Title, rect = new cjs.Rectangle(0,0,769.1,103.4), [rect]);


(lib.Play = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag4B9IgIgCIAAgbIALACIAGABQAJAAAEgDIAGgHIAGgNIAIgSIhCi3IAiAAIAuCQIAwiQIAhAAIgcBPIgbBJQgaBEgJAQQgLAPgagBg");
	this.shape.setTransform(81.275,33.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhDBPQgQgPAAgXQAAgYAPgOQAQgMAZgEIAugFQALgCADgHQACgEAAgIQAAgPgLgHQgLgHgTAAQgXAAgKANQgFAHgCAOIgcAAQABgiAUgMQAVgNAbAAQAeAAAUAMQATAMAAAZIAABlQAAAFACADQACACAGAAIAFAAIAFAAIAAAWIgLADIgKAAQgPAAgHgLQgEgGgBgKQgJALgRAJQgQAJgVAAQgZAAgPgPgAAUADIgRAEIgRACQgQADgIAEQgOAIAAAQQAAAOAKAHQAJAIANgBQAQAAANgGQAZgNAAgcIAAgWQgFACgJACg");
	this.shape_1.setTransform(63.675,29.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgOB6IAAjzIAdAAIAADzg");
	this.shape_2.setTransform(50.1,26.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhaB6IAAjzIBsAAQAhAAAUATQAUASAAAhQAAAdgSAVQgSAUgkAAIhMAAIAABngAg5gIIBBAAQAWAAANgKQAOgJAAgYQAAgagUgLQgKgEgTAAIhBAAg");
	this.shape_3.setTransform(35.675,26.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#3399FF").s().p("ApQDVIAAmpIShAAIAAGpg");
	this.shape_4.setTransform(59.325,26.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,118.7,50.3);
p.frameBounds = [rect];


(lib.Tween1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Play();
	this.instance.setTransform(-98.55,136.35,1,1,0,0,0,59.3,25.2);
	new cjs.ButtonHelper(this.instance, 0, 1, 1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(51,255,0,0.039)").s().p("AqMHMIAAmqIk0AAIAAntIeBAAIAAOXg");
	this.shape.setTransform(61.8,-115.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-157.8,-161.4,315.7,322.9);
p.frameBounds = [rect];


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween1("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, rect = new cjs.Rectangle(-157.8,-161.4,315.7,322.9), [rect]);


// stage content:
(lib.Untitled1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,9,10,241];
	this.streamSoundSymbolsList[10] = [{id:"_01MyPlanetYourPlanet",startFrame:10,endFrame:241,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_9 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.movieClip_1.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(11);
		}
	}
	this.frame_10 = function() {
		var soundInstance = playSound("_01MyPlanetYourPlanet",0);
		this.InsertIntoSoundStreamData(soundInstance,10,241,1);
	}
	this.frame_241 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop(242);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9).call(this.frame_9).wait(1).call(this.frame_10).wait(231).call(this.frame_241).wait(600));

	// Text
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AgUAWIAAgrIApAAIAAArg");
	this.shape.setTransform(281,639.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AAzBuIAAiGQAAgVgGgMQgKgTgZgBQgMABgIACQgPAFgLANQgJALgCALQgDALAAAVIAABwIgkAAIAAjWIAiAAIAAAeQAPgSARgJQARgHAUgBQAuAAAQAgQAIASAAAgIAACJg");
	this.shape_1.setTransform(263.975,630.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AhRBfQgTgSAAgbQAAgeASgQQATgPAegEIA5gHQAMgCAEgJQADgFAAgJQAAgSgNgJQgOgIgXAAQgcAAgMAPQgGAJgCARIgiAAQABgoAZgQQAYgPAhAAQAlAAAXAOQAYAOAAAfIAAB6QAAAGACADQACAEAIAAIAFAAIAGgBIAAAaIgMADIgMABQgTAAgIgNQgFgHgCgNQgLAOgUALQgUAKgZAAQgdAAgTgSgAAZAEIgVAEIgUADQgUADgKAFQgRAKAAAUQAAAQAMAJQALAJAQAAQATAAARgJQAegPAAghIAAgcQgHAEgKACg");
	this.shape_2.setTransform(241.575,630.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AhEBUQgcgdAAg0QAAgzAcggQAbggAtAAQAWAAAWAKQAUALAMARQALAQADAWQAEAPgBAfIiaAAQABAhAOAUQAOATAdAAQAcAAAQgSQAKgLAEgPIAkAAQgCAMgIAPQgIAOgJAKQgRAQgYAFQgNADgPAAQgoAAgbgdgAA8gSQgCgXgIgOQgOgagjAAQgXAAgRASQgRASgBAbIB1AAIAAAAg");
	this.shape_3.setTransform(218.15,630.925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AgRCTIAAklIAjAAIAAElg");
	this.shape_4.setTransform(202.45,626.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("AhCBTQgZgfAAguQAAg4AbgfQAcgfApAAQAlAAAWARQAXASAFArIgjAAQgEgUgLgNQgLgNgaAAQghAAgPAhQgKAWAAAfQAAAgAOAWQAOAWAcAAQAWAAAOgNQANgOAFgYIAjAAQgGArgYAUQgYATgmAAQgpAAgZgeg");
	this.shape_5.setTransform(187.775,630.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("AhFBUQgcgdAAg0QAAgzAcggQAcggAsAAQAXAAAVAKQAWALALARQALAQADAWQADAPABAfIibAAQABAhANAUQAPATAdAAQAcAAAQgSQAKgLAEgPIAkAAQgCAMgIAPQgIAOgJAKQgRAQgYAFQgNADgPAAQgoAAgcgdgAA9gSQgDgXgIgOQgPgagiAAQgYAAgQASQgRASgBAbIB2AAIAAAAg");
	this.shape_6.setTransform(155.75,630.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("AgzBuIAAjWIAiAAIAAAlQAEgKAQgQQAQgQAVAAIAEAAIAIACIAAAmIgFgBIgHAAQgbAAgNARQgPARAAAXIAAB7g");
	this.shape_7.setTransform(138.9,630.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("AhRBfQgTgSAAgbQAAgeASgQQATgPAegEIA5gHQAMgCAEgJQADgFAAgJQAAgSgNgJQgOgIgXAAQgcAAgMAPQgGAJgCARIgiAAQABgoAZgQQAYgPAhAAQAlAAAXAOQAYAOAAAfIAAB6QAAAGACADQACAEAIAAIAFAAIAGgBIAAAaIgMADIgMABQgTAAgIgNQgFgHgCgNQgLAOgUALQgUAKgZAAQgdAAgTgSgAAZAEIgVAEIgUADQgUADgKAFQgRAKAAAUQAAAQAMAJQALAJAQAAQATAAARgJQAegPAAghIAAgcQgHAEgKACg");
	this.shape_8.setTransform(119.925,630.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#333333").s().p("AgzBtIAAjVIAiAAIAAAlQAEgLAQgPQAQgPAVAAIAEAAIAIABIAAAlIgGAAIgGAAQgbAAgNARQgPASAAAWIAAB6g");
	this.shape_9.setTransform(666.75,572.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#333333").s().p("AhFBUQgcgdAAg0QAAgzAcggQAcggAsAAQAXAAAVAKQAWALALARQALAQADAWQADAPABAfIibAAQABAhANAUQAPATAdAAQAcAAAQgSQAKgLAEgPIAkAAQgCAMgIAPQgIAOgJAKQgRAQgYAFQgNADgPAAQgoAAgcgdgAA9gSQgDgXgIgOQgPgagiAAQgYAAgQASQgRASgBAbIB2AAIAAAAg");
	this.shape_10.setTransform(647.15,573.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#333333").s().p("AgLB+QgJgNAAgVIAAiNIgdAAIAAgdIAdAAIAAg8IAjAAIAAA8IAjAAIAAAdIgjAAIAACLQAAALAIAFQAFACAJAAIAGAAIAHgBIAAAcIgNADIgPABQgYAAgJgNg");
	this.shape_11.setTransform(630.1,570.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#333333").s().p("AhRBfQgTgSAAgbQAAgeASgQQATgPAegEIA5gHQAMgCAEgJQADgFAAgJQAAgSgNgJQgOgIgXAAQgcAAgMAPQgGAJgCARIgiAAQABgoAZgQQAYgPAhAAQAlAAAXAOQAYAOAAAfIAAB6QAAAGACADQACAEAIAAIAFAAIAGgBIAAAaIgMADIgMABQgTAAgIgNQgFgHgCgNQgLAOgUALQgUAKgZAAQgdAAgTgSgAAZAEIgVAEIgUADQgUADgKAFQgRAKAAAUQAAAQAMAJQALAJAQAAQATAAARgJQAegPAAghIAAgcQgHAEgKACg");
	this.shape_12.setTransform(613.625,573.025);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#333333").s().p("AArBrIgrilIgqClIgmAAIg9jVIAnAAIApCoIAqioIAoAAIAqCnIArinIAkAAIg+DVg");
	this.shape_13.setTransform(586.875,572.925);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#333333").s().p("AhECXIgKgDIAAggIAOADIAHAAQAKAAAFgDIAIgIIAHgRIAJgVIhPjcIAoAAIA5CtIA6itIAoAAIgiBeIghBZQgfBSgMASQgNASgfAAg");
	this.shape_14.setTransform(552,577.325);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#333333").s().p("ABrBtIAAiUQAAgVgLgIQgLgIgPAAQgVAAgQAPQgPANAAAiIAAB7IgkAAIAAiLQAAgVgFgKQgIgPgWgBQgVAAgQAQQgRAQAAAqIAABwIgkAAIAAjVIAjAAIAAAfQANgRALgGQARgMAXAAQAaAAAPAMQAIAHAHAOQAMgRAQgIQARgIAUAAQArAAAQAeQAIARAAAdIAACNg");
	this.shape_15.setTransform(524.675,572.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#333333").s().p("AhDB5QgbgeAAgyQAAguAYgiQAYgiAsAAQAYAAAQAKQAKAGAMAPIAAhsIAjAAIAAEmIghAAIAAgeQgMAUgRAJQgRAIgWAAQgjAAgagegAgngVQgRAVAAAnQAAAiAPAYQAPAXAfAAQAZAAAQgVQAQgWAAgoQAAgogRgTQgQgUgZAAQgaAAgRAVg");
	this.shape_16.setTransform(485.375,569.275);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#333333").s().p("AAzBtIAAiGQAAgUgGgMQgKgTgZgBQgMAAgIAEQgPADgLAOQgJALgCALQgDALAAAVIAABvIgkAAIAAjVIAiAAIAAAfQAPgUARgHQARgIAUAAQAugBAQAgQAIASAAAgIAACIg");
	this.shape_17.setTransform(463.375,572.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#333333").s().p("AhRBfQgTgSAAgbQAAgeASgQQATgPAegEIA5gHQAMgCAEgJQADgFAAgJQAAgSgNgJQgOgIgXAAQgcAAgMAPQgGAJgCARIgiAAQABgoAZgQQAYgPAhAAQAlAAAXAOQAYAOAAAfIAAB6QAAAGACADQACAEAIAAIAFAAIAGgBIAAAaIgMADIgMABQgTAAgIgNQgFgHgCgNQgLAOgUALQgUAKgZAAQgdAAgTgSgAAZAEIgVAEIgUADQgUADgKAFQgRAKAAAUQAAAQAMAJQALAJAQAAQATAAARgJQAegPAAghIAAgcQgHAEgKACg");
	this.shape_18.setTransform(440.975,573.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#333333").s().p("AgzBtIAAjVIAiAAIAAAlQAFgLAPgPQAQgPAVAAIAEAAIAIABIAAAlIgGAAIgGAAQgbAAgNARQgPASAAAWIAAB6g");
	this.shape_19.setTransform(413.5,572.7);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#333333").s().p("AgRCTIAAjUIAjAAIAADUgAgRhpIAAgpIAjAAIAAApg");
	this.shape_20.setTransform(400.925,568.95);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#333333").s().p("AhRBfQgTgSAAgbQAAgeASgQQATgPAegEIA5gHQAMgCAEgJQADgFAAgJQAAgSgNgJQgOgIgXAAQgcAAgMAPQgGAJgCARIgiAAQABgoAZgQQAYgPAhAAQAlAAAXAOQAYAOAAAfIAAB6QAAAGACADQACAEAIAAIAFAAIAGgBIAAAaIgMADIgMABQgTAAgIgNQgFgHgCgNQgLAOgUALQgUAKgZAAQgdAAgTgSgAAZAEIgVAEIgUADQgUADgKAFQgRAKAAAUQAAAQAMAJQALAJAQAAQATAAARgJQAegPAAghIAAgcQgHAEgKACg");
	this.shape_21.setTransform(385.425,573.025);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#333333").s().p("AhDCXIgLgDIAAggIAOADIAIAAQAKAAAEgDIAIgIIAHgRIAJgVIhPjcIApAAIA4CtIA6itIAoAAIgiBeIghBZQgfBSgMASQgMASggAAg");
	this.shape_22.setTransform(353.4,577.325);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#333333").s().p("ABrBtIAAiUQAAgVgLgIQgLgIgPAAQgVAAgQAPQgPANAAAiIAAB7IgkAAIAAiLQAAgVgFgKQgIgPgWgBQgVAAgQAQQgRAQAAAqIAABwIgkAAIAAjVIAjAAIAAAfQANgRALgGQARgMAXAAQAaAAAPAMQAIAHAHAOQAMgRAQgIQARgIAUAAQArAAAQAeQAIARAAAdIAACNg");
	this.shape_23.setTransform(326.075,572.7);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#333333").s().p("AAzBtIAAiGQAAgUgGgMQgKgTgZgBQgMAAgIAEQgPADgLAOQgJALgCALQgDALAAAVIAABvIgkAAIAAjVIAiAAIAAAfQAPgUARgHQARgIAUAAQAugBAQAgQAIASAAAgIAACIg");
	this.shape_24.setTransform(287.575,572.7);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#333333").s().p("AhFBUQgcgdAAg0QAAgzAcggQAcggAsAAQAXAAAVAKQAVALAMARQALAQADAWQADAPABAfIicAAQACAhANAUQAPATAdAAQAcAAARgSQAJgLAEgPIAjAAQgBAMgIAPQgIAOgKAKQgQAQgYAFQgNADgPAAQgoAAgcgdgAA9gSQgDgXgIgOQgPgagiAAQgYAAgQASQgRASgBAbIB2AAIAAAAg");
	this.shape_25.setTransform(264.55,573.075);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#333333").s().p("AAyCTIAAiHQAAgXgGgLQgJgRgbAAQgWAAgSAQQgSAPAAAqIAABxIgkAAIAAkmIAkAAIAABuQANgQAKgGQARgMAZAAQAvAAAQAgQAJATAAAeIAACJg");
	this.shape_26.setTransform(241.975,568.9);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#333333").s().p("AArBrIgrilIgqClIgmAAIg9jVIAnAAIApCoIAqioIAoAAIAqCnIArinIAkAAIg+DVg");
	this.shape_27.setTransform(215.625,572.925);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#333333").s().p("AhEBUQgdgdAAg0QAAgzAdggQAbggAtAAQAWAAAWAKQAUALAMARQAKAQAEAWQADAPAAAfIiaAAQAAAhAOAUQAPATAdAAQAcAAAQgSQAKgLAEgPIAkAAQgCAMgIAPQgIAOgJAKQgRAQgYAFQgNADgPAAQgoAAgbgdgAA8gSQgCgXgIgOQgPgagiAAQgXAAgRASQgRASgBAbIB1AAIAAAAg");
	this.shape_28.setTransform(179.35,573.075);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#333333").s().p("AArCTIhDhtIgdAdIAABQIgjAAIAAklIAjAAIAACqIBbhaIAuAAIhSBPIBXCGg");
	this.shape_29.setTransform(159.15,568.95);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#333333").s().p("AgRCTIAAjUIAjAAIAADUgAgRhpIAAgpIAjAAIAAApg");
	this.shape_30.setTransform(143.075,568.95);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#333333").s().p("AgRCTIAAklIAjAAIAAElg");
	this.shape_31.setTransform(134.05,568.95);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#333333").s().p("AgTCTIAAklIAnAAIAAElg");
	this.shape_32.setTransform(114.175,568.95);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#333333").s().p("AgUAWIAAgrIApAAIAAArg");
	this.shape_33.setTransform(519.05,523.625);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#333333").s().p("AAzBtIAAiGQAAgTgGgMQgKgVgZAAQgMABgIADQgPADgLAOQgJALgCALQgDALAAAVIAABvIgkAAIAAjVIAiAAIAAAfQAPgUARgHQARgJAUABQAuAAAQAfQAIARAAAhIAACIg");
	this.shape_34.setTransform(502.025,514.85);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#333333").s().p("AhRBfQgTgSAAgbQAAgeASgQQATgPAegEIA5gHQAMgCAEgJQADgFAAgJQAAgSgNgJQgOgIgXAAQgcAAgMAPQgGAJgCARIgiAAQABgoAZgQQAYgPAhAAQAlAAAXAOQAYAOAAAfIAAB6QAAAGACADQACAEAIAAIAFAAIAGgBIAAAaIgMADIgMABQgTAAgIgNQgFgHgCgNQgLAOgUALQgUAKgZAAQgdAAgTgSgAAZAEIgVAEIgUADQgUADgKAFQgRAKAAAUQAAAQAMAJQALAJAQAAQATAAARgJQAegPAAghIAAgcQgHAEgKACg");
	this.shape_35.setTransform(479.625,515.175);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#333333").s().p("AhEBUQgcgdAAg0QAAgzAcggQAbggAtAAQAWAAAWAKQAUALAMARQALAQADAWQAEAPgBAfIiaAAQAAAhAPAUQAOATAdAAQAcAAAQgSQAKgLAEgPIAkAAQgCAMgIAPQgIAOgJAKQgRAQgYAFQgNADgPAAQgoAAgbgdgAA8gSQgCgXgIgOQgOgagjAAQgXAAgRASQgRASgBAbIB1AAIAAAAg");
	this.shape_36.setTransform(456.2,515.225);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#333333").s().p("ABrBtIAAiTQAAgWgLgIQgLgIgPAAQgVAAgQAOQgPAOAAAiIAAB7IgkAAIAAiKQAAgWgFgLQgIgPgWAAQgVAAgQAQQgRAQAAAqIAABwIgkAAIAAjVIAjAAIAAAfQANgQALgIQARgMAXABQAaAAAPAMQAIAHAHAOQAMgRAQgIQARgJAUABQArAAAQAeQAIASAAAcIAACNg");
	this.shape_37.setTransform(427.975,514.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#333333").s().p("AgTCTIAAklIAnAAIAAElg");
	this.shape_38.setTransform(395.575,511.1);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#333333").s().p("AgLB+QgJgNAAgVIAAiMIgdAAIAAgeIAdAAIAAg8IAkAAIAAA8IAiAAIAAAeIgiAAIAACKQAAAMAHAEQAFABAJAAIAGAAIAHAAIAAAcIgNADIgOABQgZAAgJgNg");
	this.shape_39.setTransform(373.65,512.25);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#333333").s().p("AhRBfQgTgSAAgbQAAgeASgQQATgPAegEIA5gHQAMgCAEgJQADgFAAgJQAAgSgNgJQgOgIgXAAQgcAAgMAPQgGAJgCARIgiAAQABgoAZgQQAYgPAhAAQAlAAAXAOQAYAOAAAfIAAB6QAAAGACADQACAEAIAAIAFAAIAGgBIAAAaIgMADIgMABQgTAAgIgNQgFgHgCgNQgLAOgUALQgUAKgZAAQgdAAgTgSgAAZAEIgVAEIgUADQgUADgKAFQgRAKAAAUQAAAQAMAJQALAJAQAAQATAAARgJQAegPAAghIAAgcQgHAEgKACg");
	this.shape_40.setTransform(357.175,515.175);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#333333").s().p("AAyCTIAAiHQAAgXgGgLQgJgRgbAAQgWAAgSAPQgSAQAAAqIAABxIgkAAIAAkmIAkAAIAABuQANgQAKgHQARgLAZAAQAvAAAQAgQAJATAAAeIAACJg");
	this.shape_41.setTransform(333.975,511.05);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#333333").s().p("AArBrIgrilIgqClIgmAAIg9jVIAnAAIApCoIAqioIAoAAIAqCnIArinIAkAAIg+DVg");
	this.shape_42.setTransform(307.625,515.075);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#333333").s().p("AArBrIgrilIgqClIgmAAIg9jVIAnAAIApCoIAqioIAoAAIAqCnIArinIAkAAIg+DVg");
	this.shape_43.setTransform(268.025,515.075);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#333333").s().p("AhIBVQgagfAAgyQAAg1AbggQAbggAtAAQApAAAdAcQAcAbAAA2QAAAzgZAhQgZAigzAAQgtAAgZgdgAgug5QgPAaAAAiQAAAiAPAXQAOAXAgAAQAjAAANgbQANgbABggQAAgegKgTQgPgdglgBQggAAgOAZg");
	this.shape_44.setTransform(241.7,515.15);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#333333").s().p("AAzBtIAAiGQAAgTgGgMQgKgVgZAAQgMABgIADQgPADgLAOQgJALgCALQgDALAAAVIAABvIgkAAIAAjVIAiAAIAAAfQAPgUARgHQARgJAUABQAuAAAQAfQAIARAAAhIAACIg");
	this.shape_45.setTransform(219.175,514.85);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#333333").s().p("AArCTIhDhtIgdAdIAABQIgjAAIAAklIAjAAIAACqIBbhaIAuAAIhSBPIBXCGg");
	this.shape_46.setTransform(198.75,511.1);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#333333").s().p("AhLBPQgJgQAAgbIAAiRIAlAAIAACNQAAARAFAKQAJATAaAAQAjAAAOghQAHgSAAgfIAAhpIAkAAIAADVIgiAAIABgfQgHAMgKAIQgVARgcAAQgtAAgQgfg");
	this.shape_47.setTransform(165.55,515.375);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#333333").s().p("AhJBVQgZgfAAgyQAAg1AbggQAbggAtAAQApAAAdAcQAcAbAAA2QAAAzgZAhQgZAigzAAQgsAAgbgdgAgug5QgPAaAAAiQAAAiAPAXQAOAXAgAAQAjAAAOgbQANgbgBggQAAgegJgTQgPgdglgBQggAAgOAZg");
	this.shape_48.setTransform(142.8,515.15);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#333333").s().p("AgTCTIAAh2IhvivIAuAAIBUCOIBUiOIAvAAIhvCvIAAB2g");
	this.shape_49.setTransform(122.125,511.1);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#333333").s().p("AgUAWIAAgrIApAAIAAArg");
	this.shape_50.setTransform(461.5,465.775);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#333333").s().p("AAzBtIAAiGQAAgTgGgMQgKgVgZABQgMAAgIACQgPAEgLAOQgJAKgCAMQgDALAAAVIAABvIgkAAIAAjVIAiAAIAAAeQAPgSARgIQARgJAUAAQAuABAQAfQAIARAAAhIAACIg");
	this.shape_51.setTransform(444.475,457);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#333333").s().p("AhEBUQgdgdAAg0QAAgzAdggQAbggAtAAQAWAAAWAKQAUALAMARQAKAQAEAWQADAPAAAfIiaAAQAAAhAOAUQAPATAdAAQAcAAAQgSQAKgLAEgPIAkAAQgCAMgIAPQgIAOgJAKQgRAQgYAFQgNADgPAAQgoAAgbgdgAA9gSQgDgXgIgOQgPgagiAAQgXAAgRASQgRASgBAbIB2AAIAAAAg");
	this.shape_52.setTransform(421.45,457.375);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#333333").s().p("AhFBUQgcgdAAg0QAAgzAcggQAcggAsAAQAXAAAVAKQAVALAMARQALAQADAWQADAPABAfIicAAQACAhANAUQAPATAdAAQAcAAAQgSQAKgLAEgPIAjAAQgBAMgIAPQgIAOgKAKQgQAQgYAFQgNADgPAAQgoAAgcgdgAA9gSQgDgXgIgOQgPgagiAAQgYAAgQASQgRASgBAbIB2AAIAAAAg");
	this.shape_53.setTransform(398.65,457.375);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#333333").s().p("AgzBtIAAjVIAiAAIAAAlQAFgLAPgPQAQgQAVAAIAEAAIAIABIAAAmIgFgBIgHAAQgbAAgNASQgPASAAAWIAAB6g");
	this.shape_54.setTransform(381.8,457);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#333333").s().p("Ag8CLQgXgQgDghIAlAAQACAPAIAIQAMAMAaAAQApAAAMgeQAIgRgBgsQgLAQgPAIQgPAIgYAAQgiAAgbgYQgagZAAg4QAAg2AbgeQAageAlAAQAYAAATAMQAKAHALANIAAgbIAhAAIAADCQAAApgMAYQgWArg9AAQgjAAgYgPgAgwhWQgIATAAAfQAAAkAPASQAPATAZAAQAlAAAQgjQAJgTAAgaQAAgogRgTQgQgUgZAAQglAAgOAkg");
	this.shape_55.setTransform(361.625,461.575);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#333333").s().p("AgKA7IgHh1IAjAAIgGB1g");
	this.shape_56.setTransform(338.175,444.425);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#333333").s().p("AAzBtIAAiGQAAgTgGgMQgKgVgZABQgMAAgIACQgPAEgLAOQgJAKgCAMQgDALAAAVIAABvIgkAAIAAjVIAiAAIAAAeQAPgSARgIQARgJAUAAQAuABAQAfQAIARAAAhIAACIg");
	this.shape_57.setTransform(321.825,457);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#333333").s().p("AgRCTIAAjVIAjAAIAADVgAgRhpIAAgpIAjAAIAAApg");
	this.shape_58.setTransform(305.825,453.25);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#333333").s().p("AgTBrIhPjVIApAAIA5CtIA7itIAoAAIhRDVg");
	this.shape_59.setTransform(291,457.225);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#333333").s().p("AgRCTIAAjVIAjAAIAADVgAgRhpIAAgpIAjAAIAAApg");
	this.shape_60.setTransform(276.225,453.25);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#333333").s().p("AgRCTIAAklIAjAAIAAElg");
	this.shape_61.setTransform(267.2,453.25);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#333333").s().p("ABrBtIAAiTQAAgWgLgIQgLgIgPAAQgVAAgQAOQgPAPAAAhIAAB7IgkAAIAAiKQAAgXgFgKQgIgOgWAAQgVAAgQAPQgRARAAApIAABwIgkAAIAAjVIAjAAIAAAeQANgPALgIQARgLAXgBQAaAAAPANQAIAHAHAOQAMgRAQgIQARgJAUAAQArAAAQAgQAIARAAAcIAACNg");
	this.shape_62.setTransform(235.575,457);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#333333").s().p("AgKA7IgHh1IAjAAIgGB1g");
	this.shape_63.setTransform(215.625,444.425);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#333333").s().p("AgTCTIAAklIAnAAIAAElg");
	this.shape_64.setTransform(205.375,453.25);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#333333").s().p("AgUAhQAOgCAFgRQACgJAAgIIAAgCIgBgDIgUAAIAAgrIApAAIAAAoQAAAXgJASQgKASgWAEg");
	this.shape_65.setTransform(183.55,468.825);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#333333").s().p("AhDCXIgKgDIAAggIANADIAIAAQAKAAAEgDIAIgIIAHgRIAJgVIhPjcIApAAIA4CtIA6itIAoAAIgiBeIghBZQgfBSgMASQgMASggAAg");
	this.shape_66.setTransform(170.8,461.625);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#333333").s().p("AhFBUQgcgdAAg0QAAgzAcggQAcggAsAAQAXAAAVAKQAVALAMARQALAQADAWQADAPABAfIicAAQACAhANAUQAPATAdAAQAcAAAQgSQAKgLAEgPIAjAAQgBAMgIAPQgIAOgKAKQgQAQgYAFQgNADgPAAQgoAAgcgdgAA9gSQgDgXgIgOQgPgagiAAQgYAAgQASQgRASgBAbIB2AAIAAAAg");
	this.shape_67.setTransform(148.9,457.375);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#333333").s().p("ABLCTIAAiJIiWAAIAACJIgoAAIAAklIAoAAIAAB6ICWAAIAAh6IApAAIAAElg");
	this.shape_68.setTransform(122.95,453.25);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#333333").s().p("AgUBqIAAgsIApAAIAAAsgAgUg9IAAgsIApAAIAAAsg");
	this.shape_69.setTransform(391.35,399.525);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#333333").s().p("AgtC/QAgg+AJgcQANgrAAg6QAAg5gPgwQgKgdgeg4IAZAAIAkA9QAGALAIAUQAKAZAEAZQAEAYAAAXQAAA6gTAvQgMAdgkA6g");
	this.shape_70.setTransform(377.075,399.325);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#333333").s().p("AgRCTIAAklIAjAAIAAElg");
	this.shape_71.setTransform(366.5,395.4);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#333333").s().p("AhRBfQgTgSAAgbQAAgeASgQQATgPAegEIA5gHQAMgCAEgJQADgFAAgJQAAgSgNgJQgOgIgXAAQgcAAgMAPQgGAJgCARIgiAAQABgoAZgQQAYgPAhAAQAlAAAXAOQAYAOAAAfIAAB6QAAAGACADQACAEAIAAIAFAAIAGgBIAAAaIgMADIgMABQgTAAgIgNQgFgHgCgNQgLAOgUALQgUAKgZAAQgdAAgTgSgAAZAEIgVAEIgUADQgUADgKAFQgRAKAAAUQAAAQAMAJQALAJAQAAQATAAARgJQAegPAAghIAAgcQgHAEgKACg");
	this.shape_72.setTransform(350.925,399.475);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#333333").s().p("AAzBuIAAiGQAAgVgGgMQgKgTgZAAQgMAAgIACQgPAFgLANQgJAKgCAMQgDALAAAVIAABwIgkAAIAAjWIAiAAIAAAeQAPgSARgJQARgHAUgBQAuAAAQAgQAIARAAAhIAACJg");
	this.shape_73.setTransform(327.725,399.15);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#333333").s().p("AhJBUQgZgeAAgyQAAg1AbggQAcggAsAAQAqAAAcAbQAcAcAAA2QAAAygZAjQgZAhg0AAQgrAAgbgegAgvg5QgOAaAAAiQAAAiAOAYQAQAWAfAAQAjAAAOgbQAMgbAAggQAAgegJgTQgPgdglAAQgfAAgQAYg");
	this.shape_74.setTransform(304.65,399.45);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#333333").s().p("AgRCTIAAjVIAjAAIAADVgAgRhpIAAgpIAjAAIAAApg");
	this.shape_75.setTransform(288.925,395.4);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#333333").s().p("AgLB+QgJgNAAgUIAAiOIgdAAIAAgdIAdAAIAAg8IAjAAIAAA8IAjAAIAAAdIgjAAIAACMQAAAKAIAEQAEACAKABIAGAAIAHgBIAAAdIgNACIgPABQgYAAgJgNg");
	this.shape_76.setTransform(278.55,396.55);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#333333").s().p("AheCZIAAkrIAjAAIAAAdQALgOANgJQASgMAYABQAlAAAZAcQAaAbAAA0QAABFglAeQgYATgfAAQgXAAgQgKQgKgHgMgOIAABugAg0hTQgHAVAAAeQAAAZAHARQAOAhAmAAQAYAAARgVQARgWAAgpQAAgZgIgTQgOgjgkAAQgmAAgOAlg");
	this.shape_77.setTransform(262.125,403.4);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#333333").s().p("AhJBUQgZgeAAgyQAAg1AbggQAcggAsAAQApAAAdAbQAcAcAAA2QAAAygZAjQgZAhg0AAQgsAAgagegAgvg5QgOAaAAAiQAAAiAOAYQAPAWAgAAQAjAAANgbQANgbAAggQABgegKgTQgPgdglAAQggAAgPAYg");
	this.shape_78.setTransform(238.6,399.45);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#333333").s().p("AAWC/Igjg6QgHgMgIgWQgLgegFghIgCgiQAAg6ATguQAMgdAkg7IAZAAQgfA9gKAdQgNAsAAA4QAAA6APAwQAKAeAeA3g");
	this.shape_79.setTransform(221.375,399.325);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#333333").s().p("AhDBdQgUgWgCggIAjAAQACASAHAKQAOARAiAAQAUAAAPgJQAQgIAAgTQAAgOgMgHQgIgEgYgGIgcgIQgcgGgNgHQgYgPAAgaQAAgeAXgTQAWgTAlAAQAxAAAVAdQAOASgBAUIgiAAQgBgMgHgKQgNgOgeAAQgVAAgLAIQgLAHAAANQAAAOAOAJQAIAEAQAFIAYAFQAnAKAOAHQAVAOAAAeQAAAcgWAWQgWAUgtAAQgwAAgUgVg");
	this.shape_80.setTransform(193.625,399.5);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#333333").s().p("AhIBUQgageAAgyQAAg1AbggQAbggAtAAQApAAAdAbQAcAcAAA2QAAAygZAjQgZAhg0AAQgsAAgZgegAgvg5QgOAaAAAiQAAAiAOAYQAQAWAfAAQAjAAANgbQAOgbAAggQAAgegKgTQgPgdglAAQgfAAgQAYg");
	this.shape_81.setTransform(171.65,399.45);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#333333").s().p("AgRCTIAAklIAjAAIAAElg");
	this.shape_82.setTransform(156,395.4);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#333333").s().p("AhJBUQgZgeAAgyQAAg1AbggQAcggAsAAQAqAAAcAbQAcAcAAA2QAAAygZAjQgZAhgzAAQgsAAgbgegAgvg5QgOAaAAAiQAAAiAOAYQAPAWAgAAQAjAAAOgbQANgbgBggQAAgegJgTQgPgdglAAQggAAgPAYg");
	this.shape_83.setTransform(139.75,399.45);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#333333").s().p("AhDBdQgUgWgCggIAjAAQACASAHAKQAOARAiAAQAUAAAPgJQAQgIAAgTQAAgOgMgHQgIgEgYgGIgcgIQgcgGgNgHQgYgPAAgaQAAgeAXgTQAWgTAlAAQAxAAAVAdQAOASgBAUIgiAAQgBgMgHgKQgNgOgeAAQgVAAgLAIQgLAHAAANQAAAOAOAJQAIAEAQAFIAYAFQAnAKAOAHQAVAOAAAeQAAAcgWAWQgWAUgtAAQgwAAgUgVg");
	this.shape_84.setTransform(118.425,399.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},146).to({state:[{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},15).to({state:[{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},73).to({state:[]},1).wait(606));

	// _2
	this.instance = new lib.Tween5("synched",0);
	this.instance.setTransform(837.85,460.65);
	this.instance.alpha = 0;

	this.instance_1 = new lib.Tween6("synched",0);
	this.instance_1.setTransform(837.85,460.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},9).to({state:[{t:this.instance_1}]},152).to({state:[{t:this.instance_1}]},73).to({state:[]},1).wait(606));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,alpha:1},9).wait(832));

	// Show
	this.instance_2 = new lib.Title();
	this.instance_2.setTransform(527.5,142.75,0.1044,0.1044,0,0,0,384.4,51.7);
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:384.5,scaleX:1,scaleY:1,y:142.7,alpha:1},9).wait(225).to({_off:true},1).wait(606));

	// Play_idn
	this.instance_3 = new lib.Tween1("synched",0);
	this.instance_3.setTransform(183.8,586.8);
	this.instance_3.alpha = 0.3984;

	this.movieClip_1 = new lib.Symbol1();
	this.movieClip_1.name = "movieClip_1";
	this.movieClip_1.setTransform(183.8,586.8);
	this.movieClip_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true,alpha:1,mode:"independent"},9).to({_off:false,mode:"synched",startPosition:0},40).to({startPosition:0},112).to({startPosition:0},73).to({_off:true},1).wait(606));
	this.timeline.addTween(cjs.Tween.get(this.movieClip_1).to({_off:false},9).to({_off:true,mode:"synched",startPosition:0},40).wait(792));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = rect = new cjs.Rectangle(538,521.4,934.8,610.9);
p.frameBounds = [rect, new cjs.Rectangle(538,516.2,934.8,616.1), new cjs.Rectangle(538,511.1,934.8,621.2), new cjs.Rectangle(538,505.9,934.8,626.4), new cjs.Rectangle(538,500.8,934.8,631.5), new cjs.Rectangle(538,495.6,934.8,636.7), new cjs.Rectangle(538,490.4,934.8,641.9), new cjs.Rectangle(538,485.3,934.8,647), new cjs.Rectangle(538,480.1,934.8,652.2), rect=new cjs.Rectangle(538,475,934.8,657.3), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=null, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];
// library properties:
lib.properties = {
	id: 'A41B51630D304FEF8B80526EE84E824C',
	width: 1024,
	height: 768,
	fps: 10,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/test_atlas_1.png", id:"test_atlas_1"},
		{src:"sounds/_01MyPlanetYourPlanet.mp3", id:"_01MyPlanetYourPlanet"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['A41B51630D304FEF8B80526EE84E824C'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;