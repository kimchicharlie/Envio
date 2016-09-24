var editor_container;
var editor_selected;
var editor_hasMoved, editor_raycaster, editor_mouse, editor_camera, editor_scene, editor_renderer, editor_plane, editor_INTERSECTED = null,
	editor_objects = [];
var editor_lookAtPos = new THREE.Object3D();
var editor_mouseDownPos;
var WALL_HEIGHT = 40, WALL_WIDTH = 200, WALL_Y_DETAIL = 10, WALL_X_DETAIL = 10
	PLANE_WIDTH = 10000;
//var MAIN_URL = "http://localhost:1337";
var MAIN_URL = "http://137.74.40.245:8081";
var API_KEY = 'f8c5e1xx5f48e56s4x8', ORGANISATION = "Envio"

function editor()
{
	editor_init();
	editor_animate();
}

function editor_init() {

	editor_container = null;
	editor_selected = null;
	editor_hasMoved = null, editor_raycaster = null, editor_mouse = null, editor_camera = null, editor_scene = null, editor_renderer = null, editor_plane = null, editor_INTERSECTED = null;
	editor_lookAtPos = new THREE.Object3D();
	editor_mouseDownPos = null;

	editor_container = document.getElementById("containerEditor")
	// document.body.appendChild( editor_container );

	editor_raycaster = new THREE.Raycaster();
	editor_mouse = new THREE.Vector2();

	// Camera

	editor_camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 5000 );
	editor_camera.position.x = 0;
	editor_camera.position.y = 200;
	editor_camera.position.z = 0;

	editor_scene = new THREE.Scene();

	editor_loadRoomsFromDatabase();

	// Plane
	//	It is used for raycast intersections.

	var geometry = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_WIDTH);
	var plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({visible: false/*, color: 0x000000*/}));
	plane.position.y = -0.01;
	plane.position.x = 0;
	plane.position.z = 0;
	plane.rotation.x = -90 * (Math.PI/180);
	plane.name = "SCENE_GROUND";
	editor_scene.add( plane );
	plane.info = null;
	editor_objects.push(plane);
	
	
	// Lights

	var ambientLight = new THREE.AmbientLight( 0x555555 );
	editor_scene.add( ambientLight );

	var directionalLight = new THREE.DirectionalLight( 0x50D0FF );
	directionalLight.position.x = 0.5;
	directionalLight.position.y = 0.5;
	directionalLight.position.z = 1;
	editor_scene.add( directionalLight );

	// Renderer

	if ( Detector.webgl ) {
		editor_renderer = new THREE.WebGLRenderer({antialias:true}); 
	} else { 
		editor_renderer = new THREE.CanvasRenderer();
	} 
	editor_renderer.setClearColor( 0xf0f0f0 );
	editor_renderer.setPixelRatio( window.devicePixelRatio );
	editor_renderer.setSize( window.innerWidth, window.innerHeight );
	editor_container.appendChild( editor_renderer.domElement );


	window.addEventListener( 'resize', onWindowResize, false );
	editor_renderer.domElement.addEventListener( 'mousedown', editor_onMouseDown );
	editor_renderer.domElement.addEventListener( 'mouseup', editor_onMouseUp );
	editor_renderer.domElement.addEventListener( 'mousemove', editor_onMouseMove );
	
	// Adding controls

	$("editor_canvas").parent().attr("id", "containerEditor");	
	$("#containerEditor")
		.append($('<div><p id="name">--</p></div><br/>'))
		.append($('<label for="height">Largeur :</label><input type="number" onblur="applyChanges()" id="height" value="0"></input><br/>'))
		.append($('<label for="width">Longueur :</label><input type="number" onblur="applyChanges()" id="width" value="0"></input><br/>'))
		.append($('<label for="posX">Position X :</label><input type="number" onblur="applyChanges()" id="posX" value="0"></input><br/>'))
		.append($('<label for="posY">Position Y :</label><input type="number" onblur="applyChanges()" id="posY" value="0"></input><br/>'))
		.append($('<button id="saveChanges" onclick="saveChanges()">Enregistrer</button>'));
}

function saveChanges() {
	for (var i = editor_objects.length - 1; i >= 0; i--) {
		if (editor_objects[i].name == "SCENE_GROUND")
			continue;
		var data = {
			api_key: API_KEY,
			organisation: ORGANISATION,
			name: editor_objects[i].info.name,
			data: '{"size": {"length":' + editor_objects[i].geometry.parameters.width + ', "width":' + editor_objects[i].geometry.parameters.height + ', "height":40}, "position": {"x":' + editor_objects[i].position.x + ', "y":' + editor_objects[i].position.y + ', "z":' + editor_objects[i].position.z + '}}'
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
	editor_selected.geometry.parameters.width = parseInt($("#height").val());
	editor_selected.geometry.parameters.height = parseInt($("#width").val());
	editor_selected.position.z = -parseInt($("#posX").val());
	editor_selected.position.x = -parseInt($("#posY").val());
}

var editor_unplacedRooms;
var editor_queue;
function editor_loadRoomFromDatabase (id)
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
				editor_unplacedRooms.push(text);
				editor_queue--;
			}
			else
				editor_addRoom(parsed["size"], parsed["position"], text["room"]);
		},
		error:   function(error) {
		},
		complete: function () {
		}
	});
}

