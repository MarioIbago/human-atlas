import type {Atlas,Concept,Part,SystemId} from './anatomy';

/**
 * Capa de localización anatómica.
 *
 * BodyParts3D conserva sus identificadores, IDs FMA/FJ y nombres fuente en inglés.
 * Esta capa genera nombres de presentación en español y guarda `nombreOriginal`
 * para que nunca se pierda la trazabilidad con la fuente.
 */

const EXACTAS:Record<string,string> = {
 'heart':'corazón',
 'brain':'encéfalo',
 'cerebrum':'cerebro',
 'cerebellum':'cerebelo',
 'brainstem':'tronco encefálico',
 'spinal cord':'médula espinal',
 'liver':'hígado',
 'stomach':'estómago',
 'spleen':'bazo',
 'pancreas':'páncreas',
 'urinary bladder':'vejiga urinaria',
 'trachea':'tráquea',
 'diaphragm':'diafragma',
 'esophagus':'esófago',
 'pharynx':'faringe',
 'larynx':'laringe',
 'tongue':'lengua',
 'thyroid gland':'glándula tiroides',
 'pituitary gland':'hipófisis',
 'pineal gland':'glándula pineal',
 'thymus':'timo',
 'prostate':'próstata',
 'penis':'pene',
 'testis':'testículo',
 'scrotum':'escroto',
 'urethra':'uretra',
 'rectum':'recto',
 'anus':'ano',
 'appendix':'apéndice vermiforme',
 'cecum':'ciego',
 'duodenum':'duodeno',
 'jejunum':'yeyuno',
 'ileum':'íleon',
 'colon':'colon',
 'gallbladder':'vesícula biliar',
 'kidney':'riñón',
 'ureter':'uréter',
 'lung':'pulmón',
 'left lung':'pulmón izquierdo',
 'right lung':'pulmón derecho',
 'aorta':'aorta',
 'ascending aorta':'aorta ascendente',
 'aortic arch':'arco aórtico',
 'descending aorta':'aorta descendente',
 'inferior vena cava':'vena cava inferior',
 'superior vena cava':'vena cava superior',
 'pulmonary trunk':'tronco pulmonar',
 'mandible':'mandíbula',
 'maxilla':'maxilar',
 'upper jaw':'maxilar superior',
 'lower jaw':'mandíbula',
 'hyoid bone':'hueso hioides',
 'clavicle':'clavícula',
 'scapula':'escápula',
 'sternum':'esternón',
 'humerus':'húmero',
 'radius':'radio',
 'ulna':'cúbito',
 'femur':'fémur',
 'patella':'rótula',
 'tibia':'tibia',
 'fibula':'fíbula',
 'talus':'astrágalo',
 'calcaneus':'calcáneo',
 'sacrum':'sacro',
 'coccyx':'cóccix',
 'pelvis':'pelvis',
 'eyeball':'globo ocular',
 'cornea':'córnea',
 'retina':'retina',
 'choroid':'coroides',
 'lens':'cristalino',
 'optic nerve':'nervio óptico',
 'olfactory nerve':'nervio olfatorio',
 'facial nerve':'nervio facial',
 'vagus nerve':'nervio vago',
 'sciatic nerve':'nervio ciático',
 'gingiva of upper jaw':'encía del maxilar superior',
 'gingiva of lower jaw':'encía mandibular',
 'anterior chamber of eyeball':'cámara anterior del globo ocular',
 'posterior chamber of eyeball':'cámara posterior del globo ocular',
 'lateral rectus':'músculo recto lateral',
 'medial rectus':'músculo recto medial',
 'superior rectus':'músculo recto superior',
 'inferior rectus':'músculo recto inferior',
 'corona ciliaris':'corona ciliar',
};

