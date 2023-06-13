import {
  Archive,
  Bookmark,
  Check,
  ShoppingBag,
  Star,
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
  { id: 167, name: 'PlayStation 5' },
  { id: 169, name: 'Xbox Series' },
  { id: 130, name: 'Nintendo Switch' },
  { id: 390, name: 'PlayStation VR2' },
];

export const BACKLOG_STATUSES = [
  {
    label: 'Wishlist',
    id: 'wishlist',
    icon: Bookmark,
    color: '#FFB300',
  },
  {
    label: 'To play',
    id: 'backlog',
    icon: ShoppingBag,
    color: '#3949AB',
  },
  {
    label: 'Playing',
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
export const SORT_OPTIONS = {
  wishlist: [
    { value: 'desc:expectation_rating', label: 'Expectation' },
    { value: 'desc:rating', label: 'OpenCritic rating' },
    { value: 'asc:playthrough', label: 'Shortest first' },
    { value: 'desc:playthrough', label: 'Longest first' },
  ],
  backlog: [
    { value: 'desc:expectation_rating', label: 'Expectation' },
    { value: 'desc:rating', label: 'OpenCritic rating' },
    { value: 'asc:playthrough', label: 'Shortest first' },
    { value: 'desc:playthrough', label: 'Longest first' },
  ],
  playing: [],
  beaten: [
    { value: 'desc:finished_at', label: 'Finished' },
    { value: 'desc:score', label: 'My score' },
    { value: 'desc:rating', label: 'OpenCritic rating' },
    { value: 'desc:game_release_date', label: 'Release date' },
    { value: 'asc:playthrough', label: 'Shortest first' },
    { value: 'desc:playthrough', label: 'Longest first' },
    { value: 'asc:game_name', label: 'Name' },
  ],
};

export const BACKLOG_FIELDS = {
  wishlist: ['platform', 'expectationRating'],
  backlog: ['platform', 'expectationRating'],
  playing: ['platform'],
  beaten: ['platform', 'score', 'finished'],
};

export const GAME_SCORES = [
  {
    label: 'Excellent',
    badgeStyle: 'bg-danger',
    id: 5,
    icon: Heart,
    color: '#dc3545',
  },
  {
    label: 'Good',
    badgeStyle: 'bg-warning',
    id: 4,
    icon: ThumbsUp,
    color: '#ffc107',
  },
  {
    label: 'Enjoyable',
    badgeStyle: 'bg-success',
    id: 3,
    icon: Smile,
    color: '#28a745',
  },
  {
    label: 'Fine',
    badgeStyle: 'bg-primary',
    id: 2,
    icon: Meh,
    color: '#007bff',
  },
  {
    label: 'Not good',
    badgeStyle: 'bg-secondary',
    id: 1,
    icon: ThumbsDown,
    color: '#9E9E9E',
  },
];

export const EXPECTATIONS = [
  {
    label: 'High',
    badgeStyle: 'bg-danger',
    id: 3,
    icon: Heart,
    color: '#dc3545',
  },
  {
    label: 'Medium',
    badgeStyle: 'bg-warning',
    id: 2,
    icon: Star,
    color: '#ffc107',
  },
  {
    label: 'Low',
    badgeStyle: 'bg-secondary',
    id: 1,
    icon: Archive,
    color: '#28a745',
  },
];

export default VALIDATION_ERRORS;
