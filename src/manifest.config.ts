import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from '../package.json'

const { name, description, author, version, homepage } = packageJson

const [major, minor, patch, label = '0'] = version
  .replace(/[^\d.-]+/g, '')
  .split(/[.-]/)

export default defineManifest(() => ({
  manifest_version: 3,
  name,
  description,
  author: author.name,
  homepage_url: homepage,
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  icons: {
    '16': 'src/assets/icons/icon-16.png',
    '32': 'src/assets/icons/icon-32.png',
    '64': 'src/assets/icons/icon-64.png',
    '128': 'src/assets/icons/icon-128.png'
  },
  content_scripts: [
    {
      matches: [
        'https://*.reg.kmitl.ac.th/u_student/report_studytable_show.php'
      ],
      js: ['src/content/index.ts']
    }
  ]
}))
