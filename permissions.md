# permissions.md — Permisos, Accesos y Seguridad
## Proyecto: Piscinas Fettyna Gocha

---

## Niveles de Acceso

| Rol               | Quién                         | Puede hacer                                                  |
|-------------------|-------------------------------|--------------------------------------------------------------|
| **Owner**         | Dueño del negocio             | Todo. Decisiones finales sobre copy, precios y funcionalidad |
| **Dev Lead**      | Desarrollador principal       | Cambios en código, deploys, variables de entorno             |
| **AI Agent**      | Claude / Cursor / Copilot     | Ver código, sugerir cambios, generar componentes             |
| **Viewer**        | Colaboradores externos        | Solo lectura del repositorio                                 |

---

## Variables de Entorno — Niveles de Sensibilidad

| Variable              | Sensibilidad | Visible en cliente | Puede ver AI |
|-----------------------|--------------|--------------------|--------------|
| `RESEND_API_KEY`      | 🔴 Alta      | ❌ Nunca           | ❌ No        |
| `OWNER_EMAIL`         | 🟡 Media     | ❌ No              | ✅ Sí (redactado) |
| `OWNER_NAME`          | 🟢 Baja      | ❌ No              | ✅ Sí        |
| `WHATSAPP_NUMBER`     | 🟢 Baja      | ✅ Sí (NEXT_PUBLIC_) | ✅ Sí     |
| `NEXT_PUBLIC_SITE_URL`| 🟢 Baja      | ✅ Sí              | ✅ Sí        |

### Regla crítica
> **NUNCA** incluir `RESEND_API_KEY` en componentes del lado del cliente.
> Solo se usa en `/src/app/api/cotizar/route.ts` (servidor).

---

## Permisos de Agente de IA

### ✅ El agente PUEDE:
- Leer todos los archivos del repositorio.
- Sugerir y escribir código para componentes React/TSX.
- Modificar `/src/data/models.ts` siguiendo la interfaz `PoolModel`.
- Generar textos de copy basados en `copywrite.md`.
- Modificar estilos Tailwind respetando `skill.md`.
- Crear nuevos componentes en `/src/components/`.
- Modificar `tailwind.config.ts` y `next.config.ts`.
- Escribir tests unitarios.

### ❌ El agente NO PUEDE:
- Exponer, hardcodear o loguear `RESEND_API_KEY` en ningún archivo.
- Cambiar el email del destinatario de cotizaciones sin aprobación del Owner.
- Instalar paquetes npm sin documentar el motivo.
- Cambiar la estructura de URL del sitio (puede romper SEO).
- Modificar archivos en `.env.local` (solo puede sugerir cambios).
- Hacer deploys a producción directamente.
- Cambiar precios de modelos sin confirmación del Owner.
- Agregar trackers o scripts de terceros sin aprobación.

---

## Servicios de Terceros Autorizados

| Servicio         | Uso                          | Cuenta              |
|------------------|------------------------------|---------------------|
| **Vercel**       | Hosting + Deploy             | Del Dev Lead        |
| **Resend**       | Envío de emails de cotización| Del Dev Lead        |
| **Google Fonts** | Tipografía Inter             | Sin cuenta, CDN     |
| **Meta Pixel**   | Analytics (opcional v2)      | Del Owner           |
| **WhatsApp API** | Botón de contacto            | Número del Owner    |

---

## Repositorio Git

```
Rama principal:   main       (producción — protegida)
Rama desarrollo:  develop    (integración)
Ramas features:   feat/{nombre}
Ramas fixes:      fix/{nombre}
```

### Archivos protegidos (nunca modificar sin aprobación)
```
.env.local
.env.production
vercel.json (si existe)
next.config.ts → solo sección de dominios de imagen
```

---

## CORS y Seguridad de API

- La API route `/api/cotizar` solo acepta `POST`.
- Implementar validación básica: campos `name`, `phone`, `email` son obligatorios.
- Rate limiting recomendado: máximo 5 requests por IP en 10 minutos (implementar en v2).
- No loguear datos personales del usuario en consola de producción.

---

## Política de Datos (GDPR / Ley 19.628 Chile)

- Los datos del formulario se envían directamente al email del dueño vía Resend.
- **No se almacenan** en base de datos ni en ningún servicio de terceros.
- El aviso de privacidad debe incluirse en el footer del sitio.
- Los datos del formulario incluyen: nombre, teléfono, email, comuna, mensaje.
