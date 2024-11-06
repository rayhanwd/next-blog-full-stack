'use client';
import { createPost } from "@/actions/action";
import { useActionState } from "react";

export default function CreatePostPage() {

    const form = {
        title: "",
        content: ""
    };

    const [state, formAction] = useActionState(createPost, form)


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8">Create a New Blog Post</h1>
            <form action={formAction} className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg">
                <div className="mb-6">
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
                        placeholder="Enter post title"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black h-40"
                        placeholder="Write your blog content here"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
                >
                    Publish Post
                </button>
            </form>
        </div>
    );
}
