import { useControls } from 'leva'
import { DoubleSide, MeshBasicMaterial, MeshStandardMaterial } from 'three'
// @ts-ignore no types for troika-three-utils
import { createDerivedMaterial } from 'troika-three-utils'

const baseMaterial = new MeshStandardMaterial({ color: 'white', side: DoubleSide })
const CustomMaterial = createDerivedMaterial(baseMaterial, {
  timeUniform: 'elapsed',
  uniforms: {
    uSpeed: { value: 5000.0 },
    uVariant: { value: 1.0 },
  },
  vertexDefs: `
    uniform float uSpeed;    
    varying vec3 vFragColor;
    
    float uIntensity = 0.7;

    mat2 rotate2D(float r) {
      return mat2(cos(r), sin(r), -sin(r), cos(r));
    }
    
    vec3 greyscale(vec3 color, float str) {
      float g = dot(color, vec3(0.299, 0.587, 0.114));
      return mix(color, vec3(g), str);
    }
  `,
  vertexTransform: `
    vec2 _uv = uv - vec2(0.5, 0.5);
    vec3 col = vec3(0);
    float t = elapsed / uSpeed;

    vec2 n = vec2(0);
    vec2 q = vec2(0);
    vec2 p = _uv;
    float d = dot(p, p);
    float S = 12.;
    float a = 0.0;
    mat2 m = rotate2D(5.);

    for(float j = 0.; j < 20.; j++) {
      p *= m;

      n *= m;
      q = p * S + t * 4. + sin(t * 4. - d * 6.) * .8 + j + n; // wtf???
      a += dot(cos(q) / S, vec2(.2));
      n -= sin(q);
      S *= 1.2;
    }

    col = vec3(4.0, 2.0, 1.0) * (a + .2) + a + a - d;
    
    vec3 bw = greyscale(col, 1.0);

    position = position + normal * (uIntensity * bw.r);

    vFragColor = col;
  `,
  fragmentDefs: `
    varying vec3 vFragColor;
    uniform float uVariant;
  `,
  fragmentColorTransform: `
    vec3 col = vFragColor;
    float brightness = dot(col.rgb, vec3(0.2126, 0.7152, 0.0722));

    // HEART
    if(uVariant == 1.0) {
      vec3 colorA = vec3(181.0/255.0, 56.0/255.0, 56.0/255.0);
      vec3 colorB = vec3(105.0/255.0, 7.0/255.0, 7.0/255.0);

      col = col  * colorA * exp(brightness);
    }

    // LIVER
    if(uVariant == 2.0) {
      vec3 colorA = vec3(1.0,1.0,0.0);

      col = col  * colorA * exp(brightness);
    }

    // BRAIN
    if(uVariant == 3.0) {
      
    }
    
    // ALIEN
    if(uVariant == 4.0) {
      vec3 colorA = vec3(101.0/255.0, 143.0/255.0, 108.0/255.0);
      vec3 colorB = vec3(61.0/255.0, 4.0/255.0, 176.0/255.0);

      col = col * mix(colorA, colorB, exp(col.r * 1.7));
    }
    
    gl_FragColor = gl_FragColor * vec4(col, 1.0);
  `,
})

export default function TheThing(props: JSX.IntrinsicElements['group']) {
  const { Size } = useControls({
    'Beat Rate': {
      options: ['LOW', 'REGULAR', 'HIGH'],
      value: 'REGULAR',
      onChange: value => {
        const VALUES = { LOW: 3000, REGULAR: 1000, HIGH: 500 }
        CustomMaterial.uniforms.uSpeed.value = VALUES[value]
      },
    },
    'Stem Cells': {
      options: ['HEART', 'LIVER', 'BRAIN', 'ALIEN'],
      value: 'HEART',
      onChange: value => {
        const VALUES = { HEART: 1, LIVER: 2, SKIN: 3, ALIEN: 4 }
        CustomMaterial.uniforms.uVariant.value = VALUES[value]
      },
    },
    Size: {
      value: 0.5,
      min: 0.1,
      max: 0.9,
      step: 0.1,
    },
  })
  return (
    <group scale={Size} rotation={[Math.PI / 2, 0, Math.PI / 2]} {...props}>
      <mesh material={CustomMaterial} castShadow receiveShadow customDepthMaterial={CustomMaterial.getDepthMaterial()}>
        <icosahedronGeometry args={[2, 50]} />
      </mesh>
      <mesh material={new MeshBasicMaterial({ color: 0x000000 })}>
        <icosahedronGeometry args={[2, 10]} />
      </mesh>
    </group>
  )
}
