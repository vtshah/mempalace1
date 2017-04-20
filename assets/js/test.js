var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
    // scene.useRightHandedSystem = true;

    var camera = new BABYLON.WebVRFreeCamera("camera1", new BABYLON.Vector3(0, 0, 0), scene, false, { trackPosition: true });
    camera.deviceScaleFactor = 1;
    
    // required for chrome
    scene.onPointerDown = function () {
        scene.onPointerDown = undefined;
        camera.attachControl(canvas, true);
        camera.controllers.forEach((gp) => {
            console.log(gp);
            let mesh = gp.hand === 'right' ? rightBox : leftBox;

            gp.onPadValuesChangedObservable.add(function (stateObject) {
                let r = (stateObject.x + 1) / 2;
                let g = (stateObject.y + 1) / 2;
                mesh.material.diffuseColor.copyFromFloats(r, g, 1);
            });
            gp.onTriggerStateChangedObservable.add(function (stateObject) {
                let scale = 2 - stateObject.value;
                mesh.scaling.x = scale;
            });
            // oculus only
            /*gp.onSecondaryTriggerStateChangedObservable.add(function (stateObject) {
                let scale = 2 - stateObject.value;
                mesh.scaling.z = scale;
            });*/
            gp.attachToMesh(mesh);
        });
    }

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    var s = BABYLON.MeshBuilder.CreateTorusKnot('knot', {}, scene);

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    var rightBox = BABYLON.Mesh.CreateBox("sphere1", 0.1, scene);
    rightBox.scaling.copyFromFloats(2, 1, 2);
    var leftBox = BABYLON.Mesh.CreateBox("sphere1", 0.1, scene);
    leftBox.scaling.copyFromFloats(2, 1, 2);

    rightBox.material = new BABYLON.StandardMaterial('right', scene);
    leftBox.material = new BABYLON.StandardMaterial('right', scene);

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    //var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
    return scene;
};