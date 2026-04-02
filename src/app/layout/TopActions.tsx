import { alpha, Box, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
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
      spacing={1}
      sx={{
        px: 1.2,
        alignItems: "center",
        justifyContent: "flex-end",
        height: 42,
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: alpha(
          isDark ? "#09111d" : "#ffffff",
          isDark ? 0.96 : 0.72
        ),
        backdropFilter: "blur(16px)",
      }}
    >
      <Button
        size="small"
        startIcon={<TranslateRoundedIcon />}
        onClick={() => setLocale(locale === "en" ? "zh" : "en")}
        sx={{
          textTransform: "none",
          borderRadius: 999,
          px: 1.4,
          color: "text.primary",
          border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
          backgroundColor: alpha(theme.palette.primary.main, 0.06),
        }}
      >
        {locale === "en" ? "中文" : "English"}
      </Button>

      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        {downloadHref && (
          <Button
            size="small"
            component="a"
            href={downloadHref}
            download
            sx={{
              mr: 1,
              textTransform: "none",
              borderRadius: 999,
              px: 1.4,
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
            px: 1.4,
            color: "text.primary",
            border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
          }}
        >
          {printLabel ?? (locale === "en" ? "Export PDF" : "导出 PDF")}
        </Button>
      </Box>
    </Stack>
  );
}
