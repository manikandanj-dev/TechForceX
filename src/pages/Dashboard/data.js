import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import GroupsIcon from '@mui/icons-material/Groups'
import PaidIcon from '@mui/icons-material/Paid'
import SpeedIcon from '@mui/icons-material/Speed'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

export const KPI_METRICS = [
  {
    label: 'Net revenue',
    value: '$842.6K',
    delta: '+18.4%',
    color: '#0f9f8f',
    Icon: PaidIcon,
    sparkline: [32, 38, 36, 47, 44, 58, 64],
  },
  {
    label: 'Active users',
    value: '128.4K',
    delta: '+12.1%',
    color: '#ec6f45',
    Icon: GroupsIcon,
    sparkline: [22, 28, 31, 36, 42, 48, 53],
  },
  {
    label: 'Conversion rate',
    value: '9.74%',
    delta: '+4.8%',
    color: '#3d7eff',
    Icon: TrendingUpIcon,
    sparkline: [18, 26, 24, 33, 39, 36, 45],
  },
  {
    label: 'Avg response',
    value: '184ms',
    delta: '-21.6%',
    color: '#d89a12',
    Icon: SpeedIcon,
    sparkline: [58, 53, 49, 43, 39, 34, 29],
  },
]

export const REVENUE_DATA = [
  { label: 'Jan', value: 48, secondary: 34 },
  { label: 'Feb', value: 56, secondary: 39 },
  { label: 'Mar', value: 52, secondary: 44 },
  { label: 'Apr', value: 71, secondary: 50 },
  { label: 'May', value: 83, secondary: 58 },
  { label: 'Jun', value: 91, secondary: 66 },
  { label: 'Jul', value: 104, secondary: 74 },
]

export const USER_SEGMENTS = [
  { label: 'Enterprise', value: 72, color: '#0f9f8f' },
  { label: 'Teams', value: 58, color: '#ec6f45' },
  { label: 'Creator', value: 44, color: '#3d7eff' },
  { label: 'Starter', value: 31, color: '#d89a12' },
]

export const PERFORMANCE_DATA = [
  { label: 'API', value: 97 },
  { label: 'Web', value: 94 },
  { label: 'Data', value: 91 },
  { label: 'Jobs', value: 88 },
]

export const ACTIVITY_ITEMS = [
  {
    title: 'Enterprise pipeline crossed forecast',
    meta: 'Revenue ops updated 12 accounts',
    color: 'success',
  },
  {
    title: 'Checkout latency dropped below target',
    meta: 'Performance budget holding at 184ms',
    color: 'info',
  },
  {
    title: 'Lifecycle campaign reached 81% adoption',
    meta: '32K users entered the activation path',
    color: 'warning',
  },
  {
    title: 'North America expansion cohort opened',
    meta: 'New dashboard filters published',
    color: 'secondary',
  },
]

export const DASHBOARD_ACTIONS = [
  { label: 'Revenue health', value: '96%', Icon: ArrowUpwardIcon },
  { label: 'Forecast confidence', value: 'High', Icon: TrendingUpIcon },
]
