export const getDiffColor = (rating: number) => {
  switch (true) {
    case rating < 2:
      return '#4dc0ff';
    case rating < 2.7:
      return '#66ff92';
    case rating < 4:
      return '#f7e95d';
    case rating < 5.3:
      return '#ff7f68';
    case rating < 6:
      return '#fe3972';
    case rating < 7:
      return '#6662de';
    case rating < 8:
      return '#18158e';
    case rating < 9:
      return '#0d0c4f';
    default:
      return '#111111';
  }
};
