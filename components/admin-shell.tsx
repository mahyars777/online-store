 "use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, Tags, LogOut, Store } from "lucide-react";
import { useEffect, useState } from "react";
const nav=[{href:"/admin/dashboard",label:"داشبورد",icon:LayoutDashboard},{href:"/admin/products",label:"مدیریت محصولات",icon:Package},{href:"/admin/categories",label:"دسته‌بندی‌ها",icon:Tags}];
export function AdminShell({children}:{children:React.ReactNode}) {
 const path=usePathname(); const router=useRouter(); const [ready,setReady]=useState(false); const [allowed,setAllowed]=useState(false);
 useEffect(()=>{if(path==="/admin/login"){setReady(true);return;} fetch("/api/auth/session").then(r=>r.json()).then(d=>{setAllowed(d.authenticated);setReady(true);if(!d.authenticated)router.replace("/admin/login");}).catch(()=>{setReady(true);router.replace("/admin/login")});},[path,router]);
 if(path==="/admin/login") return <>{children}</>;
 if(!ready || !allowed) return <div className="grid min-h-screen place-items-center text-muted">در حال بررسی دسترسی...</div>;
 async function logout(){await fetch("/api/auth/logout",{method:"POST"});router.push("/admin/login");}
 return <div className="min-h-screen bg-[#f5f7f5] md:flex"><aside className="w-full border-b border-line bg-white p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-l"><Link href="/" className="flex items-center gap-2 text-lg font-extrabold"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white"><Store size={20}/></span> سبزینه <small className="text-xs font-medium text-muted">مدیریت</small></Link><nav className="mt-8 flex gap-2 overflow-x-auto md:flex-col">{nav.map(n=><Link key={n.href} href={n.href} className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${path.startsWith(n.href)? "bg-[#eaf2eb] text-brand":"text-muted hover:bg-soft"}`}><n.icon size={18}/>{n.label}</Link>)}</nav><button onClick={logout} className="mt-5 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50"><LogOut size={18}/> خروج</button></aside><main className="min-w-0 flex-1 p-5 md:p-9"><div className="mx-auto max-w-6xl">{children}</div></main></div>;
}
