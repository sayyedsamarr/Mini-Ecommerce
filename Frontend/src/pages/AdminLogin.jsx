import { use, useState } from "react"
import { api, setAuthToken } from "../ApiBase"
import { useNavigate } from "react-router-dom"


const AdminLogin = () => {
  const [userName, setuserName] = useState("")
  const [password, setpassword] = useState("")
  const [err, seterr] = useState(null)
  const nav = useNavigate();

  async function login() {
  try {
    const data = await api('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userName, password }) 
    });

    if (data.token) {                     
      setAuthToken(data.token);
      nav('/admin');
    } else {
      seterr("Login Failed");
    }

  } catch (e) {
    seterr(e?.error || e.message || "Login Failed");
  }
}




  return (
    <div className="max-w-md mx-auto p-6 mt-12 bg-white rounded shadow">
      <h2 className="text-xl  font-semibold mb-4">Admin</h2>
      {err && <div className="text-red-600 mb-3">{err}</div>}
      <input className="w-full border rounded p-2 mb-3" placeholder="username" value={userName}
        onChange={e => setuserName(e.target.value)}
        type="text" />
      <input className="w-full border rounded p-2 mb-3" placeholder="password" type="password" value={password} onChange={e => setpassword(e.target.value)} />
      <div className="flex gap-2">
        <button onClick={login} className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        <a href={`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/auth/google`} className="inline-block"><button className="px-4 py-2 border rounded">Sign it with Google</button></a>
      </div>
    </div>
  )
}

export default AdminLogin