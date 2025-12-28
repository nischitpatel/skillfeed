'use client';

import { useEffect, useRef, useState } from "react";
import FeedPost from "../components/FeedPost";

export default function FeedClient({
    initialPosts,
    initialCursor,
    skill,
}) {
    const [posts, setPosts] = useState(initialPosts);
    const [cursor, setCursor] = useState(initialCursor);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    async function loadMore() {
        if (!cursor || loading) return;

        setLoading(true);

        const res = await fetch(
            `/api/posts?limit=5&cursor=${cursor}${skill ? `&skill=${skill}` : ""}`
        );

        const data = await res.json();

        setPosts(prev => [...prev, ...data.posts]);
        setCursor(data.nextCursor);
        setLoading(false);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [cursor, skill]);

    useEffect(() => {
        setPosts(initialPosts);
        setCursor(initialCursor);
    }, [skill]);


    return (
        <div className="space-y-4">
            {posts.map(post => (
                <FeedPost key={post.id} post={post} />
            ))}

            {cursor && (
                <div ref={loaderRef} className="h-10">
                    {loading && <p>Loading more…</p>}
                </div>
            )}
        </div>
    );
}
