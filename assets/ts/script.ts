import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";

type Animation = {
	scene: THREE.Scene;
	camera: THREE.PerspectiveCamera;
	renderer: THREE.WebGLRenderer;
};

const animate = (animation: Animation) => {
	const { scene, camera, renderer } = animation;
	const render = () => {
		renderer.render(scene, camera);
	};
	animation.renderer.setAnimationLoop(render);
};

const init = () => {
	const container = document.createElement("div"); // create container
	document.body.appendChild(container); // append container to body

	const animation = {
		scene: new THREE.Scene(),
		camera: new THREE.PerspectiveCamera(
			70,
			window.innerWidth / window.innerHeight,
			0.01,
			40
		),
		renderer: new THREE.WebGLRenderer({ antialias: true, alpha: true }),
	};
	animation.renderer.setPixelRatio(window.devicePixelRatio);
	animation.renderer.setSize(window.innerWidth, window.innerHeight);
	animation.renderer.xr.enabled = true;
	container.appendChild(animation.renderer.domElement);

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

	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 0, -0.5);
	animation.scene.add(mesh);

	// add light to scene
	const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
	light.position.set(0.5, 1, 0.25);
	animation.scene.add(light);

	document.body.appendChild(ARButton.createButton(animation.renderer));
	return animation;
};

document.addEventListener("DOMContentLoaded", () => {
	console.log("DOM Content Loaded");

	const animation = init();
	animate(animation);
});
