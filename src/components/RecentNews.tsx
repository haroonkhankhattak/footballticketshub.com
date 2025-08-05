import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "../api/queries/GetBlogs";
import { Blog } from "../types/blog";
import { formatDateTime } from "../lib/utils";
import { Clock } from "lucide-react";

interface NewsItemProps {
  title: string;
  summary: string;
  date: string;
  source: string;
  reference: string;
  imageUrl: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, summary, date, imageUrl, reference, source }) => {
  return (
<article className="flex flex-col gap-4 mt-2 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white group max-w-4xl">
  {/* Top row: image left and title right */}
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-1/4 h-15 overflow-hidden rounded-lg">
      <img
        src={imageUrl || "uploads/icons/placeholder.png"}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          e.currentTarget.src = "/images/placeholder.jpg";
        }}
      />
    </div>

    <div className="w-2/3 flex items-center">
      <Link href={reference} className="block hover:no-underline">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-ticket-red transition-colors">
          {title}
        </h3>
      </Link>
    </div>
  </div>

  {/* Summary below image and title */}
  <p
    className="text-sm text-gray-600 line-clamp-3"
    dangerouslySetInnerHTML={{ __html: summary }}
  />

  {/* Source and date below */}
  <div className="flex justify-between items-center text-xs text-gray-400">
    <span className="font-semibold">{source}</span>
    <span className="flex gap-2 items-center"> <Clock className="w-4 h-4"/> {formatDateTime(date)}</span>
  </div>
</article>


  );
};

const RecentNews = () => {
  const [page, setPage] = useState(2);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  const { data, loading, fetchMore } = useQuery(GET_BLOGS, {
    fetchPolicy: "network-only",
    variables: { slug: "premier-league", page: page, limit: limit },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data?.getBlog) {
      if (data.getBlog.length < limit) setHasMore(false);
      setBlogs(prev => [...prev, ...data.getBlog]);
    }
  }, [data]);


  const handlePrev = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (blogs.length === limit) setPage(prev => prev + 1);
  };

  return (
    <section className="py-0 bg-white">
      <div className="ticket-container">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
          <div>
            <h2 className="text-xl text-black border-b py-2 font-medium mb-6">
              Latest Football News
            </h2>

            {loading ? (
              <div className="w-full py-6 flex items-center justify-center bg-white/60">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-ticket-primarycolor border-gray-200"></div>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No blogs found.</div>
            ) : (
              <>


                <div className="h-[600px] overflow-y-auto pr-2 p-2 thin-scrollbar">
                  {blogs.map((item, index) => (
                    <NewsItem
                      key={index}
                      title={item.title}
                      summary={item.summary}
                      date={item.created_at}
                      source={item.source}
                      reference={item.reference}
                      imageUrl={item.image_url}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {hasMore && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={async () => {
                        const nextPage = page + 1;
                        const { data: moreData } = await fetchMore({
                          variables: { page: nextPage, limit },
                        });

                        if (moreData?.getBlogs?.length < limit) setHasMore(false);
                        setPage(nextPage);
                      }}
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
