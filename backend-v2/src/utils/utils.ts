
const convertToMilliseconds = (time: number, unit: "seconds" | "minutes" | "hours" | "days"): number => {
   switch (unit) {
      case "seconds": return time * 1000;
      case "minutes": return time * 60 * 1000;
      case "hours": return time * 60 * 60 * 1000;
      case "days": return time * 24 * 60 * 60 * 1000;
      default: return 0;
   }
}

export { convertToMilliseconds }