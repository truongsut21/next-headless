export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  uri: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  categories?: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
};
    
export type slug = {
  slug: string;
};
