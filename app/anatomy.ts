// Los IDs internos se conservan en inglés porque forman parte del contrato con BodyParts3D.
// La capa visible y semántica del atlas se presenta en español.
export type SystemId = 'skeletal'|'muscular'|'arterial'|'venous'|'nervous'|'digestive'|'respiratory'|'urinary'|'reproductive'|'lymphatic'|'endocrine'|'integumentary'|'connective'|'sensory'|'cardiac';

export const SYSTEMS: {id:SystemId;name:string;color:string;description:string}[] = [
 {id:'skeletal',name:'Sistema esquelético',color:'#e2d9ba',description:'Los huesos forman el armazón de soporte del cuerpo, protegen órganos y proporcionan puntos de inserción para los músculos. El tejido óseo también almacena minerales y participa en la producción de células sanguíneas.'},
 {id:'muscular',name:'Sistema muscular',color:'#a85b50',description:'Los músculos esqueléticos generan movimiento al ejercer tracción sobre sus inserciones. Junto con los tendones, movilizan articulaciones, estabilizan la postura y producen calor.'},
 {id:'cardiac',name:'Corazón',color:'#b96760',description:'El corazón es una bomba muscular de cuatro cavidades. Sus válvulas dirigen el flujo sanguíneo hacia adelante a través de los circuitos pulmonar y sistémico.'},
 {id:'sensory',name:'Órganos de los sentidos',color:'#b0c8ce',description:'Estas estructuras participan en los sentidos especiales, como la visión, la audición y el equilibrio. Sus tejidos especializados detectan estímulos y trabajan con el sistema nervioso para transmitir información.'},
 {id:'arterial',name:'Sistema arterial',color:'#c05245',description:'Las arterias llevan la sangre desde el corazón hacia los tejidos o, en la circulación pulmonar, hacia los pulmones.'},
 {id:'venous',name:'Sistema venoso',color:'#527c9f',description:'Las venas devuelven la sangre hacia el corazón. Las redes superficiales y profundas recogen sangre de los tejidos; las venas pulmonares llevan sangre oxigenada desde los pulmones.'},
 {id:'nervous',name:'Sistema nervioso',color:'#d8b565',description:'El encéfalo, la médula espinal y los nervios periféricos transmiten y procesan señales. Participan en la sensibilidad, el movimiento, la coordinación y la regulación automática de las funciones corporales.'},
 {id:'respiratory',name:'Sistema respiratorio',color:'#b98991',description:'Las vías respiratorias conducen aire a los pulmones, donde se intercambian oxígeno y dióxido de carbono entre el aire y la sangre. La respiración depende de cambios de presión generados por los músculos respiratorios.'},
 {id:'digestive',name:'Sistema digestivo',color:'#b8916b',description:'El tubo digestivo descompone los alimentos, absorbe nutrientes y agua y desplaza los residuos. Los órganos accesorios aportan bilis y enzimas digestivas.'},
 {id:'urinary',name:'Sistema urinario',color:'#b47961',description:'Los riñones filtran la sangre y regulan el equilibrio de líquidos, electrolitos y ácido-base. La orina viaja por los uréteres hasta la vejiga y sale por la uretra.'},
 {id:'lymphatic',name:'Sistema linfático',color:'#879f7c',description:'Los vasos linfáticos devuelven el exceso de líquido intersticial a la circulación. Los ganglios y otros órganos linfoides participan en la vigilancia y respuesta inmunitaria.'},
 {id:'endocrine',name:'Sistema endocrino',color:'#c5a09a',description:'Los órganos endocrinos liberan hormonas a la sangre para coordinar procesos como metabolismo, crecimiento, respuesta al estrés y reproducción.'},
 {id:'reproductive',name:'Sistema reproductor',color:'#bda098',description:'Las estructuras reproductoras masculinas representadas contribuyen a la producción, maduración y transporte de espermatozoides y a la producción de hormonas sexuales.'},
 {id:'integumentary',name:'Sistema tegumentario',color:'#ba9b7d',description:'La superficie corporal proporciona una referencia anatómica externa. El sistema tegumentario forma una barrera protectora y participa en la sensibilidad y la regulación de la temperatura.'},
 {id:'connective',name:'Tejido conectivo',color:'#aec3bb',description:'Cartílagos, ligamentos y otros tejidos conectivos sostienen, unen y separan estructuras. Entre sus funciones se incluyen estabilizar articulaciones y distribuir cargas mecánicas.'},
];

export interface Part {
 id:string;
 name:string;
 nombreOriginal?:string;
 conceptId:string;
 system:SystemId;
 chunk:number;
 positions:number;
 normals:number;
 indices:number;
 vertexCount:number;
 indexCount:number;
 bounds:[number[],number[]];
}

export interface Concept {
 id:string;
 name:string;
 nombreOriginal?:string;
 elements:string[];
}

export interface Atlas {
 version:string;
 sex?:'male';
 source?:string;
 scope?:string;
 parts:Part[];
 concepts:Concept[];
 chunks:{url:string;bytes:number;gzip?:string;gzipBytes?:number}[];
 triangles:number;
}

export type View = 'three-quarter'|'front'|'back'|'side';
export interface SceneState {inspectorOpen?:boolean;explode:number;visible:SystemId[];selected:string[];isolate:boolean;view:View;rotate:boolean;reset:number}
export const DEFAULT_VISIBLE:SystemId[] = ['cardiac','sensory','skeletal','muscular','arterial','venous','nervous','respiratory','digestive','urinary','lymphatic','endocrine','reproductive','connective'];

export const EXPLANATIONS:Record<string,string> = {
 'corazón':'Bomba muscular situada en el tórax. Su lado derecho envía sangre a los pulmones y su lado izquierdo impulsa la sangre por la circulación sistémica.',
 'hígado':'Órgano grande situado bajo el lado derecho del diafragma. Procesa nutrientes absorbidos, produce bilis y sintetiza numerosas proteínas transportadas por la sangre.',
 'encéfalo':'Órgano central del sistema nervioso. Sus regiones interconectadas participan en percepción, movimiento, memoria, lenguaje y regulación de funciones corporales.',
 'cerebro':'Parte principal del encéfalo, responsable de numerosas funciones superiores como percepción, movimiento voluntario, memoria, lenguaje y pensamiento.',
 'estómago':'Cámara muscular situada entre el esófago y el intestino delgado. Almacena y mezcla los alimentos con ácido y enzimas antes de liberarlos al duodeno.',
 'bazo':'Órgano linfoide del abdomen superior izquierdo. Filtra la sangre, elimina células sanguíneas envejecidas y participa en las respuestas inmunitarias.',
 'páncreas':'Órgano abdominal con funciones digestivas y endocrinas. Aporta enzimas al intestino delgado y libera hormonas como insulina y glucagón.',
 'vejiga urinaria':'Reservorio muscular de la pelvis que almacena la orina procedente de los riñones a través de los uréteres.',
 'tráquea':'Vía aérea principal que comunica la laringe con los bronquios. Sus cartílagos ayudan a mantener abierta la vía respiratoria.',
 'diafragma':'Músculo ancho que separa tórax y abdomen. Al contraerse aumenta el volumen torácico y favorece la entrada de aire a los pulmones.',
};

export function explanation(name:string,system:SystemId){
 return EXPLANATIONS[name.toLowerCase()] ?? SYSTEMS.find(s=>s.id===system)?.description ?? '';
}
