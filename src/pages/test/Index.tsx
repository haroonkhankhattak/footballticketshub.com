"use client"; // <-- if you are using Next.js 13+ App Router

import { useState } from "react";
import { HomeService } from "../../lib/apiClient/services/HomeService";
import { fetchSectionFromHtml } from "@/lib/apiClient/HtmlExtractor";
import { extractUpcomingMatches } from "@/lib/apiClient/services/fetchUpcomingMatches";

export default function FetchButton() {
    const [data, setData] = useState(null);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [html, setHtml] = useState("");

    const fetchFootballTicketsData = async () => {
        try {
            // const res = await fetch("/lib/apiClient/services/matches");
            // const html = await res.text();

            const res = await fetch("/api/matches");
            const text = await res.text();
            setHtml(text);
            console.log("Fetched HTML:", text);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
        }
    };

    async function handleClick() {
        setLoading(true);

        try {
            fetchFootballTicketsData();
            // const result = await HomeService.getPost(1);
            // setPost(result);
            // setData(result);
        } catch (error) {
            console.error("Error fetching post:", error);
        }

        // try {
        //     const res = await fetch('https://www.livefootballtickets.com/api/fixtures/41403?eventCode=tottenham-hotspur-vs-bodoglimt&eventTypeCode=europa-league&locale=en-GB&pageNumber=2&currency=gbp');
        //     const json = await res.json();
        //     setData(json);
        // } catch (error) {
        //     console.error('Failed to fetch:', error);
        // } finally {
        //     setLoading(false);
        // }
    }

    return (
        <div className="p-4">
            <button
                onClick={handleClick}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {loading ? "Loading..." : "Fetch Data"}
            </button>

            {data && (
                <div className="mt-4 p-2 border rounded bg-gray-100">
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

// 'use client';

// import { useState } from 'react';
// import { PostService } from '../../lib/apiClient/services/PostService';

// export default function PostsPage() {
//     const [post, setPost] = useState(null);

//     async function fetchPost() {
//         try {
//             const result = await PostService.getPost(1);
//             setPost(result);
//         } catch (error) {
//             console.error('Error fetching post:', error);
//         }
//     }

//     return (
//         <div className="p-4">
//             <button onClick={fetchPost} className="bg-blue-600 text-white p-2 rounded">
//                 Fetch Post
//             </button>

//             {post && (
//                 <div className="mt-4">
//                     <h2 className="text-xl font-bold">{post.title}</h2>
//                     <p>{post.body}</p>
//                 </div>
//             )}
//         </div>
//     );
// }
