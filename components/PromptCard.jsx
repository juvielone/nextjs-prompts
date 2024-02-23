"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ posts, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(posts.prompt);
    navigator.clipboard.writeText(posts.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleProfileClick = () => {
    console.log(posts);

    if (posts.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${posts.creator._id}?name=${posts.creator.username}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          onClick={handleProfileClick}
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
        >
          <Image
            className="rounded-full object-contain"
            src={posts.creator.image}
            alt="user_image"
            width={40}
            height={40}
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {posts.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-900">
              {posts.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === posts.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-900">{posts.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(posts.tag)}
      >
        #{posts.tag}
      </p>

      {session?.user.id === posts.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