function editor_loadRoomsFromDatabase ()
{
	editor_unplacedRooms = [];
	editor_queue = 0;
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
					editor_queue++;
					editor_loadRoomFromDatabase(text["rooms"][key]._id);
				}
			}
		},
		error:   function() {

			// An error occurred
		}
	}).then(function () {
		editor_placeUnplacedRooms();
	});
}

// height and width are reversed
function editor_placeUnplacedRooms() {
	if (editor_queue > 0) {
		setTimeout(editor_placeUnplacedRooms, 50);
		return;
	}
	var right = 0;
	for (var i = editor_objects.length - 1; i >= 0; i--) {
		if (editor_objects[i].name != "SCENE_GROUND" && editor_objects[i].position.z + editor_objects[i].geometry.parameters.height / 2 > right) right = editor_objects[i].position.z + editor_objects[i].geometry.parameters.height / 2;
	}
	for (var i = editor_unplacedRooms.length - 1; i >= 0; i--) {
		editor_addRoom({"height": 40, "width": 100, "length": 100}, {"x": 0, "y": 0, "z": right + 50}, unplacedRooms[i]["room"]);
		right += 100;
	}
}

// x+ -> down
// z+ -> left
function editor_addRoom (size, position, infos) {

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
	editor_scene.add( ground );

	if (typeof(infos) === "undefined")
		infos = {name:"<Nameless Room>"};
	var spritey = makeTextSprite( " " + infos.name + " ", { fontsize: 32, backgroundColor: {r:240, g:240, b:240, a:1} } );
	spritey.position.set(position.x, position.y, position.z);
	spritey.info = infos;
	spritey.name = "SPRITEY_" + infos.name;
	editor_scene.add( spritey );
	editor_scene.add( parent );
	editor_objects.push(ground);
	editor_queue--;
}

function editor_getDirectionVector (object) {
	var lookAtVector = new THREE.Vector3(0,0, -1);
	lookAtVector.applyQuaternion(object.quaternion);
	return lookAtVector;
}

function onWindowResize() {

	editor_camera.left = window.innerWidth / - 2;
	editor_camera.right = window.innerWidth / 2;
	editor_camera.top = window.innerHeight / 2;
	editor_camera.bottom = window.innerHeight / - 2;

	editor_camera.updateProjectionMatrix();

	editor_renderer.setSize( window.innerWidth, window.innerHeight );

}

function editor_onMouseMove (event) {
	event.preventDefault();

	editor_mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	editor_mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	if (editor_INTERSECTED) {
		editor_hasMoved = true;
		editor_raycaster.setFromCamera( editor_mouse, editor_camera );
		var intersects = editor_raycaster.intersectObjects ( editor_objects );
		if (intersects.length == 0)
			return;
		intersects = intersects[intersects.length - 1];
		var delta = {x: intersects.point.x - editor_mouseDownPos.x, z:intersects.point.z - editor_mouseDownPos.z};

		editor_lookAtPos.translateX(-delta.x / 2);
		editor_lookAtPos.translateZ(-delta.z / 2);

		editor_mouseDownPos = intersects.point;
	}
}

function editor_onMouseDown (event) {

	event.preventDefault();

	editor_raycaster.setFromCamera( editor_mouse, editor_camera );
	var intersects = editor_raycaster.intersectObjects( editor_objects );

	if (intersects.length == 0)
		return;

	editor_hasMoved = false;
	editor_INTERSECTED = intersects[intersects.length -1];
	editor_mouseDownPos = editor_INTERSECTED.point;

	// Create associated name sprite
	if (editor_selected != null && editor_selected != intersects[0].object) {
		var spritey = makeTextSprite( " " + editor_selected.info.name + " ", { fontsize: 32, backgroundColor: {r:240, g:240, b:240, a:1} } );
		spritey.position.set(editor_selected.position.x, editor_selected.position.y, editor_selected.position.z);
		spritey.info = editor_selected.info;
		spritey.name = "SPRITEY_" + editor_selected.info.name;
		editor_scene.add( spritey );
		editor_selected = null;
	}

	// On room click, display its informations
	if (editor_INTERSECTED && intersects[0].object.name != "SCENE_GROUND" && intersects.length > 1) {
		if (!editor_hasMoved && intersects.length != 0) {
			displayInfo(intersects[0].object);
			var object = editor_scene.getObjectByName("SPRITEY_" + intersects[0].object.info.name);
			editor_scene.remove(object);
			editor_selected = intersects[0].object;
		}
	}
}

function editor_onMouseUp (event) {
	editor_INTERSECTED = null;
}

function displayInfo (object) {
	if (object.info)
		$("#name").text(object.info.name);
	$("#height").val(object.geometry.parameters.width);
	$("#width").val(object.geometry.parameters.height);
	$("#posX").val(-object.position.z);
	$("#posY").val(-object.position.x);
	editor_animate();
}

function editor_animate() {

	requestAnimationFrame( editor_animate );

	editor_render();

}

function editor_render() {

	editor_camera.position.x = editor_lookAtPos.position.x;
	editor_camera.position.z = editor_lookAtPos.position.z;
	
	editor_camera.lookAt( editor_lookAtPos.position );

	editor_renderer.render( editor_scene, editor_camera );
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