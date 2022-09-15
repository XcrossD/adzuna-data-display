export type Category = {
  __CLASS__: string,
  tag: string,
  label: string
}

export type Historical = {
  month: Date,
  average: number
}

export type HistoricalRaw = {
  __CLASS__: string,
  month: {
    [key: string]: number
  }
}

export type Histogram = {
  bin: string,
  amount: number
}

export type HistogramRaw = {
  __CLASS__: string,
  histogram: {
    [key: string]: number
  }
}