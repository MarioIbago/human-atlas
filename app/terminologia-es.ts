export interface TerminologiaES {
  preferido?: string;
  sinonimos: string[];
  nota?: string;
}

/**
 * Excepciones y sinónimos anatómicos en español.
 *
 * Criterio:
 * 1) identidad anatómica y nomenclatura: Terminologia Anatomica 2 (FIPAT/IFAA, 2019);
 * 2) uso médico panhispánico: DPTM de RANME/ALANAM;
 * 3) sinónimos tradicionales/epónimos se conservan para búsqueda, pero no sustituyen
 *    al término preferido cuando la nomenclatura moderna recomienda otro.
 *
 * El nombre fuente de BodyParts3D y el ID FMA permanecen intactos.
 */
const TERMINOS: Record<string, TerminologiaES> = {
  'brain': {preferido:'Encéfalo', sinonimos:['cerebro'], nota:'En anatomía estricta, cerebro es una parte del encéfalo.'},
  'cerebrum': {preferido:'Cerebro', sinonimos:['telencéfalo']},
  'brainstem': {preferido:'Tronco encefálico', sinonimos:['tronco del encéfalo','tallo cerebral']},
  'pituitary gland': {preferido:'Hipófisis', sinonimos:['glándula pituitaria']},
  'adrenal gland': {preferido:'Glándula suprarrenal', sinonimos:['glándula adrenal']},
  'scapula': {preferido:'Escápula', sinonimos:['omóplato','paletilla']},
  'ulna': {preferido:'Ulna', sinonimos:['cúbito'], nota:'Ulna es el término de la nomenclatura anatómica internacional; cúbito permanece como sinónimo tradicional en español.'},
  'fibula': {preferido:'Fíbula', sinonimos:['peroné']},
  'patella': {preferido:'Rótula', sinonimos:['patela']},
  'talus': {preferido:'Talus', sinonimos:['astrágalo']},
  'auditory tube': {preferido:'Tuba auditiva', sinonimos:['tuba faringotimpánica','trompa de Eustaquio']},
  'pharyngotympanic tube': {preferido:'Tuba faringotimpánica', sinonimos:['tuba auditiva','trompa de Eustaquio']},
  'uterine tube': {preferido:'Tuba uterina', sinonimos:['trompa uterina','trompa de Falopio']},
  'fallopian tube': {preferido:'Tuba uterina', sinonimos:['trompa uterina','trompa de Falopio']},
  'common bile duct': {preferido:'Conducto colédoco', sinonimos:['colédoco','conducto biliar común']},
  'vas deferens': {preferido:'Conducto deferente', sinonimos:['vas deferens','vaso deferente','ducto deferente','canal deferente']},
  'sciatic nerve': {preferido:'Nervio ciático', sinonimos:['nervio isquiático']},
  'appendix': {preferido:'Apéndice vermiforme', sinonimos:['apéndice cecal','apéndice']},
  'thyroid gland': {preferido:'Glándula tiroides', sinonimos:['tiroides']},
  'parathyroid gland': {preferido:'Glándula paratiroides', sinonimos:['paratiroides']},
  'prostate': {preferido:'Próstata', sinonimos:['glándula prostática']},
  'eyeball': {preferido:'Globo ocular', sinonimos:['ojo']},
  'optic disc': {preferido:'Disco óptico', sinonimos:['papila óptica','papila del nervio óptico']},
  'tympanic membrane': {preferido:'Membrana timpánica', sinonimos:['tímpano']},
  'mandible': {preferido:'Mandíbula', sinonimos:['maxilar inferior']},
  'maxilla': {preferido:'Maxilar', sinonimos:['maxilar superior']},
  'clavicle': {preferido:'Clavícula', sinonimos:['hueso clavicular']},
  'hyoid bone': {preferido:'Hueso hioides', sinonimos:['hioides']},
  'coccyx': {preferido:'Cóccix', sinonimos:['cóccix','coxis']},
  'esophagus': {preferido:'Esófago', sinonimos:['oesófago']},
  'larynx': {preferido:'Laringe', sinonimos:['caja de la voz']},
  'trachea': {preferido:'Tráquea', sinonimos:['conducto traqueal']},
  'urinary bladder': {preferido:'Vejiga urinaria', sinonimos:['vejiga']},
  'gallbladder': {preferido:'Vesícula biliar', sinonimos:['vesícula']},
  'inferior vena cava': {preferido:'Vena cava inferior', sinonimos:['cava inferior']},
  'superior vena cava': {preferido:'Vena cava superior', sinonimos:['cava superior']},
  'aortic arch': {preferido:'Arco aórtico', sinonimos:['cayado aórtico','cayado de la aorta']},
  'brachiocephalic trunk': {preferido:'Tronco braquiocefálico', sinonimos:['arteria innominada','tronco arterial braquiocefálico']},
  'great saphenous vein': {preferido:'Vena safena magna', sinonimos:['safena mayor','vena safena interna']},
  'small saphenous vein': {preferido:'Vena safena menor', sinonimos:['safena menor','vena safena externa']},
  'temporomandibular joint': {preferido:'Articulación temporomandibular', sinonimos:['ATM']},
  'pubic symphysis': {preferido:'Sínfisis púbica', sinonimos:['sínfisis del pubis']},
  'sternocleidomastoid muscle': {preferido:'Músculo esternocleidomastoideo', sinonimos:['esternocleidomastoideo','ECM']},
  'gastrocnemius muscle': {preferido:'Músculo gastrocnemio', sinonimos:['gastrocnemio','gemelos']},
  'soleus muscle': {preferido:'Músculo sóleo', sinonimos:['sóleo']},
  'rectus abdominis': {preferido:'Músculo recto del abdomen', sinonimos:['recto abdominal','recto del abdomen']},
};

const NORMALIZA = (texto:string) => texto.trim().toLowerCase().replace(/\s+/g,' ');
const CAPITALIZA = (texto:string) => texto ? texto[0].toUpperCase()+texto.slice(1) : texto;

function variantesLaterales(original:string, preferido:string, sinonimos:string[]){
  const m=NORMALIZA(original).match(/^(left|right)\s+(.+)$/);
  if(!m)return {preferido,sinonimos};
  const base=TERMINOS[m[2]];
  if(!base)return {preferido,sinonimos};
  const lado=m[1]==='left'?'izquierdo':'derecho';
  const ladoF=m[1]==='left'?'izquierda':'derecha';
  const esFemenino=/^(glándula|vena|arteria|escápula|fíbula|rótula|ulna|tuba|membrana|vejiga|vesícula|mandíbula)\b/i.test(base.preferido??'');
  const sufijo=esFemenino?ladoF:lado;
  return {
    preferido:base.preferido?`${base.preferido} ${sufijo}`:preferido,
    sinonimos:[...base.sinonimos.map(s=>`${CAPITALIZA(s)} ${sufijo}`),...sinonimos],
  };
}

export function resolverTerminologia(original:string, traduccionCalculada:string):TerminologiaES{
  const clave=NORMALIZA(original);
  const exacto=TERMINOS[clave];
  if(exacto)return {preferido:exacto.preferido??traduccionCalculada,sinonimos:[...exacto.sinonimos],nota:exacto.nota};
  const lateral=variantesLaterales(original,traduccionCalculada,[]);
  return {preferido:lateral.preferido,sinonimos:[...new Set(lateral.sinonimos)]};
}

export function sinonimosAnatomicos(original:string,traduccionCalculada:string){
  return resolverTerminologia(original,traduccionCalculada).sinonimos;
}
