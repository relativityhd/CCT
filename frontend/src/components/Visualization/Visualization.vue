<template>
  <div ref="renderer"></div>
</template>

<script>
import * as Three from 'three'

export default {
  name: 'Visualization',
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
    }
  },
  methods: {
    createCorpus(width, height, depth, strength) {

      this.removeObjectFromScene(this.corpus)

      let material = new Three.MeshNormalMaterial()

    //eigenschaften für meshes werden definiert
      let leftwall_geometry = new Three.BoxGeometry(strength, height, depth)
      let rightwall_geometry = new Three.BoxGeometry(strength, height, depth)
      let centerwall_geometry = new Three.BoxGeometry(strength, height - strength - 0.06, depth - strength)
      let backwall_geometry = new Three.BoxGeometry(width - strength, height, strength)
      let foundation_geometry = new Three.BoxGeometry(width - strength, 0.06, depth - strength)
      let ceiling_geometry = new Three.BoxGeometry(width - strength, strength, depth - strength)

      //meshes werden gesetzt
      let leftwall_mesh = new Three.Mesh(leftwall_geometry, material)
      leftwall_mesh.position.set(-(width / 2 - strength / 2), 0, 0)
      this.scene.add(leftwall_mesh)

      let rightwall_mesh = new Three.Mesh(rightwall_geometry, material)
      rightwall_mesh.position.set(width / 2 - strength / 2, 0, 0)
      this.scene.add(rightwall_mesh)

      let centerwall_mesh = new Three.Mesh(centerwall_geometry, material)
      centerwall_mesh.position.set(0, strength, strength / 2)
      this.scene.add(centerwall_mesh)

      let backwall_mesh = new Three.Mesh(backwall_geometry, material)
      backwall_mesh.position.set(0, 0, -(depth / 2 - strength / 2))
      this.scene.add(backwall_mesh)

      let foundation_mesh = new Three.Mesh(foundation_geometry, material)
      foundation_mesh.position.set(0, -(height / 2 - 0.06 / 2), strength / 2)
      this.scene.add(foundation_mesh)

      let ceiling_mesh = new Three.Mesh(ceiling_geometry, material)
      ceiling_mesh.position.set(0, height / 2 - strength / 2, strength / 2)
      this.scene.add(ceiling_mesh)
      
      this.corpus = {
        left: leftwall_mesh,
        right: rightwall_mesh,
        center: centerwall_mesh,
        back: backwall_mesh,
        foundation: foundation_mesh,
        ceiling: ceiling_mesh
      }
    },
    removeObjectFromScene(obj) {
      if(!obj) return
      Object.values(obj).forEach((mesh) => {
        this.scene.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();
        mesh = undefined;
      })
      obj = undefined
    },
    init() {
      //axios call to get the following values: (sample data)
      
      let container = this.$refs.renderer
      console.log(container)
      this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10)
      this.camera.position.z = 3

      this.scene = new Three.Scene()

      //first of all, light settings:
        
        //createCorpus
        this.createCorpus(2, 2.4, 0.5, 0.02)

      //var light = new THREE.AmbientLight(0xffffff);
      //this.scene.add(this.light);

      //renderer zeigt szene visuell an
      this.renderer = new Three.WebGLRenderer({ antialias: true })
      this.renderer.setSize(container.clientWidth, container.clientHeight)

      container.appendChild(this.renderer.domElement)
    },
    animate: function() {
      this.scene.rotation.y += 0.005
      this.renderer.render(this.scene, this.camera)
      this.myrequest = requestAnimationFrame(this.animate)
    }
  },
  mounted() {
    console.log(this.$store.state.basket.products)
    this.init()
    setInterval(
      () => {this.createCorpus(
         Math.floor(Math.random() * 6) + 2,
         Math.floor(Math.random() * 3) + 1,
         Math.floor(Math.random() * 1) + 0.2,
         Math.floor(Math.random() * 0.05) + 0.01
      )},5000
    )
    this.myrequest = requestAnimationFrame(this.animate)
  },
  destroyed() {
    cancelAnimationFrame(this.myrequest)
  }
}
</script>

<style scoped>
#container {
  width: 100%;
  height: 800px;
}
</style>
