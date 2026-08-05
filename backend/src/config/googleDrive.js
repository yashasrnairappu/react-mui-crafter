import { google } from 'googleapis'
import { Readable } from 'stream'
import dotenv from 'dotenv'
dotenv.config()

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_B64, 'base64').toString('utf-8')
)

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/drive'],
})

export const drive = google.drive({ version: 'v3', auth })

export const uploadToDrive = async (buffer, filename, mimetype) => {
  console.log('BACKEND_URL:', process.env.BACKEND_URL)
  const stream = new Readable()
  stream.push(buffer)
  stream.push(null)

  const response = await drive.files.create({
    requestBody: {
      name: `${Date.now()}-${filename}`,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
    },
    media: {
      mimeType: mimetype,
      body: stream,
    },
    fields: 'id',
  })

  const fileId = response.data.id

  await drive.permissions.create({
    fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  })

  return {
    fileId,
    imageUrl: `${process.env.BACKEND_URL}/api/image/${fileId}`,
  }
}

export const getDriveImageBuffer = async (fileId) => {
  const metadata = await drive.files.get({
    fileId,
    fields: 'mimeType',
  })

  const response = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'arraybuffer' }
  )

  return {
    buffer: Buffer.from(response.data),
    contentType: metadata.data.mimeType,
  }
}

export const deleteFromDrive = async (fileId) => {
  try {
    await drive.files.delete({ fileId })
  } catch {
    console.log('File not found in Drive:', fileId)
  }
}
