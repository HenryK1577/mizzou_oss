import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    try {
      const res = await fetch('http://localhost:8000/api/auth/me/', {
        credentials: 'include',
      })
      if (!res.ok) {
        throw redirect({ to: '/login' })
      }
    } catch (e) {
      throw redirect({ to: '/login' })
    }
  },
  component: Outlet,
})