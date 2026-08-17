import { BookmarkRoutes as BookmarkRoutesShape } from '@/interfaces/bookmark';

export const Bookmark = {
  All: 'All',
  Place: 'SavedPlace',
  Review: 'SavedReview',
};

export const BookmarkRoutes: BookmarkRoutesShape = {
  All: 'saveds',
  Places: 'saved-places',
  Reviews: 'saved-reviews',
};
