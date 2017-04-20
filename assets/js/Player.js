
Player = function(demo, spawn) {

	if(!spawn) {
		spawn = new BABYLON.Vector3(20, 50, 1);
	}

	this.spawn = spawn;

	this.scene = demo.scene;

	this.demo = demo;

	this.height = 30;

	this.speed = 1;
	this.intertia = .9;
	//this.angularIntertia = 0;
	//this.angularsensibility = 100;
	
	//this.camera = this._initCamera();

	var cam = new BABYLON.FreeCamera("cam", this.spawn, this.scene);
	this.scene.activeCamera = cam;
	
	this.scene.activeCamera.attachControl(this.scene.getEngine().getRenderingCanvas());
	
	cam.ellipsoid = new BABYLON.Vector3(5, this.height, 5);
	cam.checkCollisions = true;
	cam.applyGravity = true;


	cam.speed = this.speed;
	cam.intertia = this.intertia;
	//cam.angularIntertia = this.angularIntertia;
	//cam.angularsensibility = this.angularsensibility;
	cam.layerMask = 2;

	//console.log(this.camera);
	//user clicks on camera to enable controls
	this.controlEnabled = false;


	var _this = this;
	var canvas = this.scene.getEngine().getRenderingCanvas();

	canvas.addEventListener("click", function(evt) {
		var width = _this.scene.getEngine().getRenderWidth();
		var height = _this.scene.getEngine().getRenderHeight();

		if(_this.controlEnabled) {
			var pickInfo = _this.scene.pick(width/2, height/2, null, false, _this.camera);
			_this.handleUserMouse(evt, pickInfo);
		}
	}, false);

	

	//this._initPointerLock();

	//this.scene.activeCameras.push(this.camera);

	//this.scene.activeCamera = this._initCamera();

};

Player.prototype = {

	_initPointerLock : function() {
		//var _this = this;
		//_this.scene.activeCamera = this._initCamera();
		

		var canvas = this.scene.getEngine().getRenderingCanvas();
		//_this.scene.activeCamera.attachControl(this.demo);

		canvas.addEventListener("click", function(evt) {
			canvas.requestPointerLock = canvas.requestPointerLock || 
			canvas.msRequestPointerLock || canvas.mozRequestPointerLock || 
			canvas.webkitRequestPointerLock;

			if(canvas.requestPointerLock) {
				canvas.requestPointerLock();
			}
		}, false);

		var pointerlockchange = function(event) {
			this.controlEnabled = (document.mozPointerLockElement === canvas || 
				document.webkitRequestPointerLockElement === canvas || 
				document.msPointerLockElement === canvas || 
				document.pointerLockElement === canvas);


			if(!this.controlEnabled) {
				
				this.camera.detachControl(canvas);
				//console.log("cam" + _this.scene.activeCamera);
				console.log("dettach: " + this.scene.activeCamera.detachControl(canvas));
			} else {
				this.camera.attachControl(canvas);
				console.log("attach: " + 
					this.scene.activeCamera.attachControl(this.scene.getEngine().getRenderingCanvas()));
			}

		};


	}, 





	/*

	_initCamera : function() {

		var cam = new BABYLON.FreeCamera("cam", this.spawn, this.scene);
		cam.attachControl(this.scene.getEngine().getRenderingCanvas());
		cam.ellipsoid = new BABYLON.Vector3(5, this.height, 5);
		cam.checkCollisions = true;
		cam.applyGravity = true;

		cam.keysUp = [90];
		cam.keysDown = [83];
		cam.keysLeft = [81];
		cam.keysRight = [68];

		cam.speed = this.speed;
		cam.intertia = this.intertia;
		//cam.angularIntertia = this.angularIntertia;
		//cam.angularsensibility = this.angularsensibility;
		cam.layerMask = 2;

		return cam;

	}, 
*/
	handleUserMouse : function(evt, pickInfo) {
		console.log("pickInfo: " + pickInfo);
	}


}