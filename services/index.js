import { request, gql } from 'graphql-request';

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        link
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            link
                        }
                    }
                }
            }
        }
    `

    const result = await request(graphqlApi, query);

    return result.postsConnection.edges;

};

export const getPostDetails = async (link) => {
    const query = gql`
        query GetPostDetails($link: String!) {
            post(where: { link: $link }) {
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                createdAt
                link
                title
                excerpt
                featuredImage {
                    url
                }
                categories {
                    name
                    link
                }
                content {
                    raw
                }
            }
        }
    `

    const result = await request(graphqlApi, query, { link });

    return result.post;

};

export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last:3 
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                link
            }
        }
    `

    const result = await request(graphqlApi, query);

    return result.posts;

};

export const getSimilarPosts = async (categories, link) => {
    const query = gql`
        query GetPostDetails($link: String!, $categories: [String!]) {
            posts(
                where: {link_not: $link, AND: {categories_some: {link_in: $categories}}}
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                link
            }
        }
    `

    const result = await request(graphqlApi, query, { categories, link });

    return result.posts;
};

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                link
            }
        }
    `
    const result = await request(graphqlApi, query);

    return result.categories;
};

export const submitComment = async (obj) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json'
        },
        body: JSON.stringify(obj),
    });

    return result.json();
}