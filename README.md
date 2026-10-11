# Atlas Humano

Explorador anatómico 3D interactivo construido con React, Three.js y shadcn/ui. Permite separar la anatomía masculina adulta de referencia de BodyParts3D en **2,234 mallas seleccionables**, explorar **15 sistemas anatómicos** y buscar **3,432 conceptos con nombre**.

## Español y terminología anatómica

La interfaz y la capa semántica del atlas están en español. El proyecto conserva intactos los identificadores de BodyParts3D/FMA y añade:

- término anatómico preferido en español;
- nombre original en inglés;
- sinónimos y variantes tradicionales útiles para estudio;
- búsqueda bilingüe y por ID FMA;
- notas terminológicas cuando una forma común no coincide exactamente con la nomenclatura preferida.

La nomenclatura se contrasta principalmente con **Terminologia Anatomica 2 (FIPAT/IFAA)**, **TA2Viewer/Open Anatomy** y el **Diccionario Panhispánico de Términos Médicos (RANME/ALANAM)**. Los epónimos se conservan como sinónimos cuando son útiles, pero no reemplazan automáticamente al término anatómico preferido. Consulta [`docs/TERMINOLOGIA_ES.md`](docs/TERMINOLOGIA_ES.md) para el criterio completo y ejemplos.

Ejemplos: `Ulna` también se encuentra buscando `cúbito`; `Fíbula`, con `peroné`; `Talus`, con `astrágalo`; `Tuba auditiva`, con `trompa de Eustaquio`; y `Círculo arterial cerebral`, con `polígono de Willis` cuando el concepto correspondiente existe en la fuente.

## Explorar

- Orbita, acerca y selecciona estructuras directamente sobre el cuerpo.
- Activa o desactiva sistemas anatómicos o usa los preajustes de esqueleto y órganos.
- Separa la anatomía ensamblada hasta convertirla en un inventario espacial de las piezas visibles.
- Busca por nombre en español, nombre original en inglés, sinónimo o identificador FMA.
- Aísla una estructura seleccionada y consulta sus detalles.
- Usa el **Índice maestro** para recorrer todos los conceptos por sistema.
- Controles compactos y paneles adaptados a móvil.

## Índice maestro

El panel **Índice maestro** se construye a partir de los 3,432 conceptos de BodyParts3D. Cada entrada mantiene la relación con sus mallas y muestra o indexa:

- término preferido en español;
- nombre original en inglés;
- sinónimos disponibles;
- identificador FMA;
- sistema anatómico;
- número de piezas modeladas que forman el concepto.

El buscador normaliza acentos y admite términos preferidos, variantes y nombres fuente para que una pregunta de examen o un libro que use nomenclatura tradicional siga llevando a la misma estructura.

## Ejecutar localmente

Requiere Node.js 22.13 o posterior. No se necesitan claves API ni cuentas.

```sh
npm ci
npm run dev
```

Abre http://localhost:3016. Para compilar el sitio estático, ejecuta `npm run build`; la salida se genera en `dist/`.

## Validar

```sh
npm run check
node scripts/validate-atlas.mjs
node scripts/validate-interactions.mjs
npm run build
```

Las validaciones cubren buffers de mallas, nombres y pertenencia a conceptos, disposiciones explotadas sin superposición en escritorio y móvil, contratos de búsqueda e inspección y distinción entre toque y arrastre.

## Datos anatómicos

El visor actual utiliza **BodyParts3D 4.0**, una anatomía masculina adulta de referencia con licencia **CC BY 4.0**. No representa todas las estructuras ni todas las variaciones humanas. Las mallas individuales de la fuente son distintas de los conceptos con nombre, que pueden agrupar varias mallas.

La geometría está simplificada para rendimiento en navegador conservando cada malla fuente. El modelo empaquetado contiene aproximadamente 2.29 millones de triángulos y descarga alrededor de 33 MB de geometría comprimida. Los créditos, enlaces de origen y detalles de adaptación se encuentran en [ATTRIBUTION.md](public/ATTRIBUTION.md).

Este es un explorador educativo, no una herramienta diagnóstica ni quirúrgica.

## Cómo funciona

La geometría se agrupa en lotes. Texturas GPU por estructura controlan traslación, visibilidad y selección, mientras que la geometría por componente permite selección precisa. Las disposiciones explotadas empaquetan únicamente las piezas visibles. El renderizado se actualiza cuando cambia la escena sin crear miles de llamadas de dibujo independientes.

Las herramientas WebMCP opcionales exponen búsqueda e inspección anatómica en navegadores compatibles. La interfaz visible funciona sin ellas.

## Reconstruir la geometría

El repositorio ya incluye geometría lista para navegador. Reconstruirla es opcional: obtén el archivo OBJ oficial de BodyParts3D y sus tablas de metadatos, prepara los conceptos unidos y el mapeo por sistemas, ejecuta `scripts/convert-anatomy.py`, después `node scripts/optimize-anatomy.mjs` y finalmente `node scripts/compress-models.mjs`.

## Despliegue

Importa este repositorio en Vercel como proyecto Vite. El archivo `vercel.json` configura `npm ci`, `npm run build` y `dist` como directorio de salida. También puede alojarse en cualquier hosting estático.

## Licencia

El código original de la aplicación se publica bajo licencia [MIT](LICENSE). **Los datos anatómicos tienen su propia licencia CC BY 4.0**; conserva la atribución al redistribuirlos. Las dependencias de terceros mantienen sus licencias respectivas.
