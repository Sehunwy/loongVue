import {store_en} from '@/common/lang/store/store_en'
import {cloud_en} from '@/common/lang/cloud/cloud_en'
import {disk_en} from '@/common/lang/disk/disk_en'

const message = {
  test: 'test',
  tab:'tab',
  page:'page',
  table:'table',
  date:'date',
  dialog:'dialog',
  tip:'tip',
  balloon:'balloon',
  tableTree: 'tableTree',
  select: 'select',
  selectTree: 'selectTree',
  switch: 'switch',
  cardTable: 'cardTable',
  progress: 'progress',

  // 菜单
  'service-profile': 'Service profile',

  'cloud-storage': 'Cloud storage',
  'service-management': 'Service management',
  'application-management': 'Application management',
  'device-group-management': 'Device group management',
  'block-device-management': 'Block device management',
  'file-management': 'File management',
  'rights-management': 'Rights management',
  'quota-management': 'Quota management',
  'NAS-management': 'NAS management',
  'senior-management': 'Senior management',

  'virtual-cloud': 'Virtual cloud',
  'node-management': 'Node management',
  'network-management': 'Network management',
  'image-libraries': 'Image libraries',
  'document-library': 'Document library',
  'tenant-management': 'Tenant management',

  'cloud-disk': 'Cloud disk',
  'department-management':'Department management',
  'members-management':'Members management',
  'group-management':'Group management',
  'domain-control-management':'Domain control management',

  'user-management':'User management',
  'set':'set'
}
Object.assign(message, store_en, cloud_en, disk_en);  // Object.assign(目标对象, 被合并的对象)
export {message};
