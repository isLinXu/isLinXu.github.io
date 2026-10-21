import {
  Chip,
  Container,
  Divider,
  LinearProgress,
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
import { ReactNode, useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { useLocale } from "../i18n/LocaleContext";
import { pageLabel } from "../i18n/pageLabels";
import useDocumentMeta from "../hooks/useDocumentMeta";

interface Props {
  name: string;
}

type LoadStatus = "loading" | "ready" | "error";

function MarkdownLink({ href, children }: { href?: string; children?: ReactNode }) {
  return (
    <Link href={href} target="_blank" rel="noreferrer" underline="hover">
      {children}
    </Link>
  );
}

function MarkdownImage({ node, ...props }: any) {
  // react-markdown passes its AST node down; it must not reach the DOM.
  void node;

  return <img {...props} alt={props.alt ?? ""} loading="lazy" decoding="async" />;
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

function MarkdownTableCell(props: { children?: ReactNode; align?: string }) {
  const align =
    props.align === "left" ||
    props.align === "center" ||
    props.align === "right"
      ? props.align
      : undefined;

  return <TableCell align={align}>{props.children}</TableCell>;
}

function MarkdownCode(props: { inline?: boolean; children?: ReactNode }) {
  if (props.inline) {
    return (
      <Chip
        size="small"
        label={props.children?.toString()}
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          height: 22,
          "& .MuiChip-label": {
            px: 0.8,
            fontSize: "0.78rem",
          },
        }}
      />
    );
  }

  return <code>{props.children}</code>;
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

function buildDescription(markdown: string) {
  const text = markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > 20 ? text.slice(0, 160) : undefined;
}

export default function MDContainer({ name }: Props) {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<LoadStatus>("loading");
  const theme = useTheme();
  const { locale } = useLocale();

  useEffect(() => {
    const controller = new AbortController();

    setStatus("loading");
    setContent("");

    fetch(`${import.meta.env.BASE_URL}pages/${locale}/${name}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${name}: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        setContent(text);
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        setStatus("error");
      });

    return () => controller.abort();
  }, [locale, name]);

  const label = pageLabel(name, locale);
  const description = useMemo(() => buildDescription(content), [content]);

  useDocumentMeta(
    `${label} | ${import.meta.env.VITE_APP_NAME ?? "Xu Lin"}`,
    description
  );

  if (status === "loading") {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        <LinearProgress
          aria-label={locale === "en" ? "Loading page" : "页面加载中"}
        />
      </Container>
    );
  }

  if (status === "error") {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        <Typography variant="h5" gutterBottom>
          {locale === "en" ? "Page unavailable" : "页面加载失败"}
        </Typography>
        <Typography color="text.secondary">
          {locale === "en"
            ? "The content could not be loaded. Please refresh and try again."
            : "内容加载失败，请刷新后重试。"}
        </Typography>
      </Container>
    );
  }

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
        "& pre": {
          margin: "1rem 0",
          padding: "1rem 1.1rem",
          borderRadius: 2,
          overflowX: "auto",
          backgroundColor: alpha(
            theme.palette.text.primary,
            theme.palette.mode === "dark" ? 0.06 : 0.04
          ),
          border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
          "& code": {
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: "0.82rem",
            lineHeight: 1.6,
            color: "text.primary",
          },
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
          "& pre": {
            backgroundColor: "#f7f7f7",
            borderColor: "#d9d9d9",
          },
        },
      }}
    >
      <ReactMarkdown
        components={{
          code: MarkdownCode,
          img: MarkdownImage,
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
      >
        {content}
      </ReactMarkdown>
    </Container>
  );
}
