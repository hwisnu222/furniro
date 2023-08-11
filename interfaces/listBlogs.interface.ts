export interface ListBlogProps {
  id: number;
  attributes: {
    title: string;
    article: string;
    image: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
    users_permissions_user: {
      data: {
        id: number;
        attributes: {
          username: string;
        };
      };
    };
    createdAt: string;
    updatedAt: string;
  };
}
