export type Category = {
  __CLASS__: string,
  tag: string,
  label: string
}

export type Historical = {
  month: number,
  average: number
}

export type HistoricalRaw = {
  __CLASS__: string,
  month: {
    [key: string]: number
  }
}