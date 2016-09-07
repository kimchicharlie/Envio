var container;
var hasMoved, raycaster, mouse, camera, scene, renderer, plane, INTERSECTED = null,
	objects = [];
var lookAtPos = new THREE.Object3D(), cameraAngle = 45;
var mouseDownPos;
var WALL_HEIGHT = 40, WALL_WIDTH = 200, WALL_Y_DETAIL = 10, WALL_X_DETAIL = 10
	PLANE_WIDTH = 10000;
var direction;

function viewer()
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
	camera.position.x = Math.cos(DegToRad( cameraAngle )) * 200;
	camera.position.y = 100;
	camera.position.z = Math.sin(DegToRad( cameraAngle )) * 200;

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
	.append($('<img src="./Viewer/img/rotateLeft.png">')
		.attr({'id': 'rotateLeft', 'draggable': false})
		.on('click', function () {
				cameraAngle = (cameraAngle + 15 > 360 ? 15 : cameraAngle + 15);
			})
		)
	.append($('<img src="./Viewer/img/moveForward.png">')
		.attr({'id': 'moveForward', 'draggable': false})
		.on('click', function () {
				direction = getDirectionVector(camera)
				lookAtPos.translateX(-direction.x * 20);
				lookAtPos.translateZ(-direction.z * 20);
			})
		)
	.append($('<img src="./Viewer/img/rotateRight.png">')
		.attr({'id': 'rotateRight', 'draggable': false})
		.on('click', function () {
				cameraAngle = (cameraAngle - 15 < 0 ? 345 : cameraAngle - 15);
			})
		)
	.append($('<img src="./Viewer/img/moveLeft.png">')
		.attr({'id': 'moveLeft', 'draggable': false})
		.on('click', function () {
				direction = getDirectionVector(camera)
				direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), DegToRad(-90));
				lookAtPos.translateX(direction.x * 20);
				lookAtPos.translateZ(direction.z * 20);
			})
		)
	.append($('<img src="./Viewer/img/moveBackward.png">')
		.attr({'id': 'moveBackward', 'draggable': false})
		.on('click', function () {
				direction = getDirectionVector(camera)
				lookAtPos.translateX(direction.x * 20);
				lookAtPos.translateZ(direction.z * 20);
			})
		)
	.append($('<img src="./Viewer/img/moveRight.png">')
		.attr({'id': 'moveRight', 'draggable': false})
		.on('click', function () {
				direction = getDirectionVector(camera)
				direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), DegToRad(90));
				lookAtPos.translateX(direction.x * 20);
				lookAtPos.translateZ(direction.z * 20);
			})
		)
	.append($('<div><p id="name">--</p></div>'));
}

function loadRoomFromDatabase (id)
{
	var data = {
		api_key: 'f8c5e1xx5f48e56s4x8',
		organisation: 'Envio',
		roomID: id
	};
	$.ajax({
	    type:    "POST",
	    url:     "http://localhost:1337/api/getRoom/",
	    data:    data,
	    success: function(text) {
	    	console.log(text["room"]["data"]["size"]);
	    	var parsed = $.parseJSON(text["room"]["data"]);
	    	addRoom(parsed["size"], parsed["position"], text["room"]);
	    },
	    error:   function(error) {
	    }
	});
}

function loadRoomsFromDatabase ()
{
	var data = {
		api_key: 'f8c5e1xx5f48e56s4x8',
		organisation: 'Envio',
	};
	$.ajax({
	    type:    "POST",
	    url:     "http://localhost:1337/api/getRooms/",
	    data:    data,
	    success: function(text) {
	    	for (var key in text["rooms"]) {
				if (text["rooms"].hasOwnProperty(key)) {
    				loadRoomFromDatabase(text["rooms"][key]._id);
  				}
			}
	    },
	    error:   function() {
	        // An error occurred
	    }
	});
}

