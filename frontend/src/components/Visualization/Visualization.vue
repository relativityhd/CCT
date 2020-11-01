<template>
  <div class="container" ref="renderer"></div>
</template>

<script>
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 
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
    createCorpus(width, height, depth, maindrawer, position_x, position_y, position_z, mat_id) {
      var mat_color = 0xffffff
      if (mat_id == 95) {
        mat_color = 0xffffff
      } //white
      if (mat_id == 96) {
        mat_color = 0xc6945f
      } //maple
      if (mat_id == 97) {
        mat_color = 0x834824
      } //walnut
      if (mat_id == 98) {
        mat_color = 0xf8dfa1
      } //brich
      const material = new Three.MeshPhongMaterial({
        color: mat_color
      })

      var strength = 0.02

      let mainbody = new Three.Mesh()

      let leftwall_geometry = new Three.BoxGeometry(strength, height, depth)
      let rightwall_geometry = new Three.BoxGeometry(strength, height, depth)
      let backwall_geometry = new Three.BoxGeometry(width - strength, height, strength)
      let base_geometry = new Three.BoxGeometry(width - strength, 0.06, depth - strength)
      let ceiling_geometry = new Three.BoxGeometry(width - strength, strength, depth - strength)

      let leftwall_mesh = new Three.Mesh(leftwall_geometry, material)
      leftwall_mesh.position.set(-(width / 2 - strength / 2), 0, 0)

      let rightwall_mesh = new Three.Mesh(rightwall_geometry, material)
      rightwall_mesh.position.set(width / 2 - strength / 2, 0, 0)

      let backwall_mesh = new Three.Mesh(backwall_geometry, material)
      backwall_mesh.position.set(0, 0, -(depth / 2 - strength / 2))

      let base_mesh = new Three.Mesh(base_geometry, material)
      base_mesh.position.set(0, -(height / 2 - 0.06 / 2), strength / 2)

      let ceiling_mesh = new Three.Mesh(ceiling_geometry, material)
      ceiling_mesh.position.set(0, height / 2 - strength / 2, strength / 2)

      mainbody.add(leftwall_mesh)
      mainbody.add(rightwall_mesh)
      mainbody.add(backwall_mesh)
      mainbody.add(base_mesh)
      mainbody.add(ceiling_mesh)

      mainbody.castShadow = true
      mainbody.receiveShadow = true

      this.scene.add(mainbody)
      mainbody.position.set(position_x, position_y, position_z)

      this.corpus = {
        left: leftwall_mesh,
        right: rightwall_mesh,
        back: backwall_mesh,
        base: base_mesh,
        ceiling: ceiling_mesh,
        main: mainbody
      }
    },
    createInteriors(id, width, depth, strength, position_x, position_y) {
      if (id === 92) {
        var clothesrail_geometry = new Three.CylinderGeometry(0.013, 0.013, width, 8)
        var clothesrail_material = new Three.MeshPhongMaterial({ color: 0x4a4a4a })
        var clothesrail_mesh = new Three.Mesh(clothesrail_geometry, clothesrail_material)
        clothesrail_mesh.position.x = position_x
        clothesrail_mesh.position.y = position_y
        clothesrail_mesh.rotation.z = Math.PI / 2
        clothesrail_mesh.castShadow = true
        clothesrail_mesh.receiveShadow = true
        this.scene.add(clothesrail_mesh)
      }

      if (id === 91) {
        var shelf_material = new Three.MeshPhongMaterial({ color: 0xd3d3d3 })
        var shelf_geometry = new Three.BoxGeometry(width, strength, depth)
        var shelf_mesh = new Three.Mesh(shelf_geometry, shelf_material)
        shelf_mesh.position.set(position_x, position_y, 0)
        shelf_mesh.castShadow = true
        shelf_mesh.receiveShadow = true
        this.scene.add(shelf_mesh)
      }

      if (id === 93) {
        var meshbasket_material = new Three.MeshPhongMaterial({ color: 0x686459 })
        var meshbasket_leftwall_geometry = new Three.BoxGeometry(strength, 0.1, depth)
        var meshbasket_rightwall_geometry = new Three.BoxGeometry(strength, 0.1, depth)
        var meshbasket_backwall_geometry = new Three.BoxGeometry(width - strength, 0.1, strength)
        var meshbasket_frontwall_geometry = new Three.BoxGeometry(width - strength, 0.1, strength)
        var meshbasket_base_geometry = new Three.BoxGeometry(width - strength, strength, depth)
        var meshbasket_leftwall_mesh = new Three.Mesh(meshbasket_leftwall_geometry, meshbasket_material)
        var meshbasket_rightwall_mesh = new Three.Mesh(meshbasket_rightwall_geometry, meshbasket_material)
        var meshbasket_backwall_mesh = new Three.Mesh(meshbasket_backwall_geometry, meshbasket_material)
        var meshbasket_frontwall_mesh = new Three.Mesh(meshbasket_frontwall_geometry, meshbasket_material)
        var meshbasket_base_mesh = new Three.Mesh(meshbasket_base_geometry, meshbasket_material)

        meshbasket_leftwall_mesh.position.set(-width / 2 + strength, 0, 0)
        meshbasket_rightwall_mesh.position.set(width / 2 - strength, 0, 0)
        meshbasket_backwall_mesh.position.set(0, 0, -depth / 2 + strength)
        meshbasket_frontwall_mesh.position.set(0, 0, depth / 2 - strength / 2)
        meshbasket_base_mesh.position.set(0, -0.06, 0)

        let mainmeshbasket = new Three.Mesh()
        mainmeshbasket.add(meshbasket_leftwall_mesh)
        mainmeshbasket.add(meshbasket_rightwall_mesh)
        mainmeshbasket.add(meshbasket_backwall_mesh)
        mainmeshbasket.add(meshbasket_frontwall_mesh)
        mainmeshbasket.add(meshbasket_base_mesh)

        mainmeshbasket.position.set(position_x, position_y)
        mainmeshbasket.castShadow = true
        mainmeshbasket.receiveShadow = true

        this.scene.add(mainmeshbasket)
      }

      if (id === 94) {
        var drawer_material = new Three.MeshPhongMaterial({ color: 0xd3d3d3 })
        var drawer_leftwall_geometry = new Three.BoxGeometry(strength, 0.16, depth)
        var drawer_rightwall_geometry = new Three.BoxGeometry(strength, 0.16, depth)
        var drawer_backwall_geometry = new Three.BoxGeometry(width - strength, 0.16, strength)
        var drawer_frontwall_geometry = new Three.BoxGeometry(width - strength, 0.12, strength)
        var drawer_base_geometry = new Three.BoxGeometry(width - strength, strength, depth)
        var drawer_leftwall_mesh = new Three.Mesh(drawer_leftwall_geometry, drawer_material)
        var drawer_rightwall_mesh = new Three.Mesh(drawer_rightwall_geometry, drawer_material)
        var drawer_backwall_mesh = new Three.Mesh(drawer_backwall_geometry, drawer_material)
        var drawer_frontwall_mesh = new Three.Mesh(drawer_frontwall_geometry, drawer_material)
        var drawer_base_mesh = new Three.Mesh(drawer_base_geometry, drawer_material)

        drawer_leftwall_mesh.position.set(-width / 2 + strength, 0, 0)
        drawer_rightwall_mesh.position.set(width / 2 - strength, 0, 0)
        drawer_backwall_mesh.position.set(0, 0, -depth / 2 + strength)
        drawer_frontwall_mesh.position.set(0, -0.02, depth / 2 - strength / 2)
        drawer_base_mesh.position.set(0, -0.07, 0)

        let maindrawer = new Three.Mesh()
        maindrawer.add(drawer_leftwall_mesh)
        maindrawer.add(drawer_rightwall_mesh)
        maindrawer.add(drawer_backwall_mesh)
        maindrawer.add(drawer_frontwall_mesh)
        maindrawer.add(drawer_base_mesh)

        maindrawer.position.set(position_x, position_y, 0)
        maindrawer.castShadow = true
        maindrawer.receiveShadow = true
        this.scene.add(maindrawer)
      }
    },
    init() {
      let container = this.$refs.renderer
      this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10)
      this.camera.position.set(0, 0, 3)

      this.scene = new Three.Scene()

      var directionallight1 = new Three.DirectionalLight(0xffffff, 0.5)
      this.scene.add(directionallight1)
      var directionallight2 = new Three.DirectionalLight(0xffffff, 0.5)
      this.scene.add(directionallight2)
      var directionallight3 = new Three.DirectionalLight(0xffffff, 0.5)
      this.scene.add(directionallight3)
      var directionallight4 = new Three.DirectionalLight(0xffffff, 0.5)
      this.scene.add(directionallight4)
      directionallight1.position.set(6, 6, 12)
      directionallight2.position.set(-6, 6, 12)
      directionallight3.position.set(6, -6, -12)
      directionallight4.position.set(-6, -6, -12)

      this.renderer = new Three.WebGLRenderer({ antialias: true, alpha: true, shadowMapEnabled: true })
      this.renderer.setClearColor(0x012840, 0.0) //change alpha for transparent background
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      
      container.appendChild(this.renderer.domElement)

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    },
    animate: function() {
      this.renderer.render(this.scene, this.camera)
      this.myrequest = requestAnimationFrame(this.animate)
    },
    render(exteriors) {
      console.log(
        '--DEBUG : render -> exteriors',
        exteriors.map(e => ({ ...e }))
      )
      if (exteriors.length === 0) return

      for (let i = this.scene.children.length - 1; i >= 0; i--) {
        if (this.scene.children[i].type === 'Mesh') {
          this.scene.remove(this.scene.children[i])
        }
      }

      var strength = 0.02

      var totalWidth = exteriors.reduce((accum, item) => accum + item.custom.width, 0)

      var höchsteHöhe = exteriors.reduce(function(prev, current) {
        if (+current.custom.height > +prev.custom.height) {
          return current
        } else {
          return prev
        }
      }).custom.height

      var tiefsteTiefe = exteriors.reduce(function(prev, current) {
        if (+current.custom.depth > +prev.custom.depth) {
          return current
        } else {
          return prev
        }
      }).custom.depth

      this.camera.position.z = Math.max(totalWidth/100, (höchsteHöhe*1.1)/100)

      var previousWidths = []

      exteriors.forEach(exterior => {
        var sum = 0
        for (var i = 0; i < previousWidths.length; i++) {
          sum += previousWidths[i]
        }

        this.createCorpus(
          exterior.custom.width / 100,
          exterior.custom.height / 100,
          exterior.custom.depth / 100,
          strength,
          (-totalWidth / 2 + exterior.custom.width / 2 + sum) / 100,
          (exterior.custom.height / 2 - höchsteHöhe / 2) / 100,
          (exterior.custom.depth / 2 - tiefsteTiefe / 2) / 100,
          exterior.material.id
        )
        previousWidths.push(exterior.custom.width)

        if (exterior.customizable == true) {
          var bottom_count = 0
          var top_count = 0
          exterior.interiors.forEach(interior => {
            for (let i = 0; i < interior.quantity; i++) {
              if (interior.id === 92) {
                this.createInteriors(
                  interior.id,
                  exterior.custom.width / 100 - 0.02,
                  exterior.custom.depth / 100 - 0.02,
                  0.02,
                  (-totalWidth / 2 + exterior.custom.width / 2 + sum) / 100,
                  (exterior.custom.height - 10 - höchsteHöhe / 2) / 100 - top_count
                )
                top_count += 0.16
              } else {
                this.createInteriors(
                  interior.id,
                  exterior.custom.width / 100 - 0.02,
                  exterior.custom.depth / 100 - 0.02,
                  0.02,
                  (-totalWidth / 2 + exterior.custom.width / 2 + sum) / 100,
                  -höchsteHöhe / 2 / 100 + 0.14 + bottom_count
                )
                bottom_count += 0.16
              }
            }
          })
        }
      })

      this.myrequest = requestAnimationFrame(this.animate)
    }
  },
  mounted() {
    this.init()
    this.render([])
  },
  destroyed() {
    cancelAnimationFrame(this.myrequest)
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
