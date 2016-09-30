

function lighting(w, h, scene) {

var ambient = new THREE.AmbientLight( 0xffffff, 0.7 );

var spotlight = new THREE.SpotLight(new THREE.Color(1, 1, 1));

spotlight.position.set(0, 200, 600);
spotlight.castShadow = true;
spotlight.angle = 0.5
spotlight.intensity = 1;
spotlight.penumbra = 0.5;
spotlight.distance = w * 2;
spotlight.decay = 3;

spotlight.shadow.mapSize.width = 2048 + 1024;
spotlight.shadow.mapSize.height = 2048 + 1024;

//spotlight & ambient received from lighting.js
scene.add(spotlight, ambient);

// var sphelper = new THREE.SpotLightHelper(spotlight);
// scene.add(sphelper);

}