import { z } from "zod";
const linksSchema = z.object({
    title:z.string(),
    url:z.string().url()
})

export const channelSchema = z.object({
    name:z.string(),
    description:z.string(),
    banner:z.string().optional(),
    profile:z.string(),
    handle:z.string(),
    links:z.array(linksSchema),

})