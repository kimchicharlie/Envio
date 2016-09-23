var container;
var hasMoved, raycaster, mouse, camera, scene, renderer, plane, INTERSECTED = null,
	objects = [], parents = [];
var GUIObject = null;
var lookAtPos = new THREE.Object3D(), cameraAngle = 45;
var mouseDownPos;
var WALL_HEIGHT = 40, WALL_WIDTH = 200, WALL_Y_DETAIL = 10, WALL_X_DETAIL = 10
	PLANE_WIDTH = 10000;
var MAIN_URL = "http://localhost:1337", API_KEY = 'f8c5e1xx5f48e56s4x8', ORGANISATION = "Envio"

function editor()
{
	init();
	animate();
}

function init() {

	container = document.getElementById("container")
	// document.body.appendChild( container );

	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	// Camera

	camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 5000 );
	camera.position.x = 0;
	camera.position.y = 200;
	camera.position.z = 0;

	scene = new THREE.Scene();

	loadRoomsFromDatabase();

	// Plane
	//	It is used for raycast intersections.

	var geometry = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_WIDTH);
	var plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({visible: false/*, color: 0x000000*/}));
	plane.position.y = -0.01;
	plane.position.x = 0;
	plane.position.z = 0;
	plane.rotation.x = -90 * (Math.PI/180);
	plane.name = "SCENE_GROUND";
	scene.add( plane );
	plane.info = null;
	objects.push(plane);
	
	
	// Lights

	var ambientLight = new THREE.AmbientLight( 0x555555 );
	scene.add( ambientLight );

	var directionalLight = new THREE.DirectionalLight( 0x50D0FF );
	directionalLight.position.x = 0.5;
	directionalLight.position.y = 0.5;
	directionalLight.position.z = 1;
	scene.add( directionalLight );

	// Renderer

	if ( Detector.webgl ) {
		renderer = new THREE.WebGLRenderer({antialias:true}); 
	} else { 
		renderer = new THREE.CanvasRenderer();
	} 
	renderer.setClearColor( 0xf0f0f0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );


	window.addEventListener( 'resize', onWindowResize, false );
	renderer.domElement.addEventListener( 'mousedown', onMouseDown );
	renderer.domElement.addEventListener( 'mouseup', onMouseUp );
	renderer.domElement.addEventListener( 'mousemove', onMouseMove );
	
	// Adding controls

	$("canvas").parent().attr("id", "container");	
	$("#container")
		.append($('<div><p id="name">--</p></div><br/>'))
		.append($('<label for="height">Largeur :</label><input type="number" onblur="applyChanges()" id="height" value="0"></input><br/>'))
		.append($('<label for="width">Longueur :</label><input type="number" onblur="applyChanges()" id="width" value="0"></input><br/>'))
		.append($('<label for="posX">Position X :</label><input type="number" onblur="applyChanges()" id="posX" value="0"></input><br/>'))
		.append($('<label for="posY">Position Y :</label><input type="number" onblur="applyChanges()" id="posY" value="0"></input><br/>'))
		.append($('<button id="saveChanges" onclick="saveChanges()">Enregistrer</button>'));
}

function saveChanges() {
	for (var i = objects.length - 1; i >= 0; i--) {
		if (objects[i].name == "SCENE_GROUND")
			continue;
		var data = {
			api_key: API_KEY,
			organisation: ORGANISATION,
			name: objects[i].info.name,
			data: '{"size": {"length":' + objects[i].geometry.parameters.width + ', "width":' + objects[i].geometry.parameters.height + ', "height":40}, "position": {"x":' + objects[i].position.x + ', "y":' + objects[i].position.y + ', "z":' + objects[i].position.z + '}}'
		};
		$.ajax({
			type:    "POST",
			url:     MAIN_URL + "/api/modifyData/",
			data:    data,
			success: function(text) {
			},
			error:   function(error) {
				console.log(error)
			},
			complete: function () {
			}
		});
	}
}

function applyChanges() {
	selected.geometry.parameters.width = parseInt($("#height").val());
	selected.geometry.parameters.height = parseInt($("#width").val());
	selected.position.z = -parseInt($("#posX").val());
	selected.position.x = -parseInt($("#posY").val());
}

var unplacedRooms;
var queue;
function loadRoomFromDatabase (id)
{
	var data = {
		api_key: API_KEY,
		organisation: ORGANISATION,
		roomID: id
	};
	$.ajax({
		type:    "POST",
		url:     MAIN_URL + "/api/getRoom/",
		data:    data,
		success: function(text) {
			var parsed = $.parseJSON(text["room"]["data"]);
			if (parsed == null) {
				text["room"]["data"] = parsed
				unplacedRooms.push(text);
				queue--;
			}
			else
				addRoom(parsed["size"], parsed["position"], text["room"]);
		},
		error:   function(error) {
		},
		complete: function () {
		}
	});
}

function loadRoomsFromDatabase ()
{
	unplacedRooms = [];
	queue = 0;
	var data = {
		api_key: API_KEY,
		organisation: 'Envio',
	};
	$.ajax({
		type:    "POST",
		url:     MAIN_URL + "/api/getRooms/",
		data:    data,
		success: function(text) {
			for (var key in text["rooms"]) {
				if (text["rooms"].hasOwnProperty(key)) {
					queue++;
					loadRoomFromDatabase(text["rooms"][key]._id);
				}
			}
		},
		error:   function() {

			// An error occurred
		}
	}).then(function () {
		placeUnplacedRooms();
	});
}

