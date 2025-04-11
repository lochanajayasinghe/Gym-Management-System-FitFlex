import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import Workouts from "../components/Workouts";
import Reviews from "../components/Reviews";
import Bookings from "../components/Bookings";

import SingleProduct from "../shop/SingleProduct";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadProduct from "../dashboard/UploadProduct";
import EditProduct from "../dashboard/EditProduct";
import ManageProduct from "../dashboard/ManageProduct";


import A_ContactUs from "../Review/Admin_Side/A_ContactUs";
import A_ReviewBoxes from "../Review/Admin_Side/A_ReviewBoxes";
import A_Instructor from "../Review/Admin_Side/A_Instructor";
import A_product from "../Review/Admin_Side/A_product";
import A_workout from "../Review/Admin_Side/A_workout";
import ContactUs from "../Review/User_Side/ContactUs";
import F_Instructor from "../Review/User_Side/F_Instructor";
import F_product from "../Review/User_Side/F_product";
import F_workout from "../Review/User_Side/F_workout";
import Instructor from "../Review/User_Side/Instructor";
import Product from "../Review/User_Side/Product";
import Workout from "../Review/User_Side/Workout";
import ReviewBoxes from "../Review/User_Side/ReviewBoxes";
import Show_I from "../Review/User_Side/Show_I";
import Show_P from "../Review/User_Side/Show_P";
import Show_W from "../Review/User_Side/Show_W";
import InstructorRating from "../Review/User_Side/InstructorRating";
import ProductRating from "../Review/User_Side/ProductRating";
import WorkoutRating from "../Review/User_Side/WorkoutRating";
import ShowP4Shop from "../components/ShowP4Shop";
import ReviewDistribution from "../Review/Admin_Side/ReviewDistribution";

import Card from "../Payment_Management/card";
import Choose_payment_method from "../Payment_Management/choose_payment_method";
import Received from "../Payment_Management/received"
import Salary_cal from "../Payment_Management/salary_cal"
import Slp from "../Payment_Management/slp"
import ViewCards from "../Payment_Management/viewww";
import Paysucc from "../Payment_Management/paysucc";

import ScheduleView from "../Bookings/customer/scheduleView";
import MakeBooking from "../Bookings/customer/MakeBooking";
import BookingDetails from "../Bookings/customer/Bookings";
import BookingRequest from "../Bookings/admin/BookingRequest";
import ManagerScheduleView from "../Bookings/admin/ManagerScheduleView";

import MyWorkout from "../Workouts/User/MyWorkout";
import WorkoutUserView from "../Workouts/User/WorkoutUserView";
import ExerciseForm from "../Workouts/Admin/ExerciseForm";
import ExerciseList from "../Workouts/Admin/ExerciseList";
import WorkoutForm from "../Workouts/Admin/WorkoutForm";
import WorkoutList from "../Workouts/Admin/WorkoutList";

import Username from "../components/Username";
import Password from "../components/Password";
import Register from "../components/Register";
import BMI from "../components/BMI";
import Admin from "../dashboard/Admin";
import Profile from "../components/Profile";
import Recovery from "../components/Recovery";
import Reset from "../components/Reset";

import ProductHome from "../components/ProductHome";
import WorkoutHome from "../components/WorkoutHome";
import BookingHome from "../components/BookingHome";
import ReviewHome from "../components/ReviewHome";

