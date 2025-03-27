export const NotificationSection: React.FC<{
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
