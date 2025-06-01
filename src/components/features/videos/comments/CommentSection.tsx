"use client";

import { useState } from "react";
import { CommentInput } from "./comment-input";
import { Comment } from "./comment";
import { APIResponse, Comment as CommentType } from "@/types";

import { Button } from "@/components/ui/button";
import { ArrowDown01, ArrowUp01, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/context/AuthContext";
import { useApiGet, useApiInfinite, useApiPost } from "@/hooks/api_hooks";
import { BACKEND_BASE_URL } from "@/constants";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
interface PostCommentPayload{
     comment:string;
  userId:string;
  videoId:string;
  replyTo?:string;
  parentCommentId?:string;
}
export function CommentSection({videoId}:{videoId:string}) {

  const [sortOrder, setSortOrder] = useState<"top" | "newest">("top");
  const {user:currentUser} = useAuth()
  const [isPostingComment,setIsPostingComment] = useState(false);
 const[currPage,setCurrPage]=useState(1);
  
  // Sort comments based on current sort order
 
  const queryClient = useQueryClient();
 const {data,isFetching,hasNextPage,fetchNextPage,isFetchingNextPage} = useApiInfinite<CommentType>(`${BACKEND_BASE_URL}/aggregate/videos/comment`,
  {
    params:{
      videoId:videoId
    }
  },
  {
    queryKey:["comments",videoId]
  }
 ) 
const postCommentMutation = useApiPost<CommentType, PostCommentPayload>(
  `${BACKEND_BASE_URL}/video/comment`,
  {},
  undefined as any,
  {
    onSuccess: async (data) => {
      // setComments((prev) => [{...data,user:currentUser!}, ...prev]);
      // setCommentCount((prev) => prev + 1);
      setIsPostingComment(false);
        queryClient.setQueryData(['comments',videoId], (oldData:InfiniteData<{
    data: CommentType[];
    nextCursor: string | number | undefined;
    prevCursor: string | number | undefined;
}, unknown> | undefined) => {
    if (!oldData) return oldData;

        const firstPage = oldData.pages[0];
        return {
          ...oldData,
          pages: [
            {
              ...firstPage,
              data: [data, ...firstPage.data],
            },
            ...oldData.pages.slice(1),
          ],
        };
    });
    },
    
    onError: (error) => {
      setIsPostingComment(false);
    },

  },

);

const commentPages =data?.pages.flatMap(page=>page.data);
const handleAddComment = (content: string) => {
  if (!isPostingComment) {
    setIsPostingComment(true);

    const newComment: PostCommentPayload = {
      videoId,
      comment: content,
      userId: currentUser!.id,
    };

    postCommentMutation.mutate(newComment);
  }
};

  const handleAddReply = async(commentId: string, content: string,replyTo?:string) => {
    if(commentPages==undefined){
      return;
    }
try{
      setIsPostingComment(true)
    const newReply: PostCommentPayload = {
      videoId,
      comment: content,
      userId: currentUser!.id,
      replyTo:replyTo
    };
    const res = await api.post<APIResponse<CommentType>>(`/video/comment?isReply=true&parentId=${commentId}`,newReply);
if(res.data.data!=undefined)
{
    const updatedComments = commentPages.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []),{...res.data.data,user:currentUser}],
        };
      }
      return comment;
    });
    console.log("update",updatedComments)
    setIsPostingComment(false);
        queryClient.setQueryData(['comments',videoId], (oldData:InfiniteData<{
    data: CommentType[];
    nextCursor: string | number | undefined;
    prevCursor: string | number | undefined;
}, unknown> | undefined) => {
if (
  !oldData ||
  !Array.isArray(oldData.pages) ||
  currPage < 1 || // prevent index -1 or below
  currPage > oldData.pages.length // prevent overflow
) {
  console.warn('Invalid pagination state', { oldData, currPage });
  return oldData;
}

const pageIndex = currPage - 1;
const currentPage = oldData.pages[pageIndex];

return {
  ...oldData,
  pages: [
    ...oldData.pages.slice(0, pageIndex), // pages before current
    {
      ...currentPage,
      data: updatedComments, // updated page
    },
    ...oldData.pages.slice(pageIndex + 1), // pages after current
  ],
};
    });
