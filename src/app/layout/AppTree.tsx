import * as React from "react";
import { alpha, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VscMarkdown } from "react-icons/vsc";
import { useLocale } from "../i18n/LocaleContext";
import { pageLabel } from "../i18n/pageLabels";

interface Page {
  index: number;
  name: string;
  route: string;
}

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

export default function AppTree({
  pages,
  selectedIndex,
  setSelectedIndex,
  setCurrentComponent,
  visiblePageIndexs,
  setVisiblePageIndexs,
}: Props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { pathname } = useLocation();
  const isDark = theme.palette.mode === "dark";
  const { locale } = useLocale();

  const page: Page | undefined = pages.find((item) => item.route === pathname);

  useEffect(() => {
    if (page) {
      setSelectedIndex(page.index);
    }
  }, [page, setSelectedIndex]);

  function getTreeItemStyles(index: number) {
    const active = selectedIndex === index;

    return {
      borderRadius: 2,
      mb: 0.35,
      color: active ? theme.palette.text.primary : theme.palette.text.secondary,
      backgroundColor: active
        ? alpha(theme.palette.primary.main, isDark ? 0.14 : 0.12)
        : "transparent",
      "& .MuiTreeItem-content": {
        borderRadius: 2,
        py: 0.5,
        pr: 1,
      },
      "& .MuiTreeItem-content:hover": {
        backgroundColor: alpha(theme.palette.primary.main, isDark ? 0.08 : 0.06),
      },
      "&& .Mui-selected, && .Mui-selected:hover": {
        backgroundColor: alpha(theme.palette.primary.main, isDark ? 0.14 : 0.12),
      },
    };
  }

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultExpanded={["-1"]}
      sx={{
        minWidth: 220,
        px: 1.5,
        py: 0.75,
        "& .MuiTreeItem-group": {
          ml: 1,
          pl: 1.25,
          borderLeft: `1px dashed ${alpha(theme.palette.divider, 0.75)}`,
        },
      }}
    >
      <TreeItem
        nodeId="-1"
        label={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <HomeRoundedIcon
              sx={{ fontSize: 18, color: theme.palette.primary.main }}
            />
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {locale === "en" ? "home" : "主页"}
            </Typography>
          </Box>
        }
        sx={{
          "& .MuiTreeItem-content": {
            borderRadius: 2,
            py: 0.35,
          },
        }}
        onClick={() => {
          navigate("/");
          setSelectedIndex(-1);
          setCurrentComponent("tree");
        }}
      >
        {pages.map(({ index, name, route }) => (
          <TreeItem
            key={index}
            nodeId={index.toString()}
            label={pageLabel(name, locale)}
            sx={getTreeItemStyles(index)}
            icon={<VscMarkdown color="#6997d5" />}
            onClick={() => {
              if (!visiblePageIndexs.includes(index)) {
                setVisiblePageIndexs([...visiblePageIndexs, index]);
              }
              navigate(route);
              setSelectedIndex(index);
              setCurrentComponent("tree");
            }}
          />
        ))}
      </TreeItem>
    </TreeView>
  );
}
