'use client'
import { Button } from '@/components/ui/button';
import {
  setNewOrders,
  setOrderStatusUpdates,
  setNotificationMethod,
  setWeeklySalesReport,
  setMonthlyPerformance,
  setSuccessfulPayments,
  setFailedPayments,
  setPaymentNotificationMethod,
} from '@/redux/notificationlslice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ToggleSwitch } from '@/components/ui/toggle-switch';

const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    newOrders,
    orderStatusUpdates,
    notificationMethod,
    weeklySalesReport,
    monthlyPerformance,
    successfulPayments,
    failedPayments,
    paymentNotificationMethod,
  } = useAppSelector((state) => state.notification);

  return (
    <div className='flex flex-col gap-6 w-full max-w-[1307px]'>
      {/* Header Section */}
      <div className='flex flex-row w-full justify-between items-center gap-4 md:border-b border-[#e9eaeb] pb-6'>
        <div className='w-full flex flex-col gap-1 text-[#181d27]'>
          <p className='text-xl font-circular-medium leading-7'>
            Notification Settings
          </p>
          <p className='text-[#535862] font-circular-light leading-5 text-base'>
            Choose how you receive alerts to manage your store efficiently.
          </p>
        </div>
        <div className='flex flex-row gap-3 mt-4 md:mt-0'>
          <Button
            variant='outline'
            className='px-6 py-3 text-base cursor-pointer'
          >
            Cancel
          </Button>
          <Button className='px-6 py-3 text-base cursor-pointer'>Save</Button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className='flex flex-col lg:flex-row gap-[64px] w-full'>
        {/* Left Side */}
        <div className='left-side flex flex-col gap-8 w-full max-w-[620px]'>
          <NotificationSection title='Order Notifications'>
            <div className='flex flex-row items-center justify-between py-2'>
              <p className='font-circular-light text-[#535862] text-base leading-5 font-[400]'>
                New Orders
              </p>
              <ToggleSwitch
                checked={newOrders}
                onChange={(checked) => dispatch(setNewOrders(checked))}
              />
            </div>
            <div className='flex flex-row items-center justify-between py-2'>
              <p className='font-circular-light text-[#535862] text-base leading-5 font-[400]'>
                Order Status Updates
              </p>
              <ToggleSwitch
                checked={orderStatusUpdates}
                onChange={(checked) => dispatch(setOrderStatusUpdates(checked))}
              />
            </div>
            <div className='flex flex-row items-center justify-between gap-3 py-2'>
              <p className='font-circular-light text-[#535862] text-base leading-5 font-[400]'>
                Notification Method
              </p>
              <select
                className='w-full max-w-[288px] h-[62px] border border-[#e9eaeb] rounded-lg px-4 py-2 font-circular-light text-[#535862] text-base leading-5 font-[400]'
                value={notificationMethod}
                onChange={(e) =>
                  dispatch(setNotificationMethod(e.target.value))
                }
              >
                <option value='email'>Email</option>
                <option value='push'>Push Notifications</option>
                <option value='sms'>SMS</option>
              </select>
            </div>
          </NotificationSection>

          <NotificationSection title='Sales Reports & Insights'>
            <div className='flex flex-row items-center justify-between py-2'>
              <p className='font-circular-light text-[#535862] text-base leading-5 font-[400]'>
                Weekly Sales Report
              </p>
              <ToggleSwitch
                checked={weeklySalesReport}
                onChange={(checked) => dispatch(setWeeklySalesReport(checked))}
              />
            </div>
            <div className='flex flex-row items-center justify-between py-2'>
              <p className='font-circular-light text-[#535862] text-base leading-5 font-[400]'>
                Monthly Performance Summary
              </p>
              <ToggleSwitch
                checked={monthlyPerformance}
                onChange={(checked) => dispatch(setMonthlyPerformance(checked))}
              />
            </div>
          </NotificationSection>
        </div>

        {/* Right Side */}
        <div className='right-side flex flex-col gap-5 w-full max-w-[629px] mt-8 lg:mt-0'>
          <NotificationSection title='Payment Notifications'>
            <div className='flex flex-row items-center justify-between py-2'>
              <p className='font-circular-light text-[#414651] text-base leading-5 font-[400]'>
                Successful Payments
              </p>
              <ToggleSwitch
                checked={successfulPayments}
                onChange={(checked) => dispatch(setSuccessfulPayments(checked))}
              />
            </div>
            <div className='flex flex-row items-center justify-between py-2'>
              <p className='font-circular-light text-[#414651] text-base leading-5 font-[300]'>
                Failed Payments & Chargebacks
              </p>
              <ToggleSwitch
                checked={failedPayments}
                onChange={(checked) => dispatch(setFailedPayments(checked))}
              />
            </div>
            <div className='flex flex-row items-center justify-between gap-3 py-2 border-t-2 border-[#e9eaeb]'>
              <p className='font-circular-light text-[#414651] text-base leading-5 font-[400]'>
                Notification Method
              </p>
              <select
                className='w-full max-w-[288px] h-[62px] border border-[#e9eaeb] rounded-lg px-4 py-2 font-circular-light text-[#535862] text-base leading-5 font-[300]'
                value={paymentNotificationMethod}
                onChange={(e) =>
                  dispatch(setPaymentNotificationMethod(e.target.value))
                }
              >
                <option value='email'>Email</option>
                <option value='push'>Push Notifications</option>
                <option value='sms'>SMS</option>
              </select>
            </div>
          </NotificationSection>
        </div>
      </div>
    </div>
  );
};


const NotificationSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div className='flex flex-col gap-5 w-full max-w-[620px] pb-6 bg-white'>
      <p className='font-circular-medium text-[#A0A0A0] text-base leading-5 font-[400] border-b-2 border-[#e9eaeb] pb-6'>
        {title}
      </p>
      {children}
    </div>
  );
};


export default Notification;
