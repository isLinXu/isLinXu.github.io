import { alpha, Button, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { useLocale } from "../i18n/LocaleContext";

interface Props {
  printLabel?: string;
  downloadHref?: string;
  downloadLabel?: string;
}

export default function TopActions({
  printLabel,
  downloadHref,
  downloadLabel,
}: Props) {
  const theme = useTheme();
  const { locale, setLocale } = useLocale();
  const isDark = theme.palette.mode === "dark";
  const compact = useMediaQuery(theme.breakpoints.down("sm"));
  const localeLabel = compact
    ? locale === "en"
      ? "中 / EN"
      : "EN / 中"
    : locale === "en"
      ? "中文 / EN"
      : "EN / 中文";
  const downloadText = downloadLabel
    ?? (locale === "en"
      ? compact ? "Download" : "Download PDF"
      : compact ? "下载" : "下载 PDF");
  const exportText = printLabel
    ?? (locale === "en"
      ? compact ? "Export" : "Export PDF"
      : compact ? "导出" : "导出 PDF");

  return (
    <Stack
      direction="row"
      spacing={0.7}
      sx={{
        px: { xs: 0.4, md: 0.8 },
        alignItems: "center",
        justifyContent: "flex-end",
        height: 42,
        width: "100%",
        flexWrap: "nowrap",
        overflowX: "auto",
        overflowY: "hidden",
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: alpha(
          isDark ? "#09111d" : "#ffffff",
          isDark ? 0.96 : 0.72
        ),
        backdropFilter: "blur(16px)",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Button
        size="small"
        startIcon={<TranslateRoundedIcon />}
        onClick={() => setLocale(locale === "en" ? "zh" : "en")}
        sx={{
          textTransform: "none",
          borderRadius: 999,
          px: { xs: 0.75, md: 1.1 },
          minHeight: 30,
          minWidth: "fit-content",
          whiteSpace: "nowrap",
          fontSize: { xs: "0.74rem", md: "0.8rem" },
          fontWeight: 700,
          color: "text.primary",
          border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
          backgroundColor: alpha(theme.palette.primary.main, 0.06),
        }}
      >
        {localeLabel}
      </Button>
      {downloadHref && (
        <Button
          size="small"
          component="a"
          href={downloadHref}
          download
          startIcon={<DownloadRoundedIcon />}
          sx={{
            textTransform: "none",
            borderRadius: 999,
            px: { xs: 0.75, md: 1.1 },
            minHeight: 30,
            minWidth: "fit-content",
            whiteSpace: "nowrap",
            fontSize: { xs: "0.74rem", md: "0.8rem" },
            fontWeight: 700,
            color: "text.primary",
            border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
          }}
        >
          {downloadText}
        </Button>
      )}
      <Button
        size="small"
        startIcon={<PictureAsPdfRoundedIcon />}
        onClick={() => window.print()}
        sx={{
          textTransform: "none",
          borderRadius: 999,
          px: { xs: 0.75, md: 1.1 },
          minHeight: 30,
          minWidth: "fit-content",
          whiteSpace: "nowrap",
          fontSize: { xs: "0.74rem", md: "0.8rem" },
          fontWeight: 700,
          color: "text.primary",
          border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
        }}
      >
        {exportText}
      </Button>
    </Stack>
  );
}
