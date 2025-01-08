import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { DRACOLoader } from 'DRACOLoader';
import { OrbitControls } from 'OrbitControls';

const container = document.querySelector('#model-container');

// three.js Scene
const scene = new THREE.Scene();

// 카메라 설정
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(-20, 30, 40);
camera.lookAt(0, 0, 0);

// 렌더러 설정
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2.2;
container.appendChild(renderer.domElement);

// 환경맵 추가 (반사 효과 강화)
const envMapLoader = new THREE.CubeTextureLoader();
const envMap = envMapLoader.load([
  'https://threejs.org/examples/textures/cube/pisa/px.png',
  'https://threejs.org/examples/textures/cube/pisa/nx.png',
  'https://threejs.org/examples/textures/cube/pisa/py.png',
  'https://threejs.org/examples/textures/cube/pisa/ny.png',
  'https://threejs.org/examples/textures/cube/pisa/pz.png',
  'https://threejs.org/examples/textures/cube/pisa/nz.png',
]);
scene.environment = envMap;

// 조명 설정
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3); 
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3.5);
directionalLight.position.set(20, 20, 15);
scene.add(directionalLight);

// GLTFLoader 설정
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.154.0/examples/jsm/libs/draco/');
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

// GLB 모델 불러오기 및 재질 적용
loader.load(
  './assets/images/D.glb',
  (gltf) => {
    const model = gltf.scene;

model.traverse((child) => {
  if (child.isMesh) {
    child.material.dispose(); // 기존 재질 제거

    child.material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),   // 기본 흰색
      roughness: 0.15,                    // 광택 줄임 (반짝임 X)
      metalness: 0.85,                    // 살짝 금속성 추가
      clearcoat: 0.9,                     // 코팅 거의 최대
      clearcoatRoughness: 0.1,            // 부드럽게 광택 조정
      sheen: 1,
      sheenColor: new THREE.Color(1.2, 0.6, 1.5),  // 오로라 느낌 추가
      sheenRoughness: 0.25,               // 과하지 않게 설정
      transmission: 0.9,                  // 약간의 투명감
      envMap: envMap,
      envMapIntensity: 2.5,               // 환경 반사 줄임
      iridescence: 1,                     // 오로라 효과 강화
      iridescenceIOR: 1.8,                // 빛 굴절 세기
      iridescenceThicknessRange: [300, 700],  // 오로라 색상 변화 범위 확대
      reflectivity: 0.6,                  // 반사율 낮춤
      transparent: true,
      opacity: 0,                         // 처음에는 투명
    });
  }
});


    model.scale.set(60, 60, 60);

    // 모델 중앙 정렬
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    model.position.x -= 3;
    model.position.y += 5;

    model.rotation.x = -Math.PI / 2;
    model.position.z = -40;

    scene.add(model);
    console.log('모델 로드 완료:', model);

    let startTime;
    const duration = 1000;  // 1초 동안 애니메이션
    const startRotation = -Math.PI / 2;  // 초기 누운 상태
    const endRotation = 0;               // 정면
    const startPositionZ = -40;          // 뒤에서 시작
    const endPositionZ = 0;              // 최종 위치
    let opacity = 0;                     // 초기 투명도

    function animateModel(timestamp) {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 회전 및 위치 보간 (이동하면서 회전)
      model.rotation.x = startRotation + progress * (endRotation - startRotation);
      model.position.z = startPositionZ + progress * (endPositionZ - startPositionZ);

      // 투명도 증가
      opacity = progress;
      model.traverse((child) => {
        if (child.isMesh) {
          child.material.opacity = opacity;
        }
      });

      if (progress < 1) {
        requestAnimationFrame(animateModel);
      } else {
        model.rotation.x = 0;
        model.position.z = endPositionZ;
      }
    }

    setTimeout(() => {
      requestAnimationFrame(animateModel);
    }, 600);
  },
  undefined,
  (error) => {
    console.error('모델 불러오기 실패:', error);
  }
);

// OrbitControls 추가
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
