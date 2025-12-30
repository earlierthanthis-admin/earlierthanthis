declare module 'three' {
  export class Scene {
    add(object: Object3D): this;
    fog: FogExp2 | null;
  }

  export class FogExp2 {
    constructor(color: number, density?: number);
  }

  export class PerspectiveCamera {
    constructor(fov: number, aspect: number, near: number, far: number);
    position: Vector3;
    aspect: number;
    updateProjectionMatrix(): void;
  }

  export class WebGLRenderer {
    constructor(parameters?: { alpha?: boolean; antialias?: boolean });
    domElement: HTMLCanvasElement;
    setSize(width: number, height: number): void;
    setPixelRatio(value: number): void;
    getPixelRatio(): number;
    setClearColor(color: number, alpha?: number): void;
    render(scene: Scene, camera: PerspectiveCamera): void;
    dispose(): void;
  }

  export class BufferGeometry {
    setAttribute(name: string, attribute: BufferAttribute): this;
    setFromPoints(points: Vector3[]): this;
  }

  export class BufferAttribute {
    constructor(array: Float32Array, itemSize: number);
  }

  export class ShaderMaterial {
    constructor(parameters?: {
      uniforms?: Record<string, { value: unknown }>;
      vertexShader?: string;
      fragmentShader?: string;
      transparent?: boolean;
      blending?: number;
      depthWrite?: boolean;
    });
    uniforms: Record<string, { value: unknown }>;
  }

  export class PointsMaterial {
    constructor(parameters?: {
      size?: number;
      vertexColors?: boolean;
      transparent?: boolean;
      opacity?: number;
      blending?: number;
    });
  }

  export class Points extends Object3D {
    constructor(
      geometry: BufferGeometry,
      material: PointsMaterial | ShaderMaterial,
    );
    rotation: Euler;
    position: Vector3;
  }

  export class LineBasicMaterial {
    constructor(parameters?: {
      color?: number;
      vertexColors?: boolean;
      transparent?: boolean;
      opacity?: number;
      blending?: number;
    });
  }

  export class Line extends Object3D {
    constructor(geometry: BufferGeometry, material: LineBasicMaterial);
  }

  export class LineSegments extends Object3D {
    constructor(geometry: BufferGeometry, material: LineBasicMaterial);
    rotation: Euler;
  }

  export class Color {
    constructor(color: number | string);
    r: number;
    g: number;
    b: number;
  }

  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
  }

  export class Euler {
    x: number;
    y: number;
    z: number;
  }

  export class Object3D {
    rotation: Euler;
    position: Vector3;
  }

  export const AdditiveBlending: number;
}