console.log(queryClient.getQueryData(["comments",videoId]))
}

}
    
    finally{
      setIsPostingComment(false)
    }
 
  };

  const handleLike = (commentId: string) => {
    // setComments(
    //   comments.map((comment) => {
    //     if (comment.id === commentId) {
    //       return { ...comment, likes: comment.likes + 1 };
    //     }
        
    //     if (comment.replies) {
    //       return {
    //         ...comment,
    //         replies: comment.replies.map((reply) =>
    //           reply.id === commentId
    //             ? { ...reply, likes: reply.likes + 1 }
    //             : reply
    //         ),
    //       };
    //     }
        
    //     return comment;
    //   })
    // );
  };

  const handleDislike = (commentId: string) => {
    // setComments(
    //   comments.map((comment) => {
    //     if (comment.id === commentId) {
    //       return { ...comment, dislikes: comment.dislikes + 1 };
    //     }
        
    //     if (comment.replies) {
    //       return {
    //         ...comment,
    //         replies: comment.replies.map((reply) =>
    //           reply.id === commentId
    //             ? { ...reply, dislikes: reply.dislikes + 1 }
    //             : reply
    //         ),
    //       };
    //     }
        
    //     return comment;
    //   })
    // );
  };

  const handleEditComment = (commentId: string, content: string) => {
    // setComments(
    //   comments.map((comment) => {
    //     if (comment.id === commentId) {
    //       return {
    //         ...comment,
    //         content,
    //         updatedAt: new Date().toISOString(),
    //       };
    //     }
        
    //     if (comment.replies) {
    //       return {
    //         ...comment,
    //         replies: comment.replies.map((reply) =>
    //           reply.id === commentId
    //             ? {
    //                 ...reply,
    //                 content,
    //                 updatedAt: new Date().toISOString(),
    //               }
    //             : reply
    //         ),
    //       };
    //     }
        
    //     return comment;
    //   })
    // );
  };

  const handleDeleteComment = (commentId: string) => {
    // Check if it's a top-level comment
    // const isTopLevel = comments.some((comment) => comment.id === commentId);
    
    // if (isTopLevel) {
    //   const commentToDelete = comments.find((comment) => comment.id === commentId);
    //   const repliesCount = commentToDelete?.replies?.length || 0;
      
    //   setComments(comments.filter((comment) => comment.id !== commentId));
    //   setCommentCount(commentCount - 1 - repliesCount);
    // } else {
    //   // It's a reply
    //   setComments(
    //     comments.map((comment) => {
    //       if (comment.replies?.some((reply) => reply.id === commentId)) {
    //         return {
    //           ...comment,
    //           replies: comment.replies.filter((reply) => reply.id !== commentId),
    //         };
    //       }
    //       return comment;
    //     })
    //   );
    //   setCommentCount(commentCount - 1);
    // }
  };
  console.log("data",data)

console.log("pages",commentPages)
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        {/* <h2 className="text-xl font-bold">{commentCount} Comments</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="ml-auto">
              {sortOrder === "top" ? (
                <ArrowDown01 className="h-4 w-4 mr-2" />
              ) : (
                <ArrowUp01 className="h-4 w-4 mr-2" />
              )}
              Sort by: {sortOrder === "top" ? "Top comments" : "Newest first"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortOrder("top")}>
              <ArrowDown01 className="h-4 w-4 mr-2" />
              Top comments
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("newest")}>
              <ArrowUp01 className="h-4 w-4 mr-2" />
              Newest first
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>

      <CommentInput onSubmit={handleAddComment} />

      <div className="mt-6 space-y-1">
        {commentPages?.map((comment)=>(     <Comment
            key={comment.id}
            comment={comment}
            onAddReply={handleAddReply}
            onLike={handleLike}
            onDislike={handleDislike}
            onEdit={handleEditComment}
            onDelete={handleDeleteComment}
          />))
          }
         
         {hasNextPage && (
        <button
          onClick={() =>{ fetchNextPage();
            setCurrPage(currPage+1)
          }}
          disabled={isFetchingNextPage}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
      </div>

    
    </div>
  );
}