// height and width are reversed
function placeUnplacedRooms() {
	if (queue > 0) {
		setTimeout(placeUnplacedRooms, 50);
		return;
	}
	var right = 0;
	for (var i = objects.length - 1; i >= 0; i--) {
		if (objects[i].name != "SCENE_GROUND" && objects[i].position.z + objects[i].geometry.parameters.height / 2 > right) right = objects[i].position.z + objects[i].geometry.parameters.height / 2;
	}
	console.log(right)
	for (var i = unplacedRooms.length - 1; i >= 0; i--) {
		addRoom({"height": 40, "width": 100, "length": 100}, {"x": 0, "y": 0, "z": right + 50}, unplacedRooms[i]["room"]);
		right += 100;
	}
}

// x+ -> down
// z+ -> left
function addRoom (size, position, infos) {

	// Parent object
	var parent = new THREE.Object3D();

	// Ground
	var material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } );
	var geometry = new THREE.PlaneGeometry(size.length, size.width, WALL_X_DETAIL, WALL_Y_DETAIL);
	var ground = new THREE.Mesh(geometry, material);	
	ground.position.y = position.y;
	ground.position.x = position.x;
	ground.position.z = position.z;
	ground.rotation.x = -90 * (Math.PI/180);
	ground.info = infos;
	parent.add( ground );
	scene.add( ground );

	if (typeof(infos) === "undefined")
		infos = {name:"<Nameless Room>"};
	var spritey = makeTextSprite( " " + infos.name + " ", { fontsize: 32, backgroundColor: {r:240, g:240, b:240, a:1} } );
	spritey.position.set(position.x, position.y, position.z);
	spritey.info = infos;
	spritey.name = "SPRITEY_" + infos.name;
	scene.add( spritey );
	scene.add( parent );
	objects.push(ground);
	queue--;
}

function getDirectionVector (object) {
	var lookAtVector = new THREE.Vector3(0,0, -1);
	lookAtVector.applyQuaternion(object.quaternion);
	return lookAtVector;
}

function onWindowResize() {

	camera.left = window.innerWidth / - 2;
	camera.right = window.innerWidth / 2;
	camera.top = window.innerHeight / 2;
	camera.bottom = window.innerHeight / - 2;

	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onMouseMove (event) {
	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	if (INTERSECTED) {
		hasMoved = true;
		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObjects ( objects );
		if (intersects.length == 0)
			return;
		intersects = intersects[intersects.length - 1];
		var delta = {x: intersects.point.x - mouseDownPos.x, z:intersects.point.z - mouseDownPos.z};

		lookAtPos.translateX(-delta.x / 2);
		lookAtPos.translateZ(-delta.z / 2);

		mouseDownPos = intersects.point;
	}
}

var selected = null;
function onMouseDown (event) {

	event.preventDefault();

	if (selected != null) {
		var spritey = makeTextSprite( " " + selected.info.name + " ", { fontsize: 32, backgroundColor: {r:240, g:240, b:240, a:1} } );
		spritey.position.set(selected.position.x, selected.position.y, selected.position.z);
		spritey.info = selected.info;
		spritey.name = "SPRITEY_" + selected.info.name;
		scene.add( spritey );
		selected = null;
	}

	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( objects );

	if (intersects.length == 0)
		return;

	hasMoved = false;
	INTERSECTED = intersects[intersects.length -1];
	mouseDownPos = INTERSECTED.point;

	// On room click, display its informations
	if (INTERSECTED && intersects.length > 1) {
		if (!hasMoved && intersects.length != 0) {
			displayInfo(intersects[0].object);
			var object = scene.getObjectByName("SPRITEY_" + intersects[0].object.info.name);
			scene.remove(object);
			selected = intersects[0].object;
		}
	}
}

function onMouseUp (event) {
	INTERSECTED = null;
}

function displayInfo (object) {
	if (object.info)
		$("#name").text(object.info.name);
	$("#height").val(object.geometry.parameters.width);
	$("#width").val(object.geometry.parameters.height);
	$("#posX").val(-object.position.z);
	$("#posY").val(-object.position.x);
}

function animate() {

	requestAnimationFrame( animate );

	render();

}

function render() {

	camera.position.x = lookAtPos.position.x;
	camera.position.z = lookAtPos.position.z;
	
	camera.lookAt( lookAtPos.position );

	renderer.render( scene, camera );
}

function DegToRad (deg) {
	return deg * Math.PI / 180;
}

function makeTextSprite( message, parameters )
{
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;
	
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 4;
	
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

	//var spriteAlignment = parameters.hasOwnProperty("alignment") ?
	//	parameters["alignment"] : THREE.SpriteAlignment.topLeft;
		

	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;
	
	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	var textWidth = metrics.width;
	
	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
								  + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";

	context.lineWidth = borderThickness;
	roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
	// 1.4 is extra height factor for text below baseline: g,j,p,q.
	
	// text color
	context.fillStyle = "rgba(0, 0, 0, 1.0)";

	context.fillText( message, borderThickness, fontsize + borderThickness);
	
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas) 
	texture.minFilter = THREE.NearestFilter;
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( 
		{ map: texture } );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(125,60,1.0);
	return sprite;	
}

function roundRect(ctx, x, y, w, h, r) 
{
	ctx.beginPath();
	ctx.moveTo(x+r, y);
	ctx.lineTo(x+w-r, y);
	ctx.quadraticCurveTo(x+w, y, x+w, y+r);
	ctx.lineTo(x+w, y+h-r);
	ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
	ctx.lineTo(x+r, y+h);
	ctx.quadraticCurveTo(x, y+h, x, y+h-r);
	ctx.lineTo(x, y+r);
	ctx.quadraticCurveTo(x, y, x+r, y);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();   
}