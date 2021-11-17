import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';

import { getRecentPosts, getSimilarPosts } from '../services'

const PostWidget = ({ categories, link }) => {
    const [relatedPosts, setrelatedPosts] = useState([]);

    useEffect(() => {
        if(link){
            getSimilarPosts(categories, link)
                .then((result) => setrelatedPosts(result))
        } else {
            getRecentPosts()
                .then((result) => setrelatedPosts(result))
        }
    }, [link])

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-xl mb-8 font-semibold- border-b pb-4">
                {link ? 'Related Posts' : 'Recent Posts'}
            </h3>
            {relatedPosts.map((post) => (
                <div key={post.title} className="flex items-center w-full mb-4">
                    <div className="w-16 felx-none">
                        <img alt={post.title} height="60px" width="60px" className="align-middle rounded-full" src={post.featuredImage.url}/>
                    </div>
                    <div class="flex-grow ml-4">
                        <p className=" text-gray-500 font-xs">
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </p>
                        <Link href={`/post/${post.link}`} key={post.title} className="text-md">
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostWidget
