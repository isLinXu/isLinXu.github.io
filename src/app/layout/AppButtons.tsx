import { alpha, Box, Button, Container, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { VscChromeClose, VscMarkdown } from "react-icons/vsc";
import { useLocale } from "../i18n/LocaleContext";

interface Props {
  pages: {
    index: number;
    name: string;
    route: string;
  }[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: string;
  setCurrentComponent: React.Dispatch<React.SetStateAction<string>>;
  visiblePageIndexs: number[];
  setVisiblePageIndexs: React.Dispatch<React.SetStateAction<number[]>>;
}

function pageLabel(name: string, locale: "en" | "zh") {
  const labels: Record<string, { en: string; zh: string }> = {
    "overview.md": { en: "Overview", zh: "概览" },
    "resume.md": { en: "Resume", zh: "简历" },
    "skills.md": { en: "Skills", zh: "技能" },
    "experience.md": { en: "Experience", zh: "经历" },
    "education.md": { en: "Education", zh: "教育" },
    "projects.md": { en: "Projects", zh: "项目" },
    "certificates.md": { en: "Certificates", zh: "证书" },
    "accomplishments.md": { en: "Highlights", zh: "亮点" },
    "docs.md": { en: "Docs", zh: "文档" },
    "publication.md": { en: "Publication", zh: "论文" },
    "course.md": { en: "Course", zh: "课程" },
  };

  return labels[name]?.[locale] ?? name.replace(".md", "");
}

export default function AppButtons({
  pages,
  selectedIndex,
  setSelectedIndex,
  setCurrentComponent,
  visiblePageIndexs,
  setVisiblePageIndexs,
}: Props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { locale } = useLocale();

  function renderPageButton(index: number, name: string, route: string) {
    const active = selectedIndex === index;

    return (
      <Box
        key={index}
        sx={{
          display: "inline-flex",
          alignItems: "stretch",
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
        }}
      >
        <Button
          disableRipple
          disableElevation
          disableFocusRipple
          onClick={() => {
            setSelectedIndex(index);
            setCurrentComponent("button");
            navigate(route);
          }}
          sx={{
            minHeight: 42,
            borderRadius: 0,
            px: 1.6,
            gap: 0.9,
            textTransform: "none",
            justifyContent: "flex-start",
            backgroundColor: active
              ? alpha(theme.palette.background.paper, 0.96)
              : alpha(isDark ? "#d9e8ff" : "#0f315f", isDark ? 0.04 : 0.03),
            color: active ? "text.primary" : "text.secondary",
            borderTop: active
              ? `2px solid ${theme.palette.primary.main}`
              : "2px solid transparent",
            "&.MuiButtonBase-root:hover": {
              bgcolor: active
                ? alpha(theme.palette.background.paper, 0.98)
                : alpha(isDark ? "#d9e8ff" : "#0f315f", isDark ? 0.08 : 0.06),
            },
          }}
        >
          <Box
            sx={{
              color: active ? theme.palette.primary.main : "#6997d5",
              width: 18,
              height: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <VscMarkdown />
          </Box>

          <Box
            component="span"
            sx={{
              maxWidth: 180,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {pageLabel(name, locale)}
          </Box>

          <Box
            component={Paper}
            elevation={0}
            sx={{
              ml: 0.2,
              width: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1.2,
              backgroundColor: "transparent",
              color: active ? "text.primary" : "text.secondary",
              "&.MuiPaper-root:hover": {
                bgcolor: alpha(theme.palette.text.primary, 0.1),
              },
            }}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              setVisiblePageIndexs(
                visiblePageIndexs.filter((item) => item !== index)
              );
            }}
          >
            <VscChromeClose />
          </Box>
        </Button>
      </Box>
    );
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "inline-block",
        overflowX: "auto",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        backgroundColor: alpha(
          isDark ? "#09111d" : "#ffffff",
          isDark ? 0.96 : 0.72
        ),
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${theme.palette.divider}`,
        "&::-webkit-scrollbar": {
          height: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: alpha(theme.palette.text.secondary, 0.45),
          borderRadius: 999,
        },
      }}
    >
      {pages.map(({ index, name, route }) =>
        renderPageButton(index, name, route)
      )}
    </Container>
  );
}
