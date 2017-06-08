setTimeout(() => {
  const camera = createCamera();
  const scene = new THREE.Scene();
  createLights(scene);
  const uniforms = THREE.UniformsUtils.merge([
    THREE.UniformsLib["ambient"],
    THREE.UniformsLib["lights"],
    {uTime: {type: "f", value: 1}},
    THREE.ShaderLib.phong.uniforms
  ]);
  const geometry = createGeometry(5, 2);
  const material = createMaterial(uniforms);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  const renderer = createRenderer();
  const handleWindowResize = onWindowResize(camera, renderer, uniforms);
  handleWindowResize();
  window.addEventListener('resize', handleWindowResize, false);
  animate(renderer, scene, camera, uniforms, mesh);
}, 0);

function onWindowResize (camera, renderer, uniforms) {
  return event => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

function animate (renderer, scene, camera, uniforms, mesh) {
  requestAnimationFrame(() => {
    animate(renderer, scene, camera, uniforms, mesh);
  });
  uniforms.uTime.value += 0.05;
  mesh.rotation.x -= 0.002;
  mesh.rotation.y -= 0.003;
  renderer.render(scene, camera);
}

function createCamera () {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 10;
  return camera;
}

function createLights (scene) {
  const ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight);
  const lights = [];
  lights[0] = new THREE.DirectionalLight(0xffffff, 1);
  lights[0].position.set(1, 0, 0);
  lights[1] = new THREE.DirectionalLight(0x15374F, 1);
  lights[1].position.set(0.75, 1, 0.5);
  lights[2] = new THREE.DirectionalLight(0x000C1C, 1);
  lights[2].position.set(-0.75, -1, 0.5);
  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);
}

function createGeometry (radius, t) {
  const geometry = new THREE.IcosahedronGeometry(radius, t);
  return geometry;
}

function createMaterial (uniforms) {
  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader: document.getElementById('phong-vertexShader').textContent,
    fragmentShader: document.getElementById('phong-fragmentShader').textContent,
    lights: true
  });
}

function createRenderer () {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0);
  const container = document.getElementById('js-app');
  container.appendChild(renderer.domElement);
  return renderer;
}