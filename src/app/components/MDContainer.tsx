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
          fontSize: "2em",
          display: "block",
          marginBlockStart: "0.67em",
          marginBlockEnd: "0.3em",
          fontWeight: "bold",
          lineHeight: 1.25,
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
          fontSize: "1.5em",
          display: "block",
          marginBlockStart: "0.83em",
          marginBlockEnd: "0.3em",
          fontWeight: "bold",
          lineHeight: 1.25,
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
          py: { xs: 3, md: 4 },
          px: { xs: 2, md: 3 },
        "& p": {
          color: "text.secondary",
          lineHeight: 1.9,
          fontSize: "1rem",
          },
          "& ul, & ol": {
            color: "text.secondary",
            lineHeight: 1.9,
          },
          "& li": {
            mb: 0.7,
          },
          "& img": {
            display: "block",
            maxWidth: "100%",
            width: "auto",
            height: "auto",
            margin: "1.2rem auto",
            maxHeight: "520px",
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 18px 48px rgba(0, 0, 0, 0.28)"
                : "0 18px 48px rgba(40, 66, 110, 0.12)",
          },
          "& blockquote": {
            margin: 0,
            padding: "0.9rem 1rem",
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            backgroundColor: alpha(theme.palette.primary.main, 0.06),
            borderRadius: 2,
            color: "text.secondary",
          },
        "& hr": {
          border: 0,
          borderTop: `1px solid ${theme.palette.divider}`,
          margin: "2rem 0",
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
