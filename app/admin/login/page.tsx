 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LockKeyhole, Store } from "lucide-react";
export default function AdminLogin() {
 const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [busy,setBusy]=useState(false); const router=useRouter();
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setError("");try{const r=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password})});const d=await r.json();if(!r.ok)throw new Error(d.error||"ورود ناموفق بود");router.push("/admin/dashboard");}catch(e:any){setError(e.message)}finally{setBusy(false)}}
 return <div className="grid min-h-screen place-items-center bg-[#f3f7f3] p-5"><form onSubmit={submit} className="surface w-full max-w-md p-8 shadow-soft"><Link href="/" className="flex items-center gap-2 text-lg font-extrabold"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white"><Store/></span> سبزینه</Link><div className="mt-8"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-soft text-brand"><LockKeyhole/></span><h1 className="mt-4 text-2xl font-extrabold">ورود به پنل مدیریت</h1><p className="mt-2 text-sm text-muted">برای ادامه، رمز عبور مدیر را وارد کنید.</p></div><label className="mt-6 block text-sm font-bold">رمز عبور</label><input className="field mt-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoFocus/>{error&&<p className="mt-3 text-sm text-red-600">{error}</p>}<button disabled={busy} className="btn btn-primary mt-5 w-full">{busy?"در حال ورود...":"ورود به پنل"}</button></form></div>;
}
