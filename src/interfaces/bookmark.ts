export interface Bookmark {
  saveableId: string;
  headline: string;
  picture: string;
  kind: string;
  createdAt: Date;
}

export interface BookmarkRoutes {
  [key: string]: string;
}
