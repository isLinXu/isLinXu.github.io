import {
  FaMedium,
  FaBlog,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";

export const links = [
  {
    index: 0,
    title: "Find me on Github",
    href: "https://github.com/isLinXu",
    icon: <FaGithub />,
  },
  {
    index: 1,
    title: "Find me on LinkedIn",
    href: "https://www.linkedin.com/in/xu-lin-3b78a5251/",
    icon: <FaLinkedin />,
  },
  {
    index: 2,
    title: "Contact me via email",
    href: "mailto:linxu.official@gmail.com",
    icon: <FaEnvelope />,
  },
  {
    index: 3,
    title: "Find me on Medium",
    href: "https://medium.com/@isLinXu",
    icon: <FaMedium />,
  },
  {
    index: 4,
    title: "Find me on Blog",
    href: "https://www.cnblogs.com/isLinXu/",
    icon: <FaBlog />,
  },
  {
    index: 5,
    title: "Find me on Hugging Face",
    href: "https://huggingface.co/gatilin",
    icon: <VscAccount />,
  },
];
