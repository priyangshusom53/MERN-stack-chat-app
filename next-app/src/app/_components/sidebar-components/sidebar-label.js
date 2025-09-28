import { Collapsible } from "./sidebar";
import { cn } from "@/lib/utils";
import { displayStyles, bg_fg_color } from "../styles";

export const SidebarLabel = ({ children, className }) => {
   return (
      <Collapsible className={`${cn('mr-auto', displayStyles.flex_row_start_center, bg_fg_color(), className)}`}>
         {children}
      </Collapsible>
   )
}