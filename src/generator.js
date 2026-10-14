export const STYLE_PRESETS={
  "Modern Anime":{line:"#241b2a",base:"#e9a6b7",shadow:"#6d405f",highlight:"#fff0f4",accent:"#ff6f9c"},
  "Dark Fantasy":{line:"#171827",base:"#b87578",shadow:"#34253f",highlight:"#e9d6cf",accent:"#d35b76"},
  "Classic Fantasy":{line:"#2a2430",base:"#d99d72",shadow:"#63465b",highlight:"#f7e2c5",accent:"#e8b24b"},
  "Supernatural Action":{line:"#111522",base:"#a9c0d8",shadow:"#3b4264",highlight:"#f2fbff",accent:"#6ee7ff"},
  "Warm Adventure":{line:"#30231e",base:"#e0a16e",shadow:"#704a3d",highlight:"#ffe2b5",accent:"#ffbd55"},
  "Moonlit Blue":{line:"#11172a",base:"#a9b8d7",shadow:"#354268",highlight:"#e7f1ff",accent:"#80aaff"}
};

const GUIDES={
  Character:["Gesture and silhouette","Head/body landmarks","Pose and hands","Hair masses","Clothing layers","Line art","Flats","Cel shadows","Highlights and rim light"],
  Face:["Head sphere","Centerline and eye line","Eye shapes","Brows and mouth","Nose plane","Hairline","Expression pass","Shadow shapes"],
  "Full Body":["Gesture","Rib cage and pelvis","Limb cylinders","Hands and feet","Clothing","Silhouette cleanup","Cel shading"],
  Chibi:["Large head","Compact torso","Short limbs","Simple hands/feet","Oversized eyes","Graphic shadows"],
  Creature:["Species reference","Primary masses","Joint landmarks","Head/limb anatomy","Surface features","Silhouette","Color pattern"],
  Vehicle:["Primary silhouette","Chassis/body masses","Wheel or track geometry","Cabin/cockpit","Mechanical details","Materials","Lighting"],
  Building:["Horizon line","Vanishing points","Primary volumes","Openings","Trim","Surface materials","Atmosphere"],
  Landscape:["Horizon","Large shapes","Depth planes","Lighting direction","Atmospheric perspective","Foreground detail"],
  Interior:["Room box","Perspective grid","Furniture masses","Lighting sources","Materials","Foreground framing"],
  Prop:["Primary shape","Secondary forms","Material breaks","Wear/detail","Shadow/highlight"]
};

export function buildGuide(subject,style){
  const palette=STYLE_PRESETS[style]||STYLE_PRESETS["Modern Anime"];
  const steps=GUIDES[subject]||GUIDES.Character;
  return {
    subject,style,palette,
    steps,
    workflow:["reference","gesture","construction","clean line","flat color","cel shadow","highlight","FX","3D staging"],
    editableParts:true
  };
}

export function makeCharacterParts(options={}){
  const palette=STYLE_PRESETS[options.style]||STYLE_PRESETS["Modern Anime"];
  return {
    id:"CHAR-"+crypto.randomUUID().slice(0,8).toUpperCase(),
    category:"Characters",
    style:options.style||"Modern Anime",
    gender:options.gender||"androgynous",
    bodyType:options.bodyType||"heroic adult",
    parts:{
      head:{shape:"oval",angle:"three-quarter"},
      eyes:{shape:options.eye||"expressive",color:palette.accent},
      hair:{style:options.hair||"layered",color:"#33283d"},
      expression:{type:options.expression||"determined"},
      torso:{pose:"neutral"},
      hands:{pose:"relaxed"},
      clothing:{set:options.clothing||"fantasy jacket"},
      accessories:[],
      shadows:{color:palette.shadow},
      highlights:{color:palette.highlight}
    },
    palette
  };
}

export function makeClothingSet(type="fantasy jacket",style="Modern Anime"){
  const p=STYLE_PRESETS[style]||STYLE_PRESETS["Modern Anime"];
  return {
    id:"CLOTH-"+crypto.randomUUID().slice(0,8).toUpperCase(),
    type,
    layers:["base garment","seams","folds","accessories","shadow","highlight"],
    material:type.toLowerCase().includes("armor")?"metal":"fabric",
    colors:{base:p.base,shadow:p.shadow,highlight:p.highlight},
    attachmentPoints:["neck","shoulderL","shoulderR","waist","wristL","wristR","hipL","hipR"]
  };
}
