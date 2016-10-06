function cube(group, x, y, z) {
	geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
	geometry.translate(x, y, z);
	//material = new THREE.MeshBasicMaterial({map: texture});
	material = new THREE.MeshPhongMaterial({color: new THREE.Color(1, 0, 0)});
	mesh = new THREE.Mesh( geometry, material );
	mesh.castShadow = true;
	group.add( mesh );
}

var counter = 0;

var pastels = ["#e1f7d5", "#ffbdbd", "#c9c9ff", "#ffffff", "#f1cbff"];

function cursorBlock(x, y, z) {
	geometry = new THREE.BoxBufferGeometry( 30, 20, 30 );
	geometry.translate(x, y+20, z);

	geometry.computeBoundingBox();
	material = new THREE.MeshPhongMaterial({color: pastels[counter++]});
	if(counter >= pastels.length) counter = 0;
	//material = new THREE.MeshPhongMaterial({color: pastels[THREE.Math.randInt(0, pastels.length+1)]});
	//material = new THREE.MeshPhongMaterial({color: new THREE.Color(THREE.Math.randFloat(0,1), THREE.Math.randFloat(0,1), THREE.Math.randFloat(0,1))});
	mesh = new THREE.Mesh( geometry, material );
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	return mesh;
}

//This should copy a blocks information. vector3 as input
function cursorWireframe(x, y, z) {
	//console.log("wire being called");
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
	//wireframe.translateY(-5);//y/4

	l4 = edge(new THREE.Vector3(x, y+20, z), new THREE.Vector3(x, w/2, z));
	l5 = edge(new THREE.Vector3(x, y+20, z), new THREE.Vector3(w, y+20, z));
	l6 = edge(new THREE.Vector3(x, y+20, z), new THREE.Vector3(-w, y+20, z));
	//l7 = edge(new THREE.Vector3(x, y+20, z), new THREE.Vector3(x, -w/2, z)); dont need bottom cursor cuz of falling motion
	l8 = edge(new THREE.Vector3(x, y+20, z), new THREE.Vector3(x, y, h));
	l9 = edge(new THREE.Vector3(x, y+20, z), new THREE.Vector3(x, y, -h));
	wireframe.add(l4);

	wireframe.bounds = bounds;

	return wireframe;
}

function edge(p1, p2) {
	geometry = new THREE.Geometry();
	geometry.vertices.push(p1, p2);
	return new THREE.Line(geometry, new THREE.LineBasicMaterial({color: new THREE.Color(0, 0, 0)}));
}

function cursorCollision(cursor, block) {
	block.geometry.computeBoundingBox();
	min = new THREE.Vector3().addVectors(cursor.bounds.min, cursor.position);
	max = new THREE.Vector3().addVectors(cursor.bounds.max, cursor.position);
	bounds1 = {};
	bounds1.min = min;
	bounds1.max = max;
	bounds2 = block.geometry.boundingBox;
	return min.distanceTo(bounds2.min) + max.distanceTo(bounds2.max) == 0.0;
}

function blockUnderneath(cursor, block) {
	block.geometry.computeBoundingBox();
	min = new THREE.Vector3().addVectors(cursor.bounds.min, cursor.position);
	max = new THREE.Vector3().addVectors(cursor.bounds.max, cursor.position);
	bounds1 = {};
	bounds1.min = min;
	bounds1.max = max;
	bounds2 = block.geometry.boundingBox;

	bottomMin = new THREE.Vector3().addVectors(min, new THREE.Vector3(0, -20, 0));
	bottomMax = new THREE.Vector3().addVectors(max, new THREE.Vector3(0, -20, 0));
	return bottomMin.distanceTo(bounds2.min) + bottomMax.distanceTo(bounds2.max) == 0.0;

	//console.log(block.position);

	// return cursor.position.x == block.geometry.position.x &&
	// 	   cursor.position.z == block.geometry.position.z &&
	// 	   cursor.position.y > block.geometry.position.y;
}