import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  darkScrollbar,
  Grid,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { isBrowser } from "react-device-detect";
import MDContainer from "../components/MDContainer";
import { Locale, LocaleProvider } from "../i18n/LocaleContext";
import usePageTracking from "../hooks/usePageTracking";
import Home from "../pages/Home";
import Resume from "../pages/Resume";
import { pages } from "../pages/pages";
import AppButtons from "./AppButtons";
import AppTree from "./AppTree";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import TopActions from "./TopActions";

interface Page {
  index: number;
  name: string;
  route: string;
}

const FOOTER_HEIGHT = 26;
const TABBAR_HEIGHT = 42;

function initVisiblePageIndexs(items: Page[]) {
  return items.map((page) => page.index);
}

export default function App() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(isBrowser);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currentComponent, setCurrentComponent] = useState("");
  const [visiblePageIndexs, setVisiblePageIndexs] = useState(
    initVisiblePageIndexs(pages)
  );
  const [darkMode, setDarkMode] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");
  const [visiblePages, setVisiblePages] = useState(pages);
  const paletteMode = darkMode ? "dark" : "light";

  usePageTracking();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteMode,
          primary: {
            main: darkMode ? "#8fd8ff" : "#0f5cc0",
          },
          secondary: {
            main: darkMode ? "#84e2d3" : "#15806f",
          },
          background: {
            default: darkMode ? "#07111d" : "#f5f7fb",
            paper: darkMode ? "#0e1826" : "#ffffff",
          },
          text: {
            primary: darkMode ? "#f4f8ff" : "#122033",
            secondary: darkMode ? "#96a7bf" : "#576579",
          },
          divider: darkMode
            ? alpha("#d9e8ff", 0.12)
            : alpha("#0f315f", 0.12),
        },
        shape: {
          borderRadius: 18,
        },
        typography: {
          fontFamily: '"Manrope", "Helvetica Neue", sans-serif',
          h1: {
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
          },
          h2: {
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
          },
          h3: {
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
          },
          h4: {
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
          },
          h5: {
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
          },
          h6: {
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
          },
          button: {
            fontFamily: '"Manrope", "Helvetica Neue", sans-serif',
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                ...(paletteMode === "dark" ? darkScrollbar() : {}),
                background:
                  paletteMode === "dark"
                    ? "radial-gradient(circle at top, rgba(31, 88, 153, 0.18), transparent 30%), linear-gradient(180deg, #08111c 0%, #07111d 45%, #091827 100%)"
                    : "radial-gradient(circle at top, rgba(80, 137, 214, 0.12), transparent 30%), linear-gradient(180deg, #f8fbff 0%, #f4f7fb 45%, #eef2f7 100%)",
              },
              "::selection": {
                backgroundColor: darkMode
                  ? "rgba(143, 216, 255, 0.3)"
                  : "rgba(15, 92, 192, 0.2)",
              },
              "@media print": {
                "@page": {
                  margin: "12mm",
                },
                body: {
                  background: "#ffffff",
                },
                ".no-print": {
                  display: "none !important",
                },
              },
              a: {
                color: "inherit",
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
        },
      }),
    [darkMode, paletteMode]
  );

  function handleThemeChange() {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", darkMode ? "light" : "dark");
  }

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (!currentTheme) {
      setDarkMode(true);
    } else {
      setDarkMode(currentTheme === "dark");
    }
    const currentLocale = localStorage.getItem("locale");
    if (currentLocale === "zh" || currentLocale === "en") {
      setLocale(currentLocale);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  const deletedIndex = visiblePages.find(
    (page) => !visiblePageIndexs.includes(page.index)
  )?.index;

  useEffect(() => {
    const newPages = [];

    for (const index of visiblePageIndexs) {
      const page = pages.find((item) => item.index === index);
      if (page) {
        newPages.push(page);
      }
    }

    setVisiblePages(newPages);

    if (visiblePageIndexs.length === 0) {
      setSelectedIndex(-1);
      navigate("/");
      return;
    }

    if (
      deletedIndex === selectedIndex &&
      deletedIndex > Math.max(...visiblePageIndexs)
    ) {
      setSelectedIndex(Math.max(...visiblePageIndexs));
      const page = pages.find(
        (item) => item.index === Math.max(...visiblePageIndexs)
      );
      if (page) {
        navigate(page.route);
      }
      return;
    }

    if (
      deletedIndex === selectedIndex &&
      deletedIndex < Math.max(...visiblePageIndexs)
    ) {
      setSelectedIndex(Math.min(...visiblePageIndexs));
      const page = pages.find(
        (item) => item.index === Math.min(...visiblePageIndexs)
      );
      if (page) {
        navigate(page.route);
      }
    }
  }, [visiblePageIndexs, navigate, deletedIndex, selectedIndex]);

  return (
    <LocaleProvider locale={locale} setLocale={setLocale}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Container maxWidth={false} disableGutters sx={{ m: 0, p: 0 }}>
          <Grid container sx={{ minHeight: "100vh" }}>
            <Grid
              container
              sx={{ minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)` }}
            >
              <Grid item sx={{ width: { xs: 50, md: 56 } }} className="no-print">
                <Sidebar
                  setExpanded={setExpanded}
                  expanded={expanded}
                  darkMode={darkMode}
                  handleThemeChange={handleThemeChange}
                />
              </Grid>

              {expanded && (
                <Grid
                  item
                  className="no-print"
                  sx={{
                    width: { xs: 220, md: 264 },
                    borderRight: `1px solid ${theme.palette.divider}`,
                    backgroundColor: alpha(
                      darkMode ? "#0b1522" : "#ffffff",
                      darkMode ? 0.94 : 0.76
                    ),
                    backdropFilter: "blur(18px)",
                  }}
                >
                  <Stack sx={{ mt: 2 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        ml: 3,
                        fontFamily: '"IBM Plex Mono", monospace',
                        letterSpacing: "0.12em",
                      }}
                    >
                      EXPLORER
                    </Typography>
                    <AppTree
                      pages={pages}
                      selectedIndex={selectedIndex}
                      setSelectedIndex={setSelectedIndex}
                      currentComponent={currentComponent}
                      setCurrentComponent={setCurrentComponent}
                      visiblePageIndexs={visiblePageIndexs}
                      setVisiblePageIndexs={setVisiblePageIndexs}
                    />
                  </Stack>
                </Grid>
              )}

              <Grid item xs zeroMinWidth>
                <Grid container className="no-print">
                  <Grid item xs>
                    <Box sx={{ height: `${TABBAR_HEIGHT}px` }}>
                      <AppButtons
                        pages={visiblePages}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                        currentComponent={currentComponent}
                        setCurrentComponent={setCurrentComponent}
                        visiblePageIndexs={visiblePageIndexs}
                        setVisiblePageIndexs={setVisiblePageIndexs}
                      />
                    </Box>
                  </Grid>
                  <Grid item sx={{ width: "auto", minWidth: { xs: 0, md: 360 } }}>
                    <TopActions downloadHref="/resume-xulin-2026.pdf" />
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    scrollBehavior: "smooth",
                    overflowY: "auto",
                    height: `calc(100vh - ${FOOTER_HEIGHT}px - ${TABBAR_HEIGHT}px)`,
                    "@media print": {
                      overflow: "visible",
                      height: "auto",
                    },
                  }}
                >
                  <Routes>
                    <Route
                      path="/"
                      element={<Home setSelectedIndex={setSelectedIndex} />}
                    />
                    <Route path="/resume" element={<Resume />} />
                    {pages.map(({ index, name, route }) => (
                      route === "/resume" ? null :
                      <Route
                        key={index}
                        path={route}
                        element={<MDContainer name={name} />}
                      />
                    ))}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={12} className="no-print">
              <Footer />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </LocaleProvider>
  );
}
