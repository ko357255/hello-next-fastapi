'use client';

import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // ログイン
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const res = await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    if (res.ok) {
      const data = await res.json();
      setToken(data.access_token); // アクセストークンを保存
      alert('ログイン成功！');
    } else {
      alert('ログイン失敗');
    }
  };

  // ログイン必須API呼び出し
  const fetchProtected = async () => {
    if (!token) {
      alert('先にログインしてください');
      return;
    }

    const res = await fetch('http://127.0.0.1:8000/protected', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h1>FastAPI × Next.js</h1>
      {!token ? (
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="ユーザー名" value={username} onChange={e => setUsername(e.target.value)} />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">ログイン</button>
        </form>
      ) : (
        <>
          <p>ログイン済み</p>
          <button onClick={fetchProtected}>保護ページを取得</button>
          <p>{message}</p>
        </>
      )}
    </div>
  );
}
