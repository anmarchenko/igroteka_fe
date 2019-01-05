import { Check, Star, Package } from 'react-feather';
import Gamepad from './icons/Gamepad';

export const VALIDATION_ERRORS = {
  required: "can't be blank",
  email: 'incorrect email format',
  passwordLength: 'password should have at least 5 characters',
};

export const IMPORTANT_PLATFORMS = [
  'PC',
  'Mac',
  'PlayStation 4',
  'Xbox One',
  'iPhone',
  'Nintendo Switch',
];

export const BACKLOG_STATUSES = [
  {
    label: 'Wishlist',
    id: 'wishlist',
    icon: Star,
    color: '#FFB300',
  },
  {
    label: 'To play',
    id: 'backlog',
    icon: Package,
    color: '#3949AB',
  },
  {
    label: 'Currently playing',
    id: 'playing',
    icon: Gamepad,
    color: '#b71c1c',
  },
  {
    label: 'Played',
    id: 'beaten',
    icon: Check,
    color: '#4CAF50',
  },
];

export const BACKLOG_FILTERS = {
  wishlist: ['available', 'played'],
  backlog: ['available', 'played'],
  playing: [],
  beaten: ['played'],
};

export default VALIDATION_ERRORS;
