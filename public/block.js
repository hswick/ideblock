function cube(group, x, y, z) {
	geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
	geometry.translate(x, y, z);
	//material = new THREE.MeshBasicMaterial({map: texture});
	material = new THREE.MeshPhongMaterial({color: new THREE.Color(1, 0, 0)});
	mesh = new THREE.Mesh( geometry, material );
	group.add( mesh );
}

function cursorBlock(x, y, z) {
	geometry = new THREE.BoxBufferGeometry( 30, 40, 30 );
	geometry.translate(x, y, z);
	//material = new THREE.MeshBasicMaterial({map: texture});
	material = new THREE.MeshPhongMaterial({color: new THREE.Color(THREE.Math.randFloat(0,1), THREE.Math.randFloat(0,1), THREE.Math.randFloat(0,1))});
	mesh = new THREE.Mesh( geometry, material );
	return mesh;
}