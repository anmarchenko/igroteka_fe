import {
  Check, Star, Package, ThumbsDown, Meh, ThumbsUp, Smile, Heart,
} from 'react-feather';
import Gamepad from './icons/Gamepad';

export const VALIDATION_ERRORS = {
  required: "can't be blank",
  email: 'incorrect email format',
  passwordLength: 'password should have at least 5 characters',
};

export const IMPORTANT_PLATFORMS = ['PC', 'Mac', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'];

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
  wishlist: ['played'],
  backlog: ['played'],
  playing: [],
  beaten: ['played'],
};

export const BACKLOG_FIELDS = {
  wishlist: ['note', 'platform', 'expectationRating'],
  backlog: ['note', 'platform', 'expectationRating'],
  playing: ['note', 'platform'],
  beaten: ['note', 'platform', 'score', 'finished'],
};

export const GAME_SCORES = [
  {
    label: 'Loved',
    badgeStyle: 'badge-danger',
    id: 5,
    icon: Heart,
    color: '#dc3545',
  },
  {
    label: 'Liked',
    badgeStyle: 'badge-warning',
    id: 4,
    icon: ThumbsUp,
    color: '#ffc107',
  },
  {
    label: 'Good',
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
    label: 'Bad',
    badgeStyle: 'badge-light',
    id: 1,
    icon: ThumbsDown,
    color: '#9E9E9E',
  },
];

export default VALIDATION_ERRORS;
