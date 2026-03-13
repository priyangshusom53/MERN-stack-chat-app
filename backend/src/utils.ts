export type DurationUnit = "s" | "m" | "h" | "d"

export interface Duration{
   time:number
   unit:DurationUnit
}

export function durationToMs(duration:Duration):number{

   const { time, unit } = duration

   switch(unit){

      case "s":
         return time * 1000

      case "m":
         return time * 60 * 1000

      case "h":
         return time * 60 * 60 * 1000

      case "d":
         return time * 24 * 60 * 60 * 1000

      default:
         throw new Error("Invalid duration unit")

   }
}