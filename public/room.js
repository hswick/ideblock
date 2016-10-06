function room() {
	geometry = new THREE.Geometry();

	//Initial 4 corners of the ground
	lt = new THREE.Vector3(-w/2, 0, -h/2);
	rt = new THREE.Vector3(w/2, 0, -h/2);
	rb = new THREE.Vector3(w/2, 0, h/2);
	lb = new THREE.Vector3(-w/2, 0, h/2);
	//geometry.vertices.push(lt, rt, rb, lb);

	
	//Wall 1 Back wall
	//Triangle 1
	//Add vector3s for more points to geometry.vertices
	p0 = new THREE.Vector3(-w/2, w/2, -h/2);//0
	p1 = new THREE.Vector3(w/2, 0, -h/2);//1
	p2 = new THREE.Vector3(-w/2, 0, -h/2);//2

	//Wall 1 Face 1 Back wall
	geometry.vertices.push(p0, p1, p2);
	geometry.faces.push(new THREE.Face3(0, 1, 2));

	//Wall 1 Face 2
	geometry.vertices.push(new THREE.Vector3(w/2, w/2, -h/2));//3
	geometry.faces.push(new THREE.Face3(0, 3, 1));

	//Wall 2 Left wall
	//Face 1: 0, 2, 4
	geometry.vertices.push(new THREE.Vector3(-w/2, 0, h/2));//4
	geometry.faces.push(new THREE.Face3(0, 2, 4));

	//Face 2: 0, 4, 5
	 geometry.vertices.push(new THREE.Vector3(-w/2, w/2, h/2));//5
	 geometry.faces.push(new THREE.Face3(0, 4, 5));

	//Wall 3 Right wall
	//Face 1: 6, 1, 3
	geometry.vertices.push(new THREE.Vector3(w/2, w/2, h/2));//6
	geometry.faces.push(new THREE.Face3(6, 1, 3));

	//Face 2: 6, 7, 1
	geometry.vertices.push(new THREE.Vector3(w/2, 0, h/2));//7
	geometry.faces.push(new THREE.Face3(6, 7, 1));

	//Wall 4 Ceiling
	//Face 1: 6, 3, 0
	//Face 2: 5, 6, 0
	geometry.faces.push(new THREE.Face3(6, 3, 0));
	geometry.faces.push(new THREE.Face3(5, 6, 0))

	//Wall 5 Floor
	//Face 1: 1 4 2
	//Face 2: 1 7 4
	geometry.faces.push(new THREE.Face3(1, 4, 2));
	geometry.faces.push(new THREE.Face3(1, 7, 4));

	//Wall 6 Front Wall
	//geoemtry.faces.push(new THREE.Face3())

	//Have to call this in order to get shadows with pLight
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: "#ffffff", side: THREE.DoubleSide}));
	mesh.receiveShadow = true;
	return mesh;
}