const FRASES:[string,string][] = [
 ['common carotid','carótida común'],
 ['internal carotid','carótida interna'],
 ['external carotid','carótida externa'],
 ['superior mesenteric','mesentérica superior'],
 ['inferior mesenteric','mesentérica inferior'],
 ['anterior cerebral','cerebral anterior'],
 ['middle cerebral','cerebral media'],
 ['posterior cerebral','cerebral posterior'],
 ['anterior communicating','comunicante anterior'],
 ['posterior communicating','comunicante posterior'],
 ['anterior ethmoidal','etmoidal anterior'],
 ['posterior ethmoidal','etmoidal posterior'],
 ['deep cervical','cervical profunda'],
 ['superficial cervical','cervical superficial'],
 ['internal thoracic','torácica interna'],
 ['external iliac','ilíaca externa'],
 ['internal iliac','ilíaca interna'],
 ['common iliac','ilíaca común'],
 ['deep femoral','femoral profunda'],
 ['great saphenous','safena magna'],
 ['small saphenous','safena menor'],
 ['pulmonary artery','arteria pulmonar'],
 ['pulmonary vein','vena pulmonar'],
 ['portal vein','vena porta'],
 ['hepatic vein','vena hepática'],
 ['renal artery','arteria renal'],
 ['renal vein','vena renal'],
 ['coronary artery','arteria coronaria'],
 ['coronary sinus','seno coronario'],
 ['brachiocephalic trunk','tronco braquiocefálico'],
 ['brachiocephalic vein','vena braquiocefálica'],
 ['spinal nerve','nervio espinal'],
 ['cranial nerve','nervio craneal'],
 ['optic chiasm','quiasma óptico'],
 ['spinal ganglion','ganglio espinal'],
 ['sympathetic trunk','tronco simpático'],
 ['adrenal gland','glándula suprarrenal'],
 ['parotid gland','glándula parótida'],
 ['submandibular gland','glándula submandibular'],
 ['sublingual gland','glándula sublingual'],
 ['lacrimal gland','glándula lagrimal'],
 ['mammary gland','glándula mamaria'],
 ['lymph node','ganglio linfático'],
 ['lymphatic vessel','vaso linfático'],
 ['small intestine','intestino delgado'],
 ['large intestine','intestino grueso'],
 ['ascending colon','colon ascendente'],
 ['transverse colon','colon transverso'],
 ['descending colon','colon descendente'],
 ['sigmoid colon','colon sigmoide'],
 ['common bile duct','conducto colédoco'],
 ['bile duct','conducto biliar'],
 ['pancreatic duct','conducto pancreático'],
 ['cystic duct','conducto cístico'],
 ['hepatic duct','conducto hepático'],
 ['nasal cavity','cavidad nasal'],
 ['oral cavity','cavidad oral'],
 ['thoracic cavity','cavidad torácica'],
 ['abdominal cavity','cavidad abdominal'],
 ['pelvic cavity','cavidad pélvica'],
 ['vertebral canal','conducto vertebral'],
 ['intervertebral disc','disco intervertebral'],
 ['vertebral body','cuerpo vertebral'],
 ['spinous process','apófisis espinosa'],
 ['transverse process','apófisis transversa'],
 ['articular process','apófisis articular'],
 ['mastoid process','apófisis mastoides'],
 ['styloid process','apófisis estiloides'],
 ['xiphoid process','apófisis xifoides'],
 ['iliac crest','cresta ilíaca'],
 ['pubic symphysis','sínfisis púbica'],
 ['sacroiliac joint','articulación sacroilíaca'],
 ['temporomandibular joint','articulación temporomandibular'],
 ['shoulder joint','articulación del hombro'],
 ['elbow joint','articulación del codo'],
 ['wrist joint','articulación de la muñeca'],
 ['hip joint','articulación de la cadera'],
 ['knee joint','articulación de la rodilla'],
 ['ankle joint','articulación del tobillo'],
 ['bone marrow','médula ósea'],
 ['skeletal muscle','músculo esquelético'],
 ['smooth muscle','músculo liso'],
 ['cardiac muscle','músculo cardíaco'],
 ['rectus abdominis','recto del abdomen'],
 ['pectoralis major','pectoral mayor'],
 ['pectoralis minor','pectoral menor'],
 ['gluteus maximus','glúteo mayor'],
 ['gluteus medius','glúteo medio'],
 ['gluteus minimus','glúteo menor'],
 ['biceps brachii','bíceps braquial'],
 ['triceps brachii','tríceps braquial'],
 ['biceps femoris','bíceps femoral'],
 ['gastrocnemius muscle','músculo gastrocnemio'],
 ['soleus muscle','músculo sóleo'],
 ['deltoid muscle','músculo deltoides'],
 ['trapezius muscle','músculo trapecio'],
 ['latissimus dorsi','dorsal ancho'],
 ['sternocleidomastoid muscle','músculo esternocleidomastoideo'],
 ['anterior chamber','cámara anterior'],
 ['posterior chamber','cámara posterior'],
 ['upper eyelid','párpado superior'],
 ['lower eyelid','párpado inferior'],
 ['optic disc','disco óptico'],
 ['ciliary body','cuerpo ciliar'],
 ['vitreous body','cuerpo vítreo'],
 ['semicircular canal','conducto semicircular'],
 ['tympanic membrane','membrana timpánica'],
 ['auditory tube','trompa auditiva'],
 ['vocal fold','pliegue vocal'],
 ['epiglottis','epiglotis'],
 ['bronchial tree','árbol bronquial'],
 ['main bronchus','bronquio principal'],
 ['upper lobe','lóbulo superior'],
 ['middle lobe','lóbulo medio'],
 ['lower lobe','lóbulo inferior'],
 ['renal pelvis','pelvis renal'],
 ['seminal vesicle','vesícula seminal'],
 ['vas deferens','conducto deferente'],
 ['spermatic cord','cordón espermático'],
 ['corpus cavernosum','cuerpo cavernoso'],
 ['corpus spongiosum','cuerpo esponjoso'],
];

