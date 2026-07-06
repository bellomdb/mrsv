'use client'

import type { Application, Nomination } from './types'

const APP_KEY = 'mrsv-applications'
const NOM_KEY = 'mrsv-nominations'

function read<T>(key: string): T[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T[]) : []
  } catch {
    return []
  }
}

function write<T>(key: string, items: T[]) {
  window.localStorage.setItem(key, JSON.stringify(items))
}

export function getLocalApplications(): Application[] {
  return read<Application>(APP_KEY)
}

export function saveLocalApplication(app: Application) {
  const apps = getLocalApplications().filter((a) => a.reference !== app.reference)
  write(APP_KEY, [...apps, app])
}

export function findLocalApplication(reference: string): Application | undefined {
  return getLocalApplications().find(
    (a) => a.reference.toLowerCase() === reference.toLowerCase(),
  )
}

export function getLocalNominations(): Nomination[] {
  return read<Nomination>(NOM_KEY)
}

export function saveLocalNomination(nom: Nomination) {
  write(NOM_KEY, [...getLocalNominations(), nom])
}
