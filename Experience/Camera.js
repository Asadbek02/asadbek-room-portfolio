import * as THREE from 'three';
import Experience from "./Experience.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        
        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }
    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        )
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.x = 29;
        this.perspectiveCamera.position.y = 14;
        this.perspectiveCamera.position.z = 12;
    }
    createOrthographicCamera(){
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frwstrun) / 2,
            (this.sizes.aspect * this.sizes.frwstrun) / 2,
            this.sizes.frwstrun / 2,
            -this.sizes.frwstrun / 2,
            -50,
            50
        );
        this.orthographicCamera.position.y = 5.65;
        this.orthographicCamera.position.z = 10;
        this.orthographicCamera.rotation.x = - Math.PI / 6;


        this.scene.add(this.orthographicCamera);
        
    }
    setOrbitControls(){
        this.controls =  new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
    }
    resize(){
        //Update perspective camera on resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
        //Update orthographic camera on resize
        this.orthographicCamera.left = 
            (-this.sizes.aspect * this.sizes.frwstrun) / 2,
        this.orthographicCamera.right = 
            (this.sizes.aspect * this.sizes.frwstrun) / 2,
        this.orthographicCamera.top = this.sizes.frwstrun / 2,
        this.orthographicCamera.bottom = -this.sizes.frwstrun / 2
        this.orthographicCamera.updateProjectionMatrix();
    }
    update(){
        this.controls.update();
    }
}