function cube(group, x, y, z) {
	geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
	geometry.translate(x, y, z);
	//material = new THREE.MeshBasicMaterial({map: texture});
	material = new THREE.MeshPhongMaterial({color: new THREE.Color(1, 0, 0)});
	mesh = new THREE.Mesh( geometry, material );
	group.add( mesh );
}

function cursorBlock(x, y, z) {
	geometry = new THREE.BoxBufferGeometry( 30, 20, 30 );
	geometry.translate(x, y+20, z);

	geometry.computeBoundingBox();
	//material = new THREE.MeshBasicMaterial({map: texture});
	material = new THREE.MeshPhongMaterial({color: new THREE.Color(THREE.Math.randFloat(0,1), THREE.Math.randFloat(0,1), THREE.Math.randFloat(0,1))});
	mesh = new THREE.Mesh( geometry, material );
	return mesh;
}

//This should copy a blocks information. vector3 as input
function cursorWireframe(x, y, z) {
	console.log("wire being called");
	wireframe = new THREE.Object3D();
	boxGeometry = new THREE.BoxBufferGeometry( 30, 20, 30 );
	boxGeometry.translate(x, y+20, z);
	boxGeometry.computeBoundingBox();
	bounds = boxGeometry.boundingBox.clone();

	p0 = new THREE.Vector3(bounds.max.x, bounds.max.y, bounds.max.z);
	p1 = new THREE.Vector3(bounds.max.x, bounds.min.y, bounds.max.z);
	p2 = new THREE.Vector3(bounds.min.x, bounds.min.y, bounds.max.z);
	p3 = new THREE.Vector3(bounds.min.x, bounds.max.y, bounds.max.z);
	p4 = new THREE.Vector3(bounds.max.x, bounds.max.y, bounds.min.z);
	p5 = new THREE.Vector3(bounds.max.x, bounds.min.y, bounds.min.z);
	p6 = new THREE.Vector3(bounds.min.x, bounds.min.y, bounds.min.z);
	p7 = new THREE.Vector3(bounds.min.x, bounds.max.y, bounds.min.z);

	topWire = new THREE.Object3D();
	l0 = edge(p0.clone(), p3.clone());
	l1 = edge(p3.clone(), p7.clone());
	l2 = edge(p7.clone(), p4.clone());
	l3 = edge(p4.clone(), p0.clone());
	topWire.add(l0, l1, l2, l3);

	bottomWire = topWire.clone(true);
	bottomWire.translateY(-10);//-y/2

	wireframe.add(topWire, bottomWire);
	wireframe.translateY(-5);//y/4

	return wireframe;

}

function edge(p1, p2) {
	geometry = new THREE.Geometry();
	geometry.vertices.push(p1, p2);
	return new THREE.Line(geometry, new THREE.LineBasicMaterial({color: new THREE.Color(0, 0, 0)}));
}

function cursorUpdate() {

}

function isTouchingBlock(a, b) {
	a.geometry.computeBoundingBox();
	b.geometry.computeBoundingBox();
	bounds1 = a.geometry.boundingBox.clone();
	bounds2 = b.geometry.boundingBox.clone();

	return (bounds1.min.x <= bounds2.max.x && bounds1.max.x >= bounds2.min.x) &&
         (bounds1.min.y <= bounds2.max.y && bounds1.max.y >= bounds2.min.y) &&
         (bounds1.min.z <= bounds2.max.z && bounds1.max.z >= bounds2.min.z);
}