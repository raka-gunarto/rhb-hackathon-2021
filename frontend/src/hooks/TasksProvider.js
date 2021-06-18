import React, { useState, useContext, createContext, useEffect } from "react";
import MassagePhoto from '../assets/massage.jpg'
import FoodPhoto from '../assets/food1.jpg'
import MakeUp from '../assets/makeup.jpg'
import Hotel from '../assets/hotel.jpg'
import Tea from '../assets/tea.jpg'
import Clothes from '../assets/clothes.jpg'
import Clothes2 from '../assets/clothes2.jpg'
import Bookstore from '../assets/bookstore.jpg'
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
        xp: 500,
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
        xp: 1200,
        subtasksLen: 1,
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
        title: "Good Work!",
        description: "Keep it up!",
        xp: 0,
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
    ],
  };

  const rewardsData = {
    newUser: {},
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
