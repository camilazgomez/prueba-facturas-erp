# 🧾 Prueba Técnica - Inyección de Facturas al ERP

## Variables de entorno

Este proyecto espera un archivo `.env` con las siguientes variables:

```env
VITE_AUTH_EMAIL=
VITE_AUTH_TOKEN=<TOKEN>
```
## Aclaraciones

Se interpretó del enunciado que el código de autenticación no requiere ejecutarse contra un backend activo en tiempo real, por lo que las credenciales se configuran únicamente al inicio a través de variables de entorno.

Se asumió que el contenido de `invoices` permanece estático durante la sesión, y por tanto no se volvió a recargar la lista después de la inyección para no interferir con la lógica de actualización interna. Pero en entorno real, sí sería recomendable refrescar los datos después de cada operación.

Para mejorar la resiliencia del proceso de inyección de facturas, se implementó una lógica de retray con 5 intentos. En cada intento se espera medio segundo mas que en el anterior.

## Extras implementados

A continuación se listan los requisitos opcionales y su estado de implementación:

- Buscador o filtros locales ✅ 
- Modal de revisión antes de inyectar ✅
- Visualización del estado de los batches de inyección ❌
- Uso correcto de Tailwind CSS y TypeScript ✅ 
-  Deploy en la web ❌

---

Bienvenido/a a la prueba técnica para la integración de facturas con un sistema ERP. Este repositorio contiene un entorno base creado con **React + Vite**, **Tailwind CSS** preconfigurado y soporte opcional para **TypeScript**.

> 🧑‍💻 Este repo contiene dos ramas:
>
> - `master`: Proyecto base en **JavaScript**.
> - `typescript`: Proyecto base en **TypeScript**, si decides tomar ese bonus.

---

## 🚀 ¿Cómo comenzar?

**Clona el repositorio**

```bash
git clone https://github.com/bemmbo/recruiting-frontend-test.git
cd recruiting-frontend-test
```

Instala las dependencias

```bash
npm install
```

Levanta el entorno de desarrollo

```bash
npm run dev
```

Esto abrirá la aplicación en http://localhost:5173

### 🎨 Tailwind CSS

Tailwind ya está configurado y listo para usarse. Puedes comenzar a utilizar clases utilitarias directamente en tus componentes:

```jsx
<div className="bg-blue-100 p-4 rounded-xl">Hola mundo</div>
```
