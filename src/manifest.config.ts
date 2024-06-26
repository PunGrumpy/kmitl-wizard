import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from '../package.json'

const { author, version, homepage } = packageJson

const [major, minor, patch, label = '0'] = version
  .replace(/[^\d.-]+/g, '')
  .split(/[.-]/)

export default defineManifest(() => ({
  manifest_version: 3,
  name: 'KMITL Wizard',
  description:
    'Transform your KMITL schedule into a beautiful and interactive table. This extension enhances your schedule with visually appealing designs and interactive features.',
  author: author.name,
  permissions: ['activeTab'],
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
