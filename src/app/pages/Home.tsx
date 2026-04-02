import {
  alpha,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import PortraitRoundedIcon from "@mui/icons-material/PortraitRounded";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import { links } from "./links";
import { useLocale } from "../i18n/LocaleContext";

interface Props {
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const avatarUrl = "/imgs/isLinXu.png";
const portraitUrl = "/imgs/xulin-portrait-2026.jpg";

const sectionCards = {
  en: [
    {
      title: "Resume",
      description: "A dedicated bilingual resume page optimized for web preview and PDF export.",
      route: "/resume",
    },
    {
      title: "Overview",
      description: "Background, current direction, and a concise profile summary.",
      route: "/overview",
    },
    {
      title: "Projects",
      description: "Selected repositories across vision, multimodal AI, tooling, and learning systems.",
      route: "/projects",
    },
    {
      title: "Publications",
      description: "Paper and benchmark-related work tied to multimodal evaluation.",
      route: "/publication",
    },
  ],
  zh: [
    {
      title: "简历",
      description: "一个专门的中英双语简历页面，同时适合网页浏览与 PDF 导出。",
      route: "/resume",
    },
    {
      title: "概览",
      description: "背景、当前方向以及一份更简洁的个人简介。",
      route: "/overview",
    },
    {
      title: "项目",
      description: "覆盖视觉、多模态 AI、工具链和学习系统的代表仓库。",
      route: "/projects",
    },
    {
      title: "论文",
      description: "和多模态评测、研究输出相关的公开工作。",
      route: "/publication",
    },
  ],
} as const;

const featuredRepos = {
  en: [
    {
      title: "paper-list",
      href: "https://github.com/isLinXu/paper-list",
      tag: "research tooling",
      body: "A daily-updated computer vision paper list with automated collection and publishing workflow.",
    },
    {
      title: "YOLOv8_Efficient",
      href: "https://github.com/isLinXu/YOLOv8_Efficient",
      tag: "computer vision",
      body: "A practical repository for streamlined YOLOv8 training, evaluation, and usage workflows.",
    },
    {
      title: "vision-process-webui",
      href: "https://github.com/isLinXu/vision-process-webui",
      tag: "interactive tooling",
      body: "A Gradio-based vision toolbox integrating multiple open-source CV frameworks.",
    },
    {
      title: "model-metrics-plot",
      href: "https://github.com/isLinXu/model-metrics-plot",
      tag: "evaluation",
      body: "Utility tooling for visualizing and comparing deep learning model metrics.",
    },
    {
      title: "LLaMA-Factory",
      href: "https://github.com/hiyouga/LLaMA-Factory",
      tag: "contribution",
      body: "A major open-source project highlighted by the public profile as an active contribution direction.",
    },
    {
      title: "Awesome-Multimodal-Large-Language-Models",
      href: "https://github.com/BradyFU/Awesome-Multimodal-Large-Language-Models",
      tag: "knowledge curation",
      body: "A large multimodal LLM resource collection aligned with the current research focus.",
    },
  ],
  zh: [
    {
      title: "paper-list",
      href: "https://github.com/isLinXu/paper-list",
      tag: "研究工具",
      body: "一个持续更新的计算机视觉论文列表，并带有自动收集与发布流程。",
    },
    {
      title: "YOLOv8_Efficient",
      href: "https://github.com/isLinXu/YOLOv8_Efficient",
      tag: "计算机视觉",
      body: "面向 YOLOv8 训练、评测和使用流程的实用型仓库。",
    },
    {
      title: "vision-process-webui",
      href: "https://github.com/isLinXu/vision-process-webui",
      tag: "交互工具",
      body: "基于 Gradio 的视觉工具箱，整合了多个开源视觉框架。",
    },
    {
      title: "model-metrics-plot",
      href: "https://github.com/isLinXu/model-metrics-plot",
      tag: "评测分析",
      body: "用于可视化和对比深度学习模型指标的轻量工具。",
    },
    {
      title: "LLaMA-Factory",
      href: "https://github.com/hiyouga/LLaMA-Factory",
      tag: "开源贡献",
      body: "公开主页里重点体现的一个开源贡献方向。",
    },
    {
      title: "Awesome-Multimodal-Large-Language-Models",
      href: "https://github.com/BradyFU/Awesome-Multimodal-Large-Language-Models",
      tag: "知识整理",
      body: "和当前研究方向高度一致的多模态大模型资源整理项目。",
    },
  ],
} as const;

const copy = {
  en: {
    role: "AI Researcher • AI Engineer • Open Source Contributor",
    title:
      "Focusing on MLLM, LLM, and Agent systems while bridging advanced theoretical ideas with high-performance practical applications.",
    intro:
      "This homepage is aligned with the public GitHub profile and your latest resume materials: research focus, open-source contribution direction, technical writing, representative repositories, and a dedicated exportable resume page.",
    primary: "Open resume",
    secondary: "Open GitHub profile",
    connect: "Connect",
    focusEyebrow: "Profile focus",
    focusTitle: "MLLM, LLM, and Agent systems",
    focusBody:
      "Recent public materials center on multimodal large models, model efficiency, evaluation, deployment, and agent-oriented engineering.",
    modeEyebrow: "Working mode",
    modeTitle: "Research x open source x shipping",
    modeBody:
      "The portfolio sits between research, practical engineering, documentation, and public open-source contribution.",
    startHere: "Start here",
    featuredEyebrow: "Featured repositories",
    featuredTitle: "Public work connected to the profile",
    browseAll: "Browse all repositories",
    avatar: "Avatar",
    portrait: "Portrait",
    stats: [
      { value: "6+ Years", label: "ai experience" },
      { value: "14.16M+", label: "image-text pairs" },
      { value: "95.5%+", label: "business recall" },
    ],
  },
  zh: {
    role: "AI 研究者 • AI 工程师 • 开源贡献者",
    title:
      "聚焦 MLLM、LLM 与 Agent 系统，持续把理论想法落到高性能工程实践中。",
    intro:
      "这个主页现在和 GitHub 上的公开资料以及你最新的真实简历保持同步：当前研究方向、开源贡献、技术写作、代表仓库，以及可直接导出 PDF 的专门简历页。",
    primary: "打开简历页",
    secondary: "打开 GitHub 主页",
    connect: "联系与主页",
    focusEyebrow: "当前方向",
    focusTitle: "MLLM、LLM 与 Agent 系统",
    focusBody:
      "近期公开资料与真实简历都主要集中在多模态大模型、模型效率、评测、部署以及 Agent 工程。",
    modeEyebrow: "工作方式",
    modeTitle: "研究 × 开源 × 落地",
    modeBody:
      "整个主页位于研究、工程实现、文档沉淀与开源贡献的交叉点上。",
    startHere: "从这里开始",
    featuredEyebrow: "代表仓库",
    featuredTitle: "和当前公开主页相匹配的工作",
    browseAll: "浏览全部仓库",
    avatar: "头像",
    portrait: "证件照",
    stats: [
      { value: "6年+", label: "ai 经验" },
      { value: "1416万+", label: "图文对规模" },
      { value: "95.5%+", label: "业务召回率" },
    ],
  },
} as const;

export default function Home({ setSelectedIndex }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { locale } = useLocale();
  const [photoMode, setPhotoMode] = useState<"avatar" | "portrait">("avatar");
  const text = copy[locale];

  useEffect(() => {
    setSelectedIndex(-1);
  }, [setSelectedIndex]);

  useEffect(() => {
    document.title = process.env.REACT_APP_NAME!;
  }, [pathname]);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 26px - 42px)",
        px: { xs: 2, md: 4 },
        py: { xs: 2.5, md: 3.5 },
      }}
    >
      <Grid container spacing={{ xs: 2, md: 2.5 }}>
        <Grid item xs={12} xl={8}>
          <Paper
            elevation={0}
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 5,
              p: { xs: 2.25, md: 3.25 },
              border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
              background: isDark
                ? "linear-gradient(145deg, rgba(9,16,27,0.96) 0%, rgba(12,25,40,0.94) 55%, rgba(8,14,23,0.98) 100%)"
                : "linear-gradient(145deg, rgba(255,255,255,0.97) 0%, rgba(245,249,255,0.95) 55%, rgba(252,253,255,0.99) 100%)",
              boxShadow: isDark
                ? "0 24px 64px rgba(0, 0, 0, 0.28)"
                : "0 24px 64px rgba(20, 53, 93, 0.1)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: isDark
                  ? "radial-gradient(circle at top right, rgba(88,166,255,0.22), transparent 30%), radial-gradient(circle at bottom left, rgba(67,200,181,0.18), transparent 28%)"
                  : "radial-gradient(circle at top right, rgba(47,123,246,0.14), transparent 32%), radial-gradient(circle at bottom left, rgba(22,128,111,0.12), transparent 30%)",
              }}
            />

            <Stack spacing={2.5} sx={{ position: "relative", zIndex: 1 }}>
              <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
                <Grid item xs={12} md={4}>
                  <Stack spacing={1.2} alignItems={{ xs: "flex-start", md: "center" }}>
                    <Box
                      component="img"
                      src={photoMode === "avatar" ? avatarUrl : portraitUrl}
                      alt="Xu Lin portrait"
                      sx={{
                        width: { xs: 112, md: 168 },
                        height: { xs: 112, md: 168 },
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: `3px solid ${alpha(
                          isDark ? "#dcecff" : "#ffffff",
                          isDark ? 0.3 : 0.95
                        )}`,
                        boxShadow: isDark
                          ? "0 18px 44px rgba(0,0,0,0.35)"
                          : "0 18px 44px rgba(31,63,110,0.16)",
                      }}
                    />
                    <Stack direction="row" spacing={0.8}>
                      <Button
                        size="small"
                        startIcon={<FaceRoundedIcon />}
                        onClick={() => setPhotoMode("avatar")}
                        sx={{
                          textTransform: "none",
                          borderRadius: 999,
                          border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
                          backgroundColor:
                            photoMode === "avatar"
                              ? alpha(theme.palette.primary.main, 0.14)
                              : "transparent",
                        }}
                      >
                        {text.avatar}
                      </Button>
                      <Button
                        size="small"
                        startIcon={<PortraitRoundedIcon />}
                        onClick={() => setPhotoMode("portrait")}
                        sx={{
                          textTransform: "none",
                          borderRadius: 999,
                          border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
                          backgroundColor:
                            photoMode === "portrait"
                              ? alpha(theme.palette.primary.main, 0.14)
                              : "transparent",
                        }}
                      >
                        {text.portrait}
                      </Button>
                    </Stack>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Stack spacing={1.15}>
                    <Chip
                      label={text.role}
                      sx={{
                        width: "fit-content",
                        fontFamily: '"IBM Plex Mono", monospace',
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        borderRadius: 999,
                        backgroundColor: alpha(
                          isDark ? "#7fd1ff" : "#0f5cc0",
                          isDark ? 0.16 : 0.08
                        ),
                        color: isDark ? "#cfeeff" : "#0f4a96",
                      }}
                    />
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: { xs: "2.35rem", md: "4rem" },
                        lineHeight: 0.98,
                        letterSpacing: "-0.04em",
                      }}
                    >
                      Xu Lin
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "text.secondary",
                        lineHeight: 1.45,
                        fontWeight: 500,
                        maxWidth: 680,
                      }}
                    >
                      {text.title}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>

              <Typography
                sx={{
                  maxWidth: 820,
                  color: "text.secondary",
                  fontSize: { xs: "0.98rem", md: "1.03rem" },
                  lineHeight: 1.9,
                }}
              >
                {text.intro}
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.2}
                sx={{ flexWrap: "wrap" }}
              >
                <Button
                  variant="contained"
                  endIcon={<DescriptionRoundedIcon />}
                  onClick={() => navigate("/resume")}
                  sx={{
                    px: 2.2,
                    py: 1.1,
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 700,
                    backgroundColor: isDark ? "#8fd8ff" : "#0f5cc0",
                    color: isDark ? "#07111d" : "#ffffff",
                    "&:hover": {
                      backgroundColor: isDark ? "#b2e6ff" : "#124a97",
                    },
                  }}
                >
                  {text.primary}
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<OpenInNewRoundedIcon />}
                  component={Link}
                  href="https://github.com/isLinXu"
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    px: 2.2,
                    py: 1.1,
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 700,
                    borderColor: alpha(theme.palette.text.primary, 0.2),
                    color: "text.primary",
                    textDecoration: "none",
                  }}
                >
                  {text.secondary}
                </Button>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                sx={{ flexWrap: "wrap" }}
                divider={
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ borderColor: alpha(theme.palette.divider, 0.35) }}
                  />
                }
              >
                {text.stats.map((item) => (
                  <Box key={item.label} sx={{ pr: 1.5 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: { xs: "1.1rem", md: "1.45rem" },
                        fontWeight: 700,
                      }}
                    >
                      {item.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        fontFamily: '"IBM Plex Mono", monospace',
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontFamily: '"IBM Plex Mono", monospace',
                  }}
                >
                  {text.connect}
                </Typography>
                <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap" }}>
                  {links.map((link) => (
                    <Tooltip key={link.index} title={link.title} arrow>
                      <Link
                        target="_blank"
                        href={link.href}
                        underline="none"
                        color="inherit"
                        rel="noreferrer"
                      >
                        <IconButton
                          color="inherit"
                          sx={{
                            border: `1px solid ${alpha(
                              theme.palette.text.primary,
                              0.14
                            )}`,
                            backgroundColor: alpha(
                              isDark ? "#ffffff" : "#0c2340",
                              isDark ? 0.04 : 0.03
                            ),
                            "&:hover": {
                              backgroundColor: alpha(
                                isDark ? "#8fd8ff" : "#0f5cc0",
                                isDark ? 0.14 : 0.1
                              ),
                            },
                          }}
                        >
                          {link.icon}
                        </IconButton>
                      </Link>
                    </Tooltip>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} xl={4}>
          <Stack spacing={2} sx={{ height: "100%" }}>
            {[
              {
                eyebrow: text.focusEyebrow,
                title: text.focusTitle,
                body: text.focusBody,
              },
              {
                eyebrow: text.modeEyebrow,
                title: text.modeTitle,
                body: text.modeBody,
              },
            ].map((card) => (
              <Paper
                key={card.title}
                elevation={0}
                sx={{
                  borderRadius: 4,
                  p: 2.25,
                  border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
                  backgroundColor: alpha(
                    isDark ? "#101826" : "#ffffff",
                    isDark ? 0.86 : 0.9
                  ),
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontFamily: '"IBM Plex Mono", monospace',
                  }}
                >
                  {card.eyebrow}
                </Typography>
                <Typography variant="h4" sx={{ mb: 1.1, fontSize: "1.55rem" }}>
                  {card.title}
                </Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                  {card.body}
                </Typography>
              </Paper>
            ))}

            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                p: 2.25,
                border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
                backgroundColor: alpha(
                  isDark ? "#0c1420" : "#ffffff",
                  isDark ? 0.9 : 0.94
                ),
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  mb: 1.25,
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontFamily: '"IBM Plex Mono", monospace',
                }}
              >
                {text.startHere}
              </Typography>
              <Stack spacing={1.15}>
                {sectionCards[locale].map((card, index) => (
                  <Box
                    key={card.title}
                    onClick={() => navigate(card.route)}
                    sx={{
                      cursor: "pointer",
                      borderRadius: 3,
                      p: 1.7,
                      border: `1px solid ${alpha(theme.palette.divider, 0.45)}`,
                      backgroundColor: alpha(
                        isDark ? "#ffffff" : "#0f5cc0",
                        isDark ? 0.03 : 0.025
                      ),
                      transition:
                        "transform 180ms ease, border-color 180ms ease, background-color 180ms ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        borderColor: alpha(
                          isDark ? "#8fd8ff" : "#0f5cc0",
                          0.5
                        ),
                        backgroundColor: alpha(
                          isDark ? "#8fd8ff" : "#0f5cc0",
                          isDark ? 0.08 : 0.05
                        ),
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{ fontSize: "1rem", mb: 0.35 }}
                        >
                          {`${String(index + 1).padStart(2, "0")} ${card.title}`}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", lineHeight: 1.7 }}
                        >
                          {card.description}
                        </Typography>
                      </Box>
                      <OpenInNewRoundedIcon
                        sx={{ color: "text.secondary", mt: 0.2 }}
                      />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 5,
              p: { xs: 2.1, md: 2.6 },
              border: `1px solid ${alpha(theme.palette.divider, 0.65)}`,
              backgroundColor: alpha(
                isDark ? "#0b1522" : "#ffffff",
                isDark ? 0.9 : 0.9
              ),
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              spacing={1.25}
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 0.7,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontFamily: '"IBM Plex Mono", monospace',
                  }}
                >
                  {text.featuredEyebrow}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontSize: { xs: "1.7rem", md: "2.2rem" } }}
                >
                  {text.featuredTitle}
                </Typography>
              </Box>
              <Button
                variant="text"
                component={Link}
                href="https://github.com/isLinXu?tab=repositories"
                target="_blank"
                rel="noreferrer"
                endIcon={<OpenInNewRoundedIcon />}
                sx={{
                  alignSelf: { xs: "flex-start", md: "center" },
                  textTransform: "none",
                  fontWeight: 700,
                  color: "text.primary",
                  textDecoration: "none",
                }}
              >
                {text.browseAll}
              </Button>
            </Stack>

            <Grid container spacing={1.5}>
              {featuredRepos[locale].map((repo) => (
                <Grid item xs={12} md={6} xl={4} key={repo.title}>
                  <Paper
                    elevation={0}
                    component={Link}
                    href={repo.href}
                    target="_blank"
                    rel="noreferrer"
                    underline="none"
                    sx={{
                      display: "block",
                      height: "100%",
                      p: 2,
                      borderRadius: 3.5,
                      border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
                      backgroundColor: alpha(
                        isDark ? "#ffffff" : "#0f315f",
                        isDark ? 0.03 : 0.025
                      ),
                      color: "inherit",
                      transition:
                        "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        borderColor: alpha(theme.palette.primary.main, 0.5),
                        boxShadow: isDark
                          ? "0 12px 30px rgba(0,0,0,0.22)"
                          : "0 12px 30px rgba(31,63,110,0.1)",
                      },
                    }}
                  >
                    <Stack spacing={1.1}>
                      <Chip
                        label={repo.tag}
                        size="small"
                        sx={{
                          width: "fit-content",
                          fontFamily: '"IBM Plex Mono", monospace',
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      />
                      <Typography variant="h6" sx={{ fontSize: "1.05rem" }}>
                        {repo.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.75 }}
                      >
                        {repo.body}
                      </Typography>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
