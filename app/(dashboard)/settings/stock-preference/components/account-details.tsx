export const AccountDetails = () => (
  <div className='flex flex-col sm:flex-row border-b-2 border-[#e9eaeb] w-full max-w-[590px] h-[68px] justify-between pb-4'>
    <div className='flex flex-col justify-start w-[30%] min-w-[120px]'>
      <p className='font-circular-medium text-[#414651] text-base leading-5 font-[400]'>
        Account Details
      </p>
    </div>
    <div className='flex flex-col flex-1'>
      <input
        type='text'
        className='w-full max-w-[328px] h-[62px] border border-[#e9eaeb] rounded-lg px-4 py-2 ml-16 font-circular-light text-[#535862] text-base leading-5 font-[400]'
      />
    </div>
  </div>
);
