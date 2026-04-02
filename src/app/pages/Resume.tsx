import {
  alpha,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";

const profileImage = "/imgs/xulin-portrait-2026.jpg";

const content = {
  en: {
    name: "Xu Lin",
    title: "AI Algorithm Engineer | Large Models and Multimodal Systems Specialist",
    summary:
      "More than six years of AI algorithm engineering experience focused on large model training, multimodal systems, and visual perception. Core contributor to LLaMA-Factory and co-author of the MME Benchmark, with hands-on coverage across algorithm innovation, evaluation systems, data engineering, and commercial delivery.",
    download: "Download original PDF",
    export: "Print this resume",
    labels: {
      hero: "Professional Summary",
      quick: "Key Achievements",
      tags: "Core Tags",
      contact: "Contact",
      strengths: "Core Strengths",
      stack: "Tech Stack",
      experience: "Work Experience",
      projects: "Core Projects",
      education: "Education",
      impact: "Open Source & Impact",
      certifications: "Certifications & Roles",
    },
    facts: [
      { value: "14.16M+", label: "image-text pairs" },
      { value: "95.5%+", label: "business recall" },
      { value: "+10.9%", label: "MMStar gain" },
      { value: "42.3%", label: "COCO mAP" },
    ],
    contact: [
      "Shenzhen",
      "17746071609",
      "islinxu@163.com",
      "github.com/isLinXu",
    ],
    tags: [
      "6+ Years AI R&D",
      "MLLM / LLM",
      "Agent Systems",
      "LoRA Fine-tuning",
      "YOLO / Detection",
      "Evaluation Systems",
      "Large-Scale Data",
      "Ascend NPU",
    ],
    strengths: [
      "Large-model and multimodal training, fine-tuning, and evaluation",
      "End-to-end delivery across data, modeling, benchmarking, and deployment",
      "Detection systems across YOLO series, Cascade R-CNN, UniDet, and custom MOE design",
      "Large-scale image-text data engineering and automated labeling pipelines",
    ],
    stack: [
      "Llama-Factory, LoRA, Qwen3-VL, InternVL, GLM-4.6V, Florence2, CLIP",
      "YOLO series, Cascade R-CNN, UniDet, OVD distillation, SAM, OWL-ViT",
      "PyTorch, MindSpore, Ascend 910ProA, TensorRT, CANN",
      "Python, C++, JNI, Android NDK, SQL, Apache Spark",
    ],
    experience: [
      {
        role: "Tencent Youtu Lab, Multimodal & Agent Algorithm Engineer",
        time: "2025.01 - Present",
        bullets: [
          "Led multimodal large-model projects and commercial delivery for key clients including retail and vision-intelligence scenarios.",
          "Built an evaluation framework covering 9 mainstream MLLMs, 8 common benchmarks, and 5 business datasets.",
          "Improved Qwen3-VL-30B-LoRA and achieved a +10.9% MMStar gain.",
        ],
      },
      {
        role: "Tencent Youtu Lab, SVAP Algorithm Engineer",
        time: "2024.01 - 2025.01",
        bullets: [
          "Built standardized CV/VLM capability summaries and evaluation workflows for team reuse.",
          "Organized 1.26M image samples and expanded 300K+ more with retrieval-enhanced tooling.",
          "Delivered high-precision improvements in electric-vehicle and person-vehicle tasks.",
        ],
      },
      {
        role: "Tencent Youtu Lab, SVAP Algorithm Engineer",
        time: "2023.03 - 2023.12",
        bullets: [
          "Built label retrieval and diffusion systems for data completion and efficiency gains.",
          "Adapted training and inference workflows on Ascend NPU.",
          "Developed long-tail learning methods with measurable LVIS improvements.",
        ],
      },
      {
        role: "Strait Intelligence Technology Co., Visual Perception Algorithm Engineer",
        time: "2021.05 - 2023.03",
        bullets: [
          "Delivered target detection and visual perception algorithms in practical projects.",
          "Participated in smart city and transportation deployment scenarios.",
        ],
      },
      {
        role: "Keeko Robot, Image Algorithm Engineer",
        time: "2019.04 - 2021.04",
        bullets: [
          "Developed visual algorithms and edge deployment for education and industrial robots.",
          "Built offline AI utility libraries for Android through JNI and C++ integration.",
        ],
      },
    ],
    projects: [
      {
        name: "YOLO-Master",
        body: "First-author CVPR 2026 submission. Designed an MOE architecture on top of YOLO-style detection, reaching 42.3% COCO mAP with limited parameter growth and faster inference.",
      },
      {
        name: "Commercial Multimodal Delivery",
        body: "Built 907K+ image-text pairs, completed 10+ LoRA experiments, and supported recall and false-positive optimization in real business tasks.",
      },
      {
        name: "Large-Scale Data Engineering",
        body: "Built 1.46M business image-text pairs, processed 2.3M raw images into 4.5M portrait crops, and developed automated denoising / quality-evaluation tooling.",
      },
      {
        name: "Ascend NPU Adaptation",
        body: "Completed full training and inference adaptation on Ascend 910ProA and validated practical performance against V100-based workflows.",
      },
    ],
    education: [
      "Renmin University of China, Gaoling School of Artificial Intelligence, part-time graduate study (2024 - present)",
      "Fujian Agriculture and Forestry University, Electronic Information Engineering (2015 - 2019)",
    ],
    impact: [
      "Core contributor to LLaMA-Factory",
      "Co-author of MME Benchmark",
      "Public technical influence through GitHub, blogs, and open repositories",
    ],
    certifications: [
      "PaddlePaddle Developer Expert",
      "AICA program trainee",
      "ByteDance TRAE Fellow & Expert",
      "CCF YOCSEF Xiamen committee member",
    ],
  },
  zh: {
    name: "林旭",
    title: "AI 算法工程师｜大模型与多模态技术专家",
    summary:
      "拥有 6 年以上 AI 算法研发经验，专注于大模型训练、多模态系统与视觉感知。作为 LLaMA-Factory 核心贡献者与 MME Benchmark 共同作者，长期覆盖算法创新、评测体系、数据工程与商业落地。",
    download: "下载原始 PDF",
    export: "打印当前简历",
    labels: {
      hero: "专业摘要",
      quick: "关键成果速览",
      tags: "核心标签",
      contact: "联系方式",
      strengths: "核心优势",
      stack: "技术栈",
      experience: "工作经历",
      projects: "核心项目",
      education: "教育背景",
      impact: "开源与影响力",
      certifications: "认证与社会角色",
    },
    facts: [
      { value: "1416万+", label: "图文对规模" },
      { value: "95.5%+", label: "业务召回率" },
      { value: "+10.9%", label: "MMStar 提升" },
      { value: "42.3%", label: "COCO mAP" },
    ],
    contact: [
      "深圳",
      "17746071609",
      "islinxu@163.com",
      "github.com/isLinXu",
    ],
    tags: [
      "6年+ AI 研发",
      "MLLM / LLM",
      "Agent Systems",
      "LoRA 微调",
      "YOLO / 检测",
      "评测框架",
      "大规模数据",
      "昇腾 NPU",
    ],
    strengths: [
      "大模型与多模态训练、微调、评测的完整链路能力",
      "能打通数据、模型、Benchmark、部署和业务交付",
      "目标检测系统经验覆盖 YOLO 系列、Cascade R-CNN、UniDet 以及自研 MOE 架构",
      "具备大规模图文数据工程与自动化打标流程建设能力",
    ],
    stack: [
      "Llama-Factory、LoRA、Qwen3-VL、InternVL、GLM-4.6V、Florence2、CLIP",
      "YOLO 系列、Cascade R-CNN、UniDet、OVD 蒸馏、SAM、OWL-ViT",
      "PyTorch、MindSpore、Ascend 910ProA、TensorRT、CANN",
      "Python、C++、JNI、Android NDK、SQL、Apache Spark",
    ],
    experience: [
      {
        role: "腾讯优图研究中心，多模态与 Agent 算法工程师",
        time: "2025.01 - 至今",
        bullets: [
          "主导多模态大模型项目研发与商业交付，覆盖多个重点客户项目。",
          "构建评测框架，覆盖 9 个主流 MLLM、8 个通用 Benchmark 和 5 个业务测试集。",
          "推动 Qwen3-VL-30B-LoRA 优化，实现 +10.9% MMStar 提升。",
        ],
      },
      {
        role: "腾讯优图研究中心，SVAP 算法工程师",
        time: "2024.01 - 2025.01",
        bullets: [
          "建设 CV/VLM 通用能力梳理与标准化评测体系，提升团队复用效率。",
          "梳理 126 万图像并扩增 30 万+ 数据。",
          "在电动车检测与人车相关任务上实现高精度优化交付。",
        ],
      },
      {
        role: "腾讯优图研究中心，SVAP 算法工程师",
        time: "2023.03 - 2023.12",
        bullets: [
          "搭建标签检索与扩散系统，提升数据补全效率。",
          "完成昇腾 NPU 上的训练与推理适配。",
          "开发长尾学习方法，在 LVIS 上获得显著收益。",
        ],
      },
      {
        role: "海峡智汇科技有限公司，视觉感知算法工程师",
        time: "2021.05 - 2023.03",
        bullets: [
          "负责目标检测与视觉感知算法研发与项目交付。",
          "参与智慧城市和交通场景落地。",
        ],
      },
      {
        role: "智童时刻（厦门）科技有限公司，图像算法工程师",
        time: "2019.04 - 2021.04",
        bullets: [
          "负责幼教机器人与工业机器人的视觉算法开发与端侧部署。",
          "通过 JNI 与 C++ 为 Android 平台构建离线 AI 工具库。",
        ],
      },
    ],
    projects: [
      {
        name: "YOLO-Master",
        body: "CVPR 2026 第一作者投稿。基于 YOLO 系列设计 MOE 架构，在较小参数增量下取得 42.3% COCO mAP 和更快推理速度。",
      },
      {
        name: "多模态商业交付",
        body: "构建 90.7万+ 图文对，完成 10+ 组 LoRA 实验，支撑真实业务中的召回率和误报率优化。",
      },
      {
        name: "大规模数据工程建设",
        body: "构建 146 万业务图文对，从 230 万原始图像处理得到 450 万人像小图，并开发自动化去噪 / 质量评估工具链。",
      },
      {
        name: "国产化昇腾适配",
        body: "完成 Ascend 910ProA 上训练与推理全流程适配，并验证和 V100 工作流对比下的实际性能。",
      },
    ],
    education: [
      "中国人民大学，高瓴人工智能学院，非全日制在读（2024 - 至今）",
      "福建农林大学，电子信息工程（2015 - 2019）",
    ],
    impact: [
      "LLaMA-Factory 核心贡献者",
      "MME Benchmark 共同作者",
      "通过 GitHub、博客与公开仓库持续输出技术影响力",
    ],
    certifications: [
      "百度飞桨开发者技术专家",
      "AICA 培养计划学员",
      "字节 TRAE Fellow & Expert",
      "CCF YOCSEF 厦门委员",
    ],
  },
} as const;

export default function Resume() {
  const theme = useTheme();
  const { locale } = useLocale();
  const { pathname } = useLocation();
  const data = content[locale];
  const isDark = theme.palette.mode === "dark";
  const sectionLabelSx = {
    mb: 0.9,
    color: "text.secondary",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: "0.72rem",
  } as const;

  useEffect(() => {
    document.title = `${locale === "en" ? "Resume" : "简历"} | ${process.env.REACT_APP_NAME!}`;
  }, [locale, pathname]);

  return (
    <Box sx={{ px: { xs: 1.5, md: 2.5 }, py: { xs: 2, md: 2.5 } }}>
      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
          maxWidth: 1280,
          mx: "auto",
          borderRadius: 4,
          border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
          backgroundColor: alpha(
            isDark ? "#0b1522" : "#ffffff",
            isDark ? 0.95 : 0.96
          ),
          "@media print": {
            border: 0,
            borderRadius: 0,
            boxShadow: "none",
            backgroundColor: "#ffffff",
          },
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              p: { xs: 2.15, md: 2.55 },
              background: isDark
                ? "linear-gradient(180deg, rgba(12,22,35,0.98) 0%, rgba(8,15,24,0.98) 100%)"
                : "linear-gradient(180deg, rgba(241,246,255,0.96) 0%, rgba(248,250,255,0.96) 100%)",
              borderRight: { md: `1px solid ${theme.palette.divider}` },
              "@media print": {
                background: "#f7f7f7",
                p: 2.1,
              },
            }}
          >
            <Stack spacing={1.8}>
              <Box
                component="img"
                src={profileImage}
                alt="Xu Lin portrait"
                sx={{
                  width: 132,
                  height: 132,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: `3px solid ${alpha(theme.palette.common.white, 0.92)}`,
                  boxShadow: isDark
                    ? "0 16px 36px rgba(0,0,0,0.3)"
                    : "0 16px 36px rgba(31,63,110,0.14)",
                  "@media print": {
                    width: 92,
                    height: 92,
                    boxShadow: "none",
                  },
                }}
              />

              <Box>
                <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.18rem" } }}>
                  {data.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 0.6,
                    color: "text.secondary",
                    lineHeight: 1.58,
                    fontSize: { xs: "0.96rem", md: "1rem" },
                  }}
                >
                  {data.title}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={sectionLabelSx}>
                  {data.labels.tags}
                </Typography>
                <Stack direction="row" spacing={0.9} sx={{ flexWrap: "wrap" }}>
                  {data.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        letterSpacing: "0.04em",
                        height: 28,
                        "& .MuiChip-label": {
                          px: 1.1,
                          fontSize: "0.68rem",
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography variant="body2" sx={sectionLabelSx}>
                  {data.labels.quick}
                </Typography>
                <Grid container spacing={1}>
                  {data.facts.map((fact) => (
                    <Grid item xs={6} key={fact.label}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.05,
                          borderRadius: 2.5,
                          border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                          backgroundColor: alpha(theme.palette.primary.main, 0.06),
                          "@media print": {
                            breakInside: "avoid",
                          },
                        }}
                      >
                        <Typography variant="h6" sx={{ fontSize: "0.95rem" }}>
                          {fact.value}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            mt: 0.4,
                            color: "text.secondary",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            lineHeight: 1.4,
                            fontSize: "0.63rem",
                          }}
                        >
                          {fact.label}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box>
                <Typography variant="body2" sx={sectionLabelSx}>
                  {data.labels.contact}
                </Typography>
                <Stack spacing={0.55}>
                  {data.contact.map((item) => (
                    <Typography
                      key={item}
                      variant="body2"
                      sx={{ color: "text.secondary", lineHeight: 1.5 }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography variant="body2" sx={sectionLabelSx}>
                  {data.labels.strengths}
                </Typography>
                <Stack spacing={0.7}>
                  {data.strengths.map((item) => (
                    <Typography
                      key={item}
                      variant="body2"
                      sx={{ color: "text.secondary", lineHeight: 1.56 }}
                    >
                      • {item}
                    </Typography>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography variant="body2" sx={sectionLabelSx}>
                  {data.labels.stack}
                </Typography>
                <Stack spacing={0.7}>
                  {data.stack.map((item) => (
                    <Typography
                      key={item}
                      variant="body2"
                      sx={{ color: "text.secondary", lineHeight: 1.56 }}
                    >
                      • {item}
                    </Typography>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography variant="body2" sx={sectionLabelSx}>
                  {data.labels.certifications}
                </Typography>
                <Stack spacing={0.7}>
                  {data.certifications.map((item) => (
                    <Typography
                      key={item}
                      variant="body2"
                      sx={{ color: "text.secondary", lineHeight: 1.56 }}
                    >
                      • {item}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={8} sx={{ p: { xs: 2.15, md: 2.55 } }}>
            <Stack spacing={2}>
              <Box className="no-print" sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Button
                  component={Link}
                  href="/resume-xulin-2026.pdf"
                  download
                  startIcon={<DownloadRoundedIcon />}
                  sx={{ textTransform: "none" }}
                >
                  {data.download}
                </Button>
                <Button
                  onClick={() => window.print()}
                  startIcon={<DescriptionRoundedIcon />}
                  sx={{ textTransform: "none" }}
                >
                  {data.export}
                </Button>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 1.8,
                  borderRadius: 3.5,
                  border: `1px solid ${alpha(theme.palette.divider, 0.75)}`,
                  backgroundColor: alpha(theme.palette.primary.main, 0.045),
                  "@media print": {
                    p: 1.2,
                    backgroundColor: "#fafafa",
                    breakInside: "avoid",
                  },
                }}
              >
                <Typography variant="body2" sx={sectionLabelSx}>
                  {data.labels.hero}
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.66,
                    fontSize: { xs: "0.96rem", md: "1rem" },
                  }}
                >
                  {data.summary}
                </Typography>
              </Paper>

              <Divider />

              <Box>
                <Typography variant="h4" sx={{ mb: 1, fontSize: { xs: "1.35rem", md: "1.5rem" } }}>
                  {data.labels.experience}
                </Typography>
                <Stack spacing={1.35}>
                  {data.experience.map((item, index) => (
                    <Box
                      key={item.role}
                      sx={{
                        "@media print": {
                          breakInside: "avoid",
                        },
                      }}
                    >
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        spacing={0.5}
                        sx={{ mb: 0.5 }}
                      >
                        <Typography variant="h6" sx={{ fontSize: "0.98rem" }}>
                          {item.role}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", fontSize: "0.84rem" }}
                        >
                          {item.time}
                        </Typography>
                      </Stack>
                      <Stack spacing={0.42}>
                        {item.bullets.map((bullet) => (
                          <Typography
                            key={bullet}
                            variant="body2"
                            sx={{ color: "text.secondary", lineHeight: 1.6 }}
                          >
                            • {bullet}
                          </Typography>
                        ))}
                      </Stack>
                      {index !== data.experience.length - 1 && (
                        <Divider sx={{ mt: 1.4 }} />
                      )}
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Divider />

              <Grid container spacing={1.7}>
                <Grid item xs={12} lg={7}>
                  <Typography variant="h5" sx={{ mb: 0.95, fontSize: "1.08rem" }}>
                    {data.labels.projects}
                  </Typography>
                  <Stack spacing={0.9}>
                    {data.projects.map((item) => (
                      <Paper
                        key={item.name}
                        elevation={0}
                        sx={{
                          p: 1.15,
                          borderRadius: 2.5,
                          border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                          "@media print": {
                            breakInside: "avoid",
                          },
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ mb: 0.35, fontSize: "0.9rem" }}>
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", lineHeight: 1.58 }}
                        >
                          {item.body}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Grid>

                <Grid item xs={12} lg={5}>
                  <Typography variant="h5" sx={{ mb: 0.95, fontSize: "1.08rem" }}>
                    {data.labels.education}
                  </Typography>
                  <Stack spacing={0.7} sx={{ mb: 1.4 }}>
                    {data.education.map((item) => (
                      <Typography
                        key={item}
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.58 }}
                      >
                        • {item}
                      </Typography>
                    ))}
                  </Stack>

                  <Typography variant="h5" sx={{ mb: 0.95, fontSize: "1.08rem" }}>
                    {data.labels.impact}
                  </Typography>
                  <Stack spacing={0.7}>
                    {data.impact.map((item) => (
                      <Typography
                        key={item}
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.58 }}
                      >
                        • {item}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
