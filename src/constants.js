import {
  Archive,
  Bookmark,
  Check,
  Star,
  Package,
  ThumbsDown,
  Meh,
  ThumbsUp,
  Smile,
  Heart,
} from 'react-feather';
import Gamepad from './icons/Gamepad';

export const VALIDATION_ERRORS = {
  required: "can't be blank",
  email: 'incorrect email format',
  passwordLength: 'password should have at least 5 characters',
};

export const IMPORTANT_PLATFORMS = [
  'PC (Microsoft Windows)',
  'PlayStation 4',
  'Xbox One',
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
  wishlist: ['platform', 'releaseYear'],
  backlog: ['platform', 'releaseYear'],
  playing: [],
  beaten: ['platform', 'releaseYear', 'sort'],
};

export const SORT_OPTIONS = {
  wishlist: [],
  backlog: [],
  playing: [],
  beaten: [
    { value: 'desc:finished_at', label: 'Finished' },
    { value: 'desc:score', label: 'My score' },
    { value: 'desc:game_release_date', label: 'Release date' },
    { value: 'asc:game_name', label: 'Name' },
  ],
};

export const BACKLOG_FIELDS = {
  wishlist: ['note', 'platform', 'expectationRating'],
  backlog: ['note', 'platform', 'expectationRating'],
  playing: ['note', 'platform'],
  beaten: ['note', 'platform', 'score', 'finished'],
};

export const GAME_SCORES = [
  {
    label: 'Fantastic',
    badgeStyle: 'badge-danger',
    id: 5,
    icon: Heart,
    color: '#dc3545',
  },
  {
    label: 'Excellent',
    badgeStyle: 'badge-warning',
    id: 4,
    icon: ThumbsUp,
    color: '#ffc107',
  },
  {
    label: 'Enjoyable',
    badgeStyle: 'badge-success',
    id: 3,
    icon: Smile,
    color: '#28a745',
  },
  {
    label: 'OK',
    badgeStyle: 'badge-primary',
    id: 2,
    icon: Meh,
    color: '#007bff',
  },
  {
    label: 'Unsatisfying',
    badgeStyle: 'badge-light',
    id: 1,
    icon: ThumbsDown,
    color: '#9E9E9E',
  },
];

export const EXPECTATIONS = [
  {
    label: 'Essential',
    badgeStyle: 'badge-danger',
    id: 3,
    icon: Heart,
    color: '#dc3545',
  },
  {
    label: 'Priority',
    badgeStyle: 'badge-warning',
    id: 2,
    icon: Bookmark,
    color: '#ffc107',
  },
  {
    label: 'Eventually',
    badgeStyle: 'badge-secondary',
    id: 1,
    icon: Archive,
    color: '#28a745',
  },
];

export const PLAYTHROUGH_BADGES = {
  'very-short': 'badge-secondary',
  short: 'badge-success',
  fair: 'badge-info',
  average: 'badge-primary',
  long: 'badge-warning',
  'very-long': 'badge-danger',
};

export default VALIDATION_ERRORS;
