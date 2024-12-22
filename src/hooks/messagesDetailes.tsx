"use client";
import { addMessage, fetchMessages } from '@/services/messagesService';
import { LearningGroup, Message } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useMessages = (book_id: string) => {
  return useQuery<LearningGroup>({
    queryKey: ["Messages", book_id], 
    queryFn: async () => fetchMessages(book_id), 
    staleTime: 1000000,
    enabled: !!book_id, 
  });
};

export const useUpdateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ book_id, message }: { book_id: string; message: Message }) =>
      addMessage({
          book_id: book_id,
          userName: message.userName,
          message: message.message
      }),
    onMutate: async ({ book_id, message }) => {
      await queryClient.cancelQueries({ queryKey: ["Messages", book_id] });

      const previousMessages = queryClient.getQueryData<LearningGroup>(["Messages", book_id]);

      if (previousMessages) {
        queryClient.setQueryData<LearningGroup>(["Messages", book_id], {
          ...previousMessages,
          messages: [...previousMessages.messages, message],
        });
      }

      return { previousMessages };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData<LearningGroup>(
          ["Messages", context.previousMessages.book_id],
          context.previousMessages
        );
      }
    },
    onSettled: (data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Messages", variables.book_id] });
    },
  });
};
