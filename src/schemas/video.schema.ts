import Visibility from "@/components/features/video-upload/steps/visibility";
import { z } from "zod";

export const videoDetailsSchema = z.object({
    title:z.string(),
    description:z.string(),
    category:z.string(),
    thumbnail:z.string().optional(),
    Visibility:z.string().default("public")
})