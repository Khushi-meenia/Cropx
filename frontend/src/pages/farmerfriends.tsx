import React, { useEffect, useState } from "react";

interface Post {
  id: number;
  user: string;
  text: string;
  created_at: string;
  comments: CommentType[];
}

interface CommentType {
  id: number;
  post_id: number;
  user: string;
  text: string;
  created_at: string;
  replies: ReplyType[];
}

interface ReplyType {
  id: number;
  comment_id: number;
  user: string;
  text: string;
  created_at: string;
}

const FarmerFriends: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const [commentText, setCommentText] = useState<{ [key: number]: string }>({});

  const userEmail = localStorage.getItem("email") ?? "Unknown User";

  // --------------------------- Fetch Posts ----------------------------
  const loadPosts = async () => {
    const res = await fetch("http://localhost:5000/farmer-posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // --------------------------- Create Post ----------------------------
  const createPost = async () => {
    if (!newPost.trim()) return alert("Write something first!");

    await fetch("http://localhost:5000/create-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userEmail, text: newPost }),
    });

    setNewPost("");
    loadPosts();
  };

  // --------------------------- Add Comment ----------------------------
  const addComment = async (postId: number) => {
    if (!commentText[postId]) return;

    await fetch("http://localhost:5000/add-comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post_id: postId,
        user: userEmail,
        text: commentText[postId],
      }),
    });

    setCommentText({ ...commentText, [postId]: "" });
    loadPosts();
  };

  // --------------------------- Add Reply ----------------------------
  const addReply = async (commentId: number) => {
    if (!replyText[commentId]) return;

    await fetch("http://localhost:5000/add-reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment_id: commentId,
        user: userEmail,
        text: replyText[commentId],
      }),
    });

    setReplyText({ ...replyText, [commentId]: "" });
    loadPosts();
  };

  return (
    <div style={{ padding: 30, background: "#e8f5e9", minHeight: "100vh" }}>
      <h1 style={{ color: "#1b5e20", marginBottom: 20 }}>👨‍🌾 Farmer Friends</h1>

      {/* New Post Box */}
      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 15,
          marginBottom: 30,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          width: "60%",
        }}
      >
        <textarea
          placeholder="Share your farming problem..."
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "1px solid #a5d6a7",
          }}
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />

        <button
          onClick={createPost}
          style={{
            marginTop: 10,
            padding: "10px 20px",
            borderRadius: 10,
            backgroundColor: "#388e3c",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Post
        </button>
      </div>

      {/* Posts List */}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            background: "white",
            padding: 20,
            borderRadius: 15,
            marginBottom: 20,
            width: "60%",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <p>
            <strong>{post.user}</strong> — {post.created_at}
          </p>
          <p style={{ fontSize: "18px", marginTop: 10 }}>{post.text}</p>

          {/* Comment Section */}
          <div style={{ marginTop: 20 }}>
            <textarea
              placeholder="Write a comment..."
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 10,
                border: "1px solid #a5d6a7",
              }}
              value={commentText[post.id] || ""}
              onChange={(e) =>
                setCommentText({ ...commentText, [post.id]: e.target.value })
              }
            />

            <button
              onClick={() => addComment(post.id)}
              style={{
                marginTop: 5,
                padding: "8px 15px",
                borderRadius: 8,
                background: "#2e7d32",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Comment
            </button>

            {/* List Comments */}
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  marginTop: 15,
                  paddingLeft: 20,
                  borderLeft: "3px solid #81c784",
                }}
              >
                <p>
                  <strong>{comment.user}</strong> — {comment.created_at}
                </p>
                <p>{comment.text}</p>

                {/* Reply Box */}
                <textarea
                  placeholder="Reply..."
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 10,
                    border: "1px solid #aed581",
                    marginTop: 8,
                  }}
                  value={replyText[comment.id] || ""}
                  onChange={(e) =>
                    setReplyText({
                      ...replyText,
                      [comment.id]: e.target.value,
                    })
                  }
                />

                <button
                  onClick={() => addReply(comment.id)}
                  style={{
                    marginTop: 5,
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: "#558b2f",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Reply
                </button>

                {/* Show Replies */}
                {comment.replies.map((r) => (
                  <div
                    key={r.id}
                    style={{
                      marginTop: 10,
                      marginLeft: 20,
                      background: "#f1f8e9",
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <p>
                      <strong>{r.user}</strong> — {r.created_at}
                    </p>
                    <p>{r.text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FarmerFriends;
