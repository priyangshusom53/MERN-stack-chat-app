
import { Collapsible } from "./sidebar";
import { cn } from "@/lib/utils";
import { displayStyles, bg_fg_color, interaction_color } from "../styles";

export const SidebarMenu = ({ icononly, children, className }) => {

   return (
      <Collapsible className={`${cn('mr-auto gap-1', displayStyles.flex_row_start_center, bg_fg_color(), interaction_color(), className)}`} icononly={icononly}>
         {children}
      </Collapsible>

   )
}