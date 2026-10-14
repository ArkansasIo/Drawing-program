function makeId(prefix){return prefix+"-"+(globalThis.crypto?.randomUUID?crypto.randomUUID().slice(0,8):Math.random().toString(16).slice(2,10)).toUpperCase()}

export const STYLE_PRESETS={
  "Modern Anime":{line:"#241b2a",base:"#e9a6b7",shadow:"#6d405f",highlight:"#fff0f4",accent:"#ff6f9c"},
  "Dark Fantasy":{line:"#171827",base:"#b87578",shadow:"#34253f",highlight:"#e9d6cf",accent:"#d35b76"},
  "Classic Fantasy":{line:"#2a2430",base:"#d99d72",shadow:"#63465b",highlight:"#f7e2c5",accent:"#e8b24b"},
  "Supernatural Action":{line:"#111522",base:"#a9c0d8",shadow:"#3b4264",highlight:"#f2fbff",accent:"#6ee7ff"},
  "Warm Adventure":{line:"#30231e",base:"#e0a16e",shadow:"#704a3d",highlight:"#ffe2b5",accent:"#ffbd55"},
  "Moonlit Blue":{line:"#11172a",base:"#a9b8d7",shadow:"#354268",highlight:"#e7f1ff",accent:"#80aaff"},
  "Shonen":{line:"#151827",base:"#f0b07a",shadow:"#69435a",highlight:"#fff4dc",accent:"#ff4f67"},
  "Shojo":{line:"#34243b",base:"#f0b7c8",shadow:"#81526f",highlight:"#fff6fb",accent:"#e58bb4"},
  "Seinen":{line:"#171a20",base:"#aeb4b7",shadow:"#40464f",highlight:"#edf2f3",accent:"#8aa9c7"},
  "Chibi":{line:"#32263a",base:"#f2b0a0",shadow:"#754d62",highlight:"#fff0e8",accent:"#ff8aa8"},
  "Manga Ink":{line:"#0b0b0d",base:"#eeeeee",shadow:"#6d6d73",highlight:"#ffffff",accent:"#222222"},
  "Anime Background":{line:"#17222d",base:"#7897a8",shadow:"#354d61",highlight:"#d7efff",accent:"#75c8ff"},
  "Cartoon":{line:"#241f24",base:"#e8b56e",shadow:"#77503f",highlight:"#fff0bd",accent:"#f07d4f"},
  "Comic Book":{line:"#1a1a20",base:"#d8a05f",shadow:"#5c4653",highlight:"#fff0c8",accent:"#e33f55"},
  "Pixel Art":{line:"#111318",base:"#9db36a",shadow:"#4d6048",highlight:"#e9e7b8",accent:"#d86b5d"},
  "Storybook":{line:"#302923",base:"#d7ad7a",shadow:"#765747",highlight:"#fff0c6",accent:"#c97750"}
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
    id:makeId("CHAR"),
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
    id:makeId("CLOTH"),
    type,
    layers:["base garment","seams","folds","accessories","shadow","highlight"],
    material:type.toLowerCase().includes("armor")?"metal":"fabric",
    colors:{base:p.base,shadow:p.shadow,highlight:p.highlight},
    attachmentPoints:["neck","shoulderL","shoulderR","waist","wristL","wristR","hipL","hipR"]
  };
}
