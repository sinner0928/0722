import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

type ContactPayload = {
  name?: unknown
  email?: unknown
  phone?: unknown
  country?: unknown
  city?: unknown
}

const dataDirectory = join(process.cwd(), '.data')
mkdirSync(dataDirectory, { recursive: true })

const database = new DatabaseSync(join(dataDirectory, 'contact-submissions.db'))
database.exec(`
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`)

const insertSubmission = database.prepare(`
  INSERT INTO contact_submissions (name, email, phone, country, city, created_at)
  VALUES (?, ?, ?, ?, ?, ?)
`)

const readText = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactPayload>(event)
  const name = readText(body?.name)
  const email = readText(body?.email)
  const phone = readText(body?.phone)
  const country = readText(body?.country)
  const city = readText(body?.city)

  if (!name || !email || !phone || !country || !city) {
    throw createError({ statusCode: 400, statusMessage: 'All contact fields are required.' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please provide a valid email address.' })
  }

  const createdAt = new Date().toISOString()
  const result = insertSubmission.run(name, email, phone, country, city, createdAt)
  const id = Number(result.lastInsertRowid)

  console.info(`[contact-submission] stored id=${id}`)

  return { success: true, id }
})
