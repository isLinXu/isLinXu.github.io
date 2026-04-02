import React from "react";
import { Box, Link, Paper, Tooltip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { VscFiles, VscSettingsGear } from "react-icons/vsc";
import { BiGitBranch } from "react-icons/bi";
import Divider from "@mui/material/Divider";
import { links } from "../pages/links";

interface Props {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Sidebar({
  expanded,
  setExpanded,
  darkMode,
  handleThemeChange,
}: Props) {
  const theme = useTheme();
  const iconColor = alpha(theme.palette.text.primary, 0.52);
  const hoverColor = theme.palette.text.primary;

  return (
    <Box
      sx={{
        height: "calc(100vh - 26px)",
        backgroundColor: alpha(darkMode ? "#09111d" : "#fbfdff", 0.9),
        borderRight: `1px solid ${theme.palette.divider}`,
        backdropFilter: "blur(18px)",
      }}
      justifyContent="space-between"
      display="flex"
      flexDirection="column"
      component={Paper}
      square
      elevation={0}
    >
      <Box
        sx={{ flexGrow: 0, pt: 1 }}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Box
          sx={{
            borderLeft: expanded
              ? `2px solid ${theme.palette.primary.main}`
              : "2px solid transparent",
            cursor: "pointer",
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Box
            sx={{
              my: 1.35,
              color: expanded ? hoverColor : iconColor,
              fontSize: 23,
              "&:hover": {
                color: hoverColor,
              },
            }}
            display="flex"
            justifyContent="center"
          >
            <VscFiles />
          </Box>
        </Box>

        <Tooltip title="Source code" arrow placement="right">
          <Link
            target="_blank"
            href="https://github.com/isLinXu/isLinXu.github.io"
            underline="none"
            color="inherit"
            rel="noreferrer"
            sx={{ WebkitTapHighlightColor: "rgba(0,0,0,0)" }}
          >
            <Box
              sx={{
                cursor: "pointer",
                color: iconColor,
                fontSize: 23,
                "&:hover": {
                  color: hoverColor,
                },
              }}
              display="flex"
              justifyContent="center"
            >
              <Box mt={0.7}>
                <BiGitBranch />
              </Box>
            </Box>
          </Link>
        </Tooltip>

        <Divider sx={{ mx: 1, my: 1.2, borderColor: theme.palette.divider }} />

        {links.map((link) => (
          <Tooltip title={link.title} arrow placement="right" key={link.index}>
            <Link
              target="_blank"
              href={link.href}
              underline="none"
              color="inherit"
              rel="noreferrer"
              sx={{ WebkitTapHighlightColor: "rgba(0,0,0,0)" }}
            >
              <Box
                sx={{
                  mx: 0.5,
                  my: 0.2,
                  color: iconColor,
                  fontSize: 22,
                  "&:hover": {
                    color: hoverColor,
                  },
                  cursor: "pointer",
                }}
                display="flex"
                justifyContent="center"
              >
                <Box mt={0.6}>{link.icon}</Box>
              </Box>
            </Link>
          </Tooltip>
        ))}
      </Box>

      <Box
        sx={{ flexGrow: 0, pb: 1 }}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Tooltip
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          placement="right"
          arrow
        >
          <Box
            sx={{
              fontSize: 23,
              color: iconColor,
              cursor: "pointer",
              "&:hover": {
                color: hoverColor,
              },
              WebkitTapHighlightColor: "rgba(0,0,0,0)",
            }}
            display="flex"
            justifyContent="center"
            onClick={handleThemeChange}
          >
            <Box>{!darkMode ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}</Box>
          </Box>
        </Tooltip>

        <Tooltip title="Personal workspace" placement="right" arrow>
          <Box
            sx={{
              mt: 1.2,
              color: iconColor,
              cursor: "default",
              textAlign: "center",
            }}
          >
            <Box display="flex" justifyContent="center" sx={{ fontSize: 22 }}>
              <VscSettingsGear />
            </Box>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 0.2,
                fontSize: "0.56rem",
                letterSpacing: "0.12em",
                fontFamily: '"IBM Plex Mono", monospace',
                color: "text.secondary",
              }}
            >
              LAB
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
}
