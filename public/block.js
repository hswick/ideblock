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

	geometry.computeBoundingBox();
	//material = new THREE.MeshBasicMaterial({map: texture});
	material = new THREE.MeshPhongMaterial({color: new THREE.Color(THREE.Math.randFloat(0,1), THREE.Math.randFloat(0,1), THREE.Math.randFloat(0,1))});
	mesh = new THREE.Mesh( geometry, material );
	return mesh;
}

function isTouchingBlock(a, b) {
	bounds1 = a.geometry.boundingBox.clone();
	bounds2 = b.geometry.boundingBox.clone();

	return (bounds1.min.x <= bounds2.max.x && bounds1.max.x >= bounds2.min.x) &&
         (bounds1.min.y <= bounds2.max.y && bounds1.max.y >= bounds2.min.y) &&
         (bounds1.min.z <= bounds2.max.z && bounds1.max.z >= bounds2.min.z);
}