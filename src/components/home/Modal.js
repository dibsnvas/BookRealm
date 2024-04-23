import React, { useState, useEffect } from 'react';
// import { auth } from '../../firebase/firebase'; // Import your Firebase auth
import axios from 'axios';
import './modal.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

const Modal=({show,item,onClose})=>{

    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    if (typeof item != 'object') {
        item = {'id': "no-id"};
    }   


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
          });
      


        axios.get(`http://localhost:3001/comments/${item.id}`)
            .then(res => setComments(res.data));

        return () => {
            unsubscribe();
        }
    }, [item.id]);

    const postComment = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3001/comments/${item.id}`, {
            text: newComment,
            username: user.email,
            timestamp: Date.now()
        }).then(() => {
            setNewComment('');
            axios.get(`http://localhost:3001/comments/${item.id}`)
                .then(res => setComments(res.data));
        });
    }
    if(!show)
    {
       return null;
    }


    let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
    return(
        <>
            <div className="overlay">
                <div className="overlay-inner">
                    <button className="close" onClick={onClose}><i className="fas fa-times"></i></button>
                    <div className="inner-box">
                        
                        <img src={thumbnail} alt="" />
                        <div className="info">
                            <h1>{item.volumeInfo.title}</h1>
                            <h3>{item.volumeInfo.authors}</h3>
                            <h4>{item.volumeInfo.publisher}<span>{item.volumeInfo.publishedDate}</span></h4><br/>
                            <a href={item.volumeInfo.previewLink}><button>Read More</button></a>
                        </div>
                    </div>
                    <h4 className="description">{item.volumeInfo.description}</h4>
                    <h2 className="text-black font-bold pt-5">Comment section</h2>
                    {user ? (
                <div>
                    <form onSubmit={postComment}>
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-3/4 mt-2 px-3 py-2 border-red-200 text-black bg-transparent outline-none border focus:border-red-400 shadow-sm rounded-lg transition duration-300"

                        />
                        <div className='mt-5'>
                        <button type="submit"
                        className={`w-1/3 px-4 py-2 text-white font-medium rounded-lg bg-red-200 border-red-400 hover:bg-red-500 hover:shadow-xl transition duration-300`}

                        >Post</button>
                        </div>
                    </form>

                    {comments[0]?.comments.map((comment) => (
            <div className="w-3/4 mt-2 px-3 py-2 border-red-200 text-black bg-transparent outline-none border focus:border-red-400 shadow-sm rounded-lg transition duration-300">
            
                <strong>{comment.username}</strong> <br></br> {comment.text}
            </div>
        ))}
                </div>
            ) : (
                <p>Please sign in to see and post comments.</p>
            )}
                </div>
            </div>
        </>
    )
}
export default Modal;
