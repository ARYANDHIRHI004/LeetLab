import DescriptionSection from "../components/DescriptionSection";
import DiscussionSection from "../components/DiscussionSection";
import HintSection from "../components/HintSection";
import SolutionSection from "../components/SolutionSection";
import SubmissionSection from "../components/SubmissionSection";

function getLanguageName(languageId) {
    const LANGUAGE_NAMES = {
      74: "TypeScript",
      63: "JavaScript",
      71: "Python",
      62: "Java",
    };
    return LANGUAGE_NAMES[languageId] || "Unknown";
  }

  export { getLanguageName };


  export function getLanguageId(language) {
    const languageMap = {
      "PYTHON": 71,
      "JAVASCRIPT": 63,
      "JAVA": 62,
      "TypeScript": 74,
    };
    return languageMap[language.toUpperCase()];
  }

export const problemSectionNavTab = [
    {id:1, label:"Descripton"},
    {id:2, label:"Submission"},
    {id:3, label:"Discussion"},
    {id:4, label:"Hint"},
    {id:5, label:"Solution"},
]

export const NavComponents = [
    {id:1, component:DescriptionSection},
    {id:2, component:SubmissionSection},
    {id:3, component:DiscussionSection},
    {id:4, component:HintSection},
    {id:5, component:SolutionSection},
]
    