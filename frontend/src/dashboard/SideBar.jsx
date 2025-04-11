import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineBookOpen, HiOutlineBriefcase, HiOutlineCash, HiOutlineChat, HiOutlineCloud, HiOutlineFire, HiOutlinePencil, HiShoppingBag, HiSupport, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();

  function userLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <Sidebar 
      aria-label="Sidebar with content separator example" 
      
    >
      {/* Logo at the Top */}
      <div className="flex justify-center p-5">
        <img src="./img/logo.png" alt="FitFlex Logo" className="w-24 h-24" />
      </div>

      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="/admin/dashboard"
            icon={HiChartPie}
            className="transition-all duration-300 hover:bg-orange-500 p-3 rounded-lg"
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiInbox}
            className="transition-all duration-300 hover:bg-orange-500 p-3 rounded-lg"
          >
            Inbox
          </Sidebar.Item>
          <Sidebar.Item
            href="/admin/dashboard/user"
            icon={HiUser}
            className="transition-all duration-300 hover:bg-orange-500 p-3 rounded-lg"
          >
            Users
          </Sidebar.Item>
          <Sidebar.Collapse
            icon={HiShoppingBag}
            label="Products Management"
            className="transition-all duration-300 hover:bg-orange-500 p-3 rounded-lg"
          >
            <Sidebar.Item icon={HiOutlineCloud} href="/admin/dashboard/upload">
              Upload Products
            </Sidebar.Item>
            <Sidebar.Item icon={HiOutlineBriefcase} href="/admin/dashboard/manage">
              Product Management
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Collapse
            icon={HiOutlineFire}
            label="Workout Management"
            className="transition-all duration-300 hover:bg-orange-500 p-3 rounded-lg"
          >
            <Sidebar.Item href="/admin/dashboard/ExerciseList">Exercises</Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/WorkoutList">Workout</Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Collapse
            icon={HiOutlineBookOpen}
            label="Booking Management"
            className="transition-all duration-300 hover:bg-orange-500 p-3 rounded-lg"
          >
            <Sidebar.Item href="/admin/dashboard/BookingRequest">Booking Requests</Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/ManagerScheduleView">Booking Management</Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Collapse
            icon={HiOutlineCash}
            label="Payment Management"
            className="transition-all duration-300 hover:bg-orange-500 p-3 rounded-lg"
          >
            <Sidebar.Item href="/admin/dashboard/received">Slips</Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/salary_cal">Salary</Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Collapse
            icon={HiOutlineChat}
            label="Reviews Management"
            className="transition-all duration-300 hover:bg-orange-500 p-3 rounded-lg"
          >
            <Sidebar.Item href="/admin/dashboard/a_ContactUs">Reviews</Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/a_ReviewBoxes">Review Categories</Sidebar.Item>
            
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>

        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="#"
            icon={HiViewBoards}
            className="transition-all duration-300 hover:bg-orange-500 p-3 rounded-lg"
          >
            Documentation
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiSupport}
            className="transition-all duration-300 hover:bg-orange-500 p-3 rounded-lg"
          >
            Help
          </Sidebar.Item>

          <Sidebar.Item
            href="#"
            icon={HiTable}
            onClick={userLogout}
            className="transition-all duration-300 hover:bg-red-600 p-3 rounded-lg text-black"
          >
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
