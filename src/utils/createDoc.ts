import { spawnSync } from 'child_process'
import { writeFileSync } from 'fs'
import { type OpenAPIObject } from '@nestjs/swagger'
import * as Converter from 'openapi-to-postmanv2'

export const createDoc = (document: OpenAPIObject) => {
  writeFileSync('./swagger-spec.json', JSON.stringify(document))

  spawnSync(
    'npx',
    ['widdershins',
      '--search',
      'true',
      '--maxDepth',
      '50',
      '--summary',
      'swagger-spec.json',
      '-o',
      'README.md',
      '--code',
      'true',
      '--expandBody',
      'true'
    ]
  )
  Converter.convert(
    { type: 'json', data: JSON.stringify(document) },
    { folderStrategy: 'Tags' },
    (err, conversionResult) => {
      if (!conversionResult?.result || err) {
        console.error(err)
      } else {
        const { data } = conversionResult.output[0]
        writeFileSync('postman.json', JSON.stringify(data))
      }
    }
  )
}
