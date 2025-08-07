import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "../api/queries/GetBlogs";
import { Blog } from "../types/blog";
import { formatDateTime } from "../lib/utils";
import { Clock } from "lucide-react";

const NewsItem: React.FC<{
  title: string;
  summary: string;
  date: string;
  source: string;
  reference: string;
  imageUrl: string;
}> = ({ title, summary, date, imageUrl, reference, source }) => {
  return (
    <article className="flex flex-col gap-4 mt-2 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white group max-w-4xl">
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-1/4 h-15 overflow-hidden rounded-lg">
          {/* <img
            src={imageUrl || "uploads/icons/placeholder.png"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              if (!e.currentTarget.src.includes("placeholder.png")) {
                e.currentTarget.src = "uploads/icons/placeholder.png";
              }
            }}
          /> */}
        </div>

        <div className="w-2/3 flex items-center">
          <Link href={reference} className="block hover:no-underline">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-ticket-red transition-colors">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      <p className="text-sm text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: summary }} />
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span className="font-semibold">{source}</span>
        <span className="flex gap-2 items-center">
          <Clock className="w-4 h-4" /> {formatDateTime(date)}
        </span>
      </div>
    </article>
  );
};

const RecentNews: React.FC<{ slug: string; height: number }> = ({ slug, height }) => {
  
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const { data, loading, fetchMore } = useQuery(GET_BLOGS, {
    variables: { slug, page: 1, limit },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data?.getBlog) {
        setBlogs(data.getBlog);
        if (data.getBlog.length < limit) setHasMore(false);
      }
    },
  });

  const loadMore = async () => {
    const nextPage = page + 1;
    const { data: moreData } = await fetchMore({
      variables: { page: nextPage, limit, slug },
    });

    if (moreData?.getBlog?.length) {
      setBlogs((prev) => [...prev, ...moreData.getBlog]);
      setPage(nextPage);
      if (moreData.getBlog.length < limit) setHasMore(false);
    } else {
      setHasMore(false);
    }
  };

  return (
    <section className="py-0 bg-white">
      <div className="ticket-container">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
          <div>
            <h2 className="text-xl text-black border-b py-2 font-medium mb-6">
              Latest Football News
            </h2>

            {loading && blogs.length === 0 ? (
              <div className="w-full py-6 flex items-center justify-center bg-white/60">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-ticket-primarycolor border-gray-200"></div>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No blogs found.</div>
            ) : (
              <>
                <div style={{ height: `${height}px` }} className="overflow-y-auto pr-2 p-2 thin-scrollbar">
                  {blogs.map((item, index) => (
                    <NewsItem
                      key={item.id || index}
                      title={item.title}
                      summary={item.summary}
                      date={item.created_at}
                      source={item.source}
                      reference={item.reference}
                      imageUrl={item.image_url}
                    />
                  ))}
                </div>

                {hasMore && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={loadMore}
                      className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentNews;
