export interface DataComparison {
  name: string;
  product1: string;
  product2: string;
}

export interface TableComparisonProps {
  title: string;
  data: DataComparison[];
}
