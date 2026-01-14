// import BlogContainer from "@components/common/blog_container";
// import Image from "next/image";
// import Link from "next/link";
// import { BiTime } from "react-icons/bi";
// import { CiFileOn } from "react-icons/ci";
// import { FaArrowRightLong } from "react-icons/fa6";

// const Blog = () => {
//   return (
//     <div className="bg-zinc-100 z-[60] relative">
//     <div className="relative flex flex-col md:flex-row w-full bg-zinc-100 gap-10 md:px-12 py-10  md:py-14 z-[60] ">
//       {/* list of blogs */}
//       <div className="flex flex-col w-full items-center gap-10 z-[60]">
//         {/* each blog */}
//         <BlogContainer />
//         <BlogContainer />
//         <BlogContainer />

//       </div>
//       {/* recent,  tags */}
//       <div className="">
//         <div className="flex sm:px-[100px] md:px-0  flex-col p-10  gap-16 ">
//           {/* recents */}
//           <div className="flex flex-col gap-7">
//             <h1 className="font-lora text-2xl font-medium">Recent Articles</h1>
//             <div className="flex gap-4 items-center md:items-start">
//               <Image
//                 // sm:w-[450px] sm:h-[500px] md:w-[260px]  md:h-[300px]  lg:w-[450px] lg:h-[500px]
//                 className=" z-30 w-[75px]  h-[80px] object-cover "
//                 src="/assets/images/muni.jpg"
//                 width={300}
//                 height={250}
//                 alt="law"
//               />
//               <div className="flex flex-col gap-2">
//                 <h3 className="font-semibold text-gray-700 text-pretty">
//                   Domestic Violence in California How a Lawyer Can Help
//                 </h3>
//                 <span className="flex items-center gap-2 tracking-wider">
//                   <BiTime className="text-gray-400 font-light" />
//                   <p className="text-gray-400 uppercase text-xs font-medium">
//                     january 16, 2025
//                   </p>
//                 </span>
//                 <span className="flex items-center gap-2 tracking-wider">
//                   <CiFileOn className="text-gray-400 font-light" />
//                   <p className="text-gray-400 uppercase text-xs font-medium">
//                     Onwuzuruoha Turuchi
//                   </p>
//                 </span>
//               </div>
//             </div>
//           </div>
//           {/* tags */}
//           <div className="flex flex-col gap-5">
//             <h1 className="font-lora text-2xl font-medium"> Tags</h1>
//             <div className="flex gap-4 items-center flex-wrap">
//               <Link
//                 href=""
//                 className="bg-amber-600 text-gray-200 px-4 py-2 uppercase font-jost tracking-widest text-xs  font-semibold opacity-85 cursor-pointer transition-all  hover:opacity-80"
//               >
//                 Law
//               </Link>
//               <Link
//                 href=""
//                 className="bg-amber-600 text-gray-200 px-4 py-2 uppercase font-jost tracking-widest text-xs  font-semibold opacity-85 cursor-pointer transition-all  hover:opacity-80"
//               >
//                 Business
//               </Link>
//               <Link
//                 href=""
//                 className="bg-amber-600 text-gray-200 px-4 py-2 uppercase font-jost tracking-widest text-xs  font-semibold opacity-85 cursor-pointer transition-all  hover:opacity-80"
//               >
//                 Finance
//               </Link>
//               <Link
//                 href=""
//                 className="bg-amber-600 text-gray-200 px-4 py-2 uppercase font-jost tracking-widest text-xs  font-semibold opacity-85 cursor-pointer transition-all  hover:opacity-80"
//               >
//                 Non-profit
//               </Link>
//             </div>
//           </div>
//           {/* Practice areas */}
//           <div className="flex flex-col gap-5">
//             <h1 className="font-lora text-2xl font-medium">Practice Areas</h1>
//             <div className="flex flex-col gap-4">
//               <hr className="w-full h-[1.5px] bg-amber-600 opacity-20" />
//               <Link href="" className={`hover:ml-4 hover:text-amber-600 hover:opacity-80 flex flex-row  transition-all duration-300 gap-3 font-josh items-center font-medium text-sm`}>
//                 <FaArrowRightLong
//                   className={` text-xs`}
//                 />
//                 <span>Business Law</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Blog;


import { client } from "@/lib/sanity.client";
import { blogsQuery, categoriesQuery, tagsQuery } from "@/lib/sanity.queries";
import BlogCard from "@/components/blog/BlogCard";
import Sidebar from "@/components/blog/Sidebar";
import PageHeader from "@/components/pages/header";

export const metadata = {
  title: "Legal Blog | Turuchi Law Firm",
  description:
    "Expert legal insights, news, and advice from experienced attorneys.",
};

export const revalidate = 60; // Revalidate every 60 seconds

async function getData() {
  const [blogs, categories, tags] = await Promise.all([
    client.fetch(blogsQuery),
    client.fetch(categoriesQuery),
    client.fetch(tagsQuery),
  ]);

  return { blogs, categories, tags };
}

export default async function BlogPage() {
  const { blogs, categories, tags } = await getData();

  return (
    <div className="bg-zinc-100 z-[60] relative">
      <PageHeader text="Legal" text2="Blog" />

      <div className="relative flex flex-col md:flex-row w-full bg-zinc-100 gap-10 md:px-12 py-10 md:py-14 z-[60]">
        {/* Blog List */}
        <div className="flex flex-col w-full items-center gap-10 z-[60]">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-lora text-gray-600">
                No blog posts yet. Check back soon!
              </h2>
            </div>
          ) : (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          )}
        </div>

        {/* Sidebar */}
        <Sidebar
          recentPosts={blogs.slice(0, 5)}
          categories={categories}
          tags={tags}
        />
      </div>
    </div>
  );
}
