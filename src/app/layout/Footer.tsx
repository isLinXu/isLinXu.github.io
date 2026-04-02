import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { VscBell, VscCheck, VscFeedback, VscRemote } from "react-icons/vsc";
import { IoIosGitBranch } from "react-icons/io";

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component={Paper}
      square
      elevation={0}
      sx={{
        height: "26px",
        color: "#f7fbff",
        backgroundColor: isDark ? "#0b4f86" : "#0f5cc0",
        borderTop: `1px solid ${alpha("#ffffff", 0.1)}`,
      }}
      display="flex"
      alignItems="stretch"
    >
      <Box
        sx={{
          width: "40px",
          backgroundColor: isDark ? "#11695b" : "#16816f",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VscRemote fontSize="0.92rem" />
      </Box>

      <Stack
        direction="row"
        spacing={0}
        sx={{
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
          px: 1,
          overflow: "hidden",
        }}
      >
        <Stack direction="row" spacing={0.4} alignItems="center">
          <Box
            component={Link}
            href="https://github.com/isLinXu/isLinXu.github.io"
            underline="none"
            color="inherit"
            target="_blank"
            rel="noreferrer"
            display="flex"
            sx={{
              px: 0.7,
              py: 0.15,
              borderRadius: 1,
              alignItems: "center",
              "&:hover": {
                backgroundColor: alpha("#ffffff", 0.12),
              },
            }}
          >
            <IoIosGitBranch fontSize="0.95rem" />
            <Typography sx={{ ml: 0.5, fontSize: "0.66rem" }}>
              main
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 0.7,
              py: 0.15,
              borderRadius: 1,
            }}
          >
            <VscCheck fontSize="0.82rem" />
            <Typography sx={{ ml: 0.5, fontSize: "0.66rem" }}>
              portfolio live
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={0.5} alignItems="center">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 0.7,
              py: 0.15,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: alpha("#ffffff", 0.12),
              },
            }}
          >
            <VscFeedback fontSize="0.8rem" />
            <Typography sx={{ ml: 0.45, fontSize: "0.66rem" }}>
              open to collaboration
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 0.55,
              py: 0.15,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: alpha("#ffffff", 0.12),
              },
            }}
          >
            <VscBell fontSize="0.8rem" />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
