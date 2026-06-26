# runbook.md — Manual Operacional
## Proyecto: Piscinas Fettyna Gocha

---

## Setup Inicial (desde cero)

### 1. Clonar y configurar
```bash
git clone https://github.com/{org}/fettynagocha-web.git
cd fettynagocha-web
npm install
```

### 2. Variables de entorno
```bash
cp .env.example .env.local
# Editar .env.local con los valores reales:
# RESEND_API_KEY=re_xxxx
# OWNER_EMAIL=contacto@fettynagocha.cl
# OWNER_NAME=Piscinas Fettyna Gocha
# WHATSAPP_NUMBER=56968787511
# NEXT_PUBLIC_SITE_URL=https://fettynagocha.cl
```

### 3. Desarrollo local
```bash
npm run dev
# → http://localhost:3000
```

### 4. Build de producción (verificar antes de deploy)
```bash
npm run build
# Debe completar sin errores ni warnings de tipo TypeScript
# Verificar que el output sea estático: carpeta /out generada
```

---

## Despliegue en Vercel

### Primera vez
1. Ir a vercel.com → "Add New Project"
2. Importar repositorio de GitHub
3. Framework: **Next.js** (detecta automático)
4. En "Environment Variables" agregar todas las variables de `.env.local`
5. Click "Deploy"

### Deploys posteriores
- Automático al hacer push a `main`
- Preview en cada PR contra `develop`

### Verificar deploy exitoso
```
✅ Build exitoso en Vercel dashboard
✅ URL de producción carga en < 1 segundo
✅ Formulario envía email de prueba
✅ Botón WhatsApp abre con mensaje prellenado
✅ Google PageSpeed ≥ 90 mobile
```

---

## Agregar un Nuevo Modelo de Piscina

1. Obtener imagen del modelo en formato JPG o PNG.
2. Convertir a `.webp`:
   ```bash
   cwebp -q 85 modelo.jpg -o public/images/models/{slug}.webp
   ```
3. Editar `/src/data/models.ts` — agregar objeto `PoolModel` al array.
4. Verificar que `id` y `slug` sean únicos.
5. Ejecutar `npm run build` y verificar sin errores.
6. Commit: `feat: agregar modelo {nombre}`
7. Push a `main` → Vercel despliega automáticamente.

---

## Actualizar un Precio

1. Abrir `/src/data/models.ts`
2. Buscar el modelo por `id`
3. Actualizar `priceFrom` (valor en CLP, sin puntos ni símbolos)
4. Commit: `fix: actualizar precio modelo {id}`
5. Push a `main`

---

## Verificar que los Emails Llegan

```bash
# Test manual: ir a localhost:3000, completar formulario y enviar
# Verificar en el inbox de contacto@fettynagocha.cl

# Si no llega:
# 1. Verificar RESEND_API_KEY en .env.local
# 2. Revisar logs en Vercel Functions → /api/cotizar
# 3. Verificar en dashboard de Resend → Logs → Emails sent
```

---

## Actualizar Número de WhatsApp

1. Abrir `.env.local` (o variables en Vercel dashboard)
2. Cambiar `WHATSAPP_NUMBER` (formato: 569XXXXXXXX, sin +)
3. También actualizar en Vercel dashboard → Settings → Environment Variables
4. Redeploy: Vercel → Deployments → "Redeploy"

---

## Diagnóstico de Problemas Comunes

| Problema | Causa probable | Solución |
|----------|---------------|----------|
| Build falla con error de tipos | Cambio en `PoolModel` interface | Revisar `/src/types/index.ts` y actualizar todos los modelos |
| Email no llega | `RESEND_API_KEY` inválida o expirada | Regenerar en resend.com → API Keys |
| Imágenes rotas en producción | Ruta incorrecta o archivo no subido | Verificar `/public/images/models/` |
| WhatsApp no abre | Número mal formateado | Usar formato: `56968787511` (sin +) |
| Formulario da error 500 | Variable de entorno no configurada en Vercel | Agregar en Vercel → Settings → Env Vars |
| CSS no aplica | Error en `tailwind.config.ts` | Verificar `content` paths |

---

## Mantenimiento Periódico

### Mensualmente
- [ ] Revisar Google PageSpeed Insights
- [ ] Verificar que el formulario sigue funcionando
- [ ] Actualizar precios si han cambiado

### Trimestralmente
- [ ] `npm audit` — revisar vulnerabilidades
- [ ] `npm update` — actualizar dependencias menores
- [ ] Revisar métricas de Vercel Analytics

### Anualmente
- [ ] Renovar dominio en registrador
- [ ] Revisar vigencia de RESEND_API_KEY
- [ ] Evaluar nuevas versiones de Next.js

---

## Comandos Útiles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción local
npm run lint         # ESLint
npm run type-check   # TypeScript check sin compilar

# Convertir imágenes a webp (requiere cwebp instalado)
cwebp -q 85 input.jpg -o output.webp

# Ver tamaño del bundle
npm run build && npx @next/bundle-analyzer
```

---

## Contactos de Emergencia

| Rol | Contacto |
|-----|----------|
| Dueño del negocio | +56 9 6787 8751 |
| Email del negocio | contacto@fettynagocha.cl |
| Soporte Vercel | vercel.com/support |
| Soporte Resend | resend.com/support |
