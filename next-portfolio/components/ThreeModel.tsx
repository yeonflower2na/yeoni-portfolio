'use client';

import { useEffect, useRef } from 'react';

export default function ThreeModel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: import('three').WebGLRenderer | null = null;
    let animationId: number;
    let controlsRef: { update: () => void; dispose: () => void } | null = null;

    const init = async () => {
      const THREE = await import('three');
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.set(-20, 30, 40);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 2.2;
      container.appendChild(renderer.domElement);

      // Environment map
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

      // Lighting
      scene.add(new THREE.AmbientLight(0xffffff, 1.3));
      const dirLight = new THREE.DirectionalLight(0xffffff, 3.5);
      dirLight.position.set(20, 20, 15);
      scene.add(dirLight);

      // DRACO loader
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(
        'https://cdn.jsdelivr.net/npm/three@0.154.0/examples/jsm/libs/draco/'
      );

      // GLTF loader
      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      loader.load('/assets/images/D.glb', (gltf) => {
        const model = gltf.scene;
        model.traverse((child: any) => {
          if (child.isMesh) {
            child.material.dispose();
            child.material = new THREE.MeshPhysicalMaterial({
              color: new THREE.Color(0xffffff),
              roughness: 0.15,
              metalness: 0.85,
              clearcoat: 0.9,
              clearcoatRoughness: 0.1,
              sheen: 1,
              sheenColor: new THREE.Color(1.2, 0.6, 1.5),
              sheenRoughness: 0.25,
              transmission: 0.9,
              envMap: envMap,
              envMapIntensity: 2.5,
              iridescence: 1,
              iridescenceIOR: 1.8,
              iridescenceThicknessRange: [300, 700],
              reflectivity: 0.6,
              transparent: true,
              opacity: 0,
            });
          }
        });

        model.scale.set(60, 60, 60);
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        model.position.x -= 3;
        model.position.y += 5;
        model.rotation.x = -Math.PI / 2;
        model.position.z = -40;
        scene.add(model);

        let startTime: number | undefined;
        const duration = 1000;
        const startRotation = -Math.PI / 2;
        const endRotation = 0;
        const startPositionZ = -40;
        const endPositionZ = 0;

        function animateModel(timestamp: number) {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          model.rotation.x = startRotation + progress * (endRotation - startRotation);
          model.position.z = startPositionZ + progress * (endPositionZ - startPositionZ);
          const opacity = progress;
          model.traverse((child: any) => {
            if (child.isMesh) child.material.opacity = opacity;
          });
          if (progress < 1) requestAnimationFrame(animateModel);
        }

        setTimeout(() => {
          requestAnimationFrame(animateModel);
        }, 600);
      });

      // Orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controlsRef = controls;

      // Animation loop
      function animate() {
        animationId = requestAnimationFrame(animate);
        controls.update();
        renderer!.render(scene, camera);
      }
      animate();

      // Resize handler
      const handleResize = () => {
        if (!container || !renderer) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      // Store cleanup ref
      (container as any).__cleanup = () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        controlsRef?.dispose();
        if (renderer) {
          renderer.dispose();
          if (renderer.domElement.parentNode === container) {
            container.removeChild(renderer.domElement);
          }
        }
      };
    };

    init();

    return () => {
      if ((container as any).__cleanup) {
        (container as any).__cleanup();
      }
    };
  }, []);

  return (
    <div
      id="model-container"
      ref={containerRef}
      style={{
        position: 'absolute',
        width: '35%',
        height: '100%',
        left: '13%',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    />
  );
}
