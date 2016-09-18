var texture = new THREE.TextureLoader().load( 'blockTexture.png' );

function tree() {
	radialTree = new THREE.Object3D();

	radialTree.position.y+=30;

	node(radialTree, 3, radialTree.position.x, radialTree.position.y, radialTree.position.z);
	init = radialTree.position;

	theta = math.tau/4;
	radius = 10;
	nodes = [];
	points = 6;
	x = 0;
	y = 0;

	for(i = 0; i < points; i++) {
		x = init.x+math.cos(theta) * radius;
		y = init.y+math.sin(theta) * radius;
		z = 0;
		node(radialTree, 3, x, y, z);
		theta+=math.tau/points;
		edge(radialTree, init, new THREE.Vector3(x, y, z));
		nodes.push(new THREE.Vector3(x, y, z));
		if(nodes.length > 1) {
			edge(radialTree, nodes[i-1], nodes[i]);
		}
	}
	edge(radialTree, nodes[0], nodes[nodes.length-1]);
	return radialTree;
}

function edge(group, p1, p2) {
	geometry = new THREE.Geometry();
	geometry.vertices.push(p1, p2);
	group.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({color: new THREE.Color(THREE.Math.randFloat(0, 1), THREE.Math.randFloat(0, 1), 0)})));
}

function node(group, r, x, y, z) {
	geometry = new THREE.SphereGeometry(r, 10, 10);
	geometry.translate(x, y, z);
	// material = new THREE.MeshPhongMaterial( {color: new THREE.Color(THREE.Math.randFloat(0, 1), THREE.Math.randFloat(0, 1), 0)} );
	material = new THREE.MeshPhongMaterial( {map: texture});
	//material = new THREE.MeshPhongMaterial({color: new THREE.Color(1, 1, 1)});
	sphere = new THREE.Mesh( geometry, material );
	group.add(sphere);
}