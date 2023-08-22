export interface UsersPermissionsUserItem {
  id: number;
  attributes: {
    profile: {
      data: {
        attributes: {
          firstname: string;
          lastname: string;
          city: string;
        };
      };
    };
  };
}
