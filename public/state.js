var state = {};
var id_state = {};

var currentRoom = 0;
var lastRoom = 0;
var blockCount = 0;
var lastColor = 0;

function initState() {
	if(!state[currentRoom]) {
		state[currentRoom] = [];
	}
}

function addBlock(b) {
	state[currentRoom].push({block: b, id: blockCount});
	blockCount++;
}

function deleteBlock(b) {
	return state[currentRoom].pop().block;
}

function roomStack() {
	return state[currentRoom];
}

function changeRooms(newRoomId) {
	lastRoom = currentRoom;
	currentRoom = newRoomId;
}

function fillGroup(group) {
	for(i = 0; i < state[currentRoom].length; i++) {
		group.add(state[currentRoom][i].block);
	}
}

function clearGroup(group) {
	for(i = 0; i < state[lastRoom].length; i++) {
		group.remove(state[lastRoom][i].block);
	}

}

function previousRoom(group) {
	temp = currentRoom;
	currentRoom = lastRoom;
	lastRoom = temp;
}