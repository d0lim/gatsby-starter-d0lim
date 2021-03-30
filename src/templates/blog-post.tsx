import * as React from "react";
import { ReactElement } from "react";
import { Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from "styled-components";

type BlogPostData = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  mdx: {
    id: string;
    excerpt: string;
    body: string;
    frontmatter: {
      title: string;
      date: string;
      description: string;
    };
  };
  previous: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };
  next: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };
};
type BlogPostTemplateProps = {
  data: BlogPostData;
  location: Location;
};

const BlogPost = styled.article`
  & header h1 {
    margin: var(--spacing-0) var(--spacing-0) var(--spacing-4) var(--spacing-0);
  }
  & header p {
    font-size: var(--fontSize-2);
    font-family: var(--font-heading);
  }
`;

const BlogPostNav = styled.nav`
  & ul {
    margin: var(--spacing-0);
  }
`;

const BlogPostTemplate = ({
  data,
  location,
}: BlogPostTemplateProps): ReactElement => {
  const post = data.mdx;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <BlogPost itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <MDXRenderer>{post.body}</MDXRenderer>
        <hr />
        <footer>
          <Bio />
        </footer>
      </BlogPost>
      <BlogPostNav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </BlogPostNav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
