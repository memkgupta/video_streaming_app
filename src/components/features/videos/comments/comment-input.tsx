"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";


interface CommentInputProps {
  placeholder?: string;
  onSubmit: (content: string) => void;
  isReply?: boolean;
  onCancel?: () => void;
}

export function CommentInput({
  placeholder = "Add a comment...",
  onSubmit,
  isReply = false,
  onCancel,
}: CommentInputProps) {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
    const {user} = useAuth()
  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent("");
      setIsFocused(false);
    }
  };

  return (
    <div className="flex gap-3 w-full">
      <Avatar className="h-8 w-8 flex-shrink-0">
        <img
          src={user?.avatar}
          alt={user?.name}
          className="h-full w-full object-cover"
        />
      </Avatar>
      <div className="flex-1">
        <div
          className={`border-b ${
            isFocused ? "border-black dark:border-white" : "border-gray-300 dark:border-gray-700"
          } transition-colors duration-200`}
        >
          <textarea
            placeholder={placeholder}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsFocused(true)}
            rows={isFocused ? 3 : 1}
            className="w-full resize-none bg-transparent py-1 outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>
        
        {isFocused && (
          <div className="mt-2 flex justify-between items-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {content.length > 0 && `${content.length}/10000`}
            </div>
            <div className="flex gap-2">
              {isReply && onCancel && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setContent("");
                    setIsFocused(false);
                    onCancel();
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button
                size="sm"
                disabled={!content.trim()}
                onClick={handleSubmit}
                className="font-medium"
              >
                {isReply ? "Reply" : "Comment"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}