import MealHome from "../components/MealHome";
import MyMeals from "../Meals/User/MyMeals";
import MealPlan from "../components/nutrition/MealPlan";
import MealDashboard from "../components/nutrition/MealDashboard";
import UserForm from "../components/nutrition/UserForm";
import NutrionistBooking from "../components/nutrition/NutrionistBooking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop/>,
      },
      {
        path: "/productHome",
        element: <ProductHome/>
      },
      {
        path: "/workoutHome",
        element: <WorkoutHome/>
      },
      {
        path: "/bookingHome",
        element: <BookingHome/>
      },
      {
        path: "/reviewHome",
        element: <ReviewHome/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path:"/ScheduleView",
        element:<ScheduleView />
      },
      {
        path:"/MakeBooking",
        element:<MakeBooking />
      }, {
        path:"/BookingDetails",
        element:<BookingDetails />
      },
      {
        path: "/contactUs",
        element: <ContactUs />,
      },
      {
        path: "/f_Instructor",
        element: <F_Instructor />,
      },
      {
        path: "/f_product",
        element: <F_product />,
      },
      {
        path: "/f_workout",
        element: <F_workout />,
      },
      {
        path: "/Review_instructor",
        element: <Instructor />,
      },
      {
        path: "/Review_workout",
        element: <Workout />,
      },
      {
        path: "/Review_products",
        element: <Product />,
      },
      {
        path: "/reviewBoxes",
        element: <ReviewBoxes />,
      },
      {
        path: "/show_I",
        element: <Show_I />,
      },
      {
        path: "/show_P",
        element: <Show_P />,
      },
      {
        path: "/show_W",
        element: <Show_W />,
      },
      {
        path: "/instructorRating",
        element: <InstructorRating />, 
      },
      {
        path: "/workoutRating",
        element: <WorkoutRating />, 
      },
      {
        path: "/productRating",
        element: <ProductRating />, 
      },
      {
        path: "/showP4Shop",
        element: <ShowP4Shop />, 
      },
      {
        path: "/card",
        element: <Card/>,
      },
      {
        path: "/paysucc",
        element: <Paysucc/>,
      },
      {
        path: "/choose_payment_method",
        element: <Choose_payment_method />,
      },
      {
        path: "/slp",
        element: <Slp/>,
      },
      {
         path: "/view_cards",
       element: <ViewCards/>,
       }, {
        path: "/login",
        element: <Username />,
      },
      {
          path : '/password',
          element : <Password/>
      },
      {
          path : '/register',
          element : <Register></Register>
       },
      {
          path : '/bmi',
          element : <BMI></BMI>
      },
      {
          path : '/profile',
          element : <Profile></Profile>
      },
      {
          path : '/recovery',
          element : <Recovery></Recovery>
      },
      {
          path : '/reset',
          element : <Reset></Reset>
      },
      {
        path:"/product/:id",
        element:<SingleProduct/>,
        loader:({params})=>fetch(`http://localhost:5000/product/${params.id}`)
      },
      {
        path: "/WorkoutUserView",
        element: <WorkoutUserView/>,
      },
      {
        path: "/MyWorkout",
        element: <MyWorkout/>,
      }
      , {
        path:"/MyMeals",
        element:<MyMeals />
      }
      , {
        path:"/MealHome",
        element:<MealHome />
      },
      {
        path: "/MealPlan",
        element: <MealPlan/>,
      },
      {
        path: "/MealDashboard",
        element: <MealDashboard/>,
      }
      , {
        path:"/UserForm",
        element:<UserForm />
      }
      , {
        path:"/NutrionistBooking",
        element:<NutrionistBooking />
      }
    ],
  },
  

  
  
  
  {
    path:"/admin/dashboard",
    element:<DashboardLayout/>,
    children:[
      {
        path:"/admin/dashboard",
        element:<Dashboard/>
      }, 
      {
        path : '/admin/dashboard/user',
        element : <Admin></Admin>
      },
      {
        path:"/admin/dashboard/upload",
        element:<UploadProduct/>
      },
      {
        path:"/admin/dashboard/manage",
        element:<ManageProduct/>
      },
      {
        path:"/admin/dashboard/edit/:id",
        element:<EditProduct/>,
        loader: ({ params }) =>
        axios.get(`http://localhost:8070/product/get/${params.id}`)
        .then(response => response.data)
      },
      {
        path: "/admin/dashboard/a_ReviewBoxes",
        element: <A_ReviewBoxes />,
      },
      {
        path: "/admin/dashboard/a_ContactUs",
        element: <A_ContactUs />,
      },
      {
        path: "/admin/dashboard/a_Instructor",
        element: <A_Instructor />,
      },
      {
        path: "/admin/dashboard/a_product",
        element: <A_product />,
      },
      {
        path: "/admin/dashboard/a_workout",
        element: <A_workout />,
      },
      {
        path: "/admin/dashboard/distribution",
        element: <ReviewDistribution />,
      },
      {
        path: "/admin/dashboard/received",
        element: <Received />,
      },
      {
        path: "/admin/dashboard/salary_cal",
        element: <Salary_cal/>,
      }, {
        path:"/admin/dashboard/BookingRequest",
        element:<BookingRequest />
      }, {
        path:"/admin/dashboard/ManagerScheduleView",
        element:<ManagerScheduleView />
      }, {
        path:"/admin/dashboard/ExerciseForm",
        element:<ExerciseForm />
      }
      , {
        path:"/admin/dashboard/ExerciseList",
        element:<ExerciseList />
      }
      , {
        path:"/admin/dashboard/WorkoutForm",
        element:<WorkoutForm />
      }
      , {
        path:"/admin/dashboard/WorkoutList",
        element:<WorkoutList />
      }
      
      
      
    ]
  }
 
]);

export default router;