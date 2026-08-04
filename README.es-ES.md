

<table align="center">
  <tr>
    <td valign="middle">
      <img src="assets/solid-email-logo.png" alt="Solid Email logo" width="128" />
    </td>
    <td valign="middle">
      <h1>Solid Email</h1>
    </td>
  </tr>
</table>

<div align="center">
  Crea correos electrónicos HTML hermosos y confiables con SolidJS.
  <br />
  Componentes de alta calidad y sin estilos predefinidos para plantillas de correo modernas.
</div>

## Introducción

Solid Email es una colección de componentes de correo para SolidJS y TypeScript.
Te ayuda a escribir plantillas responsivas con JSX familiar mientras maneja los patrones de marcado que esperan los clientes de correo.

Inspirado en [React Email](https://react.email), diseñado para SolidJS.

## Por qué usarlo

El HTML de correo aún está lleno de comportamientos específicos del cliente, diseños con tablas, estilos en línea y peculiaridades de renderizado.
Solid Email mantiene la experiencia de creación cercana a una aplicación Solid moderna mientras produce HTML que puede ser enviado por cualquier proveedor de correo.

## Benchmarks

Medido con `pnpm benchmark:rendering` en el fixture de correo de marketing del repositorio. Un tiempo promedio menor es mejor.

| Renderizador | Plantilla | Promedio | Tasa | Comparación |
| --- | --- | ---: | ---: | --- |
| Solid Email `render()` | JSX estático | 2.2919ms | 436.33 hz | 5.02x más rápido que React Email `render()` |
| Solid Email `renderSync()` | JSX estático | 1.8935ms | 528.13 hz | 6.08x más rápido que React Email `render()` |
| Solid Email `render()` | JSX con Tailwind | 3.1230ms | 320.20 hz | 5.69x más rápido que React Email Tailwind |
| Solid Email `compileSync` render (en caché) | JSX estático | **0.0438ms** | **22,842 hz** | 263x más rápido que React Email `render()` |
| Solid Email `compile` render (en caché) | JSX estático | 0.0858ms | 11,661 hz | 134x más rápido que React Email `render()` |
| Solid Email `compile` render (en caché) | JSX con Tailwind | 0.0452ms | 22,145 hz | **393x más rápido que React Email Tailwind** |
| React Email `render()` | JSX estático | 11.5084ms | 86.89 hz | Línea base |
| React Email `render()` | JSX con Tailwind | 17.7760ms | 56.26 hz | Línea base Tailwind |

**En caché** significa que la plantilla se compila una vez y solo se mide la etapa de renderizado. Este es el uso esperado en producción: compilar al cargar el módulo y renderizar por solicitud. El costo de compilación+renderizado de "una sola vez" es comparable a llamar a `render()` directamente.

Benchmarks de texto plano medidos con `pnpm benchmark:html-to-text` en los fixtures de HTML a texto del repositorio. Un tiempo promedio menor es mejor.

| Operación | Fixture | Promedio | Tasa | Comparación |
| --- | --- | ---: | ---: | --- |
| `@solid-email/render` `toPlainText` | Fixtures HTML | 2.4369ms | 410.36 hz | 3.40x más rápido que React Email `toPlainText` |
| `@solid-email/render` plantilla de texto compilada | Solid JSX | **1.4434ms** | **692.83 hz** | **8.61x más rápido que React Email renderizado de texto plano** |
| `@solid-email/render` `renderSync` texto plano sin compilar | Solid JSX | 2.8895ms | 346.09 hz | 4.30x más rápido que React Email renderizado de texto plano |
| `@solid-email/html-to-text` `convert` | Fixtures HTML | 3.9657ms | 252.16 hz | Convertidor directo del paquete |
| `html-to-text` `convert` | Fixtures HTML | 3.8166ms | 262.01 hz | Línea base del convertidor directo |
| React Email `toPlainText` | Fixtures HTML | 8.2867ms | 120.67 hz | Línea base de conversión de texto de React |
| React Email `render` texto plano | React JSX | 12.4310ms | 80.44 hz | Línea base de renderizado de texto plano de React |

Benchmarks entre librerías medidos con `pnpm benchmark:cross-library` en la plantilla de correo de marketing, utilizando 50 iteraciones × 10 ejecuciones después de 3 ejecuciones de calentamiento. Un tiempo promedio menor es mejor.

| Librería / modo | Promedio | Mín | Máx | Ops/s | Salida | Heap Δ | Conformidad | vs React Email |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Solid Email `renderSync` | 1.17ms | 764µs | 1.47ms | 853 | 22.6 KB | **<0.01 MB** | 100% | 1.5x más rápido |
| Solid Email `compileSync` render (en caché) | **12µs** | **9µs** | **15µs** | **83,483** | 23.4 KB | **<0.01 MB** | 100% | **148.4x más rápido** |
| JSX Email `render` | 3.82ms | 3.25ms | 5.45ms | 262 | **18.2 KB** | 1.15 MB | 100% | 2.1x más lento |
| React Email `render` | 1.78ms | 1.37ms | 4.00ms | 563 | 22.5 KB | 26.36 MB | 100% | Línea base |
| MJML React `render` | 11.01ms | 9.39ms | 14.74ms | 91 | 75.5 KB | 1.57 MB | 100% | 6.2x más lento |

Todos los resultados entre librerías alcanzaron el 100% de conformidad por pares contra las verificaciones compartidas de la plantilla de correo.

El tamaño del paquete compara los archivos de entrada ESM construidos después de `pnpm build`; gzip utiliza `zlib.gzipSync` de Node.

| Entrada del paquete | Tamaño sin comprimir | Tamaño gzip | Comparación |
| --- | ---: | ---: | --- |
| `@akin01/solid-email/dist/index.mjs` | 199.0 KiB | 42.7 KiB | Componentes de servidor/raíz y re-exportaciones de utilidad de renderizado |
| `@akin01/solid-email/dist/client/index.mjs` | 105.9 KiB | 19.5 KiB | Compilación de vista previa DOM condicional para navegador |
| `@solid-email/render/dist/node/index.mjs` | **26.3 KiB** | **6.2 KiB** | Entrada del renderizador |
| Entradas de servidor de Solid Email | 225.3 KiB | 48.9 KiB | **6.4x más pequeño sin comprimir / 7.1x más pequeño en gzip que React Email** |
| Todas las entradas ESM condicionales de Solid Email | 331.2 KiB | 68.4 KiB | 4.4x más pequeño sin comprimir / 5.1x más pequeño en gzip que React Email |
| `react-email/dist/index.mjs` | 1,448.0 KiB | 348.6 KiB | Línea base de React Email |

## Instalación

```sh
pnpm add @akin01/solid-email @solid-email/render solid-js
```

## Primeros pasos

Define una plantilla de correo con componentes de SolidJS.

```tsx
import { Body, Button, Container, Html, Text } from '@akin01/solid-email';

export function WelcomeEmail() {
  return (
    <Html>
      <Body>
        <Container>
          <Text>Bienvenido a Solid Email.</Text>
          <Button href="https://example.com">Comenzar</Button>
        </Container>
      </Body>
    </Html>
  );
}
```

Rendérialo a HTML antes de enviarlo.

```tsx
import { render } from '@solid-email/render';
import { WelcomeEmail } from './welcome-email';

const html = await render(() => <WelcomeEmail />);
```

Para plantillas estáticas que no utilizan recursos asíncronos ni formato legible, utiliza el renderizador síncrono.

```tsx
import { renderSync } from '@solid-email/render';
import { WelcomeEmail } from './welcome-email';

const html = renderSync(() => <WelcomeEmail />);
```

## Puntos de entrada

`@akin01/solid-email` se exporta condicionalmente. Las importaciones de servidor, Workerd y por defecto exponen `render`, `compile` y el conjunto completo de componentes de correo, incluyendo `Tailwind`.

Las importaciones condicionadas para navegador del mismo paquete principal resuelven a la compilación de vista previa DOM/CSR. Esa compilación exporta componentes de vista previa seguros para DOM y excluye intencionalmente `render`, `compile` y `Tailwind`.

## Compilar para renderizados repetidos

Cuando renderizas la misma plantilla varias veces con datos diferentes, `compile()` preválua los componentes de Solid una vez y reutiliza el HTML en caché en cada renderizado.

```tsx
import { compile, Slot, slot } from '@solid-email/render';
import { Html, Body, Container, Text } from '@akin01/solid-email';

function WelcomeEmail() {
  return (
    <Html>
      <Body>
        <Container>
          <Text>
            Hola <Slot name="name" />!
          </Text>
          <a href={slot('url')}>Visitar</a>
        </Container>
      </Body>
    </Html>
  );
}

const compiled = await compile(() => <WelcomeEmail />);

const html = await compiled.render({ name: 'Alice', url: 'https://example.com' });
const html2 = await compiled.render({ name: 'Bob', url: 'https://other.com' });
```

Usa `compileSync()` para el equivalente síncrono (rechaza la salida `pretty`).

### Compilar salida de texto plano

Para cuerpos de texto plano repetidos, compila la plantilla con `withPlainText: true`. La plantilla compilada mantiene una representación de texto reutilizable, por lo que cada renderizado solo sustituye los valores de las ranuras.

```tsx
import { Body, Button, Container, Html, Text } from '@akin01/solid-email';
import { compile, Slot, slot } from '@solid-email/render';

const compiled = await compile(
  <Html>
    <Body>
      <Container>
        <Text>
          Hola <Slot name="name" />!
        </Text>
        <Button href={slot('url')}>Abrir panel</Button>
      </Container>
    </Body>
  </Html>,
  { withPlainText: true },
);

const text = await compiled.render(
  { name: 'Alice', url: 'https://example.com/dashboard' },
  { plainText: true },
);
```

Para una salida única de Solid JSX a texto plano, renderiza la plantilla con `plainText: true`.

```tsx
import { Body, Button, Container, Html, Text } from '@akin01/solid-email';
import { render } from '@solid-email/render';

const text = await render(
  () => (
    <Html>
      <Body>
        <Container>
          <Text>Hola Alice</Text>
          <Button href="https://example.com/dashboard">Abrir panel</Button>
        </Container>
      </Body>
    </Html>
  ),
  { plainText: true },
);
```

### Ranuras (Slots)

Las ranuras marcan las partes dinámicas de una plantilla compilada.

| API | Caso de uso |
| --- | --- |
| `<Slot name="..." />` | Ranura de contenido dentro de elementos JSX. |
| `slot("...")` | Ranura de atributo para valores de atributos como `href` o `src`. |
| `defineSlots<T>()` | Nombres de ranuras fuertemente tipados para autocompletado en el editor. |
| `CompiledTemplate.render(data)` | Volver a renderizar la plantilla con nuevos valores de ranura. |
| `CompiledTemplate.renderSync(data)` | Rerenderizado síncrono (sin `pretty`). |

Las ranuras de contenido aceptan string, number, boolean, null, undefined, JSX y arrays.
Las ranuras de atributo solo aceptan string, number, boolean, null y undefined; pasar JSX, objetos o arrays a una ranura de atributo lanzará un error para que los enlaces e imágenes rotos no se envíen silenciosamente. Usa `<Slot name="..." />` para valores de JSX/contenido.

#### Tipos débiles (ranuras sin tipar)

Los nombres de las ranuras son strings simples: rápidos de escribir pero sin verificación en tiempo de compilación.

```tsx
import { compile, Slot, slot } from '@solid-email/render';

const compiled = await compile(
  <p>
    Hola <Slot name="name" />!
  </p>
);

// Los nombres de ranura son strings, los errores tipográficos son silenciosos
const html = await compiled.render({ name: 'Alice' });
```

#### Tipos fuertes (defineSlots)

`defineSlots<T>()` devuelve funciones accesoras con tipos para que los errores tipográficos y las claves faltantes se detecten en tiempo de compilación.

```tsx
import { compile, defineSlots } from '@solid-email/render';

type MySlots = {
  name: string;
  url: string;
};

const slots = defineSlots<MySlots>();

const compiled = await compile<MySlots>(
  <p>
    Hola {slots.content('name')}!
    <a href={slots.attr('url')}>Visitar</a>
  </p>,
);

// TypeScript muestra errores si falta una clave o se escribe mal un nombre
const html = await compiled.render({ name: 'Alice', url: 'https://example.com' });
```

Las ranuras de contenido admiten valores predeterminados mediante el segundo argumento: `slots.content('name', 'Guest')`.

#### Ranuras como props

Pasa los marcadores de ranura a través de las props de los componentes al adaptar componentes existentes basados en props. Las props pasadas a `compile()` son valores en tiempo de plantilla, por lo que pasa `<Slot />` o `slot()` como valor de prop para los datos que cambian por renderizado.

```tsx
import type { JSX } from 'solid-js';
import { compile, Slot, slot } from '@solid-email/render';

function Button(props: { href: string; children: JSX.Element }) {
  return <a href={props.href}>{props.children}</a>;
}

function WelcomeEmail(props: { name: JSX.Element; actionUrl: string }) {
  return (
    <p>
      Hola {props.name}! <Button href={props.actionUrl}>Abrir panel</Button>
    </p>
  );
}

const compiled = await compile(
  <WelcomeEmail name={<Slot name="name" />} actionUrl={slot('url')} />,
);

const html = await compiled.render({
  name: 'Alice',
  url: 'https://example.com/dashboard',
});
```

### Tailwind con plantillas compiladas

Las clases de Tailwind deben estar en elementos padres estáticos, no en componentes Slot. Los valores de Slot en tiempo de ejecución usan estilos en línea o recurren a `render()`.

## Componentes

Un conjunto de componentes estándar para crear diseños de correo sin escribir manualmente cada tabla y estilo seguro para clientes.

- [Html](packages/solid-email/src/components/html)
- [Head](packages/solid-email/src/components/head)
- [Font](packages/solid-email/src/components/font)
- [Preview](packages/solid-email/src/components/preview)
- [Body](packages/solid-email/src/components/body)
- [Container](packages/solid-email/src/components/container)
- [Section](packages/solid-email/src/components/section)
- [Row](packages/solid-email/src/components/row)
- [Column](packages/solid-email/src/components/column)
- [Heading](packages/solid-email/src/components/heading)
- [Text](packages/solid-email/src/components/text)
- [Hr](packages/solid-email/src/components/hr)
- [Img](packages/solid-email/src/components/img)
- [Link](packages/solid-email/src/components/link)
- [Button](packages/solid-email/src/components/button)
- [CodeInline](packages/solid-email/src/components/code-inline)
- [CodeBlock](packages/solid-email/src/components/code-block)
- [Markdown](packages/solid-email/src/components/markdown)
- [Tailwind](packages/solid-email/src/components/tailwind)

## Enviando correo

El renderizador devuelve HTML ordinario, por lo que las plantillas pueden enviarse con cualquier proveedor que acepte un cuerpo HTML.

```tsx
const html = await render(() => <WelcomeEmail />);

await emailProvider.send({
  to: 'user@example.com',
  subject: 'Bienvenido',
  html,
});
```

## Soporte

Solid Email apunta a las restricciones comunes de HTML y CSS utilizadas por los clientes de correo populares.
Siempre previstualiza las plantillas importantes en los clientes que usa tu audiencia.

| <img src="https://react.email/static/icons/gmail.svg" width="48" height="48" alt="Gmail logo" /> | <img src="https://react.email/static/icons/apple-mail.svg" width="48" height="48" alt="Apple Mail logo" /> | <img src="https://react.email/static/icons/outlook.svg" width="48" height="48" alt="Outlook logo" /> | <img src="https://react.email/static/icons/yahoo-mail.svg" width="48" height="48" alt="Yahoo Mail logo" /> | <img src="https://react.email/static/icons/hey.svg" width="48" height="48" alt="HEY logo" /> | <img src="https://react.email/static/icons/superhuman.svg" width="48" height="48" alt="Superhuman logo" /> |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Gmail ✔ | Apple Mail ✔ | Outlook ✔ | Yahoo Mail ✔ | HEY ✔ | Superhuman ✔ |

## Habilidad para agentes

Solid Email incluye una habilidad para agentes para la creación de plantillas, renderizado, estilizado y orientación de pruebas.

```sh
npx skills add akin01/solid-email@solid-email
```

El código fuente de la habilidad se encuentra en [`skills/solid-email`](skills/solid-email).

## Desarrollo

Este repositorio utiliza espacios de trabajo de pnpm y Biome.

```sh
pnpm install
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
pnpm lint
```

---

<div align="center">
  Construido con ❤️, Licencia MIT.
</div>
