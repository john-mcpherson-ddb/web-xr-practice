import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type Animation = {
	scene: THREE.Scene;
	camera: THREE.PerspectiveCamera;
	renderer: THREE.WebGLRenderer;
	// mesh: THREE.Mesh;
};

const animate = (animation: Animation) => {
	const { scene, camera, renderer } = animation;
	const render = () => {
		// mesh.rotation.y = mesh.rotation.y - 0.01;
		renderer.render(scene, camera);
	};
	animation.renderer.setAnimationLoop(render);
};

const init = () => {
	const container = document.createElement("div"); // create container
	document.body.appendChild(container); // append container to body
	// add cube to scene
	// const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
	// const material = new THREE.MeshBasicMaterial({ color: 0xe06666 });
	// const mesh = new THREE.Mesh(geometry, material);
	// mesh.position.z = -1;
	// animation.scene.add(mesh);

	// add hexidecimal shape

	const geometry = new THREE.IcosahedronGeometry(0.1, 1);
	const material = new THREE.MeshPhongMaterial({
		color: new THREE.Color("rgb(226,35,213)"),
		shininess: 6,

		transparent: false,
		opacity: 0.8,
	});

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		70,
		window.innerWidth / window.innerHeight,
		0.01,
		40
	);
	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.xr.enabled = true;

	// const mesh = new THREE.Mesh(geometry, material);
	const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
	const modelUrl =
		"https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Fox/glTF/Fox.gltf";

	// const modelUrl =
	// 	"https://raw.githubusercontent.com/immersive-web/webxr-samples/main/media/gltf/space/space.gltf";

	const loader = new GLTFLoader();

	loader.load(
		modelUrl,
		(gltf) => {
			const model = gltf.scene;

			model.children.forEach((child) => {
				child.scale.set(0.05, 0.05, 0.05);
			});
			model.position.y = -5;
			model.position.z = -10;
			scene.add(model);
		},
		(event) => console.log(event),
		(error) => console.log(error)
	);

	// mesh.position.set(0, 0, -0.5);
	// scene.add(mesh);

	// add light to scene
	light.position.set(0.5, 1, 0.25);
	scene.add(light);

	container.appendChild(renderer.domElement);
	document.body.appendChild(ARButton.createButton(renderer));
	return { scene: scene, camera: camera, renderer: renderer };
};

document.addEventListener("DOMContentLoaded", () => {
	console.log("DOM Content Loaded");

	const animation = init();
	animate(animation);
});
