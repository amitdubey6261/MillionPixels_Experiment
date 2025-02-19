# Million Pixels 🚀
**Million Pixels** is an experimental project designed to explore and master advanced computer graphics techniques and optimizations. The core challenge of this project is to render 1 million spheres simultaneously on the screen, a task that typically overwhelms both CPU and GPU resources if approached naively. Each sphere in a traditional rendering pipeline would trigger a separate draw call, leading to catastrophic performance bottlenecks and rendering failures in most browsers.

## Tech For RTR 


**WebGL 2.0** : The primary rendering API used for this project, providing access to GPU-accelerated graphics in the browser. WebGL 2.0 supports advanced features like instanced rendering, transform feedback, and more, which are critical for optimizing large-scale rendering.

**Three.js** : Three.js is a powerful and widely-used JavaScript library for 3D graphics that simplifies the process of creating and rendering 3D scenes in the browser. In the Million Pixel project, Three.js serves as the foundation for rendering 1 million spheres efficiently while leveraging its built-in optimizations and extensibility.

## Computer Graphics Concepts

1. [Geometry instancing](https://en.wikipedia.org/wiki/Geometry_instancing)
2. [Level of Detail](https://en.wikipedia.org/wiki/Level_of_detail_(computer_graphics))
3. [Frustum Culling](https://learnopengl.com/Guest-Articles/2021/Scene/Frustum-Culling)
4. [Bouding Volume Hierarchy](https://en.wikipedia.org/wiki/Bounding_volume_hierarchy)
5. [Raycasting](https://github.com/gkjohnson/three-mesh-bvh)

## My Approach and How I Failed

When I first analyzed the requirements, I knew that rendering 1 million spheres would be impossible without leveraging GPU instancing. My initial attempt involved implementing GPU instancing for all spheres, but it failed miserably, as expected. The frame rate dropped to an unplayable 10-12 FPS, making it clear that additional optimizations were necessary.

First Optimization: Switching to Icosahedron Geometry
To reduce the computational load, I replaced the high-poly sphere geometry with a low-poly icosahedron. This change reduced the number of vertices significantly and gave me a modest +5 FPS gain. While this was a step in the right direction, the frame rate was still far from acceptable.

Second Optimization: Frustum Culling with Limited Distance
Next, I implemented frustum culling with a limited view distance of 500 units. Beyond this distance, the spheres were pixel-sized and contributed little to the visual quality. However, this optimization only provided a marginal improvement of 1-2 FPS, which was disappointing.

Third Attempt: Level of Detail (LOD)
I then considered implementing Level of Detail (LOD) to use low-poly geometries for distant spheres. Unfortunately, Three.js does not natively support LOD with instanced meshes, and implementing this from scratch would require significant modifications to the rendering pipeline. This approach seemed too time-consuming, so I decided to explore existing solutions instead.

Breakthrough: Using Three.EZ and BVH
I discovered Three.EZ, a plugin that provides advanced spatial querying capabilities using Bounding Volume Hierarchy (BVH). This was a game-changer. By leveraging BVH, I was able to perform accelerated frustum culling and drastically reduce the number of objects rendered each frame. The result was a staggering 120 FPS gain, bringing the frame rate to a smooth and playable level.

Key Takeaway
The most significant optimization came from BVH-based spatial queries, which I was initially unaware of. This experience taught me the importance of leveraging advanced data structures and existing tools to solve complex performance challenges. While my initial attempts provided incremental improvements, the combination of GPU instancing, low-poly geometry, and BVH-based culling ultimately unlocked the project's full potential.

## Installation

```bash
git clone https://github.com/amitdubey6261/MillionPixels_Experiment
npm install 
npm run dev
```

## Acknowledgments

I would like to thank these guys for making it possible to do such stuff on browser

1.  : Three.JS
2.  : Three.ez
3.  : Three-mesh-bvh

## Acknowledgments
A huge thanks to the brilliant minds behind the tools that made this project possible:

[Mr. Doob](https://x.com/mrdoob?lang=en) for creating Three.js, the backbone of browser-based 3D graphics.
[Andre Gargaro](https://x.com/agargaro_dev?lang=en), which simplified spatial queries and culling.

[Garrett Johnson](https://x.com/garrettkjohnson?lang=en) for Three-Mesh-BVH, the key to efficient rendering optimizations.