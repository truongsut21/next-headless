export type Post = {
  id: string;
  title: string;
  slug: string;
  uri: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
};
    
export type slug = {
  slug: string;
};
