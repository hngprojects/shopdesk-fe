export const PaymentOptions = () => (
  <div className='flex flex-col sm:flex-row border-b-2 border-[#e9eaeb] w-full max-w-[590px] h-[114px] justify-between'>
    <div className='flex flex-col justify-start w-[30%] min-w-[120px]'>
      <p className='font-circular-medium text-[#414651] text-base leading-5 font-[450]'>
        Payment Options
      </p>
    </div>
    <div className='flex flex-col gap-2 flex-1'>
      <div className='flex flex-col gap-3 ml-16'>
        {[
          { id: 'checkbox1', label: 'Bank Transfer' },
          { id: 'checkbox2', label: 'PayPal' },
          { id: 'checkbox3', label: 'Stripe' },
        ].map((option) => (
          <div key={option.id} className='flex flex-row items-center gap-3'>
            <input
              type='checkbox'
              id={option.id}
              className='w-4 h-4 border border-[#e9eaeb] rounded-lg cursor-pointer accent-[#009A49]'
            />
            <label
              htmlFor={option.id}
              className='font-circular-light text-[#535862] text-base leading-5 font-[300]'
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
);
