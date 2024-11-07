'use client';
import { createPost } from "@/actions/action";
import Link from "next/link";
import { useActionState } from "react";

export default function CreatePostPage() {

    const form = {
        title: "",
        content: ""
    };

    const [state, formAction] = useActionState(createPost, {
        success: false,
        error: false,
    });

    return (
        <div className="container mx-auto p-6">
            {state.success ? <div>
                <h4>Sucess!</h4>
                <p>Blog post create successfully!</p>
                <Link href={"/"}>Back to home</Link>
            </div> :
                <>
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
                            />
                            {state.errors?.title && <p className="text-black">{`${state.errors.title}`}</p>}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Content</label>
                            <textarea
                                id="content"
                                name="content"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black h-40"
                                placeholder="Write your blog content here"
                            ></textarea>
                            {state.errors?.content && <p className="text-black">{`${state.errors.content}`}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
                        >
                            Publish Post
                        </button>
                    </form>
                </>
            }
        </div>
    );
}
