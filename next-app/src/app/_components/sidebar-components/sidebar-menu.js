
import { Collapsible } from "./sidebar";
import { cn } from "@/lib/utils";
import { displayStyles, bg_fg_color, interaction_color } from "../styles";

export const SidebarMenu = ({ icononly, children, className, ...props }) => {

   return (
      <Collapsible className={`${cn(bg_fg_color(), interaction_color(), className)}`} icononly={icononly} {...props}>
         {children}
      </Collapsible>

   )
}