const PALABRAS:Record<string,string> = {
 anterior:'anterior', posterior:'posterior', superior:'superior', inferior:'inferior',
 medial:'medial', lateral:'lateral', internal:'interno', external:'externo',
 superficial:'superficial', deep:'profundo', proximal:'proximal', distal:'distal',
 common:'común', proper:'propio', middle:'medio', central:'central',
 dorsal:'dorsal', ventral:'ventral', palmar:'palmar', plantar:'plantar',
 cranial:'craneal', caudal:'caudal', cervical:'cervical', thoracic:'torácico',
 lumbar:'lumbar', sacral:'sacro', pelvic:'pélvico', abdominal:'abdominal',
 hepatic:'hepático', gastric:'gástrico', renal:'renal', splenic:'esplénico',
 pulmonary:'pulmonar', cardiac:'cardíaco', coronary:'coronario', cerebral:'cerebral',
 cerebellar:'cerebeloso', spinal:'espinal', cutaneous:'cutáneo', muscular:'muscular',
 articular:'articular', temporal:'temporal', frontal:'frontal', parietal:'parietal',
 occipital:'occipital', facial:'facial', maxillary:'maxilar', mandibular:'mandibular',
 ethmoidal:'etmoidal', sphenoidal:'esfenoidal', orbital:'orbitario', nasal:'nasal',
 oral:'oral', lingual:'lingual', pharyngeal:'faríngeo', laryngeal:'laríngeo',
 bronchial:'bronquial', esophageal:'esofágico', intestinal:'intestinal', colic:'cólico',
 rectal:'rectal', anal:'anal', iliac:'ilíaco', femoral:'femoral', popliteal:'poplíteo',
 tibial:'tibial', fibular:'fibular', radial:'radial', ulnar:'ulnar', brachial:'braquial',
 axillary:'axilar', subclavian:'subclavio', carotid:'carótido', jugular:'yugular',
 first:'primero', second:'segundo', third:'tercero', fourth:'cuarto', fifth:'quinto',
 head:'cabeza', neck:'cuello', body:'cuerpo', tail:'cola', base:'base', apex:'ápice',
 root:'raíz', trunk:'tronco', branch:'rama', branches:'ramas', part:'porción',
 surface:'superficie', border:'borde', margin:'margen', wall:'pared', septum:'tabique',
 capsule:'cápsula', cortex:'corteza', medulla:'médula', nucleus:'núcleo', ganglion:'ganglio',
 plexus:'plexo', sinus:'seno', canal:'conducto', duct:'conducto', meatus:'meato',
 foramen:'foramen', fossa:'fosa', groove:'surco', notch:'escotadura', crest:'cresta',
 tubercle:'tubérculo', condyle:'cóndilo', epicondyle:'epicóndilo', process:'apófisis',
 artery:'arteria', arteries:'arterias', vein:'vena', veins:'venas', nerve:'nervio', nerves:'nervios',
 muscle:'músculo', muscles:'músculos', tendon:'tendón', ligament:'ligamento', ligaments:'ligamentos',
 fascia:'fascia', cartilage:'cartílago', bone:'hueso', bones:'huesos', joint:'articulación',
 gland:'glándula', node:'ganglio', vessel:'vaso', vessels:'vasos', valve:'válvula',
 lobe:'lóbulo', lobule:'lobulillo', papilla:'papila', membrane:'membrana', chamber:'cámara',
 eye:'ojo', eyeball:'globo ocular', ear:'oído', tooth:'diente', teeth:'dientes', gingiva:'encía',
 jaw:'mandíbula', lip:'labio', cheek:'mejilla', skin:'piel', hair:'pelo', nail:'uña',
 rib:'costilla', ribs:'costillas', vertebra:'vértebra', vertebrae:'vértebras', skull:'cráneo',
 hand:'mano', foot:'pie', arm:'brazo', forearm:'antebrazo', thigh:'muslo', leg:'pierna',
 finger:'dedo de la mano', toe:'dedo del pie', thumb:'pulgar', heel:'talón',
 kidney:'riñón', ureter:'uréter', bladder:'vejiga', urethra:'uretra', lung:'pulmón',
 bronchus:'bronquio', bronchi:'bronquios', liver:'hígado', stomach:'estómago', spleen:'bazo',
 pancreas:'páncreas', intestine:'intestino', rectum:'recto', prostate:'próstata', testis:'testículo',
 ovary:'ovario', uterus:'útero', vagina:'vagina', heart:'corazón', brain:'encéfalo',
 retina:'retina', cornea:'córnea', choroid:'coroides', iris:'iris', lens:'cristalino',
 left:'izquierdo', right:'derecho', upper:'superior', lower:'inferior',
};

