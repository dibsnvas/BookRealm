import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { MongoClient } from 'mongodb';

const CommentSection = ({ bookId }) => {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    const client = new MongoClient(process.env.MONGODB_URI);
    client.connect().then(() => {
      const collection = client.db("test").collection("comments");
      collection.find({ bookId }).toArray().then((comments) => {
        setComments(comments);
        client.close();
      });
    });
  }, [bookId]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const client = new MongoClient(process.env.MONGODB_URI);
    client.connect().then(() => {
      const collection = client.db("test").collection("comments");
      collection.insertOne({ bookId, comment: newComment, userId: user.uid }).then(() => {
        setComments([...comments, { bookId, comment: newComment, userId: user.uid }]);
        setNewComment('');
        client.close();
      });
    });
  };

  if (!user) {
    return <p>Please sign in to see and leave comments.</p>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <p key={comment._id}>{comment.comment}</p>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CommentSection;