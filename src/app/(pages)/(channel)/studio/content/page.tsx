"use client"
import React, { useState } from 'react'
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2, ExternalLink, ChartScatter, MoreHorizontalIcon, ChartBar } from "lucide-react";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { APIResponse, Video } from '@/types';
import { DataTable } from '@/components/ui/data-table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CustomTable } from '@/components/ui/custom-table';
import { useApiGet, useApiInfinite } from '@/hooks/api_hooks';

export const columns: ColumnDef<Video>[] = [
  {
    accessorKey: "thumbnail",
    header: "",
    cell: ({ row }) => (
      <div className="relative w-20 h-12 rounded overflow-hidden">
        <Image
          src={row.original.thumbnailUrl}
          alt={row.original.title}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
       
        className="px-0"
      >
        Title
       
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
  },
  {
    accessorKey: "visibility",
    header: "Visibility",
    cell: ({ row }) => {
      const vis = row.original.visibility;
      return (
        <Badge variant={vis === "Public" ? "default" : vis === "Private" ? "secondary" : "outline"}>
          {vis}
        </Badge>
      );
    },
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => <div>{row.original.views}</div>,
  },
  {
    accessorKey: "uploadedAt",
    header: "Uploaded",
    cell: ({ row }) => <div>{row.original.uploadedAt}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu >
  <DropdownMenuTrigger className='cursor-pointer'><MoreHorizontalIcon/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className='flex items-center gap-2'>  <ExternalLink className="w-4 h-4" /> View</DropdownMenuItem>
    <DropdownMenuItem className='flex items-center gap-2'>  <Pencil className="w-4 h-4" /> Edit</DropdownMenuItem>
    <DropdownMenuItem className='flex items-center gap-2'> <Trash2 className="w-4 h-4" /> Delete</DropdownMenuItem>
    <DropdownMenuItem className='flex items-center gap-2'><ChartBar className='w-4 h-4'/> Analytics</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
      
      );
    },
  },
];


const Content = () => {
    const[page,setPage] = useState(1);
    const onPageChange = ({pageNumber,totalResults}:{pageNumber:number,totalResults:number})=>{
        setPage(pageNumber)
    }
    const handleFilterStateChange = (name:string,value:any)=>{
        console.log(name,value)
    }
    const {data,isFetching,isError} = useApiGet<APIResponse<Video[]>>(`/aggregate/channel/videos`,{
      params:{
        page,
        size:50
      }
    },{
      queryKey:["content",page],
 
    })
  return (
     <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Your Videos</h2>
    
{   isError?<>Some error occurred</>: <CustomTable
    columns={columns}
    data={data?.data?data.data:[]}
  
    filterable={
        [{label:"title",type:"text"}]
    }
    totalResults={500}
    manualPagination
    isLoading={isFetching}
    onPageChange={onPageChange}
    hasNextPage={data?.nextCursor!=undefined && data?.nextCursor!=null}
    hasPreviousPage={data?.previousCursor!=undefined && data?.previousCursor!=null}
    handleFilterStateChange={handleFilterStateChange}
    />}
    </div>
  )
}

export default Content