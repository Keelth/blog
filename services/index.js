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

}