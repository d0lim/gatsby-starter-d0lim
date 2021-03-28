import * as React from "react";
import { ReactElement } from "react";
import { Link } from "gatsby";
import { Normalize } from "styled-normalize";
import styled from "styled-components";
import GlobalStyle from "../style/globalStyle";

type LayoutProps = {
  location: Location;
  title: string;
  children: ReactElement | ReactElement[];
};

type GlobalWrapperProps = {
  dataIsRootPath: boolean;
};

const GlobalWrapper = styled.div<GlobalWrapperProps>`
  margin: var(--spacing-0) auto;
  max-width: var(--maxWidth-wrapper);
  padding: var(--spacing-10) var(--spacing-5);

  ${(props) => props.dataIsRootPath && `margin-bottom: var(--spacing-20);`}
`;

const GlobalHeader = styled.header`
  margin-bottom: var(--spacing-12);
`;

const MainHeading = styled.h1`
  font-size: var(--fontSize-7);
  margin: 0;
`;

const HeaderLinkHome = styled((props) => <Link {...props} />)`
  font-weight: var(--fontWeight-bold);
  font-family: var(--font-heading);
  text-decoration: none;
  font-size: var(--fontSize-2);
`;

const Layout = ({ location, title, children }: LayoutProps): ReactElement => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <MainHeading>
        <Link to="/">{title}</Link>
      </MainHeading>
    );
  } else {
    header = <HeaderLinkHome to="/">{title}</HeaderLinkHome>;
  }

  return (
    <>
      <Normalize />
      <GlobalStyle />
      <GlobalWrapper dataIsRootPath={isRootPath}>
        <GlobalHeader>{header}</GlobalHeader>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </GlobalWrapper>
    </>
  );
};

export default Layout;
