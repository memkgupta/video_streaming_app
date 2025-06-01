"use client";

import { useState } from "react";
import { Comment as CommentType } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { CommentInput } from "./comment-input";
import { ThumbsUp, ThumbsDown, MoreVertical } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { formatRelativeTime } from "@/utils/comments";

interface CommentProps {
  comment: CommentType;
  isReply?: boolean;
  onAddReply: ( commentId:string,content: string,replyTo?:string) => void;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
}

export function Comment({
  comment,
  isReply = false,
  onAddReply,
  onLike,
  onDislike,
  onEdit,
  onDelete,
}: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const hasReplies = comment.replies && comment.replies.length > 0;
  const visibleReplies = showAllReplies 
    ? comment.replies 
    : comment.replies?.slice(0, 1);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      setDisliked(false);
    }
    onLike(comment.id);
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      setLiked(false);
    }
    onDislike(comment.id);
  };

  const handleReplySubmit = (content: string) => {
    onAddReply(comment.id,content);
    setIsReplying(false);
  };
  const handleNestedReply = (content:string)=>{
    console.log(comment)
        onAddReply(comment.id,content,comment.user.username)
  }
  const handleEditSubmit = () => {
    if (editContent.trim()) {
      onEdit(comment.id, editContent);
      setIsEditing(false);
    }
  };

  return (
    <div className={`group flex gap-3 ${isReply ? "ml-12 mt-3" : "mt-6"}`}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <img
          src={comment.user?.avatar}
          alt={comment.user?.username}
          className="h-full w-full object-cover"
        />
      </Avatar>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{comment.user?.username}</span>
              <span className="text-xs text-muted-foreground">
                {formatRelativeTime(comment.createdAt)}
              </span>
              {comment.updatedAt && (
                <span className="text-xs text-muted-foreground">(edited)</span>
              )}
            </div>
            
            {isEditing ? (
              <div className="mt-2 space-y-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full rounded-md border border-input bg-transparent p-2 text-sm outline-none"
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false);
                      setEditContent(comment.content);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleEditSubmit}>
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm mt-1 whitespace-pre-wrap">{comment.content}</p>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(comment.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-4 mt-1">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={`h-7 w-7 rounded-full ${
                liked ? "text-blue-600 dark:text-blue-500" : ""
              }`}
              onClick={handleLike}
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            {comment.likes > 0 && (
              <span className="text-xs">{comment.likes}</span>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className={`h-7 w-7 rounded-full ${
              disliked ? "text-blue-600 dark:text-blue-500" : ""
            }`}
            onClick={handleDislike}
          >
            <ThumbsDown className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-7 rounded-full text-xs font-medium"
            onClick={() => setIsReplying(!isReplying)}
          >
            Reply
          </Button>
        </div>
        
        {isReplying && (
          <div className="mt-3">
            <CommentInput
              placeholder="Add a reply..."
              onSubmit={handleReplySubmit}
              isReply={true}
              onCancel={() => setIsReplying(false)}
            />
          </div>
        )}
        
        {hasReplies && (
          <>
            {comment.replies && comment.replies.length > 1 && !showAllReplies && (
              <Button
                variant="link"
                size="sm"
                className="h-7 px-0 text-blue-600 dark:text-blue-400 font-medium"
                onClick={() => setShowAllReplies(true)}
              >
                View {comment.replies.length - 1} more {comment.replies.length - 1 === 1 ? "reply" : "replies"}
              </Button>
            )}
            
            {visibleReplies?.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                isReply={true}
                onAddReply={handleNestedReply}
                onLike={onLike}
                onDislike={onDislike}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            
            {showAllReplies && comment.replies && comment.replies.length > 3 && (
              <Button
                variant="link"
                size="sm"
                className="h-7 px-0 text-sm text-blue-600 dark:text-blue-400"
                onClick={() => setShowAllReplies(false)}
              >
                Hide replies
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}