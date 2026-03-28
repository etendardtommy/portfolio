module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Workspace/portfolio/lib/api.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchApi",
    ()=>fetchApi
]);
const API_URL = ("TURBOPACK compile-time value", "http://localhost:3000/api") || 'http://localhost:3000/api';
async function fetchApi(endpoint) {
    const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const finalUrl = `${baseUrl}${path}`;
    const response = await fetch(finalUrl, {
        headers: {
            'x-site-id': '1'
        },
        cache: 'no-store'
    });
    if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} sur ${finalUrl}`);
    }
    return response.json();
}
}),
"[project]/Workspace/portfolio/app/sitemap.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>sitemap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Workspace$2f$portfolio$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Workspace/portfolio/lib/api.ts [app-route] (ecmascript)");
;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
async function sitemap() {
    const sitemapData = [
        {
            url: `${SITE_URL}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1
        },
        {
            url: `${SITE_URL}/portfolio`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: `${SITE_URL}/procedures`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: `${SITE_URL}/journey`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7
        },
        {
            url: `${SITE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5
        }
    ];
    try {
        const [projects, articles] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Workspace$2f$portfolio$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchApi"])('/portfolio/projects').catch(()=>[]),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Workspace$2f$portfolio$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchApi"])('/articles').catch(()=>[])
        ]);
        if (projects) {
            projects.filter((p)=>p.published).forEach((p)=>{
                sitemapData.push({
                    url: `${SITE_URL}/portfolio/${p.id}`,
                    lastModified: new Date(),
                    changeFrequency: 'monthly',
                    priority: 0.6
                });
            });
        }
        if (articles) {
            articles.filter((a)=>a.published).forEach((a)=>{
                sitemapData.push({
                    url: `${SITE_URL}/procedures/${a.id}`,
                    lastModified: new Date(a.createdAt),
                    changeFrequency: 'monthly',
                    priority: 0.6
                });
            });
        }
    } catch (error) {
        console.error('Failed to query dynamic routes for sitemap', error);
    }
    return sitemapData;
}
}),
"[project]/Workspace/portfolio/app/sitemap--route-entry.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Workspace$2f$portfolio$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Workspace/portfolio/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Workspace$2f$portfolio$2f$app$2f$sitemap$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Workspace/portfolio/app/sitemap.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Workspace$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$metadata$2f$resolve$2d$route$2d$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Workspace/portfolio/node_modules/next/dist/build/webpack/loaders/metadata/resolve-route-data.js [app-route] (ecmascript)");
;
;
;
const contentType = "application/xml";
const cacheControl = "public, max-age=0, must-revalidate";
const fileType = "sitemap";
if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$Workspace$2f$portfolio$2f$app$2f$sitemap$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"] !== 'function') {
    throw new Error('Default export is missing in "./sitemap.ts"');
}
async function GET() {
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Workspace$2f$portfolio$2f$app$2f$sitemap$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
    const content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Workspace$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$metadata$2f$resolve$2d$route$2d$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRouteData"])(data, fileType);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Workspace$2f$portfolio$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](content, {
        headers: {
            'Content-Type': contentType,
            'Cache-Control': cacheControl
        }
    });
}
;
}),
"[project]/Workspace/portfolio/app/sitemap--route-entry.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Workspace$2f$portfolio$2f$app$2f$sitemap$2d2d$route$2d$entry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GET"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Workspace$2f$portfolio$2f$app$2f$sitemap$2d2d$route$2d$entry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Workspace/portfolio/app/sitemap--route-entry.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Workspace$2f$portfolio$2f$app$2f$sitemap$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Workspace/portfolio/app/sitemap.ts [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9757991b._.js.map