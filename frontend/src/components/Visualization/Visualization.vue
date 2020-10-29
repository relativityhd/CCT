<template>
  <div class="container" ref="renderer"></div>
</template>

<script>
import * as Three from 'three'
//import { OrbitControls } from 'three'

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
    createCorpus(width, height, depth, maindrawer, position_x, position_y, position_z) {
      //const loader = new Three.TextureLoader()
      //const texture = loader.load('crate0/crate0_diffuse.png')
      const material = new Three.MeshPhongMaterial({
        color: 0xf8f8ff
        //map: texture, //textur = aus object
      })

      var strength = 0.02

      //this.removeObjectFromScene(this.corpus)

      //eigenschaften für meshes werden definiert

      let mainbody = new Three.Mesh()

      let leftwall_geometry = new Three.BoxGeometry(strength, height, depth)
      let rightwall_geometry = new Three.BoxGeometry(strength, height, depth)
      let backwall_geometry = new Three.BoxGeometry(width - strength, height, strength)
      let base_geometry = new Three.BoxGeometry(width - strength, 0.06, depth - strength)
      let ceiling_geometry = new Three.BoxGeometry(width - strength, strength, depth - strength)

      //meshes werden gesetzt
      let leftwall_mesh = new Three.Mesh(leftwall_geometry, material)
      leftwall_mesh.position.set(-(width / 2 - strength / 2), 0, 0)
      //this.scene.add(leftwall_mesh)

      let rightwall_mesh = new Three.Mesh(rightwall_geometry, material)
      rightwall_mesh.position.set(width / 2 - strength / 2, 0, 0)
      //this.scene.add(rightwall_mesh)

      let backwall_mesh = new Three.Mesh(backwall_geometry, material)
      backwall_mesh.position.set(0, 0, -(depth / 2 - strength / 2))
      //this.scene.add(backwall_mesh)

      let base_mesh = new Three.Mesh(base_geometry, material)
      base_mesh.position.set(0, -(height / 2 - 0.06 / 2), strength / 2)
      //this.scene.add(base_mesh)

      let ceiling_mesh = new Three.Mesh(ceiling_geometry, material)
      ceiling_mesh.position.set(0, height / 2 - strength / 2, strength / 2)
      //this.scene.add(ceiling_mesh)

      mainbody.add(leftwall_mesh)
      mainbody.add(rightwall_mesh)
      mainbody.add(backwall_mesh)
      mainbody.add(base_mesh)
      mainbody.add(ceiling_mesh)

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
    createInteriors(
      type,
      width,
      depth,
      strength,
      position_x,
      position_y /*, height, depth, position_x, position_y, position_z*/
    ) {
      if (type == 'clothesrail') {
        /*create rack, position rack*/
        var clothesrail_geometry = new Three.CylinderGeometry(0.013, 0.013, width, 8)
        var clothesrail_material = new Three.MeshPhongMaterial({ color: 0x4a4a4a })
        var clothesrail_mesh = new Three.Mesh(clothesrail_geometry, clothesrail_material)
        clothesrail_mesh.position.x = position_x
        clothesrail_mesh.position.y = position_y
        clothesrail_mesh.rotation.z = Math.PI / 2 // Pi entspricht einer umdrehung, (wegen sinuskurve etc.)
        this.scene.add(clothesrail_mesh)
      }

      if (type == 'drawer') {
        var drawer_material = new Three.MeshPhongMaterial({ color: 0x4a4a4a })
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
        this.scene.add(maindrawer)
      }

      if (type == 'shelf') {
        var shelf_material = new Three.MeshPhongMaterial({ color: 0x4a4a4a })
        var shelf_geometry = new Three.BoxGeometry(width, strength, depth)
        var shelf_mesh = new Three.Mesh(shelf_geometry, shelf_material)
        shelf_mesh.position.set(position_x, position_y, 0)
        this.scene.add(shelf_mesh)
      }

      if (type == 'meshbasket') {
        var meshbasket_material = new Three.MeshPhongMaterial({ color: 0x4a4a4a })
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
        this.scene.add(mainmeshbasket)
      }

      /*
      else {create placeholder}*/
    },
    removeObjectFromScene(obj) {
      if (!obj) return
      Object.values(obj).forEach(mesh => {
        this.scene.remove(mesh)
        mesh.geometry.dispose()
        mesh.material.dispose()
        mesh = undefined
      })
      obj = undefined
    },
    init() {
      let container = this.$refs.renderer
      //console.log(container)

      this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10)
      this.camera.position.set(0, 0, 3)

      /*const controls = new OrbitControls(this.camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.25
      controls.enableZoom = false*/

      this.scene = new Three.Scene()

      //first of all, light settings:
      //var ambientlight = new Three.AmbientLight(0xffffff) //0x222222
      //this.scene.add(ambientlight)
      var directionallight1 = new Three.DirectionalLight(0xffffff, 0.3)
      this.scene.add(directionallight1)
      var directionallight2 = new Three.DirectionalLight(0xffffff, 0.3)
      this.scene.add(directionallight2)
      var directionallight3 = new Three.DirectionalLight(0xffffff, 0.3)
      this.scene.add(directionallight3)
      var directionallight4 = new Three.DirectionalLight(0xffffff, 0.3)
      this.scene.add(directionallight4)
      directionallight1.position.set(6, 6, 12)
      directionallight2.position.set(-6, 6, 12)
      directionallight3.position.set(6, -6, -12)
      directionallight4.position.set(-6, -6, -12)

      //create standard Corpus
      //this.createCorpus(2, 2.4, 0.5, 0.02)
      var axis = new Three.AxisHelper(75)
      this.scene.add(axis)

      //renderer zeigt szene visuell an
      this.renderer = new Three.WebGLRenderer({ antialias: true })
      this.renderer.setSize(container.clientWidth, container.clientHeight)

      container.appendChild(this.renderer.domElement)
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

      //let number_exteriors = exteriors.length // gesamte Anzahl von Exteriors/frames wird gespeichert

      var strength = 0.02

      var totalWidth = exteriors.reduce((accum, item) => accum + item.width, 0) // gesamte Breite aller Exteriors/frames zusammen wird gespeichert

      var höchsteHöhe = exteriors.reduce(function(prev, current) {
        if (+current.height > +prev.height) {
          return current
        } else {
          return prev
        }
      }).height

      console.log(höchsteHöhe)

      var tiefsteTiefe = exteriors.reduce(function(prev, current) {
        if (+current.depth > +prev.depth) {
          return current
        } else {
          return prev
        }
      }).depth

      var previousWidths = []

      exteriors.forEach(exterior => {
        var sum = 0
        for (var i = 0; i < previousWidths.length; i++) {
          sum += previousWidths[i]
        }
        console.log(sum)

        this.createCorpus(
          exterior.width / 100,
          exterior.height / 100,
          exterior.depth / 100,
          strength,
          (-totalWidth / 2 + exterior.width / 2 + sum) / 100, // + breite der vorherigen exteriors in array summiert, //position_x
          (exterior.height / 2 - höchsteHöhe / 2) / 100, //position_y
          (exterior.depth / 2 - tiefsteTiefe / 2) / 100 //position_z
        )
        console.log(previousWidths)
        previousWidths.push(exterior.width)

        if (exterior.customized == true) {
          var bottom_count = 0
          console.log(bottom_count)
          var top_count = 0
          console.log(top_count)
          exterior.interiors.forEach(interior => {
            if (interior.type == 'clothesrail') {
              this.createInteriors(
                interior.type,
                exterior.width / 100 - 0.02,
                exterior.depth / 100 - 0.02,
                0.02,
                (-totalWidth / 2 + exterior.width / 2 + sum) / 100,
                (exterior.height - 10 - höchsteHöhe / 2) / 100 - top_count
              )
              top_count += 0.16
            } else {
              this.createInteriors(
                interior.type,
                exterior.width / 100 - 0.02,
                exterior.depth / 100 - 0.02,
                0.02,
                (-totalWidth / 2 + exterior.width / 2 + sum) / 100,
                -höchsteHöhe / 2 / 100 + 0.14 + bottom_count
              )
              bottom_count += 0.16
            }
          })
        } //tba unterschiedliche
      })

      /*setInterval(
      () => {this.createCorpus(
         exteriors.exterior1.width/100,
         exteriors.exterior1.height/100,
         exteriors.exterior1.depth/100,
         Math.floor(Math.random() * 0.05) + 0.01
      )},5000
    )*/

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

<!--Kommentar: die Schränke sind fiktiv unterteilt in Fächer mit jeweils einer Höhe von 20cm/0.2. Schubladen sind deshalb etwas unter 20 cm hoch und werden in der mitte der jeweiligen 20cm abschnitte platziert.
Auch shelfs, körbe und kleiderstangen werden mittig in diesen Abschnitten platziert. y-position = if (kleiderstange) {wieght: top + vorhergehende stange}, else {weight: bottom + vorhergehendes element} (siehe exteriors -> dort wurde ähnlich iteriert)-->
