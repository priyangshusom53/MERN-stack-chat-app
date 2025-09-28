
import { cn } from "@/lib/utils";
import { displayStyles } from "../styles";
export const SidebarGroup = ({ children, className }) => {

   return (
      <div className={cn(`sidebar-group w-full flex-1 ${displayStyles.flex_col_start_center} overflow-auto scrollbar-style group`, className)}>
         {children}
      </div>)
}


export const SidebarGroupContent = ({ children, className, ...props }) => {

   return (
      <div className={cn(`sidebar-group-content w-full p-0 ${displayStyles.flex_row_center} shrink-0 overflow-hidden bg-background hover:bg-accent-background`, className)}
         {...props}>
         {children}
      </div>)
}