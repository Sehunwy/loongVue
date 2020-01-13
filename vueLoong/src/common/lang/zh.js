import {store_zh} from '@/common/lang/store/store_zh'
import {cloud_zh} from '@/common/lang/cloud/cloud_zh'
import {disk_zh} from '@/common/lang/disk/disk_zh'

const message = {
  test: '测试',
  tab: 'tab组件',
  page: '分页组件',
  table: 'table组件',
  date: '日期组件',
  dialog: '弹窗组件',
  tip: '提示框组件',
  balloon: '气泡提示框组件',
  tableTree: 'tableTree组件',
  select: 'select组件',
  selectTree: 'selectTree组件',
  switch: 'switch组件',
  cardTable: '卡片式表格',
  progress: '进度条组件',

  // 菜单
  'service-profile': '服务概括',

  'cloud-storage': '云存储',
  'service-management': '服务管理',
  'application-management': '应用管理',
  'device-group-management': '设备分组管理',
  'block-device-management': '块设备管理',
  'file-management': '文件管理',
  'rights-management': '权限管理',
  'quota-management': '配额管理',
  'NAS-management': 'NAS管理',
  'senior-management': '高级管理',

  'virtual-cloud': '虚拟云',
  'node-management': '节点管理',
  'network-management': '网络管理',
  'image-libraries': '镜像库',
  'document-library': '文件库',
  'tenant-management': '租户管理',

  'cloud-disk': '云盘',
  'department-management': '部门管理',
  'members-management': '成员管理',
  'group-management': '群组管理',
  'domain-control-management': '域控管理',

  'user-management': '用户管理',
  'set': '设置'
}
Object.assign(message, store_zh, cloud_zh, disk_zh);  // Object.assign(目标对象, 被合并的对象)
export {message};