// width -> z axis
// length -> x axis
// height -> y axis
// Add a "name" parameter in the object added to objects
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

	// Walls

	var geometry = new THREE.PlaneGeometry(size.width, size.height, WALL_X_DETAIL, WALL_Y_DETAIL);
	var wallBotRight = new THREE.Mesh(geometry, material);	
	wallBotRight.position.y = position.y + size.height / 2;
	wallBotRight.position.x = position.x + size.length / 2;
	wallBotRight.position.z = position.z;
	wallBotRight.rotation.y = -90 * (Math.PI/180);
	wallBotRight.info = infos;
	parent.add( wallBotRight );
	scene.add( wallBotRight );

	var wallTopLeft = new THREE.Mesh(geometry, material);
	wallTopLeft.position.y = position.y + size.height / 2;
	wallTopLeft.position.x = position.x - size.length / 2;
	wallTopLeft.position.z = position.z;
	wallTopLeft.rotation.y = 90 * (Math.PI/180);
	wallTopLeft.info = infos;
	parent.add( wallTopLeft );
	scene.add( wallTopLeft );

	var geometry = new THREE.PlaneGeometry(size.length, size.height, WALL_X_DETAIL, WALL_Y_DETAIL);
	var wallBotLeft = new THREE.Mesh(geometry, material);	
	wallBotLeft.position.y = position.y + size.height / 2;
	wallBotLeft.position.x = position.x;
	wallBotLeft.position.z = position.z + size.width / 2;
	wallBotLeft.rotation.y = 180 * (Math.PI/180);
	wallBotLeft.info = infos;
	parent.add( wallBotLeft );
	scene.add( wallBotLeft );

	var wallTopRight = new THREE.Mesh(geometry, material);	
	wallTopRight.position.y = position.y + size.height / 2;
	wallTopRight.position.x = position.x;
	wallTopRight.position.z = position.z - size.width / 2;
	wallTopRight.rotation.y = 0;
	wallTopRight.info = infos;
	parent.add( wallTopRight );
	scene.add( wallTopRight );

	if (typeof(infos) === "undefined")
		infos = {name:"<Nameless Room>"};
	var spritey = makeTextSprite( " " + infos.name + " ", { fontsize: 32, backgroundColor: {r:240, g:240, b:240, a:1} } );
	spritey.position.set(position.x, position.y, position.z);
	spritey.info = infos;
	parent.add( spritey );
	scene.add( spritey );
	scene.add( parent );
	objects.push(ground);
	objects.push(wallTopRight);
	objects.push(wallBotLeft);
	objects.push(wallTopLeft);
	objects.push(wallBotRight);

}

function updateDatabase() {
	var output = parent.toJSON();
	try {
		output = JSON.stringify( output, null, '\t' );
		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
	} catch ( e ) {
		output = JSON.stringify( output );
	}
	var data = {
		api_key: 'f8c5e1xx5f48e56s4x8',
		organisation: 'envio',
		name: 'testRoom',
		volume: 10
	};
	// $.ajax({
	// 	type: 'POST',
	// 	headers: {"Access-Control-Allow-Credentials": true},
	// 	data: JSON.stringify(data),
	// 	contentType: 'application/json',
	// 	url: 'http://localhost:1337/createRoom',
	// 	success: function (data) {
	// 		console.log('Success');
	// 	},
	// 	fail: function (data) {
	// 		console.log('Fail');
	// 	}
	// });
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

function onMouseUp (argument) {
	if (INTERSECTED) {
		var intersects = raycaster.intersectObjects ( objects );
		if (!hasMoved && intersects.length != 0) {
			displayInfo(intersects[0].object);
		}
		INTERSECTED = null;
	}
}

function displayInfo (object) {
	if(object.info)
	$("#name").text(object.info.name);

	// Retrieving room's info from database
	var data = {
		api_key: 'f8c5e1xx5f48e56s4x8',
		organisation: 'Envio',
/*		roomID: object.info._id*/
	};

	$.ajax({
	    type:   "POST",
	    data: 	data,
	    url:     "http://localhost:1337/api/getRoom",
	    success: function(text) {
	    	var parsed = JSON.parse(text)
	    	$("#realTemperature").text("Température actuelle : " + parsed.realTemperature)
	    	$("#temperature").text("Température paramétrée : " + parsed.temperature)
	    	$("#light").text("Luminosité ambiante : " + parsed.light);
	    },
	    error:   function() {
	        // An error occurred
	    }
	});	
}

function getPropertyName (prop) {
	switch (prop) {
		case "name":
			return "Nom de la salle";
		case "reqTemp":
			return "T° demandée";
		case "actTemp":
			return "T° actuelle";
		case "reqLumi":
			return "Lumi demandée";
		case "actLumi":
			return "Lumi actuelle";
		default:
			return "";
	}
}

function onMouseDown (event) {

	event.preventDefault();

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( objects );

	if (intersects.length == 0)
		return;

	hasMoved = false;
	INTERSECTED = intersects[intersects.length -1];
	mouseDownPos = INTERSECTED.point;
}

function animate() {

	requestAnimationFrame( animate );

	render();

}

function render() {

	camera.position.x = Math.cos( DegToRad( cameraAngle )) * 200 + lookAtPos.position.x;
	camera.position.z = Math.sin( DegToRad( cameraAngle )) * 200 + lookAtPos.position.z;
	
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