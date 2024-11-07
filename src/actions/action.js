'use server'
import { z } from "zod";
import prisma from "@/lib/prisma";


const schema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }).min(1, { message: "Title cannot be empty" }),
  content: z.string({
    required_error: "Content is required",
    invalid_type_error: "Content must be a string",
  })
});


// Create post function
export const createPost = async (prev, formData) => {

  const validatedFields = schema.safeParse({
    title: formData.get('title'),
    content: formData.get('content')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false
    };
  }

  const { title, content } = validatedFields.data;

  try {

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published: true,
        authorId: 1,
      },
    });

    return { post: newPost, success: true, errors: false };

  } catch (error) {
    return { errors: { message: "Failed to create post" }, success: false };
  }
}

