export interface TransactionItem {
  id: number;
  attributes: {
    total: number;
    products: {
      data: {
        id: number;
        attributes: {
          name: string;
          price: string;
        };
      };
    };
  };
}
