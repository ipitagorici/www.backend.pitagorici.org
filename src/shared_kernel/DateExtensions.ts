interface Date {
  differenceInSeconds(this: Date, endDate: Date): number
}

Date.prototype.differenceInSeconds = function (this, endDate: Date): number {
  return Math.floor((endDate.getTime() - this.getTime()) / 1000)
};