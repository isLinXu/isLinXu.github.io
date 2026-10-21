import { alpha, Box, Button, Container, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { VscChromeClose, VscMarkdown } from "react-icons/vsc";
import { useLocale } from "../i18n/LocaleContext";
import { pageLabel } from "../i18n/pageLabels";

const TAB_HEIGHT = 42;

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
    const label = pageLabel(name, locale);
    const inactiveBackground = alpha(
      isDark ? "#d9e8ff" : "#0f315f",
      isDark ? 0.04 : 0.03
    );

    return (
      <Box
        key={index}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          height: TAB_HEIGHT,
          boxSizing: "border-box",
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
          backgroundColor: active
            ? alpha(theme.palette.background.paper, 0.96)
            : inactiveBackground,
          boxShadow: active
            ? `inset 0 2px 0 ${theme.palette.primary.main}`
            : "none",
          transition: "background-color 120ms ease",
          "&:hover": {
            backgroundColor: active
              ? alpha(theme.palette.background.paper, 0.98)
              : alpha(
                  isDark ? "#d9e8ff" : "#0f315f",
                  isDark ? 0.08 : 0.06
                ),
          },
        }}
      >
        <Button
          disableRipple
          disableElevation
          disableFocusRipple
          aria-current={active ? "page" : undefined}
          onClick={() => {
            setSelectedIndex(index);
            setCurrentComponent("button");
            navigate(route);
          }}
          sx={{
            minHeight: TAB_HEIGHT,
            height: TAB_HEIGHT,
            borderRadius: 0,
            pl: 1.6,
            pr: 0.7,
            gap: 0.9,
            textTransform: "none",
            justifyContent: "flex-start",
            backgroundColor: "transparent",
            color: active ? "text.primary" : "text.secondary",
            "&.MuiButtonBase-root:hover": {
              backgroundColor: "transparent",
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
            {label}
          </Box>
        </Button>

        <IconButton
          size="small"
          aria-label={
            locale === "en" ? `Close ${label} tab` : `关闭“${label}”标签页`
          }
          onClick={() =>
            setVisiblePageIndexs(
              visiblePageIndexs.filter((item) => item !== index)
            )
          }
          sx={{
            mr: 0.5,
            width: 22,
            height: 22,
            borderRadius: 1.2,
            color: active ? "text.primary" : "text.secondary",
            "&:hover": {
              backgroundColor: alpha(theme.palette.text.primary, 0.1),
            },
          }}
        >
          <VscChromeClose size={14} />
        </IconButton>
      </Box>
    );
  }

  return (
    <Container
      component="nav"
      aria-label="Open pages"
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
