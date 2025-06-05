import { create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useActions = create((set) => ({
    qustionNavTabsActive: 1,
    testCaseResultNavTabActive: 1,
    runbtnState: false,


    changeQuestionNavtabActive:(id) => {
        set({qustionNavTabsActive: id})
    },

    changetestCaseResultNavtabActive:(id) => {
        set({testCaseResultNavTabActive: id})
        
    },

    runBtnStateChange:(ChangedState) => {
        set({runbtnState: ChangedState})
        
    },
    
    
}))