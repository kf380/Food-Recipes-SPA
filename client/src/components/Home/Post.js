import React from "react";
import Cards from "../Cards/Cards";
import style from "./Post.module.css";

const Post = ({ post, loading }) => {
  if (loading) {
    return (
      <div className={style.loading}>
      </div>
    );
  }

  return (
    <ul>
      {post.map((post) => (
        <Cards
          title={post.title}
          diets={post.diets}
          image={post.image}
          id={post.id}
        />
      ))}
    </ul>
  );
};
export default Post;