const FEMENINOS = /^(arteria|vena|rama|glándula|cavidad|cámara|fascia|membrana|superficie|coroides|médula|vértebra|costilla|escápula|clavícula|tibia|fíbula|pelvis|amígdala|válvula|uretra|tráquea|lengua|retina|córnea|raíz|cápsula|fosa|cresta|mandíbula|encía|articulación)\b/i;

function clave(texto:string){return texto.trim().toLowerCase().replace(/\s+/g,' ');}
function capitalizar(texto:string){return texto ? texto[0].toUpperCase()+texto.slice(1) : texto;}
function sinAcentos(texto:string){return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,'');}

export function normalizarBusqueda(texto:string){
 return sinAcentos(texto).toLowerCase().replace(/[^a-z0-9áéíóúüñ\s-]/g,' ').replace(/\s+/g,' ').trim();
}

function articuloDe(nombre:string){
 const femenino=FEMENINOS.test(nombre);
 const plural=/^(arterias|venas|ramas|glándulas|cavidades|cámaras|fascias|membranas|vértebras|costillas|huesos|músculos|nervios|ganglios|vasos|dientes)\b/i.test(nombre);
 if(plural)return femenino?'de las':'de los';
 return femenino?'de la':'del';
}

function conLado(nombre:string,lado:'left'|'right'|null){
 if(!lado)return nombre;
 const femenino=FEMENINOS.test(nombre);
 const plural=/^(arterias|venas|ramas|glándulas|cavidades|cámaras|fascias|membranas|vértebras|costillas|huesos|músculos|nervios|ganglios|vasos|dientes)\b/i.test(nombre);
 const base=lado==='left'?'izquierd':'derech';
 return `${nombre} ${base}${plural?(femenino?'as':'os'):(femenino?'a':'o')}`;
}

function traducirDescriptores(texto:string){
 let salida=clave(texto);
 for(const [origen,destino] of FRASES){
  salida=salida.replace(new RegExp(`\\b${origen.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\b`,'g'),destino);
 }
 salida=salida.split(/\s+/).map(p=>PALABRAS[p]??p).join(' ');
 return salida.replace(/\s+/g,' ').trim();
}

function traducirDiente(original:string){
 const m=clave(original).match(/^(left|right) (upper|lower) (first|second|third|central|lateral) secondary (molar|premolar|incisor|canine) tooth$/);
 if(!m)return null;
 const [,lado,posicion,orden,tipo]=m;
 const pieza:Record<string,string>={molar:'molar',premolar:'premolar',incisor:'incisivo',canine:'canino'};
 const ordenEs:Record<string,string>={first:'primer',second:'segundo',third:'tercer',central:'central',lateral:'lateral'};
 const nivel=posicion==='upper'?'superior':'inferior';
 const ladoEs=lado==='left'?'izquierdo':'derecho';
 return `${ordenEs[orden]} ${pieza[tipo]} permanente ${nivel} ${ladoEs}`;
}

