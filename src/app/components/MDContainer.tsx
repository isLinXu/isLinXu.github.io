import {
  Chip,
  Container,
  Divider,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { ReactNode, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { useLocale } from "../i18n/LocaleContext";

interface Props {
  name: string;
}

function MarkdownLink(props: any) {
  return (
    <Link href={props.href} target="_blank" underline="hover">
      {props.children}
    </Link>
  );
}

function MarkdownTable(props: { children: ReactNode }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        {props.children}
      </Table>
    </TableContainer>
  );
}

function MarkdownTableCell(props: { children: ReactNode }) {
  return (
    <TableCell>
      {props.children}
      {/* <Typography>{props.children}</Typography> */}
    </TableCell>
  );
}

function MarkdownCode(props: { children: ReactNode }) {
  return <Chip size="small" label={props.children?.toString()} />;
}

function MarkdownH1(props: { children: ReactNode }) {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2rem", md: "2.35rem" },
          display: "block",
          marginBlockStart: "0.4em",
          marginBlockEnd: "0.22em",
          fontWeight: "bold",
          lineHeight: 1.12,
        }}
      >
        {props.children}
      </Typography>
      <Divider />
    </>
  );
}

function MarkdownH2(props: { children: ReactNode }) {
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "1.45rem", md: "1.72rem" },
          display: "block",
          marginBlockStart: "0.75em",
          marginBlockEnd: "0.24em",
          fontWeight: "bold",
          lineHeight: 1.16,
        }}
      >
        {props.children}
      </Typography>
      <Divider />
    </>
  );
}

// function MarkdownParagraph(props: { children: ReactNode }) {
//   if (!props.children) return <Typography>{props.children}</Typography>;

//   const element: any = props.children;
//   let result = [];

//   let anyInlineElement = false;
//   for (let e of element) {
//     if (e.type) {
//       anyInlineElement = true;
//     }
//   }

//   if (anyInlineElement) {
//     for (let e of element) {
//       if (e.type) {
//         result.push({ ...e });
//       } else {
//         result.push(
//           <Typography key={e} display="inline">
//             {e}
//           </Typography>
//         );
//       }
//     }
//   } else {
//     for (let e of element) {
//       if (e.type) {
//         result.push({ ...e });
//       } else {
//         result.push(<Typography key={e}>{e}</Typography>);
//       }
//     }
//   }

//   return <>{result}</>;
// }

export default function MDContainer({ name }: Props) {
  const [content, setContent] = useState("");
  const { pathname } = useLocation();
  const theme = useTheme();
  const { locale } = useLocale();

  useEffect(() => {
    fetch(`./pages/${locale}/${name}`)
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, [locale, name]);

  useEffect(() => {
    let title = pathname.substring(1, pathname.length);
    title = title[0].toUpperCase() + title.substring(1);
    document.title = `${process.env.REACT_APP_NAME!} | ${title}`;
  }, [pathname]);

  return (
    <Container
        maxWidth="lg"
        sx={{
          py: { xs: 2.5, md: 3.25 },
          px: { xs: 1.5, md: 2.5 },
        "& p": {
          color: "text.secondary",
          lineHeight: 1.78,
          fontSize: { xs: "0.96rem", md: "1rem" },
          },
          "& ul, & ol": {
            color: "text.secondary",
            lineHeight: 1.76,
            fontSize: { xs: "0.95rem", md: "0.99rem" },
            paddingLeft: "1.35rem",
          },
          "& li": {
            mb: 0.5,
          },
          "& h3": {
            fontSize: { xs: "1.16rem", md: "1.28rem" },
            lineHeight: 1.22,
            marginTop: "1.05rem",
            marginBottom: "0.4rem",
          },
          "& img": {
            display: "block",
            maxWidth: "100%",
            width: "auto",
            height: "auto",
            margin: "1rem auto",
            maxHeight: "460px",
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 18px 48px rgba(0, 0, 0, 0.28)"
                : "0 18px 48px rgba(40, 66, 110, 0.12)",
          },
          "& blockquote": {
            margin: 0,
            padding: "0.8rem 0.95rem",
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            backgroundColor: alpha(theme.palette.primary.main, 0.06),
            borderRadius: 2,
            color: "text.secondary",
          },
        "& hr": {
          border: 0,
          borderTop: `1px solid ${theme.palette.divider}`,
          margin: "1.5rem 0",
        },
        "@media print": {
          maxWidth: "none",
          py: 0,
          px: 0,
          fontSize: "11pt",
          "& h1": {
            fontSize: "24pt",
            marginTop: 0,
            color: "#000000",
          },
          "& h2": {
            fontSize: "15pt",
            color: "#000000",
            breakAfter: "avoid",
          },
          "& h3": {
            fontSize: "12pt",
            color: "#000000",
            breakAfter: "avoid",
          },
          "& p, & li": {
            color: "#000000",
            fontSize: "10.5pt",
            lineHeight: 1.6,
          },
          "& ul, & ol": {
            marginTop: "0.4rem",
            marginBottom: "0.6rem",
          },
          "& table": {
            breakInside: "avoid",
          },
          "& a": {
            color: "#000000",
            textDecoration: "none",
          },
          "& hr, & .MuiDivider-root": {
            borderColor: "#cfcfcf",
          },
          "& img": {
            boxShadow: "none",
            borderColor: "#d9d9d9",
            maxHeight: "220px",
          },
        },
      }}
      >
      <ReactMarkdown
        children={content}
        components={{
          code: MarkdownCode,
          a: MarkdownLink,
          table: MarkdownTable,
          thead: TableHead,
          tbody: TableBody,
          th: MarkdownTableCell,
          tr: TableRow,
          td: MarkdownTableCell,
          tfoot: TableFooter,
          h1: MarkdownH1,
          h2: MarkdownH2,
        }}
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
      />
    </Container>
  );
}
