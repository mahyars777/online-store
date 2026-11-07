 "use client";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { Category } from "@/types";
import { adminApi } from "@/lib/api";
export default function AdminCategories(){
 const [items,setItems]=useState<Category[]>([]);const [name,setName]=useState("");const [description,setDescription]=useState("");const [error,setError]=useState("");
 async function load(){try{setItems(await adminApi.categories())}catch(e:any){setError(e.message)}}useEffect(()=>{load()},[]);
 async function add(e:React.FormEvent){e.preventDefault();try{await adminApi.createCategory({name,description});setName("");setDescription("");load()}catch(e:any){setError(e.message)}}
 async function remove(c:Category){if(!confirm(`دسته‌بندی «${c.name}» حذف شود؟`))return;try{await adminApi.deleteCategory(String(c.id));load()}catch(e:any){setError(e.message)}}
 return <><div className="mb-7"><p className="text-sm font-bold text-brand">ساختار فروشگاه</p><h1 className="mt-2 text-3xl font-extrabold">دسته‌بندی‌ها</h1></div><form onSubmit={add} className="surface mb-6 grid gap-3 p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end"><label className="text-sm font-bold">نام دسته‌بندی<input className="field mt-2" value={name} onChange={e=>setName(e.target.value)} required/></label><label className="text-sm font-bold">توضیحات<input className="field mt-2" value={description} onChange={e=>setDescription(e.target.value)}/></label><button className="btn btn-primary"><Plus size={17}/> افزودن</button></form>{error&&<p className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}<div className="surface divide-y divide-line">{items.map(c=><div key={c.id} className="flex items-center justify-between p-4"><div><b>{c.name}</b><p className="mt-1 text-xs text-muted">{c.description||"بدون توضیحات"}</p></div><button onClick={()=>remove(c)} className="btn btn-danger !p-2"><Trash2 size={16}/></button></div>)}{!items.length&&<p className="p-8 text-center text-muted">دسته‌بندی ثبت نشده است.</p>}</div></>;
}
