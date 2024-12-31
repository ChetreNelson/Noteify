import { apDirectoryName, fileEncoding } from '@shared/constant'
import { NoteInfo } from '@shared/models'
import {
  CreateNote,
  DeleteNote,
  GetNotes,
  ReadNote,
  WriteNote as WriteNoteType
} from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readdir, readFile, remove, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'

export const getRootDir = () => {
  return path.join(homedir(), apDirectoryName)
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)
  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const filePath = path.join(getRootDir(), fileName) // Use path.join here
  const fileStats = await stat(filePath)
  return {
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (fileName) => {
  const filePath = path.join(getRootDir(), `${fileName}.md`)
  return readFile(filePath, { encoding: fileEncoding })
}

export const writeNote: WriteNoteType = async (fileName, content) => {
  const filePath = path.join(getRootDir(), `${fileName}.md`)
  return writeFile(filePath, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) return false

  const { name: fileName, dir: parentDir } = path.parse(filePath)
  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creating failed',
      message: `Notes should be created in ${rootDir}`
    })
    return false
  }
  console.info(`creating note ${filePath}`)
  await writeFile(filePath, '')

  return fileName
}

export const deleteNote: DeleteNote = async (fileName) => {
  const rootDir = getRootDir()
  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete this note ${fileName}?`,
    buttons: ['Delete', 'Cancel'], //0 is Delete , 1 is Cancel
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) return false

  await remove(path.join(rootDir, `${fileName}.md`))
  return true
}
