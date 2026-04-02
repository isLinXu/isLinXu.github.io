import { alpha, Button, Stack } from "@mui/material";
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

  return (
    <Stack
      direction="row"
      spacing={0.8}
      sx={{
        px: { xs: 0.6, md: 1 },
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
          px: { xs: 1, md: 1.25 },
          minWidth: "fit-content",
          whiteSpace: "nowrap",
          color: "text.primary",
          border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
          backgroundColor: alpha(theme.palette.primary.main, 0.06),
        }}
      >
        {locale === "en" ? "中文 / EN" : "EN / 中文"}
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
            px: { xs: 1, md: 1.25 },
            minWidth: "fit-content",
            whiteSpace: "nowrap",
            color: "text.primary",
            border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
          }}
        >
          {downloadLabel ?? (locale === "en" ? "Download PDF" : "下载 PDF")}
        </Button>
      )}
      <Button
        size="small"
        startIcon={<PictureAsPdfRoundedIcon />}
        onClick={() => window.print()}
        sx={{
          textTransform: "none",
          borderRadius: 999,
          px: { xs: 1, md: 1.25 },
          minWidth: "fit-content",
          whiteSpace: "nowrap",
          color: "text.primary",
          border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
        }}
      >
        {printLabel ?? (locale === "en" ? "Export PDF" : "导出 PDF")}
      </Button>
    </Stack>
  );
}
