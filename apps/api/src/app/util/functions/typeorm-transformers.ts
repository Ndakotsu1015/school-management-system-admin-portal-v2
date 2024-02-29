/// ColumnNumericTransformer
// source: https://stackoverflow.com/questions/69872250/
// with little modification
export class ColumnDecimalTransformer {
    to(data: number): number {
      return data;
    }
    from(data: string): number {
      return parseFloat(data);
    }
  }