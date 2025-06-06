import { create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useActions = create((set) => ({
    qustionNavTabsActive: 1,
    testCaseResultNavTabActive: 1,
    runbtnState: false,
    Events: null,
    DashboardEventSectionNavtabActive: 1,
    selectEvent: false,
    selectParticipants: false,


    changeQuestionNavtabActive:(id) => {
        set({qustionNavTabsActive: id})
    },

    changetestCaseResultNavtabActive:(id) => {
        set({testCaseResultNavTabActive: id})    
    },
    
    runBtnStateChange:(ChangedState) => {
        set({runbtnState: ChangedState})      
    },
    
    DashboardEventSectionNavtabActiveChange:(id) => {
        set({DashboardEventSectionNavtabActive: id})    
    },
    
    EventSet:(id) => {
        set({Events: id})    
    },

    setEventSelect:() => {
      set({selectEvent: true})
      set({selectParticipants: false})
    },
    
    setselectParticipants:() => {
        set({selectEvent: false})
      set({selectParticipants: true})
    }
    
    
    
}))