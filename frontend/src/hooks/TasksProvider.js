import React, { useState, useContext, createContext, useEffect } from "react";
import MassagePhoto from '../assets/massage.jpg'
import FoodPhoto from '../assets/food1.jpg'
import MakeUp from '../assets/makeup.jpg'
import Hotel from '../assets/hotel.jpg'
import Tea from '../assets/tea.jpg'
import Clothes from '../assets/clothes.jpg'
import Clothes2 from '../assets/clothes2.jpg'
import Bookstore from '../assets/bookstore.jpg'
import Reward1 from '../assets/compootahtogetha.jpg'
import Reward2 from '../assets/koins.jpg'
import Reward3 from '../assets/oneblokeonphoneandcompootah.jpg'
import Reward4 from '../assets/pointatthecompootah.jpg'
import Reward5 from '../assets/twoblokessmilingatcompootah.jpg'
import Reward6 from '../assets/blokesonatablet.jpg'
export const TasksContext = createContext();
export function TasksProvider({ children }) {
  const state = useProvideTasks();
  return (
    <TasksContext.Provider value={state}>{children}</TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

function useProvideTasks() {
  const tasksData = {
    newUser: [
      {
        id: 1,
        title: "Getting Started",
        description:
          "Start learning about what credit scores mean, and how they impact your future finances.",
        xp: 200,
        subtasksLen: 4,
        subtasks: [
          {
            id: 1,
            content:
              "Research about credit scores: what they are and what affects them, then take this quiz!",
          },
          {
            id: 2,
            content: "Open a checking / savings account with RHB",
          },
          {
            id: 3,
            content: "Apply for a credit card with RHB",
          },
          {
            id: 4,
            content: "Track your finances with a personal finances app",
          },
        ],
      },
    ],
    returningUserGood: [
      {
        id: 1,
        title: "Aim High!",
        description:
          "Make use of your good credit score",
        xp: 2400,
        subtasksLen: 2,
        subtasks: [
          {
            id: 1,
            content:
              "Research the different loan types",
          },
          {
            id: 2,
            content: "Research what is considered a 'fair' loan interest rate"
          }
        ],
      },
      {
        id: 2,
        title: "Explore horizons",
        description: "Look through the wide range of financial options banks have to offer",
        xp: 200,
        subtasks: [],
      },
        {
          id: 2,
          title: "Full Potential",
          description: "Take your good credit score even higher",
          xp: 200,
          subtasks: [],
        },
    ],
    returningUserBad: [
      {
        id: 1,
        title: "Regain Control, Take Action",
        description: "Follow these steps to boost your credit score back up",
        xp: 2200,
        subtasksLen: 4,
        subtasks: [
          {
            id: 1,
            content: "Track your finances with a personal finances app",
          },
          {
            id: 2,
            content: "Make all your payments on time this month",
          },
          {
            id: 3,
            content: "Clear an outstanding account",
          },
          {
            id: 4,
            content: "Clear all outstanding payments",
          },
        ],
      },
    ],
    businessUser: [
      {
        id: 1,
        title: "Startup Loans?",
        description:
          "Thinking of applying for a business loan with little history? Show banks how trustworthy you are!",
        subtasksLen: 2,
        xp: 4200,
        subtasks: [
          {
            id: 1,
            content: "Manage and keep track of your cashflow with RHB Reflex",
          },
          {
            id: 2,
            content:
              "Upload monthly accounting reports for the next couple months",
          },
        ],
      },
      {
        id: 2,
        title: "Expanding your profile",
        description: "Explore ways to expand your business profile to be eligible for financing",
        xp: 4000,
        subtasksLen: 2,
        subtasks: [
          {
            id: 1,
            content: "Test"
          },
          {
            id: 2,
            content: "Test"
          }
        ]
      },
      {
        id: 3,
        title: "Uploading documents",
        description: "See which documents would be most helpful to improve your profile",
        xp: 4000,
        subtasksLen: 2,
        subtasks: [
          {
            id: 1,
            content: "Test"
          },
          {
            id: 2,
            content: "Test"
          }
        ]
      }
    ],
  };

  const rewardsData = {
    newUser: {},
    businessUser: [
      {
        id: 1,
        title: "BizPower SME Business Loan",
        redeemed: false,
        image: Reward1,
        details: [
           "Increased collateral options",
           "7 year financing tenure",
           "Financing up to RM5 million"
        ]
      },
      {
        id: 2,
        title: "BizPlus/-i",
        redeemed: false,
        image: Reward2,
        details: [
          "7 year financing tenure",
          "Low interest rates",
          "High financing potential"
        ]
      },
      {
        id: 3,
        title: "BizPower SME Property Loan",
        redeemed: false,
        image: Reward3,
        details: [
          "Manage unexpected cash flow",
          "Bigger Returns",
          "Longer Tenure"
        ]
      },
      {
        id: 4,
        title: "Biz-Power Relief Financing",
        redeemed: false,
        image: Reward4,
        details: [
          "Finance amount up to RM1 million",
          "No guarantee fee",
          "High finance rates"
        ] 
      },
      {
        id: 5,
        title: "RHB Live FX @ Reflex",
        redeemed: false,
        image: Reward5,
        details: [
          "Monitor FX Rates in real time",
          "Book contracts",
          "Manage settlements"
        ]
      },
      {
        id: 6,
        title: "RHB Reflex Premium Plus",
        redeemed: false,
        image: Reward6,
        details: [
          "RM 50 / month",
          "Business on one platform",
          "Real time bank balance"
        ]
      }
    ],
    returningUser: [
      {
        id: 1,
        title: "RM10 off massage at Thai Odyssey",
        redeemed: false,
        image: MassagePhoto,
        details: [
          "Book anytime",
          "Complementary products",
          "30 minute massages"
        ]
      },
      {
        id: 2,
        title: "50% off at Chilli's",
        redeemed: false,
        image: FoodPhoto,
        details: [
          "Any Main Course",
          "Priority Seating",
          "Up to 3 patrons"
        ]
      },
      {
        id: 3,
        title: "RM12 off second item at Sephora",
        redeemed: true,
        image: MakeUp,
        details: [
          "Items from any range",
          "High quality products",
          "RM30 or more"
        ]
      },
      {
        id: 4,
        title: "2 night stay at Hilton KL",
        redeemed: false,
        image: Hotel,
        details: [
          "Valid for 2",
          "Full access to all facilities",
          "Breakfast included"
        ]
      },
      {
        id: 5,
        title: "Free high tea at Grand Hyatt",
        redeemed: false,
        image: Tea,
        details: [
          "Valid for 3",
          "Photo Opportunities",
          "Free flow coffee"
        ]
      },
      {
        id: 6,
        title: "20% voucher at Primark",
        redeemed: true,
        image: Clothes,
        details: [
          "Men's wear included",
          "RM20 and up"
        ]
      },
      {
        id: 7,
        title: "RM30 voucher at Debenhams",
        redeemed: true,
        image: Clothes2,
        details: [
          "Men's wear included",
          "RM20 and up"
        ]
      },
      {
        id: 8,
        title: "RM15 off any purchase at MPH",
        redeemed: true,
        image: Bookstore,
        details: [
          "Valid until December 30th",
          "All books included"
        ]
      },
    ],
  };

  const [userExperience, setUserExperience] = useState(1);
  const [tasks, setTasks] = useState(tasksData);
  const [rewards, setRewards] = useState(rewardsData);
  return {
    userExperience,
    setUserExperience,
    tasks,
    setTasks,
    rewards,
    setRewards,
  };
}
