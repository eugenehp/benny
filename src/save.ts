import { Event, Suite } from 'benchmark'
import * as kleur from 'kleur'
import { SaveOptions, Summary } from './internal/common-types'
import getSummary from './internal/getSummary'
import prepareFileContent from './internal/prepareFileContent'

type Opt = SaveOptions & { folder: string }

const defaultOptions: Opt = {
  file: (summary) => summary.date.toISOString(),
  folder: 'benchmark/results',
  version: null,
  details: false,
  format: 'json',
}

type Callback = (content: string, options:Opt) => void;

type Save = (options?: SaveOptions) => Promise<(suiteObj: Suite) => Suite>

/**
 * Saves results to a file
 */
const save: Save = async (options = {}, callback?: Callback) => (suiteObj) => {
  const opt = { ...defaultOptions, ...options } as Opt

  suiteObj.on('complete', (event: Event) => {
    const summary: Summary = getSummary(event)

    const fileName =
      typeof opt.file === 'function' ? opt.file(summary) : opt.file
  
    const fileContent = prepareFileContent(summary, opt)

    if(callback){
      callback(fileContent, opt)
    }

    try{
      const path = require('path');
      const fs = require('fs-extra');
      const fullPath = path.join(opt.folder, `${fileName}.${opt.format}`)
      fs.ensureDirSync(opt.folder)
      fs.writeFileSync(fullPath, fileContent)
      console.log(kleur.cyan(`\nSaved to: ${fullPath}`))
    }catch(err){
      console.log(`Couldn't save a file`, err)
    }
  })

  return suiteObj
}

export { save, Save }
export default save
