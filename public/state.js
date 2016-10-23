var state = {};
var id_state = {};

var currentRoom = 0;
var lastRoom = 0;
var blockCount = 0;

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