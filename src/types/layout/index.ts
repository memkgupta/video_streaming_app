import { LucideIcon, LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export interface SideBarGroup{
    label:string,
    items:SideBarGroupItem[]
}
export interface SideBarGroupItem{
   title:string,
    url:string,
    icon?:any
}