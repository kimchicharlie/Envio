{
	"metadata": {
		"version": 4.4,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "DFA4D4A3-7A49-4D8B-8007-923B02EE34A7",
			"type": "PlaneGeometry",
			"width": 200,
			"height": 200,
			"widthSegments": 10,
			"heightSegments": 10
		},
		{
			"uuid": "30D1D442-E25E-47A0-B546-4304BDDDE638",
			"type": "PlaneGeometry",
			"width": 200,
			"height": 40,
			"widthSegments": 10,
			"heightSegments": 10
		},
		{
			"uuid": "82DC74B4-152B-499F-989F-50443F20FD36",
			"type": "PlaneGeometry",
			"width": 200,
			"height": 40,
			"widthSegments": 10,
			"heightSegments": 10
		},
		{
			"uuid": "B1153411-CB41-4B8D-8369-8ACEBABD1254",
			"type": "BufferGeometry",
			"data": {
				"attributes": {
					"position": {
						"itemSize": 3,
						"type": "Float32Array",
						"array": [-0.5,-0.5,0,0.5,-0.5,0,0.5,0.5,0,-0.5,0.5,0]
					},
					"uv": {
						"itemSize": 2,
						"type": "Float32Array",
						"array": [0,0,1,0,1,1,0,1]
					}
				},
				"index": {
					"type": "Uint16Array",
					"array": [0,1,2,0,2,3]
				}
			}
		}],
	"materials": [
		{
			"uuid": "6DBE72D2-1CCD-4431-ABDD-E4EE1F18AE3F",
			"type": "MeshLambertMaterial",
			"color": 5322375,
			"emissive": 0
		},
		{
			"uuid": "F2A8EDCF-9618-4C48-9780-D559E649EAEF",
			"type": "SpriteMaterial",
			"color": 16777215,
			"map": "0D249BE0-DB2D-4C42-8D5F-58B7B96BDA68"
		}],
	"textures": [
		{
			"uuid": "0D249BE0-DB2D-4C42-8D5F-58B7B96BDA68",
			"name": "",
			"mapping": 300,
			"repeat": [1,1],
			"offset": [0,0],
			"wrap": [1001,1001],
			"minFilter": 1003,
			"magFilter": 1006,
			"anisotropy": 1,
			"image": "7D5FA438-CE13-41EE-9C2D-478CDE6793CF"
		}],
	"images": [
		{
			"uuid": "7D5FA438-CE13-41EE-9C2D-478CDE6793CF",
			"url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAT2UlEQ…SqgIAVqeNkthRIUQEBK0Wvq81SIFIFBKxIHSezpUCKCvwPFpj4PPfptZQAAAAASUVORK5CYII="
		}],
	"object": {
		"uuid": "0725582C-565E-43A3-9458-B6419C8537A4",
		"type": "Object3D",
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "1B6A011C-A239-4AC2-998F-8AD4183A16D1",
				"type": "Mesh",
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
				"geometry": "DFA4D4A3-7A49-4D8B-8007-923B02EE34A7",
				"material": "6DBE72D2-1CCD-4431-ABDD-E4EE1F18AE3F"
			},
			{
				"uuid": "010771AC-CF65-473F-9719-2DDE843694ED",
				"type": "Mesh",
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
				"geometry": "30D1D442-E25E-47A0-B546-4304BDDDE638",
				"material": "6DBE72D2-1CCD-4431-ABDD-E4EE1F18AE3F"
			},
			{
				"uuid": "29D04BAE-65FB-493C-84AA-4CFB5AF792A9",
				"type": "Mesh",
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
				"geometry": "30D1D442-E25E-47A0-B546-4304BDDDE638",
				"material": "6DBE72D2-1CCD-4431-ABDD-E4EE1F18AE3F"
			},
			{
				"uuid": "4FC78ED5-9DA0-4D64-BF32-E453654B77BE",
				"type": "Mesh",
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
				"geometry": "82DC74B4-152B-499F-989F-50443F20FD36",
				"material": "6DBE72D2-1CCD-4431-ABDD-E4EE1F18AE3F"
			},
			{
				"uuid": "A7736F57-83CF-4B54-9805-75460977935E",
				"type": "Sprite",
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
				"geometry": "B1153411-CB41-4B8D-8369-8ACEBABD1254",
				"material": "F2A8EDCF-9618-4C48-9780-D559E649EAEF"
			}]
	}
}