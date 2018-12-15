declare namespace jest {
  interface Matchers<R> {
    toExistsInTable: (table: string, column?: string) => any;
  }

  interface Expect {
    toExistsInTable: (table: string, column?: string) => any;
  }
}