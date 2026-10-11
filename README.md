# Atlas Humano 3D

Explorador anatómico 3D interactivo construido con React, Three.js y shadcn/ui. Permite desmontar la referencia masculina adulta de BodyParts3D en **2,234 mallas seleccionables individualmente**, explorar **15 sistemas anatómicos** y consultar **3,432 conceptos con nombre**.

La aplicación presenta la anatomía en **español**, pero conserva los nombres originales en inglés y los identificadores FMA/FJ para mantener trazabilidad completa con BodyParts3D.

**[Abrir demostración](https://human-atlas-seven.vercel.app)**

## Qué puedes explorar

- Orbitar, acercar y seleccionar estructuras directamente sobre el cuerpo.
- Activar o desactivar sistemas anatómicos completos.
- Usar vistas rápidas para esqueleto, órganos o todos los sistemas.
- Separar progresivamente la anatomía hasta mostrar un inventario de piezas.
- Buscar estructuras por nombre en español, nombre original en inglés o identificador FMA.
- Aislar una estructura y consultar su información anatómica.
- Utilizar la interfaz completa desde escritorio o móvil.

## Índice maestro

El visor incorpora un **Índice maestro de anatomía** construido dinámicamente a partir de los 3,432 conceptos del atlas.

Cada entrada incluye:

- nombre anatómico en español;
- nombre original de BodyParts3D;
- identificador FMA;
- sistema anatómico;
- cantidad de piezas o mallas asociadas;
- acceso directo a la selección 3D.

El índice puede filtrarse por sistema y buscarse indistintamente en español, inglés o por ID. La capa de traducción no modifica los identificadores fuente ni los archivos binarios de geometría.

## Criterio de traducción

Los IDs de sistema (`skeletal`, `nervous`, etc.), los campos serializados de `atlas.json`, los IDs FMA/FJ y los nombres técnicos de herramientas externas se conservan cuando forman parte de contratos de datos o integraciones.

La capa `app/espanol.ts` localiza de forma segura:

- términos anatómicos frecuentes;
- lateralidad derecha/izquierda;
- vasos, nervios, músculos, ligamentos, articulaciones y cavidades;
- nomenclatura dental;
- órganos principales y estructuras compuestas;
- términos de búsqueda bilingües.

Cada concepto localizado conserva `nombreOriginal`, por lo que siempre es posible contrastar la traducción con la fuente inglesa.

## Ejecutar localmente

Requiere Node.js 22.13 o superior. No se necesitan claves de API ni cuentas externas.

```sh
npm ci
npm run dev
```

Abre `http://localhost:3016`.

Para generar la versión estática:

```sh
npm run build
```

La salida se guarda en `dist/`.

## Validación

```sh
npm run check
node scripts/validate-atlas.mjs
node scripts/validate-interactions.mjs
npm run build
```

Las validaciones cubren buffers de malla, nombres, pertenencia a conceptos, distribución de la vista explotada, búsqueda, inspección y manejo de interacción entre toque y arrastre.

## Datos anatómicos

El visor utiliza **BodyParts3D 4.0**, una referencia anatómica masculina adulta distribuida bajo licencia **CC BY 4.0**. No representa todas las estructuras ni todas las variaciones humanas.

Las mallas fuente individuales son distintas de los conceptos anatómicos con nombre: un concepto puede agrupar varias mallas. La geometría se simplifica para rendimiento web manteniendo todas las mallas del conjunto usado por el visor.

El modelo empaquetado contiene aproximadamente 2.29 millones de triángulos y cerca de 33 MB de geometría comprimida. Los créditos, enlaces de origen y detalles de adaptación se encuentran en [ATTRIBUTION.md](public/ATTRIBUTION.md).

Este proyecto es un recurso educativo y de exploración anatómica; no es una herramienta diagnóstica ni quirúrgica.

## Cómo funciona

La geometría se combina en lotes. Texturas en GPU controlan por estructura la traslación, visibilidad y selección, mientras que la geometría individual permite realizar selección precisa.

La distribución explotada organiza únicamente las piezas visibles. El renderizado se actualiza cuando cambia la escena y los controles orbitales se mantienen responsivos sin crear miles de llamadas de dibujo independientes.

Las herramientas WebMCP opcionales permiten buscar e inspeccionar anatomía desde navegadores compatibles. Los nombres técnicos de estas herramientas se mantienen estables por compatibilidad, pero sus descripciones y resultados están localizados al español.

## Reconstruir la geometría

El repositorio ya incluye geometría lista para navegador. Para reconstruirla, obtén el archivo OBJ oficial de BodyParts3D y sus tablas de metadatos, prepara el mapa de conceptos y sistemas y ejecuta:

```sh
python3 scripts/convert-anatomy.py OBJ_DIRECTORY CONCEPT_MAP SYSTEM_MAP
node scripts/optimize-anatomy.mjs
node scripts/compress-models.mjs
```

La simplificación utiliza un límite de error relativo de 0.2 % por estructura.

## Despliegue

Importa este repositorio en Vercel como proyecto Vite. `vercel.json` configura `npm ci`, `npm run build` y el directorio de salida `dist`.

## Licencias

El código original de la aplicación se publica bajo licencia [MIT](LICENSE). **Los datos anatómicos tienen su propia licencia CC BY 4.0** y su atribución debe conservarse al redistribuirlos. Las dependencias de terceros mantienen sus respectivas licencias.
