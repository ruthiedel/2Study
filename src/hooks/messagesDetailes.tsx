"use client";
import { addMessage, fetchMessages } from "@/services/messagesService";
import { LearningGroup, Message } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
        mutationFn: async ({ book_id, message, userName, userId }: { book_id: string; message: string; userName: string, userId:string }) => {
            const newMessage = await addMessage({
                book_id,
                userName,
                message,
                userId
            });
            return newMessage; 
        },
        onMutate: async ({ book_id, message, userName, userId }) => {
            await queryClient.cancelQueries({ queryKey: ["Messages", book_id] });

            const previousMessages = queryClient.getQueryData<LearningGroup>(["Messages", book_id]);

            if (previousMessages) {
                const tempMessage: Message = {
                    userName,
                    message,
                    timestamp: new Date(), 
                    userId: userId,
                };

                queryClient.setQueryData<LearningGroup>(["Messages", book_id], {
                    ...previousMessages,
                    messages: [...previousMessages.messages, tempMessage],
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
        onSuccess: (variables) => {
            queryClient.invalidateQueries({ queryKey: ["Messages", variables.book_id] });
        }
    });
};
