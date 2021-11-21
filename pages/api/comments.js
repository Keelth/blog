/**
 * Any file inside the folder pages/api is mapped to /api/* and
 * will be treated as an API endpoint instead of a page.
 */

import { GraphQLClient, gql } from 'graphql-request'

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;


export default async function comments(req, res) {

  console.log('req.body.name:' + JSON.parse(req.body));
  const graphQLClient = new GraphQLClient(graphqlApi, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $link: String!) {
      createComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { link: $link }}}) { id }}
      `;

  const result = await graphQLClient.request(query, JSON.parse(req.body));

  return res.status(200).send(result);
}
