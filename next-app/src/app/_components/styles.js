import { cn } from "@/lib/utils";

export class Styles extends Object {
   constructor() {
      super()
   }
   build() {
      const plain = {};
      for (const key in this) {
         if (Object.hasOwn(this, key)) {
            plain[key] = this[key];
         }
      }
      return plain;
   }
   addProps(props) {
      for (let key in props) {
         if (props.hasOwnProperty(key)) {
            this[key] = props[key]
         }
      }
      return this
   }
}


/*
*  Region Typography
*/
export const textStyles = {
   text_h2: "text-(length:--size-h2) leading-[length:calc(1.1var(--size-h2))]",
   text_h3: "text-(length:--size-h3) leading-[length:calc(1.2*var(--size-h3))]",
   text_h4: "text-(length:--size-h4) leading-[length:calc(1.3*var(--size-h4))]",
   text_h5: "text-(length:--size-h5) leading-[length:calc(1.4*var(--size-h5))]",
   text_h6: "text-(length:--size-h6) leading-[length:calc(1.5*var(--size-h6))]",
   text_color: "text-foreground"
}

export const txt_level_2 = cn(textStyles.text_h5, "md:text-[length:var(--size-h4)] md:leading-[length:calc(1.3*var(--size-h4))]")
export const txt_level_3 = cn(textStyles.text_h6, "md:text-[length:var(--size-h5)] md:leading-[length:calc(1.4*var(--size-h5))]")
export const h_lvl_2_3 = cn('h-[length:calc(calc(1.4*var(--size-h5))+calc(1.5*var(--size-h6)))] md:h-[length:calc(calc(1.4*var(--size-h5))+calc(1.3*var(--size-h4)))]')
export const w_lvl_2_3 = cn('w-[length:calc(calc(1.4*var(--size-h5))+calc(1.5*var(--size-h6)))] md:w-[length:calc(calc(1.4*var(--size-h5))+calc(1.3*var(--size-h4)))]')


export function text_h2(additionalStyles) {
   return cn("text-(length:--size-h2) leading-[length:var(--size-h2)]", additionalStyles)
}

export function text_h3(additionalStyles) {
   return cn("text-(length:--size-h3) leading-[length:calc(1.1*var(--size-h3))]", additionalStyles)
}

export function text_h4(additionalStyles) {
   return cn("text-(length:--size-h4) leading-[length:calc(1.2*var(--size-h4))]", additionalStyles)
}

export function text_h5(additionalStyles) {
   return cn("text-(length:--size-h5) leading-[length:calc(1.35*var(--size-h5))]", additionalStyles)
}

export function text_h6(additionalStyles) {
   return cn("text-(length:--size-h6) leading-[length:calc(1.5*var(--size-h6))]", additionalStyles)
}

/* Region Display */
export const displayStyles = {
   flex_row_center: "flex flex-row justify-center items-center",
   flex_col_center: "flex flex-col justify-center items-center",
   flex_row_start_center: "flex flex-row justify-start items-center",
   flex_col_start_center: "flex flex-col justify-start items-center"
}

/* Region Size */

/*----h2 sizes---- */
export function square_h2(additionalStyles) {
   return cn("size-(length:--size-h2)", additionalStyles)
}
export function w_h2(additionalStyles) {
   return cn("w-(length:--size-h2)", additionalStyles)
}
export function h_h2(additionalStyles) {
   return cn("h-(length:--size-h2)", additionalStyles)
}

/*----h3 sizes---- */
export function square_h3(additionalStyles) {
   return cn("size-(length:--size-h3)", additionalStyles)
}
export function w_h3(additionalStyles) {
   return cn("w-(length:--size-h3)", additionalStyles)
}
export function h_h3(additionalStyles) {
   return cn("h-(length:--size-h3)", additionalStyles)
}

/*----h4 sizes---- */
export function square_h4(additionalStyles) {
   return cn("size-(length:--size-h4)", additionalStyles)
}
export function w_h4(additionalStyles) {
   return cn("w-(length:--size-h4)", additionalStyles)
}
export function h_h4(additionalStyles) {
   return cn("h-(length:--size-h4)", additionalStyles)
}

/*----h5 sizes---- */
export function square_h5(additionalStyles) {
   return cn("size-(length:--size-h5)", additionalStyles)
}
export function w_h5(additionalStyles) {
   return cn("w-(length:--size-h5)", additionalStyles)
}
export function h_h5(additionalStyles) {
   return cn("h-(length:--size-h5)", additionalStyles)
}

/*----h6 sizes---- */
export function square_h6(additionalStyles) {
   return cn("size-(length:--size-h6)", additionalStyles)
}
export function w_h6(additionalStyles) {
   return cn("w-(length:--size-h6)", additionalStyles)
}
export function h_h6(additionalStyles) {
   return cn("h-(length:--size-h6)", additionalStyles)
}

/* Region Colors */
export function bg_fg_color(overwrite) {
   return cn("bg-background text-foreground", overwrite)
}

/* Region Interation */
export function interaction_color(group = false, children = false, overwrite) {
   return cn(` ${group ? 'group-hover:bg-accent group-hover:text-accent-foreground focus: group-active:bg-accent group-active:text-accent-foreground group-disabled:opacity-50' : 'hover:bg-accent hover:text-accent-foreground focus: active:bg-accent active:text-accent-foreground disabled:opacity-50'}`, `${children ? 'hover:**:bg-accent hover:**:text-accent-foreground active:**:bg-accent active:**:text-accent-foreground disabled:**:opacity-50' : ''}`, overwrite)
}


/* Region Margin */

Styles.prototype.m = function (t = 0, b = 0, l = 0, r = 0) {

   this.margin = `${t} ${r} ${b} ${l}`
   return this
}


/* Region Border */
Styles.prototype.border = function (t = 0, b = 0, l = 0, r = 0) {

   this.borderWidth = `${t} ${r} ${b} ${l}`
   return this
}