function traducirFraseBase(original:string):string{
 const k=clave(original);
 if(EXACTAS[k])return EXACTAS[k];

 const de=k.indexOf(' of ');
 if(de>0){
  const izquierda=traducirFraseBase(k.slice(0,de));
  const derecha=traducirFraseBase(k.slice(de+4));
  return `${izquierda} ${articuloDe(derecha)} ${derecha}`;
 }

 const sufijos:[RegExp,string][] = [
  [/^(.+) artery$/,'arteria'],[/^(.+) vein$/,'vena'],[/^(.+) nerve$/,'nervio'],
  [/^(.+) muscle$/,'músculo'],[/^(.+) ligament$/,'ligamento'],[/^(.+) tendon$/,'tendón'],
  [/^(.+) gland$/,'glándula'],[/^(.+) duct$/,'conducto'],[/^(.+) joint$/,'articulación'],
  [/^(.+) bone$/,'hueso'],[/^(.+) cartilage$/,'cartílago'],[/^(.+) fascia$/,'fascia'],
  [/^(.+) branch$/,'rama'],[/^(.+) foramen$/,'foramen'],[/^(.+) fossa$/,'fosa'],
 ];
 for(const [patron,nucleo] of sufijos){
  const m=k.match(patron);
  if(m)return `${nucleo} ${traducirDescriptores(m[1])}`.trim();
 }

 return traducirDescriptores(k);
}

export function traducirNombreAnatomico(original:string){
 if(!original)return original;
 const k=clave(original);
 if(EXACTAS[k])return capitalizar(EXACTAS[k]);
 const diente=traducirDiente(original);
 if(diente)return capitalizar(diente);

 let lado:'left'|'right'|null=null;
 let base=k;
 const inicio=base.match(/^(left|right)\s+(.+)$/);
 if(inicio){lado=inicio[1] as 'left'|'right';base=inicio[2];}
 else {
  const interno=base.match(/^(.+?)\s+of\s+(left|right)\s+(.+)$/);
  if(interno){
   lado=interno[2] as 'left'|'right';
   const primera=traducirFraseBase(interno[1]);
   const segunda=traducirFraseBase(interno[3]);
   return capitalizar(`${primera} ${articuloDe(segunda)} ${conLado(segunda,lado)}`);
  }
 }

 return capitalizar(conLado(traducirFraseBase(base),lado));
}

export function localizarAtlas(atlas:Atlas):Atlas{
 const partes:Part[]=atlas.parts.map(p=>({
  ...p,
  nombreOriginal:p.nombreOriginal??p.name,
  name:traducirNombreAnatomico(p.nombreOriginal??p.name),
 }));
 const conceptos:Concept[]=atlas.concepts.map(c=>({
  ...c,
  nombreOriginal:c.nombreOriginal??c.name,
  name:traducirNombreAnatomico(c.nombreOriginal??c.name),
 }));
 return {...atlas,parts:partes,concepts:conceptos};
}

export function coincideConcepto(concepto:Concept,consulta:string){
 const q=normalizarBusqueda(consulta);
 if(!q)return true;
 const campos=[concepto.name,concepto.nombreOriginal??'',concepto.id].map(normalizarBusqueda);
 return campos.some(c=>c.includes(q));
}

export interface EntradaIndice {
 id:string;
 nombre:string;
 nombreOriginal:string;
 sistema:SystemId;
 piezas:number;
 concepto:Concept;
}

export function construirIndiceMaestro(atlas:Atlas):EntradaIndice[]{
 const sistemaPorPieza=new Map(atlas.parts.map(p=>[p.id,p.system] as const));
 return atlas.concepts.map(concepto=>{
  const sistemas=concepto.elements.map(id=>sistemaPorPieza.get(id)).filter((s):s is SystemId=>!!s);
  const sistema=sistemas[0]??'connective';
  return {
   id:concepto.id,
   nombre:concepto.name,
   nombreOriginal:concepto.nombreOriginal??concepto.name,
   sistema,
   piezas:concepto.elements.length,
   concepto,
  };
 }).sort((a,b)=>a.nombre.localeCompare(b.nombre,'es',{sensitivity:'base'}));
}
