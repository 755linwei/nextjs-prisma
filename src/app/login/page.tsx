'use client'

import { signIn, signUp, useSession } from '@/lib/auth-client'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'

export default function LoginPage() {
  const { data: session, isPending } = useSession()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signEmail, setSignEmail] = useState('')
  const [signPassword, setSignPassword] = useState('')

  const handleSignUp = async () => {
    const { data, error } = await signUp.email({ email, password, name })
    if (error) console.error('注册失败:', error.message)
    else console.log('注册成功:', data)
  }

  const handleSignIn = async () => {
    const { data, error } = await signIn.email({ email: signEmail, password: signPassword })
    if (error) console.error('登录失败:', error.message)
    else console.log('登录成功:', data.user)
  }

  const handleGithubLogin = async () => {
    const { data, error } = await signIn.social({ provider: 'github' })
    if (error) console.error('GitHub 登录失败:', error.message)
    else console.log('GitHub 登录成功:', data)
  }

  const handleSignOut = async () => {
    await authClient.signOut()
  }

  if (isPending) return <div>加载中...</div>

  if (session) {
    return (
      <div style={{ padding: 20 }}>
        <h1>已登录</h1>
        <p>用户: {session.user.name}</p>
        <p>邮箱: {session.user.email}</p>
        <button onClick={handleSignOut}>退出登录</button>
      </div>
    )
  }

  return (
    <div style={{ padding: 20 }}>
      <div>
        <h1>注册</h1>
        <input type="text" placeholder="请输入姓名" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="请输入邮箱" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="请输入密码" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={handleSignUp}>Sign Up</button>
      </div>

      <hr />

      <div>
        <h1>登录</h1>
        <input type="text" placeholder="请输入邮箱" value={signEmail} onChange={(e) => setSignEmail(e.target.value)} />
        <input type="password" placeholder="请输入密码" value={signPassword} onChange={(e) => setSignPassword(e.target.value)} />
        <button type="button" onClick={handleSignIn}>Sign In</button>
      </div>

      <hr />

      <div>
        <h1>第三方登录</h1>
        <button type="button" onClick={handleGithubLogin}>GitHub 登录</button>
      </div>
    </div>
  )
}