"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((posts) => (
        <PromptCard
          key={posts._id}
          posts={posts}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);

  // const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleSortChange = (e) => {
    const searchTextValue = e.target.value.toLowerCase();
    setSearchText(searchTextValue);

    if (searchTextValue === "") return setPosts(posts);

    const filteredPosts = posts.filter(
      (p) =>
        p.prompt.toLowerCase().includes(searchText) ||
        p.tag.toLowerCase().includes(searchText) ||
        p.creator.username.toLowerCase().includes(searchText)
    );
    setSearchPosts(filteredPosts);
    console.log(searchText);
    console.log(filteredPosts);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const filteredPosts = posts.filter(
      (p) =>
        p.prompt.toLowerCase().includes(searchText) ||
        p.tag.toLowerCase().includes(searchText) ||
        p.creator.username.toLowerCase().includes(searchText)
    );
    setSearchPosts(filteredPosts);
    console.log(searchText);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          className="search_input peer"
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSortChange}
          required
        />
      </form>

      <PromptCardList
        data={searchText == "" ? posts : searchPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
